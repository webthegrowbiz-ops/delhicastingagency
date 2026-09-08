import { Router } from "express";
import {
  submitApplication,
  getArtistApplications,
  getCastingCallApplicants,
  updateApplicationStatus,
} from "../controllers/application.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

// Protect all application routes with JWT authentication
router.use(authenticate);

// 1. POST /api/applications (Artist submits application)
router.post("/", submitApplication);

// 2. GET /api/artist/applications (Artist lists my applications)
router.get("/artist", getArtistApplications);

// 3. GET /api/brand/casting/:id/applications (Brand/Admin views applicants for a casting call)
router.get("/casting/:id", getCastingCallApplicants);

// 4. PATCH /api/brand/applications/:id/status (Brand/Admin updates applicant status)
router.patch("/:id/status", updateApplicationStatus);

export default router;
