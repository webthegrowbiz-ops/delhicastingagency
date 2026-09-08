import { NotificationType } from "@prisma/client";
import { prisma } from "../config/prisma.js";
import {
  sendWelcomeEmail,
  sendPaymentSuccessEmail,
  sendPaymentFailedEmail,
  sendPremiumExpiringEmail,
  sendPremiumExpiredEmail,
  sendApplicationSubmittedEmail,
  sendApplicationStatusEmail,
  sendProfileModerationEmail,
  sendCastingModerationEmail,
  sendLoginAlertEmail,
} from "./email.service.js";

export interface CreateNotificationParams {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  entityType?: string | null | undefined;
  entityId?: string | null | undefined;
}

/**
 * Reusable service function to create a database notification for a user.
 * Wrapped in safe error handling so that notification failures never crash
 * primary business workflows.
 */
export async function createNotification(
  params: CreateNotificationParams,
) {
  try {
    if (!params.userId || !params.type || !params.title || !params.message) {
      console.warn("Invalid parameters provided for createNotification");
      return null;
    }

    const notification = await prisma.notification.create({
      data: {
        userId: params.userId,
        type: params.type,
        title: params.title.trim(),
        message: params.message.trim(),
        entityType: params.entityType ? params.entityType.trim() : null,
        entityId: params.entityId ? params.entityId.trim() : null,
      },
    });

    return notification;
  } catch (error) {
    console.error("Failed to create notification safely:", error);
    return null;
  }
}

/**
 * Helper to fetch user's display name and email safely.
 */
async function getUserContactInfo(userId: string): Promise<{ email: string; name: string } | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        artistProfile: { select: { fullName: true } },
        brandProfile: { select: { companyName: true, contactName: true } },
      },
    });

    if (!user || !user.email) return null;

    let name = "Member";
    if (user.artistProfile?.fullName) {
      name = user.artistProfile.fullName;
    } else if (user.brandProfile) {
      name = user.brandProfile.contactName || user.brandProfile.companyName || "Partner";
    }

    return { email: user.email, name };
  } catch {
    return null;
  }
}

// ============================================================
// 1. PAYMENT SUCCESS (In-App + Email) - Called only after Server-Side PayU Verification
// ============================================================
export async function notifyPaymentSuccess(params: {
  userId: string;
  entitlementId: string;
  plan: "ARTIST_PREMIUM" | "BRAND_PREMIUM";
  amount: number;
  paymentId: string;
  startedAt: Date;
  expiresAt: Date;
  customerEmail?: string | undefined;
}) {
  try {
    // 1. In-App Notification (Idempotent by paymentId)
    const existing = await prisma.notification.findFirst({
      where: {
        userId: params.userId,
        type: "PAYMENT_SUCCESSFUL",
        entityId: params.paymentId,
      },
    });

    if (!existing) {
      const planTitle = params.plan === "BRAND_PREMIUM" ? "Brand" : "Artist";
      const formattedDate = params.expiresAt.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      await createNotification({
        userId: params.userId,
        type: "PAYMENT_SUCCESSFUL",
        title: "Premium Membership Activated",
        message: `Your 3-month ${planTitle} Premium entitlement is active until ${formattedDate}.`,
        entityType: "PAYMENT",
        entityId: params.paymentId,
      });
    }

    // 2. ALWAYS Send Payment Success & Membership Activated Email Safely
    const contact = await getUserContactInfo(params.userId);
    const recipientEmail = contact?.email || params.customerEmail;
    const recipientName = contact?.name || "Member";

    if (recipientEmail) {
      console.log(`[Notification Service] Dispatching payment success email to ${recipientEmail}...`);
      await sendPaymentSuccessEmail({
        to: recipientEmail,
        name: recipientName,
        plan: params.plan,
        amount: params.amount,
        duration: "3 Months",
        paymentId: params.paymentId,
        startedAt: params.startedAt,
        expiresAt: params.expiresAt,
      }).catch((err) => console.error("Payment success email error:", err));
    }
  } catch (error) {
    console.error("notifyPaymentSuccess error:", error);
  }
}

// ============================================================
// 2. PAYMENT FAILURE (In-App + Email)
// ============================================================
export async function notifyPaymentFailure(params: {
  userId: string;
  paymentId: string;
  plan: string;
  amount: number;
  reason?: string | undefined;
}) {
  try {
    const existing = await prisma.notification.findFirst({
      where: {
        userId: params.userId,
        type: "PAYMENT_FAILED",
        entityId: params.paymentId,
      },
    });

    if (!existing) {
      await createNotification({
        userId: params.userId,
        type: "PAYMENT_FAILED",
        title: "Payment Failed",
        message: "Your Premium Membership payment could not be completed. Please try again.",
        entityType: "PAYMENT",
        entityId: params.paymentId,
      });

      const contact = await getUserContactInfo(params.userId);
      if (contact) {
        await sendPaymentFailedEmail({
          to: contact.email,
          name: contact.name,
          plan: params.plan,
          amount: params.amount,
          reason: params.reason,
        }).catch((err) => console.error("Payment failure email error:", err));
      }
    }
  } catch (error) {
    console.error("notifyPaymentFailure error:", error);
  }
}

// ============================================================
// 3. REGISTRATION WELCOME (In-App + Email)
// ============================================================
export async function notifyWelcome(params: {
  userId: string;
  email: string;
  role: string;
  name?: string | undefined;
}) {
  try {
    const existing = await prisma.notification.findFirst({
      where: {
        userId: params.userId,
        type: "WELCOME",
      },
    });

    if (!existing) {
      await createNotification({
        userId: params.userId,
        type: "WELCOME",
        title: "Welcome to Delhi Casting Agency",
        message: "Your account has been successfully created.",
        entityType: "USER",
        entityId: params.userId,
      });

      await sendWelcomeEmail({
        to: params.email,
        name: params.name,
        role: params.role,
      }).catch((err) => console.error("Welcome email error:", err));
    }
  } catch (error) {
    console.error("notifyWelcome error:", error);
  }
}

// ============================================================
// 4. LOGIN NOTIFICATION (In-App + Email Alert - Deduplicated within 15 mins)
// ============================================================
export async function notifyLogin(params: { userId: string; ipAddress?: string | undefined }) {
  try {
    const loginDate = new Date();
    const nowFormatted = loginDate.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    await createNotification({
      userId: params.userId,
      type: "LOGIN_SUCCESSFUL",
      title: "Login Successful",
      message: `Logged in successfully on ${nowFormatted}.`,
      entityType: "AUTH_SESSION",
      entityId: params.userId,
    });

    // Send email alert to verified account owner immediately on every login
    const contact = await getUserContactInfo(params.userId);
    if (contact?.email) {
      const userRec = await prisma.user.findUnique({
        where: { id: params.userId },
        select: { role: true },
      });

      console.log(`[Notification Service] Dispatching login security email to ${contact.email}...`);
      await sendLoginAlertEmail({
        to: contact.email,
        name: contact.name,
        role: userRec?.role || "ARTIST",
        loginTime: loginDate,
        ipAddress: params.ipAddress,
      }).catch((err) => console.error("Login alert email delivery error:", err));
    }
  } catch (error) {
    console.error("notifyLogin error:", error);
  }
}

// ============================================================
// 5. APPLICATION SUBMISSION (Artist In-App + Email, Brand In-App)
// ============================================================
export async function notifyApplicationSubmitted(params: {
  artistId: string;
  brandId: string;
  applicationId: string;
  castingTitle: string;
}) {
  try {
    // 1. Notify Brand
    await createNotification({
      userId: params.brandId,
      type: "NEW_APPLICATION",
      title: "New Application Received",
      message: `A new artist has applied to your casting call: "${params.castingTitle}".`,
      entityType: "APPLICATION",
      entityId: params.applicationId,
    });

    // 2. Notify Artist
    await createNotification({
      userId: params.artistId,
      type: "APPLICATION_SUBMITTED",
      title: "Application Submitted",
      message: `Your application for "${params.castingTitle}" has been submitted successfully.`,
      entityType: "APPLICATION",
      entityId: params.applicationId,
    });

    // 3. Send Confirmation Email to Artist
    const artistContact = await getUserContactInfo(params.artistId);
    if (artistContact) {
      await sendApplicationSubmittedEmail({
        to: artistContact.email,
        name: artistContact.name,
        castingTitle: params.castingTitle,
      }).catch((err) => console.error("Application submitted email error:", err));
    }
  } catch (error) {
    console.error("notifyApplicationSubmitted error:", error);
  }
}

// ============================================================
// 6. APPLICATION STATUS CHANGE (Shortlisted / Selected / Rejected)
// ============================================================
export async function notifyApplicationStatusChange(params: {
  artistId: string;
  applicationId: string;
  castingTitle: string;
  status: "SHORTLISTED" | "SELECTED" | "REJECTED";
  feedback?: string | null | undefined;
}) {
  try {
    let type: NotificationType = "APPLICATION_REJECTED";
    let title = "Application Status Update";
    let message = `Your application status for "${params.castingTitle}" was updated.`;

    if (params.status === "SHORTLISTED") {
      type = "APPLICATION_SHORTLISTED";
      title = "Application Shortlisted";
      message = `Congratulations! You have been shortlisted for "${params.castingTitle}".`;
    } else if (params.status === "SELECTED") {
      type = "APPLICATION_SELECTED";
      title = "Application Selected";
      message = `Congratulations! You have been selected for "${params.castingTitle}".`;
    }

    await createNotification({
      userId: params.artistId,
      type,
      title,
      message,
      entityType: "APPLICATION",
      entityId: params.applicationId,
    });

    const artistContact = await getUserContactInfo(params.artistId);
    if (artistContact) {
      await sendApplicationStatusEmail({
        to: artistContact.email,
        name: artistContact.name,
        castingTitle: params.castingTitle,
        status: params.status,
        feedback: params.feedback,
      }).catch((err) => console.error("Application status update email error:", err));
    }
  } catch (error) {
    console.error("notifyApplicationStatusChange error:", error);
  }
}

// ============================================================
// 7. PROFILE MODERATION (Approved / Rejected / Suspended)
// ============================================================
export async function notifyProfileModeration(params: {
  userId: string;
  profileId: string;
  role: "ARTIST" | "BRAND";
  status: "APPROVED" | "REJECTED" | "SUSPENDED";
  feedback?: string | null | undefined;
}) {
  try {
    let type: NotificationType = "SYSTEM";
    let title = "Profile Status Update";
    let message = "Your profile status has been updated.";

    if (params.status === "APPROVED") {
      type = params.role === "ARTIST" ? "ARTIST_PROFILE_APPROVED" : "BRAND_PROFILE_APPROVED";
      title = "Profile Approved";
      message = `Your ${params.role.toLowerCase()} profile has been approved.`;
    } else if (params.status === "REJECTED") {
      type = params.role === "ARTIST" ? "ARTIST_PROFILE_REJECTED" : "BRAND_PROFILE_REJECTED";
      title = "Profile Needs Revision";
      message = "Your profile requires changes. Please check your profile for more details.";
    } else if (params.status === "SUSPENDED") {
      type = "PROFILE_SUSPENDED";
      title = "Profile Suspended";
      message = "Your profile has been suspended.";
    }

    await createNotification({
      userId: params.userId,
      type,
      title,
      message,
      entityType: `${params.role}_PROFILE`,
      entityId: params.profileId,
    });

    const contact = await getUserContactInfo(params.userId);
    if (contact) {
      await sendProfileModerationEmail({
        to: contact.email,
        name: contact.name,
        role: params.role,
        status: params.status,
        feedback: params.feedback,
      }).catch((err) => console.error("Profile moderation email error:", err));
    }
  } catch (error) {
    console.error("notifyProfileModeration error:", error);
  }
}

// ============================================================
// 8. CASTING CALL MODERATION (Approved / Rejected / Closed)
// ============================================================
export async function notifyCastingCallModeration(params: {
  brandId: string;
  castingId: string;
  castingTitle: string;
  status: "APPROVED" | "REJECTED" | "CLOSED";
  feedback?: string | null | undefined;
}) {
  try {
    let type: NotificationType = "CASTING_APPROVED";
    let title = "Casting Call Approved";
    let message = `Your casting call "${params.castingTitle}" has been approved.`;

    if (params.status === "REJECTED") {
      type = "CASTING_REJECTED";
      title = "Casting Call Rejected";
      message = `Your casting call "${params.castingTitle}" was not approved. Please check feedback.`;
    } else if (params.status === "CLOSED") {
      type = "CASTING_CLOSED";
      title = "Casting Call Closed";
      message = `Your casting call "${params.castingTitle}" has been closed.`;
    }

    await createNotification({
      userId: params.brandId,
      type,
      title,
      message,
      entityType: "CASTING_CALL",
      entityId: params.castingId,
    });

    const brandContact = await getUserContactInfo(params.brandId);
    if (brandContact) {
      await sendCastingModerationEmail({
        to: brandContact.email,
        brandName: brandContact.name,
        castingTitle: params.castingTitle,
        status: params.status,
        feedback: params.feedback,
      }).catch((err) => console.error("Casting moderation email error:", err));
    }
  } catch (error) {
    console.error("notifyCastingCallModeration error:", error);
  }
}

// ============================================================
// 9. PREMIUM EXPIRY CHECK (7 days, 1 day, Expired - Idempotent)
// ============================================================
export async function checkAndNotifyPremiumExpiry(userId: string) {
  try {
    const entitlement = await prisma.premiumEntitlement.findUnique({
      where: { userId },
    });

    if (!entitlement) return;

    const now = new Date();
    const expiresAt = new Date(entitlement.expiresAt);
    const msRemaining = expiresAt.getTime() - now.getTime();
    const daysRemaining = Math.ceil(msRemaining / (1000 * 60 * 60 * 24));

    // Case A: Expired
    if (daysRemaining <= 0) {
      const alreadyNotified = await prisma.notification.findFirst({
        where: {
          userId,
          type: "PREMIUM_EXPIRED",
          entityId: entitlement.id,
        },
      });

      if (!alreadyNotified) {
        await createNotification({
          userId,
          type: "PREMIUM_EXPIRED",
          title: "Premium Membership Expired",
          message: "Your Premium Membership has expired. Renew your membership to continue using premium features.",
          entityType: "PREMIUM_ENTITLEMENT",
          entityId: entitlement.id,
        });

        const contact = await getUserContactInfo(userId);
        if (contact) {
          await sendPremiumExpiredEmail({
            to: contact.email,
            name: contact.name,
            plan: entitlement.plan,
            expiredAt: expiresAt,
          }).catch((err) => console.error("Premium expired email error:", err));
        }
      }
      return;
    }

    // Case B: 1 Day remaining
    if (daysRemaining <= 1) {
      const alreadyNotified = await prisma.notification.findFirst({
        where: {
          userId,
          type: "PREMIUM_EXPIRING",
          entityId: entitlement.id,
          entityType: "1_DAY",
        },
      });

      if (!alreadyNotified) {
        await createNotification({
          userId,
          type: "PREMIUM_EXPIRING",
          title: "Premium Expiring Tomorrow",
          message: "Your Premium Membership expires in 1 day. Renew now to maintain priority benefits.",
          entityType: "1_DAY",
          entityId: entitlement.id,
        });

        const contact = await getUserContactInfo(userId);
        if (contact) {
          await sendPremiumExpiringEmail({
            to: contact.email,
            name: contact.name,
            plan: entitlement.plan,
            daysRemaining: 1,
            expiresAt,
          }).catch((err) => console.error("Premium expiring email error:", err));
        }
      }
      return;
    }

    // Case C: 7 Days remaining
    if (daysRemaining <= 7) {
      const alreadyNotified = await prisma.notification.findFirst({
        where: {
          userId,
          type: "PREMIUM_EXPIRING",
          entityId: entitlement.id,
          entityType: "7_DAYS",
        },
      });

      if (!alreadyNotified) {
        await createNotification({
          userId,
          type: "PREMIUM_EXPIRING",
          title: "Premium Expiring Soon",
          message: `Your Premium Membership expires in ${daysRemaining} days.`,
          entityType: "7_DAYS",
          entityId: entitlement.id,
        });

        const contact = await getUserContactInfo(userId);
        if (contact) {
          await sendPremiumExpiringEmail({
            to: contact.email,
            name: contact.name,
            plan: entitlement.plan,
            daysRemaining,
            expiresAt,
          }).catch((err) => console.error("Premium expiring email error:", err));
        }
      }
    }
  } catch (error) {
    console.error("checkAndNotifyPremiumExpiry error:", error);
  }
}
