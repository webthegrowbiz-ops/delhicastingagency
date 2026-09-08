import { Router } from "express";
import {
  createCastingCall,
  getPublicCastingCalls,
  getPublicCastingCallById,
  getBrandCastingCalls,
  updateCastingCall,
  deleteCastingCall,
} from "../controllers/casting.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

// Public: Get all approved casting calls (supports ?category= &location= &gender= &search=)
router.get("/", getPublicCastingCalls);

// Protected (BRAND only): Get logged-in brand's own casting calls
router.get("/brand/my-calls", authenticate, getBrandCastingCalls);

// Public: Get single approved casting call by ID
router.get("/:id", getPublicCastingCallById);

// Protected (BRAND only): Create a new casting call (starts as PENDING_REVIEW)
router.post("/", authenticate, createCastingCall);

// Protected (BRAND only): Update owned casting call
router.put("/:id", authenticate, updateCastingCall);

// Protected (BRAND / ADMIN): Delete/close casting call
router.delete("/:id", authenticate, deleteCastingCall);

export default router;
