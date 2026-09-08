import type { Request, Response, NextFunction } from "express";
import { hashToken, verifyToken } from "../utils/auth.js";
import { prisma } from "../config/prisma.js";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
    token?: string;
  };
}

export async function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Authentication token required",
      });
      return;
    }

    const token = authHeader.substring(7);

    // 1. Cryptographically verify JWT signature & expiration
    const decoded = verifyToken(token);

    // 2. Query User tokenVersion from DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, role: true, tokenVersion: true },
    });

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
      return;
    }

    // 3. Verify Token Version match (Global revocation check)
    const tokenVerInJwt = decoded.tokenVersion ?? 0;
    if (user.tokenVersion !== tokenVerInJwt) {
      res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
      return;
    }

    // 4. Check Single-Device Revoked Token Blacklist
    const tokenHash = hashToken(token);
    const isRevoked = await prisma.revokedToken.findUnique({
      where: { tokenHash },
    });

    if (isRevoked) {
      res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
      return;
    }

    // Attach decoded token role (preserves "ADMIN_MFA_CHALLENGE" scope for temporary MFA tokens)
    req.user = {
      userId: user.id,
      role: decoded.role,
      token,
    };

    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}
