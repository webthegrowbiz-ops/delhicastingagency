import type { Response, NextFunction } from "express";
import type { AuthRequest } from "./auth.middleware.js";

export function requireAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    if (req.user.role !== "ADMIN") {
      res.status(403).json({
        success: false,
        message: "Admin access required",
      });
      return;
    }

    next();
  } catch (error) {
    console.error("Admin authorization error:", error);

    res.status(403).json({
      success: false,
      message: "Admin access denied",
    });
  }
}
