import { Router } from "express";

import {
  forgotPassword,
  getMe,
  login,
  logout,
  register,
  resetPassword,
  setupMfa,
  verifyMfa,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  forgotPasswordRateLimiter,
  loginRateLimiter,
  mfaVerifyRateLimiter,
  registerRateLimiter,
  resetPasswordRateLimiter,
} from "../middleware/rateLimit.middleware.js";

const router = Router();

// Public routes with rate limiting
router.post("/register", registerRateLimiter, register);
router.post("/login", loginRateLimiter, login);
router.post("/forgot-password", forgotPasswordRateLimiter, forgotPassword);
router.post("/reset-password", resetPasswordRateLimiter, resetPassword);

// Admin MFA Challenge routes
router.post("/mfa/setup", setupMfa);
router.post("/mfa/verify", mfaVerifyRateLimiter, verifyMfa);

// Protected routes
router.post("/logout", authenticate, logout);
router.get("/me", authenticate, getMe);

export default router;

