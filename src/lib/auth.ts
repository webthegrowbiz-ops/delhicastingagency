/**
 * Delhi Casting Agency (DCA) Session & Auth Helper
 * 
 * Manages user session state in localStorage for client-side authentication.
 */

import { API_URL } from "@/config/env";

export type ProfileStatus = "DRAFT" | "PENDING_REVIEW" | "APPROVED" | "REJECTED" | "SUSPENDED";

export interface PremiumEntitlement {
  plan: "ARTIST_PREMIUM" | "BRAND_PREMIUM";
  amount: number;
  duration: "3_months";
  startedAt: string;
  expiresAt: string;
  paymentId: string;
}

export interface DCAUser {
  id?: string;
  identifier?: string;
  email?: string;
  isLoggedIn: boolean;
  loginTime?: string;
  role?: "artist" | "brand" | "admin" | "ARTIST" | "BRAND" | "ADMIN";
  token?: string;
  isPremium?: boolean;
  premiumEntitlement?: PremiumEntitlement;
  status?: ProfileStatus;
}

export function getUserSession(): DCAUser | null {
  if (typeof window === "undefined") return null;
  try {
    const userStr = localStorage.getItem("dca_user");
    if (!userStr) return null;
    const user: DCAUser = JSON.parse(userStr);
    if (!user || user.isLoggedIn !== true || (!user.identifier && !user.email)) {
      return null;
    }

    // Automatic Expiry Check: Current date >= expiresAt -> Premium Expired
    if (user.isPremium && user.premiumEntitlement?.expiresAt) {
      const expiresAt = new Date(user.premiumEntitlement.expiresAt);
      if (new Date() >= expiresAt) {
        user.isPremium = false;
      }
    }

    return user;
  } catch {
    return null;
  }
}

export function isUserAuthenticated(): boolean {
  return getUserSession() !== null;
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("dca_token") || getUserSession()?.token || null;
}

export function getProfileCreateOrSetupUrl(): string {
  return "/profile/setup";
}

export function setDCAUserSession(
  emailOrPhone: string,
  role: "artist" | "brand" | "admin" | "ARTIST" | "BRAND" | "ADMIN" = "ARTIST",
  isNewRegistration: boolean = false,
  token?: string,
  userId?: string
) {
  if (typeof window !== "undefined") {
    const existing = getUserSession();
    const isSameUser =
      Boolean(existing &&
      (existing.identifier === emailOrPhone || existing.email === emailOrPhone));

    // CRITICAL SECURITY FIX: Never inherit premium status from an old or different user!
    // For new registrations or different users, premium is ALWAYS false.
    const keepPremium =
      !isNewRegistration && isSameUser && existing?.isPremium === true;

    if (token) {
      localStorage.setItem("dca_token", token);
    } else if (!isSameUser || isNewRegistration) {
      localStorage.removeItem("dca_token");
      try {
        sessionStorage.removeItem("dca_last_txnid");
        sessionStorage.removeItem("payment-status");
      } catch {}
    }

    const resolvedToken = token || (!isNewRegistration && isSameUser ? existing?.token : undefined);
    const resolvedId = userId || (!isNewRegistration && isSameUser ? existing?.id : undefined);
    const resolvedRole = role || (!isNewRegistration && isSameUser ? existing?.role : undefined) || "ARTIST";

    if (isNewRegistration) {
      localStorage.removeItem("dca_artist_profile");
      localStorage.removeItem("dca_brand_profile");
    }

    localStorage.setItem(
      "dca_user",
      JSON.stringify({
        id: resolvedId,
        identifier: emailOrPhone,
        email: emailOrPhone,
        isLoggedIn: true,
        loginTime: new Date().toISOString(),
        role: resolvedRole,
        token: resolvedToken,
        isPremium: keepPremium,
        premiumEntitlement: keepPremium ? existing?.premiumEntitlement : undefined,
      })
    );
  }
}

export function setUserRole(role: "artist" | "brand" | "admin" | "ARTIST" | "BRAND" | "ADMIN") {
  if (typeof window !== "undefined") {
    const existing = getUserSession();
    if (!existing || !existing.isLoggedIn) return;
    localStorage.setItem(
      "dca_user",
      JSON.stringify({
        ...existing,
        role,
      })
    );
  }
}

export function setUserPremiumStatus(
  isPremium: boolean = true,
  details?: {
    plan: "ARTIST_PREMIUM" | "BRAND_PREMIUM";
    amount: number;
    paymentId: string;
    startedAt?: string;
    expiresAt?: string;
  }
) {
  if (typeof window !== "undefined") {
    const existing = getUserSession();
    if (!existing || !existing.isLoggedIn) return;

    let entitlement: PremiumEntitlement | undefined = undefined;
    let verifiedPremium = false;

    if (isPremium && details) {
      const isBrandUser =
        existing.role === "brand" || existing.role === "BRAND";
      const expectedPlan = isBrandUser ? "BRAND_PREMIUM" : "ARTIST_PREMIUM";

      // SECURITY GUARD: Entitlement plan MUST strictly match user role
      if (details.plan === expectedPlan) {
        verifiedPremium = true;
        const now = details.startedAt ? new Date(details.startedAt) : new Date();
        const expiresAt = details.expiresAt
          ? new Date(details.expiresAt)
          : new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);

        entitlement = {
          plan: details.plan,
          amount: details.amount,
          duration: "3_months",
          startedAt: now.toISOString(),
          expiresAt: expiresAt.toISOString(),
          paymentId: details.paymentId || `WTB-VERIFIED-${Date.now().toString().slice(-6)}`,
        };
      }
    }

    localStorage.setItem(
      "dca_user",
      JSON.stringify({
        ...existing,
        isPremium: verifiedPremium,
        premiumEntitlement: entitlement,
      })
    );
  }
}

/**
 * Queries real backend /api/payments/my-entitlement API to sync premium status.
 */
export async function fetchBackendEntitlement(): Promise<{
  isPremium: boolean;
  entitlement: PremiumEntitlement | null;
}> {
  const token = getAuthToken();
  const session = getUserSession();

  // If no auth token or no active user session, user cannot have verified premium
  if (!token || !session) {
    setUserPremiumStatus(false);
    return { isPremium: false, entitlement: null };
  }

  try {
    const response = await fetch(`${API_URL}/api/payments/my-entitlement`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      setUserPremiumStatus(false);
      return { isPremium: false, entitlement: null };
    }

    const data = (await response.json()) as {
      success: boolean;
      isPremium?: boolean;
      entitlement?: {
        plan: "ARTIST_PREMIUM" | "BRAND_PREMIUM";
        amount: number;
        paymentId?: string;
        id?: string;
        startedAt: string;
        expiresAt: string;
      } | null;
    };

    const isBrandUser = session.role === "brand" || session.role === "BRAND";
    const expectedPlan = isBrandUser ? "BRAND_PREMIUM" : "ARTIST_PREMIUM";

    // Strictly verify backend entitlement authenticity and role-plan alignment:
    if (
      data.success &&
      data.isPremium === true &&
      data.entitlement &&
      data.entitlement.plan === expectedPlan
    ) {
      setUserPremiumStatus(true, {
        plan: data.entitlement.plan,
        amount: data.entitlement.amount,
        paymentId: data.entitlement.paymentId || data.entitlement.id || "WTB-VERIFIED",
        startedAt: data.entitlement.startedAt,
        expiresAt: data.entitlement.expiresAt,
      });
      return {
        isPremium: true,
        entitlement: {
          plan: data.entitlement.plan,
          amount: data.entitlement.amount,
          duration: "3_months",
          startedAt: data.entitlement.startedAt,
          expiresAt: data.entitlement.expiresAt,
          paymentId: data.entitlement.paymentId || data.entitlement.id || "WTB-VERIFIED",
        },
      };
    }

    // Backend confirms no active entitlement for this user/plan
    setUserPremiumStatus(false);
    return { isPremium: false, entitlement: null };
  } catch {
    // Network error: never grant unverified premium
    setUserPremiumStatus(false);
    return { isPremium: false, entitlement: null };
  }
}

export function getPremiumRemainingInfo(user: DCAUser | null): {
  isExpired: boolean;
  startDateFormatted: string;
  expiryDateFormatted: string;
  remainingDays: number;
} | null {
  if (!user || !user.isPremium || !user.premiumEntitlement) return null;

  const now = new Date();
  const expiresAt = new Date(user.premiumEntitlement.expiresAt);
  const startedAt = new Date(user.premiumEntitlement.startedAt);

  if (now >= expiresAt) {
    return {
      isExpired: true,
      startDateFormatted: startedAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      expiryDateFormatted: expiresAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      remainingDays: 0,
    };
  }

  const diffTime = expiresAt.getTime() - now.getTime();
  const remainingDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" };
  const startDateFormatted = startedAt.toLocaleDateString("en-IN", options);
  const expiryDateFormatted = expiresAt.toLocaleDateString("en-IN", options);

  return {
    isExpired: false,
    startDateFormatted,
    expiryDateFormatted,
    remainingDays,
  };
}

export function setUserProfileStatus(status: ProfileStatus) {
  if (typeof window !== "undefined") {
    const existing = getUserSession();
    if (!existing || !existing.isLoggedIn) return;
    localStorage.setItem(
      "dca_user",
      JSON.stringify({
        ...existing,
        status,
      })
    );
  }
}

/**
 * TEMPORARY FRONTEND PROTOTYPE STATE ONLY:
 * Note: localStorage status is strictly for UI state simulation during frontend testing.
 * The future backend API/database will be the authoritative source of truth for
 * profile status (draft, pending_review, approved, rejected, suspended), payment, and security decisions.
 */
export function getUserProfileStatus(): ProfileStatus {
  const session = getUserSession();
  if (!session) return "DRAFT";
  if (session.status) return session.status;
  
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("dca_artist_profile");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.status) return parsed.status;
      } catch (e) {
        console.error("Error reading stored profile status", e);
      }
    }
  }
  // Default for existing demo session
  return "APPROVED";
}

export function clearDCAUserSession() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("dca_user");
    localStorage.removeItem("dca_token");
    try {
      sessionStorage.removeItem("dca_last_txnid");
      sessionStorage.removeItem("payment-status");
    } catch {}
  }
}

/**
 * Executes server-side logout call to POST /api/auth/logout then clears local session.
 */
export async function logoutDCAUserSession(): Promise<void> {
  const token = getAuthToken();
  if (token) {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch {
      // Ignore network errors so client session is always cleared cleanly
    }
  }
  clearDCAUserSession();
}
