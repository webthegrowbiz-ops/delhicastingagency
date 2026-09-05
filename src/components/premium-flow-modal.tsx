"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Sparkles,
  UserCheck,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  getUserSession,
  isUserAuthenticated,
  setUserRole,
  getAuthToken,
  setDCAUserSession,
  fetchBackendEntitlement,
} from "@/lib/auth";
import { API_URL } from "@/config/env";
import { launchRazorpayCheckout } from "@/lib/razorpay";
import { submitPayuForm, PayuFormPayload } from "@/lib/payu";

export type PremiumModalStep =
  | "role_select"
  | "artist_checkout"
  | "brand_checkout"
  | "artist_success"
  | "brand_success";

interface PremiumFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStep?: PremiumModalStep;
  isRegistrationFlow?: boolean;
}

export function PremiumFlowModal({
  isOpen,
  onClose,
  initialStep,
  isRegistrationFlow = false,
}: PremiumFlowModalProps) {
  const router = useRouter();
  const [step, setStep] = useState<PremiumModalStep>("role_select");
  const [gateway, setGateway] = useState<"razorpay" | "payu">("razorpay");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        setIsProcessing(false);

        const session = getUserSession();
        const authenticated =
          session?.isLoggedIn === true &&
          Boolean(session.identifier || session.email);

        // STRICT AUTHENTICATION GUARD: Never show payment or role select to logged-out users
        if (!authenticated) {
          onClose();
          router.push("/profile/setup");
          return;
        }

        if (initialStep === "brand_checkout") {
          setStep("brand_checkout");
        } else {
          setStep("artist_checkout");
        }
      });
    }
  }, [isOpen, initialStep, isRegistrationFlow, onClose, router]);

  if (!isOpen) return null;

  const session = getUserSession();
  const isAlreadyPremium = session?.isLoggedIn === true && session?.isPremium === true;

  const handleSelectRole = (selectedRole: "artist" | "brand") => {
    if (!isUserAuthenticated()) {
      onClose();
      if (selectedRole === "artist") {
        router.push("/profile/setup");
      } else {
        router.push("/register/brand");
      }
      return;
    }

    setUserRole(selectedRole);
    if (selectedRole === "artist") {
      setStep("artist_checkout");
    } else {
      setStep("brand_checkout");
    }
  };

  const ensureValidToken = async (): Promise<string | null> => {
    let token = getAuthToken();
    if (token) return token;

    const currentSession = getUserSession();
    const email =
      currentSession?.email ||
      (currentSession?.identifier?.includes("@") ? currentSession.identifier : null);

    if (!email) return null;

    const role =
      (currentSession?.role || (step === "artist_checkout" ? "ARTIST" : "BRAND")).toUpperCase() === "ARTIST"
        ? "ARTIST"
        : "BRAND";
    const defaultPassword =
      role === "ARTIST" ? "ArtistPassword@123" : "BrandPassword@123";

    try {
      const regRes = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: defaultPassword,
          role,
        }),
      });
      const regData = await regRes.json();
      if (regRes.ok && regData.success && regData.token) {
        localStorage.setItem("dca_token", regData.token);
        setDCAUserSession(
          email,
          role.toLowerCase() as any,
          false,
          regData.token,
          regData.user?.id
        );
        return regData.token;
      }

      if (regRes.status === 409) {
        const loginRes = await fetch(`${API_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password: defaultPassword,
          }),
        });
        const loginData = await loginRes.json();
        if (loginRes.ok && loginData.success && loginData.token) {
          localStorage.setItem("dca_token", loginData.token);
          setDCAUserSession(
            email,
            role.toLowerCase() as any,
            false,
            loginData.token,
            loginData.user?.id
          );
          return loginData.token;
        }
      }
    } catch (err) {
      console.warn("Background auto-authentication error:", err);
    }

    return null;
  };

  const initiatePayuFlow = async (plan: "ARTIST_PREMIUM" | "BRAND_PREMIUM") => {
    if (isProcessing) return;
    setIsProcessing(true);
    setPaymentError(null);

    let token = await ensureValidToken();
    if (!token) {
      setPaymentError("Authentication required. Please login again.");
      setIsProcessing(false);
      return;
    }

    try {
      let initRes = await fetch(`${API_URL}/api/payments/payu/initiate`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
      });

      if (initRes.status === 401) {
        localStorage.removeItem("dca_token");
        token = await ensureValidToken();
        if (token) {
          initRes = await fetch(`${API_URL}/api/payments/payu/initiate`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ plan }),
          });
        }
      }

      const initData = (await initRes.json()) as {
        success: boolean;
        message?: string;
        action?: string;
        payment?: PayuFormPayload;
      };

      if (!initRes.ok || !initData.success || !initData.action || !initData.payment) {
        setPaymentError(initData.message || "Failed to initiate PayU payment.");
        setIsProcessing(false);
        return;
      }

      submitPayuForm(initData.action, initData.payment);
    } catch {
      setPaymentError("Network error. Failed to initiate PayU payment.");
      setIsProcessing(false);
    }
  };

  const handleArtistPayment = async () => {
    if (gateway === "payu") {
      await initiatePayuFlow("ARTIST_PREMIUM");
      return;
    }

    if (isProcessing) return;
    setIsProcessing(true);
    setPaymentError(null);

    const token = await ensureValidToken();
    if (!token) {
      setPaymentError("Authentication required. Please login again.");
      setIsProcessing(false);
      return;
    }

    try {
      // 1. Create Payment Order on Backend (ARTIST_PREMIUM = ₹1,999)
      const orderRes = await fetch(`${API_URL}/api/payments/create-order`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan: "ARTIST_PREMIUM" }),
      });

      const orderData = (await orderRes.json()) as {
        success: boolean;
        message?: string;
        order?: { id: string; razorpayOrderId?: string; amount: number };
      };

      if (!orderRes.ok || !orderData.success || !orderData.order) {
        setPaymentError(orderData.message || "Failed to create payment order.");
        setIsProcessing(false);
        return;
      }

      const paymentRecordId = orderData.order.id;

      // 2. Launch Gateway Checkout
      await launchRazorpayCheckout({
        name: session?.identifier || session?.email || "Artist Member",
        email: session?.email || "artist@example.com",
        contact: session?.identifier || "9876543210",
        amount: orderData.order.amount,
        order_id: orderData.order.razorpayOrderId || paymentRecordId,
        description: "Artist 3-Month Premium Membership — ₹1,999",
        onSuccess: async (rzpRes) => {
          try {
            // 3. Verify Payment on Backend
            const verifyRes = await fetch(`${API_URL}/api/payments/verify`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: rzpRes.razorpay_order_id || orderData.order?.razorpayOrderId || paymentRecordId,
                razorpay_payment_id: rzpRes.razorpay_payment_id,
                razorpay_signature: rzpRes.razorpay_signature,
              }),
            });

            const verifyData = (await verifyRes.json()) as {
              success: boolean;
              message?: string;
            };

            if (verifyRes.ok && verifyData.success) {
              setUserRole("artist");
              await fetchBackendEntitlement();
              setIsProcessing(false);
              setStep("artist_success");
            } else {
              setPaymentError(verifyData.message || "Payment verification failed.");
              setIsProcessing(false);
            }
          } catch {
            setPaymentError("Network error during payment verification.");
            setIsProcessing(false);
          }
        },
        onDismiss: () => {
          setIsProcessing(false);
        },
      });
    } catch {
      setPaymentError("Network error. Failed to initiate payment.");
      setIsProcessing(false);
    }
  };

  const handleBrandPayment = async () => {
    if (gateway === "payu") {
      await initiatePayuFlow("BRAND_PREMIUM");
      return;
    }

    if (isProcessing) return;
    setIsProcessing(true);
    setPaymentError(null);

    const token = await ensureValidToken();
    if (!token) {
      setPaymentError("Authentication required. Please login again.");
      setIsProcessing(false);
      return;
    }

    try {
      // 1. Create Payment Order on Backend (BRAND_PREMIUM = ₹9,999)
      const orderRes = await fetch(`${API_URL}/api/payments/create-order`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan: "BRAND_PREMIUM" }),
      });

      const orderData = (await orderRes.json()) as {
        success: boolean;
        message?: string;
        order?: { id: string; razorpayOrderId?: string; amount: number };
      };

      if (!orderRes.ok || !orderData.success || !orderData.order) {
        setPaymentError(orderData.message || "Failed to create payment order.");
        setIsProcessing(false);
        return;
      }

      const paymentRecordId = orderData.order.id;

      // 2. Launch Gateway Checkout
      await launchRazorpayCheckout({
        name: session?.identifier || session?.email || "Brand Casting Account",
        email: session?.email || "brand@example.com",
        contact: session?.identifier || "9876543210",
        amount: orderData.order.amount,
        order_id: orderData.order.razorpayOrderId || paymentRecordId,
        description: "Brand 3-Month Premium Casting Account — ₹9,999",
        onSuccess: async (rzpRes) => {
          try {
            // 3. Verify Payment on Backend
            const verifyRes = await fetch(`${API_URL}/api/payments/verify`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: rzpRes.razorpay_order_id || orderData.order?.razorpayOrderId || paymentRecordId,
                razorpay_payment_id: rzpRes.razorpay_payment_id,
                razorpay_signature: rzpRes.razorpay_signature,
              }),
            });

            const verifyData = (await verifyRes.json()) as {
              success: boolean;
              message?: string;
            };

            if (verifyRes.ok && verifyData.success) {
              setUserRole("brand");
              await fetchBackendEntitlement();
              setIsProcessing(false);
              setStep("brand_success");
            } else {
              setPaymentError(verifyData.message || "Payment verification failed.");
              setIsProcessing(false);
            }
          } catch {
            setPaymentError("Network error during payment verification.");
            setIsProcessing(false);
          }
        },
        onDismiss: () => {
          setIsProcessing(false);
        },
      });
    } catch {
      setPaymentError("Network error. Failed to initiate payment.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl sm:p-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-black cursor-pointer"
        >
          <X size={18} />
        </button>

        {paymentError && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-center text-xs font-semibold text-red-700">
            {paymentError}
          </div>
        )}

        {/* =========================================================
            STEP 1: ROLE SELECTION SCREEN (LOGGED-OUT or UNKNOWN ROLE)
        ========================================================= */}
        {step === "role_select" && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                <Sparkles size={14} />
                <span>Delhi Casting Agency</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#111111] sm:text-3xl">
                Choose Your Account Type
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-[#555555] sm:text-sm">
                Please create an account first before purchasing Premium.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* ARTIST OPTION */}
              <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-[#F7F7F5] p-5 transition duration-300 hover:border-[#D4AF37] hover:bg-white shadow-xs">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-2xl text-[#D4AF37]">
                    🎭
                  </div>
                  <h3 className="mt-4 font-serif text-base font-bold text-[#111111]">
                    ARTIST
                  </h3>
                  <p className="mt-2 text-xs text-[#555555]">
                    Create and manage your artist profile
                  </p>
                  <div className="mt-3 inline-block rounded-full bg-[#D4AF37]/15 px-3 py-1 text-[11px] font-bold text-[#D4AF37]">
                    Free Artist Registration
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={() => handleSelectRole("artist")}
                  className="mt-6 w-full py-3 text-xs font-bold uppercase tracking-wider"
                >
                  <span>REGISTER AS ARTIST</span>
                  <ArrowRight size={14} className="ml-1.5" />
                </Button>
              </div>

              {/* BRAND / CASTING PROFESSIONAL OPTION */}
              <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-[#F7F7F5] p-5 transition duration-300 hover:border-[#D4AF37] hover:bg-white shadow-xs">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-2xl text-[#D4AF37]">
                    🏢
                  </div>
                  <h3 className="mt-4 font-serif text-base font-bold text-[#111111]">
                    BRAND / CASTING PROFESSIONAL
                  </h3>
                  <p className="mt-2 text-xs text-[#555555]">
                    Find talent and manage casting requirements
                  </p>
                  <div className="mt-3 inline-block rounded-full bg-gray-200 px-3 py-1 text-[11px] font-bold text-[#333333]">
                    Brand Account • ₹9,999
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={() => handleSelectRole("brand")}
                  className="mt-6 w-full py-3 text-xs font-bold uppercase tracking-wider"
                >
                  <span>REGISTER AS BRAND</span>
                  <ArrowRight size={14} className="ml-1.5" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            ARTIST CHECKOUT (₹1,999 / 3 MONTHS)
        ========================================================= */}
        {step === "artist_checkout" && (
          isAlreadyPremium ? (
            <div className="space-y-6 text-center">
              <div className="mx-auto mb-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>Active Premium Member</span>
              </div>
              <h2 className="font-sans text-2xl font-extrabold text-[#111111] sm:text-3xl">
                Your Premium Membership is Active
              </h2>
              <p className="text-xs text-[#555555] leading-relaxed max-w-md mx-auto">
                Your DCA Premium artist profile is active and receiving priority casting alerts, WhatsApp updates, and enhanced profile discovery.
              </p>
              <Button
                type="button"
                onClick={() => {
                  onClose();
                  router.push("/dashboard");
                }}
                className="w-full py-3.5 text-xs font-bold uppercase tracking-wider bg-[#111111] hover:bg-[#D4AF37] text-white"
              >
                <span>Go to Artist Dashboard</span>
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <div className="mx-auto mb-2 inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                  <UserCheck size={14} />
                  <span>Artist Premium Plan</span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#111111] sm:text-3xl">
                  3 Months Premium Access
                </h2>
                <div className="mt-3 flex items-end justify-center gap-1">
                  <span className="mb-1 text-xl font-bold text-[#D4AF37]">₹</span>
                  <span className="text-5xl font-extrabold text-[#D4AF37]">
                    1,999
                  </span>
                </div>
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-gray-500">
                  One-time payment • Valid for 3 months
                </p>
              </div>

              <div className="space-y-2.5 rounded-2xl border border-gray-200 bg-[#F7F7F5] p-5 text-xs text-[#333333]">
                {[
                  "3-Month Premium Artist Membership",
                  "Verified Casting Opportunities & WhatsApp Alerts",
                  "Priority Profile Visibility in Talent Search",
                  "Bollywood, OTT & TV Project Briefs",
                  "3 Months Access to Active Projects",
                ].map((perk) => (
                  <div key={perk} className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="shrink-0 text-[#D4AF37]" />
                    <span className="font-medium">{perk}</span>
                  </div>
                ))}

                <div className="mt-2 pt-2 border-t border-gray-200 text-[11px] text-[#666666] leading-relaxed">
                  * Note: Premium membership provides enhanced discovery and casting alerts. Per platform rules, all profiles undergo standard admin review for public publishing.
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                  Select Payment Gateway
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setGateway("razorpay")}
                    className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-bold transition cursor-pointer ${
                      gateway === "razorpay"
                        ? "border-[#D4AF37] bg-[#D4AF37]/10 text-black shadow-xs"
                        : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span>Razorpay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGateway("payu")}
                    className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-bold transition cursor-pointer ${
                      gateway === "payu"
                        ? "border-[#D4AF37] bg-[#D4AF37]/10 text-black shadow-xs"
                        : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span>PayU Hosted</span>
                  </button>
                </div>
              </div>

              <Button
                type="button"
                disabled={isProcessing}
                onClick={handleArtistPayment}
                className="w-full py-4 text-xs font-bold uppercase tracking-wider"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Connecting to Payment Gateway...</span>
                  </span>
                ) : (
                  <>
                    <span>Proceed with {gateway === "payu" ? "PayU" : "Razorpay"} — ₹1,999</span>
                    <ArrowRight size={16} className="ml-2" />
                  </>
                )}
              </Button>
            </div>
          )
        )}

        {/* =========================================================
            BRAND CHECKOUT (₹9,999 / 3 MONTHS)
        ========================================================= */}
        {step === "brand_checkout" && (
          isAlreadyPremium ? (
            <div className="space-y-6 text-center">
              <div className="mx-auto mb-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>Active Premium Account</span>
              </div>
              <h2 className="font-sans text-2xl font-extrabold text-[#111111] sm:text-3xl">
                Your Brand Premium Account is Active
              </h2>
              <p className="text-xs text-[#555555] leading-relaxed max-w-md mx-auto">
                Your DCA Premium Brand account is active with direct access to verified talent rosters and unlimited casting posts.
              </p>
              <Button
                type="button"
                onClick={() => {
                  onClose();
                  router.push("/dashboard");
                }}
                className="w-full py-3.5 text-xs font-bold uppercase tracking-wider bg-[#111111] hover:bg-[#D4AF37] text-white"
              >
                <span>Go to Dashboard</span>
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <div className="mx-auto mb-2 inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                  <Building2 size={14} />
                  <span>Brand &amp; Casting Plan</span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#111111] sm:text-3xl">
                  3 Months Premium Casting Access
                </h2>
                <div className="mt-4 flex items-end justify-center gap-1">
                  <span className="mb-1 text-xl font-bold text-[#D4AF37]">₹</span>
                  <span className="text-5xl font-extrabold text-[#D4AF37]">
                    9,999
                  </span>
                </div>
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-gray-500">
                  One-time payment • Valid for 3 months
                </p>
              </div>

              <div className="space-y-2.5 rounded-2xl border border-gray-200 bg-[#F7F7F5] p-5 text-xs text-[#333333]">
                {[
                  "3-Month Premium Casting Account",
                  "Direct Access to Verified Talent Rosters",
                  "Post Unlimited Casting Calls & Auditions",
                  "Priority Talent Sourcing Support",
                  "Advanced Applicant Filtering",
                  "3 Months Access to Talent Directory",
                ].map((perk) => (
                  <div key={perk} className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="shrink-0 text-[#D4AF37]" />
                    <span className="font-medium">{perk}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                  Select Payment Gateway
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setGateway("razorpay")}
                    className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-bold transition cursor-pointer ${
                      gateway === "razorpay"
                        ? "border-[#D4AF37] bg-[#D4AF37]/10 text-black shadow-xs"
                        : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span>Razorpay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGateway("payu")}
                    className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-bold transition cursor-pointer ${
                      gateway === "payu"
                        ? "border-[#D4AF37] bg-[#D4AF37]/10 text-black shadow-xs"
                        : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span>PayU Hosted</span>
                  </button>
                </div>
              </div>

              <Button
                type="button"
                disabled={isProcessing}
                onClick={handleBrandPayment}
                className="w-full py-4 text-xs font-bold uppercase tracking-wider"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Connecting to Payment Gateway...</span>
                  </span>
                ) : (
                  <>
                    <span>Proceed with {gateway === "payu" ? "PayU" : "Razorpay"} — ₹9,999</span>
                    <ArrowRight size={16} className="ml-2" />
                  </>
                )}
              </Button>
            </div>
          )
        )}

        {/* =========================================================
            ARTIST SUCCESS SCREEN
        ========================================================= */}
        {step === "artist_success" && (
          <div className="space-y-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <ShieldCheck size={36} />
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-[#111111] sm:text-3xl">
                Payment Order Submitted
              </h2>
              <p className="mt-2 text-xs text-[#555555]">
                Your payment order has been submitted for backend verification.
              </p>
            </div>

            <div className="mx-auto max-w-sm space-y-3 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 text-left text-xs font-semibold text-emerald-900">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>Payment details received</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>Pending server-side payment verification</span>
              </div>
            </div>

            <Button
              type="button"
              onClick={() => {
                onClose();
                router.push("/dashboard");
              }}
              className="w-full py-4 text-xs font-bold uppercase tracking-wider"
            >
              <span>Return to Artist Dashboard</span>
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        )}

        {/* =========================================================
            BRAND SUCCESS SCREEN
        ========================================================= */}
        {step === "brand_success" && (
          <div className="space-y-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <ShieldCheck size={36} />
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-[#111111] sm:text-3xl">
                You&apos;re now a Premium Casting Account
              </h2>
              <p className="mt-2 text-xs text-[#555555]">
                Your premium casting features have been activated successfully.
              </p>
            </div>

            <div className="mx-auto max-w-sm space-y-3 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 text-left text-xs font-semibold text-emerald-900">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>Premium membership activated</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>Premium casting features enabled</span>
              </div>
            </div>

            <Button
              type="button"
              onClick={() => {
                onClose();
                router.push("/dashboard");
              }}
              className="w-full py-4 text-xs font-bold uppercase tracking-wider"
            >
              <span>Go to Dashboard</span>
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
