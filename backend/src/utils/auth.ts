import "dotenv/config";

import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";

const JWT_SECRET: string = process.env.JWT_SECRET ?? "";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not configured");
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Computes SHA-256 hash of a JWT token for revocation lookup
 */
export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export interface DecodedTokenPayload {
  userId: string;
  role: string;
  tokenVersion: number;
  jti?: string | undefined;
  exp?: number | undefined;
}

/**
 * Generates a full authentication JWT with userId, role, tokenVersion, and unique JTI
 */
export function generateToken(userId: string, role: string, tokenVersion = 0): string {
  const jti = crypto.randomUUID();
  return jwt.sign(
    {
      userId,
      role,
      tokenVersion,
      jti,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
}

/**
 * Cryptographically verifies and parses a full authentication JWT
 */
export function verifyToken(token: string): DecodedTokenPayload {
  const decoded: string | jwt.JwtPayload = jwt.verify(token, JWT_SECRET);

  if (typeof decoded === "string" || !decoded.userId || !decoded.role) {
    throw new Error("Invalid token payload");
  }

  return {
    userId: decoded.userId as string,
    role: decoded.role as string,
    tokenVersion: typeof decoded.tokenVersion === "number" ? decoded.tokenVersion : 0,
    jti: typeof decoded.jti === "string" ? decoded.jti : undefined,
    exp: typeof decoded.exp === "number" ? decoded.exp : undefined,
  };
}

/**
 * Generates a short-lived 5-minute MFA challenge token for Admin MFA verification
 */
export function generateMfaToken(userId: string, scope: "mfa_setup" | "mfa_pending"): string {
  return jwt.sign(
    {
      userId,
      scope,
      role: "ADMIN_MFA_CHALLENGE",
    },
    JWT_SECRET,
    {
      expiresIn: "5m", // 5 minute validity
    },
  );
}

/**
 * Cryptographically verifies an MFA challenge token and checks payload binding
 */
export function verifyMfaToken(token: string): {
  userId: string;
  scope: string;
} {
  const decoded: string | jwt.JwtPayload = jwt.verify(token, JWT_SECRET);

  if (
    typeof decoded === "string" ||
    !decoded.userId ||
    !decoded.scope ||
    decoded.role !== "ADMIN_MFA_CHALLENGE"
  ) {
    throw new Error("Invalid MFA challenge token payload");
  }

  return {
    userId: decoded.userId as string,
    scope: decoded.scope as string,
  };
}

/**
 * Purges expired tokens from RevokedToken table
 */
export async function cleanupExpiredRevokedTokens(): Promise<number> {
  const result = await prisma.revokedToken.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });
  return result.count;
}
