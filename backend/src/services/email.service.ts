import "dotenv/config";
import { Resend } from "resend";
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string | undefined;
}

let resendClient: Resend | null = null;
let smtpTransporter: Transporter | null = null;

/**
 * Lazily initialize and return the Resend client.
 * Returns null if RESEND_API_KEY is not set or placeholder.
 */
function getResendClient(): Resend | null {
  if (resendClient) return resendClient;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.trim() === "" || apiKey === "re_your_resend_api_key_here") {
    return null;
  }

  try {
    resendClient = new Resend(apiKey.trim());
    return resendClient;
  } catch (err) {
    console.error("[Email Service] Failed to initialize Resend client:", err);
    return null;
  }
}

/**
 * Lazily initialize and return the SMTP transporter (Gmail or custom SMTP).
 * Returns null if SMTP_USER or SMTP_PASS is missing.
 */
function getSmtpTransporter(): Transporter | null {
  if (smtpTransporter) return smtpTransporter;

  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, "").trim();

  if (!user || !pass) {
    return null;
  }

  const host = process.env.SMTP_HOST?.trim() || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const isGmail = host.includes("gmail") || user.endsWith("@gmail.com");

  try {
    if (isGmail) {
      smtpTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user, pass },
      });
    } else {
      smtpTransporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });
    }
    return smtpTransporter;
  } catch (err) {
    console.error("[Email Service] Failed to initialize SMTP transporter:", err);
    return null;
  }
}

/**
 * Returns a verified company domain for email links if configured, or null.
 * Strictly avoids localhost and personal preview URLs to prevent spam classification.
 */
function getEmailBaseUrl(): string | null {
  const custom = process.env.EMAIL_BASE_URL || process.env.PUBLIC_APP_URL || process.env.APP_URL;
  if (custom && custom.trim() !== "" && !custom.includes("localhost") && !custom.includes("127.0.0.1") && !custom.includes("vercel.app")) {
    return custom.trim().replace(/\/+$/, "");
  }
  return null;
}

function renderActionButton(path: string, label: string): string {
  const baseUrl = getEmailBaseUrl();
  if (baseUrl) {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `<div style="text-align: center; margin: 28px 0 10px 0;"><a href="${baseUrl}${cleanPath}" class="btn">${label}</a></div>`;
  }
  return `<div style="text-align: center; margin: 22px 0 10px 0; padding: 10px 16px; background: #F8F8F6; border: 1px solid #E5E5E0; border-radius: 6px; color: #555555; font-size: 13px; font-weight: 500;">Delhi Casting Agency • Official Account Notification</div>`;
}

/**
 * Base email layout wrapper with Delhi Casting Agency premium branding.
 */
function wrapEmailHtml(title: string, contentHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background-color: #F8F8F6;
      color: #222222;
    }
    .wrapper {
      max-width: 600px;
      margin: 30px auto;
      background: #FFFFFF;
      border: 1px solid #E5E5E0;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 16px rgba(0,0,0,0.06);
    }
    .header {
      background: #111111;
      padding: 28px 24px;
      text-align: center;
      border-bottom: 3px solid #D4AF37;
    }
    .header h1 {
      color: #FFFFFF;
      font-size: 22px;
      font-weight: 700;
      margin: 0;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .header p {
      color: #D4AF37;
      font-size: 11px;
      margin: 6px 0 0 0;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      font-weight: 600;
    }
    .body {
      padding: 32px 28px;
      font-size: 15px;
      line-height: 1.65;
      color: #333333;
    }
    .footer {
      background: #FAFAFA;
      border-top: 1px solid #EFEFEA;
      padding: 20px 24px;
      text-align: center;
      font-size: 12px;
      color: #888888;
    }
    .btn {
      display: inline-block;
      background: #111111;
      color: #D4AF37 !important;
      font-weight: 700;
      font-size: 14px;
      padding: 12px 26px;
      border-radius: 8px;
      text-decoration: none;
      margin-top: 20px;
      border: 1px solid #D4AF37;
    }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
    }
    .badge-success { background: #ECFDF5; color: #047857; border: 1px solid #A7F3D0; }
    .badge-alert { background: #FFFBEB; color: #B45309; border: 1px solid #FDE68A; }
    .badge-danger { background: #FEF2F2; color: #B91C1C; border: 1px solid #FECACA; }
    .table-details {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-size: 14px;
    }
    .table-details td {
      padding: 10px 12px;
      border-bottom: 1px solid #F0F0EE;
    }
    .table-details td.label {
      color: #777777;
      font-weight: 600;
      width: 40%;
    }
    .table-details td.value {
      color: #111111;
      font-weight: 700;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Delhi Casting Agency</h1>
      <p>Way To Bollywood</p>
    </div>
    <div class="body">
      ${contentHtml}
    </div>
    <div class="footer">
      <p style="margin: 0;">© ${new Date().getFullYear()} Delhi Casting Agency. All rights reserved.</p>
      <p style="margin: 4px 0 0 0;">This is an automated notification. Please do not reply directly to this email.</p>
    </div>
  </div>
</body>
</html>`;
}

function htmlToPlainText(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/tr>/gi, "\n")
    .replace(/<\/td>/gi, "  |  ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n\s*\n/g, "\n\n")
    .trim();
}

/**
 * Sends an email safely via SMTP (Gmail) or Resend. Never throws an uncaught error.
 * Returns true if sent or simulated, false if delivery failed.
 */
export async function sendEmail(options: SendEmailOptions): Promise<boolean> {
  const { to, subject, html, text } = options;

  if (!to || !to.includes("@")) {
    console.warn(`[Email Service] Cannot send email: invalid recipient "${to}"`);
    return false;
  }

  const emailFrom = process.env.EMAIL_FROM || "Delhi Casting Agency <ddelhicastingagency@gmail.com>";
  const provider = (process.env.EMAIL_PROVIDER || "").toLowerCase().trim();
  const plainText = text !== undefined && text.trim() !== "" ? text : htmlToPlainText(html);

  // 1. Prioritize SMTP if EMAIL_PROVIDER=smtp or if SMTP credentials are provided and provider is not explicitly set to resend
  const smtp = getSmtpTransporter();
  if (smtp && provider !== "resend") {
    try {
      const info = await smtp.sendMail({
        from: emailFrom,
        replyTo: "ddelhicastingagency@gmail.com",
        to: to.trim(),
        subject,
        html,
        text: plainText,
        headers: {
          "Auto-Submitted": "auto-generated",
          "X-Auto-Response-Suppress": "All",
        },
      });

      console.log(`[Email Service: SMTP] Successfully sent "${subject}" to ${to} (MessageID: ${info.messageId})`);
      return true;
    } catch (error) {
      console.error(`[Email Service: SMTP] Delivery error for ${to}:`, error instanceof Error ? error.message : error);
      smtpTransporter = null;
      return false;
    }
  }

  // 2. Fallback to Resend client if configured
  const client = getResendClient();
  if (client) {
    try {
      const payload: {
        from: string;
        to: string[];
        subject: string;
        html: string;
        text?: string;
      } = {
        from: emailFrom,
        to: [to.trim()],
        subject,
        html,
      };

      if (text !== undefined) {
        payload.text = text;
      }

      const { data, error } = await client.emails.send(payload);

      if (error) {
        console.error(`[Email Service: Resend] Resend delivery error for ${to}:`, error.message || error);
        return false;
      }

      console.log(`[Email Service: Resend] Successfully sent "${subject}" to ${to} (ID: ${data?.id || "unknown"})`);
      return true;
    } catch (error) {
      console.error(`[Email Service: Resend] Unexpected error sending email to ${to}:`, error instanceof Error ? error.message : error);
      // CRITICAL: Return false, do NOT throw so business workflows continue uninterrupted
      return false;
    }
  }

  // 3. Simulated / Mock delivery if no transport is configured
  console.log(`[Email Service: Mock Mode] No email provider (SMTP or Resend) configured.`);
  console.log(`  To: ${to}`);
  console.log(`  Subject: ${subject}`);
  console.log(`  From: ${emailFrom}`);
  return true;
}

// ============================================================
// 1. WELCOME EMAIL (On Registration)
// ============================================================
export async function sendWelcomeEmail(params: {
  to: string;
  name?: string | undefined;
  role: string;
}): Promise<boolean> {
  const displayName = params.name?.trim() || "Member";
  const roleTitle = params.role.toUpperCase() === "BRAND" ? "Brand Partner" : "Talent / Artist";

  const content = `
    <h2 style="margin-top: 0; color: #111111; font-size: 20px;">Welcome to Delhi Casting Agency, ${displayName}!</h2>
    <p>Your account has been successfully created as an <strong>${roleTitle}</strong>.</p>
    <p>You can now log in, build your professional portfolio, explore verified Bollywood and OTT casting calls, and connect with top industry directors.</p>
    ${renderActionButton("/login", "Log In to Your Account")}
    <p style="color: #666666; font-size: 13px;">If you have any questions or need assistance, our support team is always here to guide you.</p>
  `;

  return sendEmail({
    to: params.to,
    subject: "Welcome to Delhi Casting Agency",
    html: wrapEmailHtml("Welcome to Delhi Casting Agency", content),
  });
}

// ============================================================
// 2. PAYMENT SUCCESS EMAIL (On Server-Side Verified PayU Success)
// ============================================================
export async function sendPaymentSuccessEmail(params: {
  to: string;
  name: string;
  plan: "ARTIST_PREMIUM" | "BRAND_PREMIUM";
  amount: number;
  duration: string;
  paymentId: string;
  startedAt: Date;
  expiresAt: Date;
}): Promise<boolean> {
  const planName = params.plan === "ARTIST_PREMIUM" ? "Artist Premium" : "Brand Premium";
  const formattedStart = params.startedAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  const formattedExpiry = params.expiresAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  const content = `
    <div style="text-align: center; margin-bottom: 24px;">
      <span class="badge badge-success">PAYMENT VERIFIED</span>
      <h2 style="margin: 12px 0 6px 0; color: #111111; font-size: 22px;">Premium Membership Activated</h2>
      <p style="color: #555555; margin: 0;">Thank you, <strong>${params.name}</strong>! Your 3-month subscription has been successfully activated.</p>
    </div>

    <table class="table-details">
      <tr>
        <td class="label">Member Name</td>
        <td class="value">${params.name}</td>
      </tr>
      <tr>
        <td class="label">Subscription Plan</td>
        <td class="value">${planName}</td>
      </tr>
      <tr>
        <td class="label">Amount Paid</td>
        <td class="value">₹${params.amount.toLocaleString("en-IN")}</td>
      </tr>
      <tr>
        <td class="label">Duration</td>
        <td class="value">3 Months</td>
      </tr>
      <tr>
        <td class="label">Payment Reference</td>
        <td class="value" style="font-family: monospace; font-size: 12px;">${params.paymentId}</td>
      </tr>
      <tr>
        <td class="label">Membership Status</td>
        <td class="value"><span style="color: #059669;">● Active</span></td>
      </tr>
      <tr>
        <td class="label">Valid From</td>
        <td class="value">${formattedStart}</td>
      </tr>
      <tr>
        <td class="label">Valid Until</td>
        <td class="value">${formattedExpiry}</td>
      </tr>
    </table>

    <p style="margin-top: 24px;">You now enjoy verified profile prioritization, instant WhatsApp casting notifications, and direct submissions to featured films, TV commercials, and web series.</p>
    ${renderActionButton("/dashboard", "Go to Premium Dashboard")}
  `;

  return sendEmail({
    to: params.to,
    subject: `Delhi Casting Agency — Payment Received (${planName})`,
    html: wrapEmailHtml("Premium Membership Activated", content),
  });
}

// ============================================================
// 3. PAYMENT FAILURE EMAIL
// ============================================================
export async function sendPaymentFailedEmail(params: {
  to: string;
  name: string;
  plan: string;
  amount: number;
  reason?: string | undefined;
}): Promise<boolean> {
  const planName = params.plan === "BRAND_PREMIUM" ? "Brand Premium" : "Artist Premium";

  const content = `
    <div style="text-align: center; margin-bottom: 24px;">
      <span class="badge badge-danger">TRANSACTION FAILED</span>
      <h2 style="margin: 12px 0 6px 0; color: #111111; font-size: 22px;">Payment Unsuccessful</h2>
      <p style="color: #555555; margin: 0;">Hello ${params.name}, your payment for <strong>${planName}</strong> could not be completed.</p>
    </div>

    <p>Your payment attempt of <strong>₹${params.amount.toLocaleString("en-IN")}</strong> was declined by the bank or gateway${params.reason ? `: <em>${params.reason}</em>` : "."}</p>
    <p>No worries — your card or UPI account has not been charged, or any debited amount will be reversed by your bank within 3–5 working days.</p>
    ${renderActionButton("/membership", "Retry Payment")}
  `;

  return sendEmail({
    to: params.to,
    subject: "Payment Failed — Delhi Casting Agency",
    html: wrapEmailHtml("Payment Failed", content),
  });
}

// ============================================================
// 4. PREMIUM EXPIRING SOON EMAIL (7 days / 1 day)
// ============================================================
export async function sendPremiumExpiringEmail(params: {
  to: string;
  name: string;
  plan: string;
  daysRemaining: number;
  expiresAt: Date;
}): Promise<boolean> {
  const planName = params.plan === "BRAND_PREMIUM" ? "Brand Premium" : "Artist Premium";
  const formattedExpiry = params.expiresAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  const content = `
    <div style="text-align: center; margin-bottom: 20px;">
      <span class="badge badge-alert">EXPIRING SOON</span>
      <h2 style="margin: 12px 0 6px 0; color: #111111; font-size: 22px;">Your Premium Membership Expires in ${params.daysRemaining} Day${params.daysRemaining > 1 ? "s" : ""}</h2>
    </div>

    <p>Hello ${params.name},</p>
    <p>Your <strong>${planName}</strong> subscription is set to expire on <strong>${formattedExpiry}</strong>.</p>
    <p>Renew now to continue receiving direct WhatsApp audition updates, verified profile visibility, and priority review from leading casting directors.</p>
    ${renderActionButton("/membership", "Renew Membership")}
  `;

  return sendEmail({
    to: params.to,
    subject: `Action Required: Your Premium Membership expires in ${params.daysRemaining} day${params.daysRemaining > 1 ? "s" : ""}`,
    html: wrapEmailHtml("Premium Expiring Soon", content),
  });
}

// ============================================================
// 5. PREMIUM EXPIRED EMAIL
// ============================================================
export async function sendPremiumExpiredEmail(params: {
  to: string;
  name: string;
  plan: string;
  expiredAt: Date;
}): Promise<boolean> {
  const planName = params.plan === "BRAND_PREMIUM" ? "Brand Premium" : "Artist Premium";
  const formattedExpiry = params.expiredAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  const content = `
    <div style="text-align: center; margin-bottom: 20px;">
      <span class="badge badge-danger">MEMBERSHIP EXPIRED</span>
      <h2 style="margin: 12px 0 6px 0; color: #111111; font-size: 22px;">Your Premium Membership Has Expired</h2>
    </div>

    <p>Hello ${params.name},</p>
    <p>Your <strong>${planName}</strong> subscription ended on <strong>${formattedExpiry}</strong>.</p>
    <p>Renew your membership today to reactivate your priority talent placement and continue applying to all premium casting calls.</p>
    ${renderActionButton("/membership", "Renew Membership")}
  `;

  return sendEmail({
    to: params.to,
    subject: "Your Premium Membership has expired — Delhi Casting Agency",
    html: wrapEmailHtml("Premium Membership Expired", content),
  });
}

// ============================================================
// 6. CASTING APPLICATION SUBMITTED EMAIL
// ============================================================
export async function sendApplicationSubmittedEmail(params: {
  to: string;
  name: string;
  castingTitle: string;
}): Promise<boolean> {
  const content = `
    <h2 style="margin-top: 0; color: #111111; font-size: 20px;">Application Submitted Successfully</h2>
    <p>Hello ${params.name},</p>
    <p>Your audition application for <strong>"${params.castingTitle}"</strong> has been received by the casting team.</p>
    <p>The production team will review your profile, photos, and demo reel. You will receive an update as soon as your application is evaluated.</p>
    ${renderActionButton("/dashboard", "View Application Status")}
  `;

  return sendEmail({
    to: params.to,
    subject: `Application Submitted: ${params.castingTitle}`,
    html: wrapEmailHtml("Application Submitted", content),
  });
}

// ============================================================
// 7. CASTING APPLICATION STATUS UPDATE EMAIL (Shortlisted / Selected / Rejected)
// ============================================================
export async function sendApplicationStatusEmail(params: {
  to: string;
  name: string;
  castingTitle: string;
  status: "SHORTLISTED" | "SELECTED" | "REJECTED";
  feedback?: string | null | undefined;
}): Promise<boolean> {
  let badgeHtml = '<span class="badge badge-alert">STATUS UPDATE</span>';
  let heading = "Application Status Updated";
  let bodyText = "";

  if (params.status === "SHORTLISTED") {
    badgeHtml = '<span class="badge badge-alert">SHORTLISTED</span>';
    heading = "Congratulations! You are Shortlisted";
    bodyText = `Great news! You have been shortlisted for the casting call: <strong>"${params.castingTitle}"</strong>. The casting team will reach out with audition dates or script briefs.`;
  } else if (params.status === "SELECTED") {
    badgeHtml = '<span class="badge badge-success">SELECTED</span>';
    heading = "Congratulations! You are Selected";
    bodyText = `Outstanding achievement! You have been officially selected for <strong>"${params.castingTitle}"</strong>. Please check your dashboard and WhatsApp for production details.`;
  } else {
    badgeHtml = '<span class="badge badge-danger">UPDATE</span>';
    heading = "Application Status Update";
    bodyText = `Thank you for auditioning for <strong>"${params.castingTitle}"</strong>. The casting director has decided to move forward with other talent for this specific brief. Continue applying to new opportunities!`;
  }

  const feedbackHtml = params.feedback ? `
    <div style="background: #F9F9F7; border-left: 4px solid #D4AF37; padding: 12px 16px; margin: 20px 0; border-radius: 4px;">
      <strong style="color: #111111; font-size: 13px;">Feedback from Director:</strong>
      <p style="margin: 6px 0 0 0; font-size: 13px; color: #444444;">${params.feedback}</p>
    </div>
  ` : "";

  const content = `
    <div style="text-align: center; margin-bottom: 20px;">
      ${badgeHtml}
      <h2 style="margin: 12px 0 6px 0; color: #111111; font-size: 22px;">${heading}</h2>
    </div>
    <p>Hello ${params.name},</p>
    <p>${bodyText}</p>
    ${feedbackHtml}
    ${renderActionButton("/dashboard", "Check Dashboard")}
  `;

  return sendEmail({
    to: params.to,
    subject: `Application Update: ${params.castingTitle} (${params.status})`,
    html: wrapEmailHtml(heading, content),
  });
}

// ============================================================
// 8. PROFILE MODERATION EMAIL (Approved / Rejected / Suspended)
// ============================================================
export async function sendProfileModerationEmail(params: {
  to: string;
  name: string;
  role: "ARTIST" | "BRAND";
  status: "APPROVED" | "REJECTED" | "SUSPENDED";
  feedback?: string | null | undefined;
}): Promise<boolean> {
  const roleTitle = params.role === "BRAND" ? "Brand Profile" : "Artist Profile";
  let badgeHtml = "";
  let subject = "";
  let message = "";

  if (params.status === "APPROVED") {
    badgeHtml = '<span class="badge badge-success">VERIFIED & APPROVED</span>';
    subject = `Your ${roleTitle} has been Approved`;
    message = `Congratulations! Your ${roleTitle} has been audited and approved by the Delhi Casting Agency moderation team. Your profile is now visible to active casting directors and productions.`;
  } else if (params.status === "REJECTED") {
    badgeHtml = '<span class="badge badge-danger">CHANGES REQUIRED</span>';
    subject = `Action Required: Your ${roleTitle} requires updates`;
    message = `Your ${roleTitle} submission could not be approved in its current form. Please review the feedback below and update your profile details or photos.`;
  } else {
    badgeHtml = '<span class="badge badge-danger">PROFILE SUSPENDED</span>';
    subject = `Notice: Your ${roleTitle} has been suspended`;
    message = `Your ${roleTitle} has been temporarily suspended due to a moderation review.`;
  }

  const feedbackHtml = params.feedback ? `
    <div style="background: #F9F9F7; border-left: 4px solid #D4AF37; padding: 12px 16px; margin: 20px 0; border-radius: 4px;">
      <strong style="color: #111111; font-size: 13px;">Moderator Feedback:</strong>
      <p style="margin: 6px 0 0 0; font-size: 13px; color: #444444;">${params.feedback}</p>
    </div>
  ` : "";

  const content = `
    <div style="text-align: center; margin-bottom: 20px;">
      ${badgeHtml}
      <h2 style="margin: 12px 0 6px 0; color: #111111; font-size: 22px;">${subject}</h2>
    </div>
    <p>Hello ${params.name},</p>
    <p>${message}</p>
    ${feedbackHtml}
    ${renderActionButton("/dashboard", "View Profile Details")}
  `;

  return sendEmail({
    to: params.to,
    subject: `${subject} — Delhi Casting Agency`,
    html: wrapEmailHtml(subject, content),
  });
}

// ============================================================
// 10. LOGIN ALERT EMAIL (Sent upon authenticated login)
// ============================================================
export async function sendLoginAlertEmail(params: {
  to: string;
  name?: string | undefined;
  role: string;
  loginTime: Date;
  ipAddress?: string | undefined;
}): Promise<boolean> {
  const displayName = params.name?.trim() || "Member";
  const formattedTime = params.loginTime.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const content = `
    <div style="text-align: center; margin-bottom: 20px;">
      <span class="badge" style="background: #EEF2FF; color: #4338CA;">LOGIN CONFIRMATION</span>
      <h2 style="margin: 12px 0 6px 0; color: #111111; font-size: 22px;">Account Login Confirmation</h2>
    </div>
    <p>Hello ${displayName},</p>
    <p>Your Delhi Casting Agency account (<strong>${params.to}</strong>) was successfully accessed on <strong>${formattedTime}</strong>.</p>
    ${params.ipAddress ? `<p style="color: #666666; font-size: 13px;">IP Address: ${params.ipAddress}</p>` : ""}
    <p>If this was you, you can safely ignore this email.</p>
    <p style="color: #666666; font-size: 13px;">If you did not initiate this login, please change your password or contact Delhi Casting Agency support.</p>
    ${renderActionButton("/dashboard", "View Account")}
  `;

  return sendEmail({
    to: params.to,
    subject: "Delhi Casting Agency — Account Login Confirmation",
    html: wrapEmailHtml("Account Login Confirmation", content),
  });
}

// ============================================================
// 11. REGISTRATION COLLISION SECURITY ALERT EMAIL (409 Conflict)
// ============================================================
export async function sendRegistrationAttemptAlertEmail(params: {
  to: string;
  attemptTime: Date;
}): Promise<boolean> {
  const formattedTime = params.attemptTime.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const content = `
    <div style="text-align: center; margin-bottom: 20px;">
      <span class="badge badge-danger">SECURITY ALERT</span>
      <h2 style="margin: 12px 0 6px 0; color: #111111; font-size: 22px;">Registration Attempt with Your Email</h2>
    </div>
    <p>Hello,</p>
    <p>Someone just attempted to create a new Delhi Casting Agency account using your email address (<strong>${params.to}</strong>) on <strong>${formattedTime}</strong>.</p>
    <div style="background: #FEF2F2; border-left: 4px solid #B91C1C; padding: 14px 16px; margin: 20px 0; border-radius: 4px;">
      <strong style="color: #991B1B; font-size: 14px;">Your Account is Safe:</strong>
      <p style="margin: 6px 0 0 0; font-size: 13px; color: #7F1D1D;">
        The registration request was automatically rejected with an email conflict error. No changes were made to your profile, password, or account security.
      </p>
    </div>
    <p>If this was you attempting to access your account, please log in through the official login page instead of registering a new account.</p>
    ${renderActionButton("/login", "Go to Login")}
  `;

  return sendEmail({
    to: params.to,
    subject: "Security Alert: Registration attempt with your email — Delhi Casting Agency",
    html: wrapEmailHtml("Security Alert", content),
  });
}

// ============================================================
// 12. PROFILE SUBMITTED EMAIL (On Initial Profile Submission)
// ============================================================
export async function sendProfileSubmittedEmail(params: {
  to: string;
  name: string;
  role: "ARTIST" | "BRAND";
}): Promise<boolean> {
  const roleTitle = params.role === "BRAND" ? "Brand Partner Profile" : "Artist Talent Profile";

  const content = `
    <div style="text-align: center; margin-bottom: 20px;">
      <span class="badge badge-alert">UNDER REVIEW</span>
      <h2 style="margin: 12px 0 6px 0; color: #111111; font-size: 22px;">Profile Submitted for DCA Verification</h2>
    </div>
    <p>Hello ${params.name},</p>
    <p>Your <strong>${roleTitle}</strong> has been successfully submitted and is now under review by our official talent moderation team.</p>
    <p>Our team verifies all profile details, experience, and headshots within 24 to 48 hours to ensure genuine casting quality.</p>
    <p>You will receive an email confirmation as soon as your profile is approved and live for casting director submissions.</p>
    ${renderActionButton("/dashboard", "Check Profile Status")}
  `;

  return sendEmail({
    to: params.to,
    subject: `Profile Submitted for Review: ${roleTitle} — Delhi Casting Agency`,
    html: wrapEmailHtml("Profile Submitted", content),
  });
}

// ============================================================
// 9. CASTING CALL MODERATION EMAIL (For Brands)
// ============================================================
export async function sendCastingModerationEmail(params: {
  to: string;
  brandName: string;
  castingTitle: string;
  status: "APPROVED" | "REJECTED" | "CLOSED";
  feedback?: string | null | undefined;
}): Promise<boolean> {
  let subject = "";
  let message = "";

  if (params.status === "APPROVED") {
    subject = `Casting Call Approved: "${params.castingTitle}"`;
    message = `Your casting call <strong>"${params.castingTitle}"</strong> has been approved by the admin team and is now live for talent submissions.`;
  } else if (params.status === "REJECTED") {
    subject = `Casting Call Revision Needed: "${params.castingTitle}"`;
    message = `Your casting call <strong>"${params.castingTitle}"</strong> could not be approved. Please review the feedback below and update your requirements.`;
  } else {
    subject = `Casting Call Closed: "${params.castingTitle}"`;
    message = `Your casting call <strong>"${params.castingTitle}"</strong> has been marked as closed. No further applications will be accepted.`;
  }

  const feedbackHtml = params.feedback ? `
    <div style="background: #F9F9F7; border-left: 4px solid #D4AF37; padding: 12px 16px; margin: 20px 0; border-radius: 4px;">
      <strong style="color: #111111; font-size: 13px;">Admin Feedback:</strong>
      <p style="margin: 6px 0 0 0; font-size: 13px; color: #444444;">${params.feedback}</p>
    </div>
  ` : "";

  const content = `
    <h2 style="margin-top: 0; color: #111111; font-size: 20px;">${subject}</h2>
    <p>Hello ${params.brandName},</p>
    <p>${message}</p>
    ${feedbackHtml}
    ${renderActionButton("/dashboard", "Manage Casting Calls")}
  `;

  return sendEmail({
    to: params.to,
    subject: `${subject} — Delhi Casting Agency`,
    html: wrapEmailHtml(subject, content),
  });
}

// ============================================================
// 10. PASSWORD RESET EMAIL (Self-Service Forgot Password)
// Policy: 15-minute token expiry. Short-lived for immediate user-initiated resets.
// ============================================================
export async function sendPasswordResetEmail(params: {
  to: string;
  resetToken: string;
  expiresMinutes?: number;
}): Promise<boolean> {
  const expires = params.expiresMinutes || 30;
  const frontendUrl = (process.env.FRONTEND_URL || "http://localhost:3000").replace(/\/+$/, "");
  const resetLink = `${frontendUrl}/reset-password?token=${params.resetToken}`;

  const content = `
    <h2 style="margin-top: 0; color: #111111; font-size: 20px;">Password Reset Request</h2>
    <p>Hello,</p>
    <p>We received a request to reset the password for your Delhi Casting Agency account associated with <strong>${params.to}</strong>.</p>
    <p>Click the secure button below to set a new, secure password. For your security, this link is single-use and will expire in <strong>${expires} minutes</strong>.</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${resetLink}" class="btn" style="background: #111111; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reset My Password</a>
    </div>
    <p style="font-size: 12px; color: #666666; line-height: 1.6;">If the button doesn't work, copy and paste this link into your browser:<br/><a href="${resetLink}" style="color: #D4AF37; word-break: break-all;">${resetLink}</a></p>
    <p style="font-size: 12px; color: #888888; margin-top: 25px; border-top: 1px solid #eeeeee; padding-top: 15px;">If you did not request a password reset, you can safely ignore this email. Your current password will remain active and secure.</p>
  `;

  return sendEmail({
    to: params.to,
    subject: "Reset Your Delhi Casting Agency Password",
    html: wrapEmailHtml("Password Reset Request", content),
  });
}

// ============================================================
// 11. MANDATORY SECURITY PASSWORD RESET EMAIL (Default Password Retirement)
// Policy: 24-hour token expiry. One-time mandatory remediation for previously
// compromised legacy accounts, ensuring users across all time zones have sufficient
// time to read the notice and set their new credentials.
// ============================================================
export async function sendSecurityMandatoryResetEmail(params: {
  to: string;
  resetToken: string;
  expiresHours?: number;
}): Promise<boolean> {
  const expiresHours = params.expiresHours || 24;
  const frontendUrl = (process.env.FRONTEND_URL || "http://localhost:3000").replace(/\/+$/, "");
  const resetLink = `${frontendUrl}/reset-password?token=${params.resetToken}`;

  const content = `
    <div style="display: inline-block; background: #FEF3C7; border: 1px solid #F59E0B; border-radius: 4px; padding: 4px 10px; font-size: 11px; font-weight: bold; color: #92400E; margin-bottom: 15px;">
      IMPORTANT SECURITY NOTICE
    </div>
    <h2 style="margin-top: 0; color: #111111; font-size: 20px;">Action Required: Set Your Personal Password</h2>
    <p>Hello,</p>
    <p>As part of a critical security upgrade at <strong>Delhi Casting Agency</strong>, all platform-generated default passwords have been retired.</p>
    <p>To ensure total privacy and isolation for your account (<strong>${params.to}</strong>), all previous active sessions have been safely logged out, and a one-time password reset is required.</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${resetLink}" class="btn" style="background: #111111; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Set New Password Now</a>
    </div>
    <p style="font-size: 12px; color: #666666; line-height: 1.6;">This secure link is single-use and valid for the next <strong>${expiresHours} hours</strong>:<br/><a href="${resetLink}" style="color: #D4AF37; word-break: break-all;">${resetLink}</a></p>
    <p style="font-size: 12px; color: #888888; margin-top: 25px; border-top: 1px solid #eeeeee; padding-top: 15px;">Thank you for helping us keep Delhi Casting Agency safe and secure for all artists and casting teams.</p>
  `;

  return sendEmail({
    to: params.to,
    subject: "Action Required: Set Your New Password — Delhi Casting Agency Security",
    html: wrapEmailHtml("Security Notice: Password Reset Required", content),
  });
}
