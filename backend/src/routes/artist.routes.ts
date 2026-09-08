import { Router } from "express";

import {
  createArtistProfile,
  getArtistProfile,
  updateArtistProfile,
  uploadArtistPhotos,
} from "../controllers/artist.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { uploadMiddleware } from "../middleware/upload.middleware.js";

const router = Router();

// Create artist profile
router.post("/profile", authenticate, createArtistProfile);

// Get logged-in artist profile
router.get("/profile", authenticate, getArtistProfile);

// Update artist profile
router.put(
  "/profile",
  authenticate,
  updateArtistProfile,
);

// Upload artist photos (frontPhoto, headshots, etc.)
router.post(
  "/upload",
  authenticate,
  (req, res, next) => {
    uploadMiddleware.any()(req, res, (err: unknown) => {
      if (err) {
        const errorObj = err as { code?: string; message?: string };
        if (errorObj.code === "LIMIT_FILE_SIZE") {
          res.status(413).json({
            success: false,
            message: "Image exceeds maximum allowed size of 5MB.",
          });
          return;
        }
        res.status(400).json({
          success: false,
          message: errorObj.message || "Please upload a valid JPG, PNG, or WebP image.",
        });
        return;
      }
      next();
    });
  },
  uploadArtistPhotos,
);

export default router;
