import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/admin.middleware.js";

import {
  getPendingArtists,
  getApprovedArtists,
  getRejectedArtists,
  getArtistForReview,
  approveArtist,
  rejectArtist,
  getPendingCastingCalls,
  approveCastingCall,
  rejectCastingCall,
  getPendingBrands,
  approveBrand,
  rejectBrand,
  getAdminStats,
  getAdminPayments,
} from "../controllers/admin.controller.js";

const router = Router();

// Authentication + Admin authorization
router.use(authenticate);
router.use(requireAdmin);

// ==========================================
// PLATFORM STATISTICS & PAYMENTS
// ==========================================

router.get("/stats", getAdminStats);

router.get("/payments", getAdminPayments);

// ==========================================
// ARTIST VERIFICATION
// ==========================================

router.get("/artists/pending", getPendingArtists);

router.get("/artists/approved", getApprovedArtists);

router.get("/artists/rejected", getRejectedArtists);

router.get("/artists/:id", getArtistForReview);

router.patch("/artists/:id/approve", approveArtist);

router.patch("/artists/:id/reject", rejectArtist);

// ==========================================
// BRAND VERIFICATION
// ==========================================

router.get("/brands/pending", getPendingBrands);

router.patch("/brands/:id/approve", approveBrand);

router.patch("/brands/:id/reject", rejectBrand);

// ==========================================
// CASTING CALL MODERATION
// ==========================================

router.get("/casting/pending", getPendingCastingCalls);

router.patch("/casting/:id/approve", approveCastingCall);

router.patch("/casting/:id/reject", rejectCastingCall);

export default router;
