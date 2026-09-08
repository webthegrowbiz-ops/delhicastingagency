import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  getMyEntitlement,
  initiatePayuPayment,
  handlePayuResponse,
  handlePayuWebhook,
} from "../controllers/payment.controller.js";

const router = Router();

// ==========================================
// 1. PUBLIC PAYU WEBHOOK / CALLBACK ENDPOINTS
// ==========================================

// POST /api/payments/payu/response (Public PayU hosted checkout callback handler)
router.post("/payu/response", handlePayuResponse);

// POST /api/payments/payu/webhook (Public PayU server-to-server IPN webhook listener)
router.post("/payu/webhook", handlePayuWebhook);

// ==========================================
// 2. AUTHENTICATED USER ENDPOINTS
// ==========================================
router.use(authenticate);

// POST /api/payments/payu/initiate (Initiate PayU payment & create PENDING record in DB)
router.post("/payu/initiate", initiatePayuPayment);

// GET /api/payments/my-entitlement (Get user's active entitlement status)
router.get("/my-entitlement", getMyEntitlement);

export default router;
