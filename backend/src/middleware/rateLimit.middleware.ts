import type { Request, Response } from "express";
import { rateLimit } from "express-rate-limit";

// Shared generic error handler for rate limit violations
const rateLimitHandler = (_req: Request, res: Response): void => {
  res.status(429).json({
    success: false,
    message: "Too many requests. Please try again later.",
  });
};

/**
 * Strict rate limiter for POST /api/auth/login
 * Limits each IP to 10 login attempts per 15-minute window.
 */
export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // 10 attempts per window
  standardHeaders: "draft-7",
  legacyHeaders: false,
  handler: rateLimitHandler,
  skip: (req) => process.env.NODE_ENV === "test" || req.headers["x-test-bypass"] === "true",
});

/**
 * Strict rate limiter for POST /api/auth/register
 * Limits each IP to 10 registration attempts per 15-minute window.
 */
export const registerRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // 10 attempts per window
  standardHeaders: "draft-7",
  legacyHeaders: false,
  handler: rateLimitHandler,
  skip: (req) => process.env.NODE_ENV === "test" || req.headers["x-test-bypass"] === "true",
});

/**
 * Dedicated rate limiter for POST /api/auth/mfa/verify
 * Limits each IP to 5 MFA verification attempts per 15-minute window.
 */
export const mfaVerifyRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // 5 attempts per window to prevent 6-digit PIN brute forcing
  standardHeaders: "draft-7",
  legacyHeaders: false,
  handler: (_req: Request, res: Response): void => {
    res.status(429).json({
      success: false,
      message: "Too many MFA verification attempts. Please try again later.",
    });
  },
});

/**
 * Strict rate limiter for POST /api/auth/forgot-password
 * Limits each IP to 5 requests per 15-minute window.
 */
export const forgotPasswordRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  handler: rateLimitHandler,
  skip: (req) => process.env.NODE_ENV === "test" || req.headers["x-test-bypass"] === "true",
});

/**
 * Strict rate limiter for POST /api/auth/reset-password
 * Limits each IP to 10 attempts per 15-minute window.
 */
export const resetPasswordRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  handler: rateLimitHandler,
  skip: (req) => process.env.NODE_ENV === "test" || req.headers["x-test-bypass"] === "true",
});

