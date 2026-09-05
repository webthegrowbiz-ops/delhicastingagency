"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Lock,
  ShieldCheck,
  Smartphone,
  WalletCards,
} from "lucide-react";

import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/config/env";
import { getAuthToken, fetchBackendEntitlement } from "@/lib/auth";

type PaymentMethod = "upi" | "card" | "netbanking";

export default function PaymentPage() {
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");

  const [agreed, setAgreed] = useState(false);
  const [processing, setProcessing] = useState(false);

  /*
   * Check whether the artist completed Step 2.
   *
   * Frontend-only flow:
   * - No backend
   * - No API
   * - No JWT
   * - No database
   * - No setState() inside the effect
   */
  useEffect(() => {
    const registration = sessionStorage.getItem("artist-registration-complete");

    if (!registration) {
      router.replace("/profile/setup");
    }
  }, [router]);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  /*
   * Backend-connected payment processing.
   */
  const handlePayment = async () => {
    if (!agreed || processing) {
      return;
    }

    setProcessing(true);
    setErrorMsg(null);

    const token = getAuthToken();
    if (!token) {
      setErrorMsg("Authentication token required. Please login again.");
      setProcessing(false);
      return;
    }

    try {
      // 1. Create order on backend
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
        order?: { id: string };
      };

      if (!orderRes.ok || !orderData.success || !orderData.order) {
        setErrorMsg(orderData.message || "Failed to create payment order.");
        setProcessing(false);
        return;
      }

      // 2. Verify payment on backend
      const verifyRes = await fetch(`${API_URL}/api/payments/verify`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentId: orderData.order.id,
        }),
      });

      const verifyData = (await verifyRes.json()) as {
        success: boolean;
        message?: string;
      };

      if (verifyRes.ok && verifyData.success) {
        sessionStorage.setItem("payment-status", "success");
        await fetchBackendEntitlement();
        setProcessing(false);
        router.push("/payment/success/");
      } else {
        setErrorMsg(verifyData.message || "Payment verification failed.");
        setProcessing(false);
      }
    } catch {
      setErrorMsg("Network error. Unable to process payment.");
      setProcessing(false);
    }
  };

  return (
    <main className="bg-white min-h-screen text-[#111111]">
      {/* ================================================================ */}
      {/* HERO                                                             */}
      {/* ================================================================ */}

      <PageHero
        eyebrow="Membership Payment"
        title="Complete Your Registration"
        description="Review your registration summary and continue through the payment interface."
      />

      {/* ================================================================ */}
      {/* BREADCRUMB                                                       */}
      {/* ================================================================ */}

      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <Breadcrumb
          items={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: "Register",
              href: "/profile/setup",
            },
            {
              label: "Artist Profile",
              href: "/profile/setup",
            },
            {
              label: "Payment",
            },
          ]}
        />
      </div>

      {/* ================================================================ */}
      {/* PAYMENT SECTION                                                  */}
      {/* ================================================================ */}

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* ============================================================ */}
          {/* ORDER SUMMARY                                                 */}
          {/* ============================================================ */}

          <Reveal>
            <div className="rounded-3xl border border-gray-200 bg-[#F7F7F5] p-7 shadow-xs lg:sticky lg:top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                Registration Summary
              </p>

              <h2 className="mt-4 font-bold tracking-tight text-2xl text-[#111111]">
                Artist Membership
              </h2>

              <div className="mt-7 space-y-4">
                <SummaryItem
                  icon={<CheckCircle2 className="h-4 w-4" />}
                  label="Artist registration"
                />

                <SummaryItem
                  icon={<CheckCircle2 className="h-4 w-4" />}
                  label="Artist profile"
                />

                <SummaryItem
                  icon={<CheckCircle2 className="h-4 w-4" />}
                  label="Portfolio information"
                />

                <SummaryItem
                  icon={<CheckCircle2 className="h-4 w-4" />}
                  label="Platform access"
                />
              </div>

              <div className="my-7 h-px bg-gray-200" />

              {/* Membership Fee */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#444444]">Membership Fee</span>

                <span className="font-bold tracking-tight text-xl text-[#D4AF37]">
                  As applicable
                </span>
              </div>

              {/* Price Disclaimer */}
              <div className="mt-5 rounded-2xl border border-[#D4AF37]/30 bg-white p-4 shadow-2xs">
                <p className="text-xs leading-6 text-[#555555]">
                  The provided website structure document does not specify an
                  exact membership amount. Therefore, no unverified price is
                  displayed here.
                </p>
              </div>

              {/* Terms Notice */}
              <div className="mt-6 flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#D4AF37]" />

                <p className="text-xs leading-6 text-[#666666]">
                  Please review the applicable terms, cancellation and refund
                  information before completing payment.
                </p>
              </div>
            </div>
          </Reveal>

          {/* ============================================================ */}
          {/* PAYMENT CARD                                                   */}
          {/* ============================================================ */}

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#F7F7F5] p-7 md:p-9 shadow-xs">
              {/* Header */}
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                    Secure Checkout
                  </p>

                  <h2 className="mt-3 font-bold tracking-tight text-3xl text-[#111111]">
                    Payment
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-[#444444]">
                    Choose a payment method to continue.
                  </p>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                  <Lock className="h-5 w-5" />
                </div>
              </div>

              {/* ======================================================== */}
              {/* PAYMENT METHODS                                            */}
              {/* ======================================================== */}

              <div className="mt-8 space-y-3">
                <PaymentMethod
                  active={paymentMethod === "upi"}
                  icon={<Smartphone className="h-5 w-5" />}
                  title="UPI"
                  description="Pay using your preferred UPI application."
                  onClick={() => setPaymentMethod("upi")}
                />

                <PaymentMethod
                  active={paymentMethod === "card"}
                  icon={<CreditCard className="h-5 w-5" />}
                  title="Credit / Debit Card"
                  description="Use a supported credit or debit card."
                  onClick={() => setPaymentMethod("card")}
                />

                <PaymentMethod
                  active={paymentMethod === "netbanking"}
                  icon={<WalletCards className="h-5 w-5" />}
                  title="Net Banking"
                  description="Continue using your bank's online payment service."
                  onClick={() => setPaymentMethod("netbanking")}
                />
              </div>

              {/* ======================================================== */}
              {/* SELECTED METHOD                                            */}
              {/* ======================================================== */}

              <div className="mt-7 rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#666666]">
                  Selected Method
                </p>

                <p className="mt-2 text-base font-medium text-[#111111]">
                  {paymentMethod === "upi"
                    ? "UPI Payment"
                    : paymentMethod === "card"
                      ? "Credit / Debit Card"
                      : "Net Banking"}
                </p>

                <p className="mt-2 text-sm leading-6 text-[#666666]">
                  This is a frontend payment interface. No real payment gateway
                  is connected.
                </p>
              </div>

              {/* ======================================================== */}
              {/* AGREEMENT                                                  */}
              {/* ======================================================== */}

              <label className="mt-7 flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(event) => setAgreed(event.target.checked)}
                  className="mt-1 h-4 w-4 accent-[#D4AF37]"
                />

                <span className="text-sm leading-6 text-[#444444]">
                  I have reviewed the applicable membership information, terms
                  and refund/cancellation conditions and understand that
                  membership does not guarantee casting selection or work.
                </span>
              </label>

              {errorMsg && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-center text-xs font-semibold text-red-700">
                  {errorMsg}
                </div>
              )}

              {/* ======================================================== */}
              {/* PAYMENT BUTTON                                             */}
              {/* ======================================================== */}

              <Button
                type="button"
                onClick={handlePayment}
                disabled={!agreed || processing}
                className="mt-8 w-full justify-center bg-[#D4AF37] text-white hover:bg-[#c59b27] disabled:bg-gray-300 disabled:text-gray-500"
              >
                {processing ? "Processing..." : "Continue to Payment"}

                {!processing && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>

              {!agreed && (
                <p className="mt-3 text-center text-xs text-[#666666]">
                  Please accept the acknowledgement above to continue.
                </p>
              )}

              {/* ======================================================== */}
              {/* SECURITY                                                   */}
              {/* ======================================================== */}

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-gray-200 pt-6">
                <SecurityItem text="Secure Interface" />

                <SecurityItem text="Frontend Demo" />

                <SecurityItem text="No Payment Data Stored" />
              </div>
            </div>
          </Reveal>
        </div>

        {/* ============================================================ */}
        {/* BACK BUTTON                                                   */}
        {/* ============================================================ */}

        <div className="mt-8">
          <button
            type="button"
            onClick={() => router.push("/profile/setup")}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#666666] transition-colors hover:text-[#D4AF37]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Artist Profile
          </button>
        </div>
      </section>
    </main>
  );
}

/* ======================================================================== */
/* SUMMARY ITEM                                                             */
/* ======================================================================== */

function SummaryItem({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
        {icon}
      </div>

      <span className="text-sm text-[#444444]">{label}</span>
    </div>
  );
}

/* ======================================================================== */
/* PAYMENT METHOD                                                           */
/* ======================================================================== */

function PaymentMethod({
  active,
  icon,
  title,
  description,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-300 ${
        active
          ? "border-[#D4AF37]/50 bg-[#D4AF37]/10"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      {/* Icon */}
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          active ? "bg-[#D4AF37]/20 text-[#D4AF37]" : "bg-gray-100 text-[#555555]"
        }`}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <h3 className="font-medium text-[#111111]">{title}</h3>

        <p className="mt-1 text-xs leading-5 text-[#666666]">{description}</p>
      </div>

      {/* Radio */}
      <div
        className={`h-5 w-5 shrink-0 rounded-full border ${
          active ? "border-[#D4AF37] bg-[#D4AF37]" : "border-gray-300"
        }`}
      >
        {active && <div className="m-1 h-2.5 w-2.5 rounded-full bg-white" />}
      </div>
    </button>
  );
}

/* ======================================================================== */
/* SECURITY ITEM                                                            */
/* ======================================================================== */

function SecurityItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-[#666666]">
      <ShieldCheck className="h-4 w-4 text-[#D4AF37]" />

      {text}
    </div>
  );
}
