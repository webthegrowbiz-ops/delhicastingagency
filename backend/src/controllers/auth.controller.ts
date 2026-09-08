import crypto from "crypto";
import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import {
  comparePassword,
  generateToken,
  generateMfaToken,
  hashPassword,
  verifyMfaToken,
  hashToken,
} from "../utils/auth.js";
import {
  generateBase32Secret,
  decryptMfaSecret,
  encryptMfaSecret,
  verifyTotp,
  generateBackupCodes,
  hashBackupCode,
  compareBackupCode,
} from "../utils/mfa.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { notifyWelcome, notifyLogin } from "../services/notification.service.js";
import {
  sendRegistrationAttemptAlertEmail,
  sendPasswordResetEmail,
} from "../services/email.service.js";
import { normalizeIndianPhone } from "../utils/phone.js";

function isValidRole(role: string): role is "ARTIST" | "BRAND" {
  return role === "ARTIST" || role === "BRAND";
}

// ==========================================
// REGISTER (ARTIST or BRAND only)
// ==========================================

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { email, password, role, phone } = req.body as {
      email?: string;
      password?: string;
      role?: string;
      phone?: string;
    };

    if (!email || !password || !role) {
      res.status(400).json({
        success: false,
        message: "Email, password and role are required",
      });
      return;
    }

    if (!isValidRole(role)) {
      res.status(400).json({
        success: false,
        message: "Role must be ARTIST or BRAND",
      });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (password.length < 8) {
      res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
      return;
    }

    // Email Uniqueness Check (Database model User.email)
    const existingUser = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (existingUser) {
      // Send real-time security alert email to the legitimate account owner
      void sendRegistrationAttemptAlertEmail({
        to: existingUser.email,
        attemptTime: new Date(),
      }).catch((err) => console.error("Registration collision alert email error:", err));

      res.status(409).json({
        success: false,
        message: "This email is already registered. Please log in or use a different email address.",
      });
      return;
    }

    // Phone Uniqueness Check (if provided during registration)
    if (phone && typeof phone === "string" && phone.trim() !== "") {
      const normalizedPhone = normalizeIndianPhone(phone);
      if (normalizedPhone) {
        const [existingArtistPhone, existingBrandPhone] = await Promise.all([
          prisma.artistProfile.findFirst({ where: { phone: normalizedPhone } }),
          prisma.brandProfile.findFirst({ where: { phone: normalizedPhone } }),
        ]);

        if (existingArtistPhone || existingBrandPhone) {
          res.status(409).json({
            success: false,
            message: "Phone number is already registered. Please use a different phone number.",
          });
          return;
        }
      }
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        role,
      },
    });

    const token = generateToken(user.id, user.role, user.tokenVersion);

    // Trigger in-app welcome notification & welcome email safely
    void notifyWelcome({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const clientIp =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      req.ip ||
      undefined;

    // Also trigger login notification & live email since registration issues an active authenticated session
    void notifyLogin({ userId: user.id, ipAddress: clientIp });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
}

// ==========================================
// LOGIN (ARTIST, BRAND, or ADMIN with MFA)
// ==========================================

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
      include: {
        adminMfa: true,
      },
    });

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    // Check if account has mandatory password reset required
    if (user.passwordResetRequired) {
      res.status(403).json({
        success: false,
        passwordResetRequired: true,
        message:
          "A password reset is required for your account before you can log in. Please use the password reset link sent to your email or click Forgot Password.",
      });
      return;
    }

    // -------------------------------------------------------------
    // ADMIN MFA CHALLENGE HANDLING
    // -------------------------------------------------------------
    if (user.role === "ADMIN") {
      const isMfaEnrolled = user.adminMfa?.mfaEnabled ?? false;
      const scope = isMfaEnrolled ? "mfa_pending" : "mfa_setup";
      const mfaToken = generateMfaToken(user.id, scope);

      res.status(200).json({
        success: true,
        message: isMfaEnrolled
          ? "Admin password verified. MFA verification required."
          : "Admin password verified. MFA setup required.",
        mfaRequired: true,
        mfaEnrolled: isMfaEnrolled,
        mfaSetupRequired: !isMfaEnrolled,
        mfaToken,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      });
      return;
    }

    // -------------------------------------------------------------
    // NON-ADMIN (ARTIST / BRAND) REGULAR LOGIN
    // -------------------------------------------------------------
    const token = generateToken(user.id, user.role, user.tokenVersion);

    // Extract client IP address for security notification
    const clientIp =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      req.ip ||
      undefined;

    // Trigger in-app login notification & login alert email safely
    void notifyLogin({ userId: user.id, ipAddress: clientIp });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
}

// ==========================================
// MFA SETUP (ADMIN ONLY)
// ==========================================

export async function setupMfa(req: Request, res: Response): Promise<void> {
  try {
    const { mfaToken } = (req.body || {}) as { mfaToken?: string };
    const authHeader = req.headers.authorization;
    const tokenToVerify = mfaToken || (authHeader ? authHeader.replace(/^Bearer\s+/i, "") : "");

    if (!tokenToVerify) {
      res.status(401).json({
        success: false,
        message: "MFA setup token is required",
      });
      return;
    }

    // Check single-use token revocation
    const tokenHash = hashToken(tokenToVerify);
    const isRevoked = await prisma.revokedToken.findUnique({
      where: { tokenHash },
    });
    if (isRevoked) {
      res.status(401).json({
        success: false,
        message: "MFA challenge token has already been used",
      });
      return;
    }

    const { userId, scope } = verifyMfaToken(tokenToVerify);

    if (scope !== "mfa_setup") {
      res.status(403).json({
        success: false,
        message: "Invalid token scope for MFA setup",
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { adminMfa: true },
    });

    if (!user || user.role !== "ADMIN") {
      res.status(403).json({
        success: false,
        message: "Only Admin accounts can setup MFA",
      });
      return;
    }

    // Generate Base32 secret for TOTP (RFC 6238)
    const plainSecret = generateBase32Secret(20);
    const encryptedSecret = encryptMfaSecret(plainSecret);

    // Save or update AdminMfa record (keep mfaEnabled: false until verified)
    if (user.adminMfa) {
      await prisma.adminMfa.update({
        where: { id: user.adminMfa.id },
        data: {
          mfaSecret: encryptedSecret,
          mfaEnabled: false,
        },
      });
    } else {
      await prisma.adminMfa.create({
        data: {
          userId: user.id,
          mfaSecret: encryptedSecret,
          mfaEnabled: false,
        },
      });
    }

    const issuer = "DCA";
    const otpauthUrl = `otpauth://totp/${issuer}:${encodeURIComponent(user.email)}?secret=${plainSecret}&issuer=${issuer}`;

    res.status(200).json({
      success: true,
      message: "MFA secret generated. Scan QR code or enter manual key in your authenticator app.",
      manualKey: plainSecret,
      otpauthUrl,
    });
  } catch (error) {
    console.error("MFA setup error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid or expired MFA setup token",
    });
  }
}

// ==========================================
// MFA VERIFY (ADMIN ONLY)
// ==========================================

export async function verifyMfa(req: Request, res: Response): Promise<void> {
  try {
    const { mfaToken, code } = (req.body || {}) as {
      mfaToken?: string;
      code?: string;
    };

    if (!mfaToken || !code) {
      res.status(400).json({
        success: false,
        message: "MFA challenge token and verification code are required",
      });
      return;
    }

    // Single-use check for MFA challenge token replay prevention
    const tokenHash = hashToken(mfaToken);
    const isRevoked = await prisma.revokedToken.findUnique({
      where: { tokenHash },
    });
    if (isRevoked) {
      res.status(401).json({
        success: false,
        message: "MFA challenge token has already been used",
      });
      return;
    }

    const { userId, scope } = verifyMfaToken(mfaToken);

    if (scope !== "mfa_pending" && scope !== "mfa_setup") {
      res.status(403).json({
        success: false,
        message: "Invalid token scope for MFA verification",
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        adminMfa: {
          include: { backupCodes: true },
        },
      },
    });

    if (!user || user.role !== "ADMIN") {
      res.status(403).json({
        success: false,
        message: "Only Admin accounts can perform MFA verification",
      });
      return;
    }

    const adminMfa = user.adminMfa;
    if (!adminMfa || !adminMfa.mfaSecret) {
      res.status(400).json({
        success: false,
        message: "MFA is not set up for this Admin account",
      });
      return;
    }

    const plainSecret = decryptMfaSecret(adminMfa.mfaSecret);
    const normalizedCode = code.trim();

    let isValid = false;
    let usedBackupCodeId: string | null = null;

    // 1. Try 6-digit TOTP verification
    if (/^\d{6}$/.test(normalizedCode)) {
      isValid = verifyTotp(plainSecret, normalizedCode);
    }

    // 2. Try 8-character Backup Code verification if TOTP failed
    if (!isValid && adminMfa.backupCodes && adminMfa.backupCodes.length > 0) {
      for (const backupCode of adminMfa.backupCodes) {
        if (!backupCode.usedAt) {
          const match = await compareBackupCode(normalizedCode, backupCode.codeHash);
          if (match) {
            isValid = true;
            usedBackupCodeId = backupCode.id;
            break;
          }
        }
      }
    }

    if (!isValid) {
      res.status(400).json({
        success: false,
        message: "Invalid MFA verification code",
      });
      return;
    }

    // Immediately revoke challenge token to prevent replay
    await prisma.revokedToken.create({
      data: {
        tokenHash,
        userId: user.id,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min expiry match
      },
    });

    // If a backup code was used, mark it as consumed
    if (usedBackupCodeId) {
      await prisma.adminMfaBackupCode.update({
        where: { id: usedBackupCodeId },
        data: { usedAt: new Date() },
      });
    }

    // First-Time Setup Verification Completion
    let rawBackupCodes: string[] = [];
    if (!adminMfa.mfaEnabled) {
      rawBackupCodes = generateBackupCodes(8);
      
      // Delete previous backup codes if any exist
      await prisma.adminMfaBackupCode.deleteMany({
        where: { adminMfaId: adminMfa.id },
      });

      // Save hashed backup codes
      for (const rawCode of rawBackupCodes) {
        const codeHash = await hashBackupCode(rawCode);
        await prisma.adminMfaBackupCode.create({
          data: {
            adminMfaId: adminMfa.id,
            codeHash,
          },
        });
      }

      await prisma.adminMfa.update({
        where: { id: adminMfa.id },
        data: {
          mfaEnabled: true,
          mfaEnrolledAt: new Date(),
        },
      });
    }

    // Issue Full Admin JWT Token with current tokenVersion
    const fullAdminToken = generateToken(user.id, "ADMIN", user.tokenVersion);

    // Trigger in-app login notification safely
    void notifyLogin({ userId: user.id });

    res.status(200).json({
      success: true,
      message: "Admin MFA verification successful",
      token: fullAdminToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      ...(rawBackupCodes.length > 0 ? { backupCodes: rawBackupCodes } : {}),
    });
  } catch (error) {
    console.error("MFA verification error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid or expired MFA challenge token",
    });
  }
}

// ==========================================
// GET ME (AUTHENTICATED USER)
// Protected Route
// ==========================================

export async function getMe(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        artistProfile: true,
        brandProfile: true,
      },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get me error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user data",
    });
  }
}

// ==========================================
// SERVER-SIDE LOGOUT
// Protected Route
// ==========================================

export async function logout(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.user || !req.user.token) {
      res.status(200).json({
        success: true,
        message: "Logout successful",
      });
      return;
    }

    const token = req.user.token;
    const tokenHash = hashToken(token);

    // Upsert into RevokedToken table with 7-day expiration match
    await prisma.revokedToken.upsert({
      where: { tokenHash },
      update: {},
      create: {
        tokenHash,
        userId: req.user.userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process logout",
    });
  }
}

// ==========================================
// FORGOT PASSWORD
// Public Route (Rate Limited)
// ==========================================

export async function forgotPassword(req: Request, res: Response): Promise<void> {
  try {
    const { email } = req.body as { email?: string };

    if (!email || typeof email !== "string") {
      res.status(400).json({
        success: false,
        message: "Email is required",
      });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Account enumeration protection: Look up user, but respond identically whether found or not
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (user) {
      // Cryptographically random 32-byte (64 hex characters) single-use token
      const rawToken = crypto.randomBytes(32).toString("hex");

      // Store only SHA-256 hash in database
      const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

      // -----------------------------------------------------------------
      // RESET TOKEN EXPIRY POLICY DOCUMENTATION:
      // - 15-minute token (Date.now() + 15 * 60 * 1000): Normal self-service
      //   forgot-password flow. Short-lived to minimize security exposure window
      //   in case an email sits unread in an inbox.
      // - 24-hour token (Date.now() + 24 * 60 * 60 * 1000): Used exclusively
      //   for one-time mandatory security remediation of previously compromised
      //   legacy accounts so affected users across time zones have sufficient
      //   time to act on the security notification.
      // This difference is intentional and strictly partitioned.
      // -----------------------------------------------------------------
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

      await prisma.user.update({
        where: { id: user.id },
        data: {
          passwordResetToken: hashedToken,
          passwordResetExpires: expiresAt,
        },
      });

      // Send password reset email with unhashed token
      // Raw token is NEVER logged and NEVER returned in API responses
      void sendPasswordResetEmail({
        to: user.email,
        resetToken: rawToken,
        expiresMinutes: 15,
      }).catch((err) => {
        console.error("Failed to send password reset email:", err);
      });
    }

    res.status(200).json({
      success: true,
      message: "If an account with that email exists, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process forgot password request",
    });
  }
}

// ==========================================
// RESET PASSWORD
// Public Route (Rate Limited)
// ==========================================

export async function resetPassword(req: Request, res: Response): Promise<void> {
  try {
    const { token, newPassword } = req.body as {
      token?: string;
      newPassword?: string;
    };

    if (!token || typeof token !== "string" || !newPassword || typeof newPassword !== "string") {
      res.status(400).json({
        success: false,
        message: "Token and new password are required",
      });
      return;
    }

    if (newPassword.length < 8) {
      res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
      return;
    }

    // Explicit rejection of known vulnerable / default passwords
    if (newPassword === "ArtistPassword@123" || newPassword === "BrandPassword@123") {
      res.status(400).json({
        success: false,
        message: "This password cannot be used for security reasons. Please choose a strong, unique password.",
      });
      return;
    }

    // Hash the incoming token using SHA-256 to compare against the stored hash
    const hashedToken = crypto.createHash("sha256").update(token.trim()).digest("hex");

    // Query for user with matching unexpired token
    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: hashedToken,
        passwordResetExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "Invalid or expired password reset token",
      });
      return;
    }

    // Bcrypt hash the new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password, clear token & expiry, clear mandatory reset flag, increment tokenVersion to revoke all existing JWTs
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
        passwordResetRequired: false,
        tokenVersion: {
          increment: 1,
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Password has been successfully reset. You can now log in with your new password.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to reset password",
    });
  }
}

