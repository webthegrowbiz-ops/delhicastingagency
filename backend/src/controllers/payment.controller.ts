import type { Response, Request } from "express";
import crypto from "node:crypto";
import { PaymentPlan } from "@prisma/client";
import type { PremiumEntitlement } from "@prisma/client";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { prisma } from "../config/prisma.js";
import {
  createNotification,
  notifyPaymentSuccess,
  notifyPaymentFailure,
  checkAndNotifyPremiumExpiry,
} from "../services/notification.service.js";
import {
  generatePayuRequestHash,
  verifyPayuResponseHash,
  getPayuActionUrl,
  getPayuKey,
  getPayuMode,
  getPayuSalt,
} from "../utils/payu.js";

// Constant-time string comparison to prevent timing attacks
function timingSafeCompare(a: string, b: string): boolean {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const bufA = Buffer.from(a, "utf-8");
  const bufB = Buffer.from(b, "utf-8");
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

// Helper: Activate 90-day entitlement & trigger notification idempotently
async function activateUserEntitlement(
  userId: string,
  paymentId: string,
  plan: PaymentPlan,
  amount: number,
  customerEmail?: string | undefined,
): Promise<{ entitlement: PremiumEntitlement; notificationSent: boolean }> {
  const startedAt = new Date();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 90);

  // Check if entitlement already exists with this payment ID (Idempotency)
  const existingEntitlement = await prisma.premiumEntitlement.findUnique({
    where: { userId },
  });

  const isAlreadyLinked = existingEntitlement?.paymentId === paymentId;

  const entitlement = await prisma.premiumEntitlement.upsert({
    where: { userId },
    update: {
      plan,
      amount,
      duration: "3_months",
      startedAt,
      expiresAt,
      paymentId,
    },
    create: {
      userId,
      plan,
      amount,
      duration: "3_months",
      startedAt,
      expiresAt,
      paymentId,
    },
  });

  let notificationSent = false;
  if (!isAlreadyLinked) {
    await notifyPaymentSuccess({
      userId,
      entitlementId: entitlement.id,
      plan,
      amount,
      paymentId,
      startedAt,
      expiresAt,
      customerEmail,
    });
    notificationSent = true;
  }

  return { entitlement, notificationSent };
}

// ==========================================
// 1. GET /api/payments/my-entitlement (Get user's active entitlement status)
// ==========================================

export async function getMyEntitlement(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication token required",
      });
      return;
    }

    const entitlement = await prisma.premiumEntitlement.findUnique({
      where: {
        userId: req.user.userId,
      },
    });

    if (!entitlement) {
      res.status(200).json({
        success: true,
        isPremium: false,
        entitlement: null,
      });
      return;
    }

    const now = new Date();
    const isExpired = entitlement.expiresAt < now;
    const isPremium = !isExpired;

    // Trigger background check for 7-day, 1-day, and expired entitlement notifications safely
    void checkAndNotifyPremiumExpiry(req.user.userId);

    res.status(200).json({
      success: true,
      isPremium,
      entitlement: {
        ...entitlement,
        isExpired,
      },
    });
  } catch (error) {
    console.error("Get entitlement error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch entitlement status",
    });
  }
}

// ==========================================
// 5. POST /api/payments/payu/initiate (Initiate PayU payment & create PENDING record in DB)
// ==========================================

export async function initiatePayuPayment(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication token required",
      });
      return;
    }

    const { plan } = (req.body || {}) as { plan?: string };

    if (!plan || typeof plan !== "string") {
      res.status(400).json({
        success: false,
        message: "Plan type is required (ARTIST_PREMIUM or BRAND_PREMIUM)",
      });
      return;
    }

    const upperPlan = plan.trim().toUpperCase();

    if (upperPlan !== "ARTIST_PREMIUM" && upperPlan !== "BRAND_PREMIUM") {
      res.status(400).json({
        success: false,
        message: "Invalid plan. Allowed plans: ARTIST_PREMIUM, BRAND_PREMIUM",
      });
      return;
    }

    const targetPlan = upperPlan as PaymentPlan;

    // Enforce server-side pricing: Artist Premium = 1999, Brand Premium = 9999
    const amount = targetPlan === "ARTIST_PREMIUM" ? 1999 : 9999;
    const currency = "INR";

    // Load authenticated user and profile details for PayU form
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: {
        artistProfile: { select: { fullName: true, phone: true } },
        brandProfile: { select: { companyName: true, contactName: true, phone: true } },
      },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "Authenticated user not found",
      });
      return;
    }

    let rawName = "Member";
    let rawPhone = "9999999999";

    if (targetPlan === "ARTIST_PREMIUM" && user.artistProfile?.fullName) {
      rawName = user.artistProfile.fullName;
      if (user.artistProfile.phone) rawPhone = user.artistProfile.phone;
    } else if (targetPlan === "BRAND_PREMIUM" && user.brandProfile) {
      const bName = user.brandProfile.contactName || user.brandProfile.companyName;
      if (bName) rawName = bName;
      if (user.brandProfile.phone) rawPhone = user.brandProfile.phone;
    }

    const firstWord = rawName.trim().split(" ")[0] || "Member";
    const firstname = firstWord.replace(/[^a-zA-Z0-9]/g, "") || "Member";
    const email = user.email.trim();
    const cleanPhoneDigits = rawPhone.replace(/\D/g, "");
    const phone = cleanPhoneDigits.length >= 10 ? cleanPhoneDigits.slice(-10) : "9999999999";

    const payuKey = getPayuKey();
    const payuSalt = getPayuSalt();

    if (!payuKey || !payuSalt) {
      res.status(500).json({
        success: false,
        message: "PayU payment gateway is not configured on server",
      });
      return;
    }

    const payuTxnId = `txnid_dca_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const productinfo = targetPlan;
    const formattedAmount = (targetPlan === "ARTIST_PREMIUM" ? 1999 : 9999).toFixed(2);

    const backendUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5000}`;
    const surl = `${backendUrl}/api/payments/payu/response`;
    const furl = `${backendUrl}/api/payments/payu/response`;

    // Create Payment Record (status: PENDING, gateway: PAYU)
    const payment = await prisma.payment.create({
      data: {
        userId: req.user.userId,
        amount,
        currency,
        plan: targetPlan,
        status: "PENDING",
        gateway: "PAYU",
        payuTxnId,
        payuMode: getPayuMode(),
      },
    });

    // Canonical PayU request payload object - single source of truth for both hash and form submission
    const canonicalPayuRequest = {
      key: payuKey,
      txnid: payuTxnId,
      amount: formattedAmount,
      productinfo,
      firstname,
      email,
      phone,
      surl,
      furl,
      udf1: payment.id,
      udf2: "",
      udf3: "",
      udf4: "",
      udf5: "",
    };

    // Generate SHA-512 Request Hash using the exact canonical values (Salt is NEVER returned in response or logged)
    const hash = generatePayuRequestHash({
      key: canonicalPayuRequest.key,
      salt: payuSalt,
      txnid: canonicalPayuRequest.txnid,
      amount: canonicalPayuRequest.amount,
      productinfo: canonicalPayuRequest.productinfo,
      firstname: canonicalPayuRequest.firstname,
      email: canonicalPayuRequest.email,
      udf1: canonicalPayuRequest.udf1,
      udf2: canonicalPayuRequest.udf2,
      udf3: canonicalPayuRequest.udf3,
      udf4: canonicalPayuRequest.udf4,
      udf5: canonicalPayuRequest.udf5,
    });

    res.status(201).json({
      success: true,
      message: "PayU payment order initiated successfully",
      action: getPayuActionUrl(),
      payment: {
        ...canonicalPayuRequest,
        hash,
      },
    });
  } catch (error) {
    console.error("Initiate PayU payment error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to initiate PayU payment",
    });
  }
}

// ==========================================
// 6. POST /api/payments/payu/response (PayU Callback/Response Verification Endpoint)
// ==========================================

export async function handlePayuResponse(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const {
      status,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      hash,
      mihpayid,
      payuMoneyId,
      mode,
      udf1,
      udf2,
      udf3,
      udf4,
      udf5,
    } = (req.body || {}) as {
      status?: string;
      txnid?: string;
      amount?: string | number;
      productinfo?: string;
      firstname?: string;
      email?: string;
      hash?: string;
      mihpayid?: string;
      payuMoneyId?: string;
      mode?: string;
      udf1?: string;
      udf2?: string;
      udf3?: string;
      udf4?: string;
      udf5?: string;
    };

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const successRedirectUrl = `${frontendUrl}/payment/success`;
    const failureRedirectUrl = `${frontendUrl}/payment/failed`;

    const sendResponse = (isSuccess: boolean, httpStatus: number, msg: string, redirectTarget: string) => {
      const acceptsJson = req.headers.accept?.includes("application/json") || req.headers["content-type"]?.includes("application/json");
      if (acceptsJson) {
        res.status(httpStatus).json({
          success: isSuccess,
          message: msg,
          txnid,
          status,
        });
      } else {
        res.redirect(redirectTarget);
      }
    };

    // Safe diagnostic for local testing (Never logs secret values or credentials)
    if (process.env.NODE_ENV !== "production") {
      const receivedKeys = Object.keys(req.body || {});
      console.log(
        `[PayU Response Callback Diagnostic] Method: ${req.method}, Content-Type: ${req.headers["content-type"] || "unknown"}, Received Field Count: ${receivedKeys.length}, Keys: [${receivedKeys.join(", ")}], Has txnid: ${Boolean(txnid)}, Has hash: ${Boolean(hash)}, Has status: ${Boolean(status)}`
      );
    }

    // Required Input Validation
    if (!txnid || !hash || !status) {
      res.status(400).json({
        success: false,
        message: "Missing required PayU payment verification fields (txnid, hash, status)",
      });
      return;
    }

    const payuKey = getPayuKey();
    const payuSalt = getPayuSalt();

    if (!payuKey || !payuSalt) {
      res.status(500).json({
        success: false,
        message: "PayU gateway credentials missing on server",
      });
      return;
    }

    // Cryptographic SHA-512 Reverse Hash Verification (BEFORE marking PAID or activating entitlement)
    const isHashValid = verifyPayuResponseHash({
      key: payuKey,
      salt: payuSalt,
      txnid: txnid.trim(),
      amount: amount || "",
      productinfo: productinfo || "",
      firstname: firstname || "",
      email: email || "",
      status: status.trim(),
      hash: hash.trim(),
      udf1: udf1 || "",
      udf2: udf2 || "",
      udf3: udf3 || "",
      udf4: udf4 || "",
      udf5: udf5 || "",
    });

    if (!isHashValid) {
      console.error(`Security Alert: PayU payment response hash verification failed for txnid: ${txnid.trim()}`);
      res.status(400).json({
        success: false,
        message: "Invalid cryptographic PayU payment response signature",
      });
      return;
    }

    // Find Matching Payment Record in DB
    const payment = await prisma.payment.findFirst({
      where: {
        gateway: "PAYU",
        OR: [
          { payuTxnId: txnid.trim() },
          ...(udf1 && udf1.trim() ? [{ id: udf1.trim() }] : []),
        ],
      },
    });

    if (!payment) {
      res.status(404).json({
        success: false,
        message: "Matching PayU payment record not found in database",
      });
      return;
    }

    // Database Field Validation
    // A. Verify txnid
    if (payment.payuTxnId !== txnid.trim()) {
      res.status(400).json({
        success: false,
        message: "Transaction ID mismatch between request and database",
      });
      return;
    }

    // B. Verify Amount
    const numericAmount = typeof amount === "number" ? amount : parseFloat(amount || "0");
    if (payment.amount !== Math.round(numericAmount)) {
      res.status(400).json({
        success: false,
        message: `Payment amount mismatch. Expected ₹${payment.amount}, received ₹${numericAmount}`,
      });
      return;
    }

    // C. Enforce Server Plan Price
    const expectedPlanAmount = payment.plan === "ARTIST_PREMIUM" ? 1999 : 9999;
    if (payment.amount !== expectedPlanAmount) {
      res.status(400).json({
        success: false,
        message: `Invalid plan price in database record. Expected ₹${expectedPlanAmount}`,
      });
      return;
    }

    const payuPaymentId = mihpayid || payuMoneyId || payment.payuPaymentId || `payu_${txnid.trim()}`;

    // Idempotency: If Payment is already PAID
    if (payment.status === "PAID") {
      await activateUserEntitlement(
        payment.userId,
        payment.id,
        payment.plan,
        payment.amount,
        email,
      );

      sendResponse(
        true,
        200,
        "Payment verified successfully (Idempotent)",
        `${successRedirectUrl}?txnId=${encodeURIComponent(txnid.trim())}&status=paid&plan=${encodeURIComponent(payment.plan)}`
      );
      return;
    }

    // Process Verified Success Payment
    if (status.trim().toLowerCase() === "success") {
      const updatedPayment = await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: "PAID",
          paidAt: new Date(),
          payuPaymentId,
          payuMode: mode || payment.payuMode || getPayuMode(),
          payuStatus: status.trim(),
        },
      });

      // Activate 90-Day Entitlement & Trigger Notification Idempotently
      await activateUserEntitlement(
        updatedPayment.userId,
        updatedPayment.id,
        updatedPayment.plan,
        updatedPayment.amount,
        email,
      );

      sendResponse(
        true,
        200,
        "Payment verified and 3-month Premium entitlement activated",
        `${successRedirectUrl}?txnId=${encodeURIComponent(txnid.trim())}&status=success&plan=${encodeURIComponent(payment.plan)}`
      );
      return;
    }

    // Process Verified Failure Payment
    if (payment.status === "PENDING") {
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: "FAILED",
          payuStatus: status.trim(),
        },
      });

      await notifyPaymentFailure({
        userId: payment.userId,
        paymentId: payment.id,
        plan: payment.plan,
        amount: payment.amount,
        reason: status.trim(),
      });
    }

    sendResponse(
      false,
      200,
      "Payment transaction failed on gateway",
      `${failureRedirectUrl}?txnId=${encodeURIComponent(txnid.trim())}&status=failed`
    );
  } catch (error) {
    console.error("Handle PayU response error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process PayU payment response",
    });
  }
}

// ==========================================
// 7. POST /api/payments/payu/webhook (PayU Server-to-Server Webhook / IPN Listener)
// ==========================================

export async function handlePayuWebhook(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const {
      status,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      hash,
      mihpayid,
      payuMoneyId,
      mode,
      udf1,
      udf2,
      udf3,
      udf4,
      udf5,
    } = (req.body || {}) as {
      status?: string;
      txnid?: string;
      amount?: string | number;
      productinfo?: string;
      firstname?: string;
      email?: string;
      hash?: string;
      mihpayid?: string;
      payuMoneyId?: string;
      mode?: string;
      udf1?: string;
      udf2?: string;
      udf3?: string;
      udf4?: string;
      udf5?: string;
    };

    // Required Input Validation
    if (!txnid || !hash || !status) {
      res.status(400).json({
        success: false,
        message: "Missing required PayU webhook verification fields (txnid, hash, status)",
      });
      return;
    }

    const payuKey = getPayuKey();
    const payuSalt = getPayuSalt();

    if (!payuKey || !payuSalt) {
      res.status(500).json({
        success: false,
        message: "PayU gateway credentials missing on server",
      });
      return;
    }

    // Authenticity Verification via SHA-512 Reverse Hash
    const isHashValid = verifyPayuResponseHash({
      key: payuKey,
      salt: payuSalt,
      txnid: txnid.trim(),
      amount: amount || "",
      productinfo: productinfo || "",
      firstname: firstname || "",
      email: email || "",
      status: status.trim(),
      hash: hash.trim(),
      udf1: udf1 || "",
      udf2: udf2 || "",
      udf3: udf3 || "",
      udf4: udf4 || "",
      udf5: udf5 || "",
    });

    if (!isHashValid) {
      console.error(`Security Alert: PayU webhook signature verification failed for txnid: ${txnid.trim()}`);
      res.status(400).json({
        success: false,
        message: "Invalid PayU webhook signature",
      });
      return;
    }

    // Find Matching Payment Record
    const payment = await prisma.payment.findFirst({
      where: {
        gateway: "PAYU",
        OR: [
          { payuTxnId: txnid.trim() },
          ...(udf1 && udf1.trim() ? [{ id: udf1.trim() }] : []),
        ],
      },
    });

    if (!payment) {
      res.status(404).json({
        success: false,
        message: "Matching PayU payment record not found in database",
      });
      return;
    }

    // Database Field Validation
    if (payment.payuTxnId !== txnid.trim()) {
      res.status(400).json({
        success: false,
        message: "Transaction ID mismatch between webhook request and database",
      });
      return;
    }

    const numericAmount = typeof amount === "number" ? amount : parseFloat(amount || "0");
    if (payment.amount !== Math.round(numericAmount)) {
      res.status(400).json({
        success: false,
        message: `Payment amount mismatch. Expected ₹${payment.amount}, received ₹${numericAmount}`,
      });
      return;
    }

    const expectedPlanAmount = payment.plan === "ARTIST_PREMIUM" ? 1999 : 9999;
    if (payment.amount !== expectedPlanAmount) {
      res.status(400).json({
        success: false,
        message: `Invalid plan price in database record. Expected ₹${expectedPlanAmount}`,
      });
      return;
    }

    const payuPaymentId = mihpayid || payuMoneyId || payment.payuPaymentId || `payu_${txnid.trim()}`;

    // Idempotency: If already PAID
    if (payment.status === "PAID") {
      await activateUserEntitlement(
        payment.userId,
        payment.id,
        payment.plan,
        payment.amount,
      );

      res.status(200).json({
        success: true,
        message: "PayU webhook processed successfully (Idempotent)",
        txnid: txnid.trim(),
        status: "PAID",
      });
      return;
    }

    // Process Verified Success Webhook Event
    if (status.trim().toLowerCase() === "success") {
      const updatedCount = await prisma.payment.updateMany({
        where: {
          id: payment.id,
          status: { not: "PAID" },
        },
        data: {
          status: "PAID",
          paidAt: new Date(),
          payuPaymentId,
          payuMode: mode || payment.payuMode || getPayuMode(),
          payuStatus: status.trim(),
        },
      });

      if (updatedCount.count > 0 || (payment.status as string) === "PAID") {
        await activateUserEntitlement(
          payment.userId,
          payment.id,
          payment.plan,
          payment.amount,
          email,
        );
      }

      res.status(200).json({
        success: true,
        message: "PayU webhook verified and 3-month Premium entitlement activated",
        txnid: txnid.trim(),
        status: "PAID",
      });
      return;
    }

    // Process Verified Failure Webhook Event
    if (payment.status === "PENDING") {
      await prisma.payment.updateMany({
        where: {
          id: payment.id,
          status: "PENDING",
        },
        data: {
          status: "FAILED",
          payuStatus: status.trim(),
        },
      });

      await notifyPaymentFailure({
        userId: payment.userId,
        paymentId: payment.id,
        plan: payment.plan,
        amount: payment.amount,
        reason: status.trim(),
      });
    }

    res.status(200).json({
      success: true,
      message: "PayU webhook processed for non-success status",
      txnid: txnid.trim(),
      status: (payment.status as string) === "PAID" ? "PAID" : "FAILED",
    });
  } catch (error) {
    console.error("PayU webhook processing error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error processing PayU webhook",
    });
  }
}



