"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, CheckCircle2, ShieldCheck } from "lucide-react";

import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

import { fetchBackendEntitlement, getUserSession } from "@/lib/auth";

export default function PaymentSuccessPage() {
  const router = useRouter();

  const [isBrand, setIsBrand] = useState(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const planParam = searchParams.get("plan");
      if (planParam && planParam.toLowerCase().includes("brand")) {
        return true;
      }
      const session = getUserSession();
      return (
        session?.role?.toLowerCase() === "brand" ||
        session?.premiumEntitlement?.plan === "BRAND_PREMIUM"
      );
    }
    return false;
  });

  const [txnId, setTxnId] = useState(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      return (
        searchParams.get("txnId") ||
        searchParams.get("txnid") ||
        sessionStorage.getItem("dca_last_txnid") ||
        ""
      );
    }
    return "";
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const statusParam = searchParams.get("status");
    const txnIdParam = searchParams.get("txnId") || searchParams.get("txnid");
    const planParam = searchParams.get("plan");

    const session = getUserSession();
    const brandDetected =
      (planParam && planParam.toLowerCase().includes("brand")) ||
      session?.role?.toLowerCase() === "brand" ||
      session?.premiumEntitlement?.plan === "BRAND_PREMIUM";

    if (brandDetected) {
      setIsBrand(true);
    }

    if (txnIdParam) {
      setTxnId(txnIdParam);
      sessionStorage.setItem("dca_last_txnid", txnIdParam);
    } else {
      const savedTxn =
        sessionStorage.getItem("dca_last_txnid") ||
        session?.premiumEntitlement?.paymentId;
      if (savedTxn) {
        setTxnId(savedTxn);
      }
    }

    if (statusParam === "success" || statusParam === "paid" || txnIdParam) {
      sessionStorage.setItem("payment-status", "success");
      fetchBackendEntitlement()
        .then((res) => {
          if (res.entitlement?.plan === "BRAND_PREMIUM") {
            setIsBrand(true);
          }
          if (res.entitlement?.paymentId && !txnIdParam) {
            setTxnId(res.entitlement.paymentId);
          }
        })
        .catch(() => {});
    } else {
      const paymentStatus = sessionStorage.getItem("payment-status");
      if (paymentStatus !== "success" && !session?.isPremium) {
        router.replace("/payment/");
      } else {
        fetchBackendEntitlement()
          .then((res) => {
            if (res.entitlement?.plan === "BRAND_PREMIUM") {
              setIsBrand(true);
            }
            if (res.entitlement?.paymentId && !txnIdParam) {
              setTxnId(res.entitlement.paymentId);
            }
          })
          .catch(() => {});
      }
    }
  }, [router]);

  return (
    <main className="bg-white min-h-screen text-[#111111]">
      {/* ================================================================ */}
      {/* PAGE HERO                                                        */}
      {/* ================================================================ */}

      <PageHero
        eyebrow="Payment Confirmation"
        title="Payment Successful"
        description={
          isBrand
            ? "Your Brand Premium Casting Account has been activated successfully."
            : "Your Artist Premium membership has been activated successfully."
        }
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
              label: "Payment",
              href: "/payment/",
            },
            {
              label: "Success",
            },
          ]}
        />
      </div>

      {/* ================================================================ */}
      {/* SUCCESS SECTION                                                   */}
      {/* ================================================================ */}

      <section className="mx-auto max-w-4xl px-6 py-12 lg:px-8 lg:py-20">
        <Reveal>
          <div className="overflow-hidden rounded-[32px] border border-gray-200 bg-[#F7F7F5] p-7 text-center md:p-12 shadow-xs">
            {/* ========================================================== */}
            {/* SUCCESS ICON                                                 */}
            {/* ========================================================== */}

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37] text-white">
                <Check className="h-8 w-8" />
              </div>
            </div>

            {/* ========================================================== */}
            {/* STATUS                                                       */}
            {/* ========================================================== */}

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
              Payment Successful
            </p>

            <h1 className="mx-auto mt-4 max-w-2xl font-bold tracking-tight text-3xl text-[#111111] md:text-5xl">
              Payment Successful
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#444444]">
              {isBrand
                ? "Your Brand Premium Casting Account has been activated successfully."
                : "Your Artist Premium membership has been activated successfully."}
            </p>

            {/* ========================================================== */}
            {/* CONFIRMATION CARD                                            */}
            {/* ========================================================== */}

            <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-2xs">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#D4AF37]" />

                <h2 className="font-semibold text-[#111111]">
                  Payment Confirmation
                </h2>
              </div>

              <div className="mt-5 space-y-4">
                <ConfirmationItem
                  label="Membership Plan"
                  value={isBrand ? "Brand Premium" : "Artist Premium"}
                />

                <ConfirmationItem
                  label="Payment Details"
                  value={
                    isBrand
                      ? "₹9,999 paid • 3 months / 90 days"
                      : "₹1,999 paid • 3 months / 90 days"
                  }
                />

                <ConfirmationItem
                  label="Transaction ID"
                  value={txnId || "Verified"}
                />

                <ConfirmationItem label="Status" value="Active / Confirmed" />
              </div>
            </div>

            {/* ========================================================== */}
            {/* IMPORTANT NOTICE                                             */}
            {/* ========================================================== */}

            <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-[#D4AF37]/30 bg-white p-5 shadow-2xs">
              <div className="flex items-start gap-3 text-left">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#D4AF37]" />

                <p className="text-sm leading-7 text-[#444444]">
                  {isBrand
                    ? "Your 90-day Brand Premium Casting Account is now active and verified on Delhi Casting Agency."
                    : "Your 90-day Premium membership is now active and verified on Delhi Casting Agency."}
                </p>
              </div>
            </div>

            {/* ========================================================== */}
            {/* DASHBOARD ACTION BUTTON                                      */}
            {/* ========================================================== */}

            <div className="mt-10 flex justify-center">
              <Button
                type="button"
                onClick={() => router.push("/dashboard/")}
                className="group bg-[#D4AF37] text-white hover:bg-[#c59b27]"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

/* ======================================================================== */
/* CONFIRMATION ITEM                                                        */
/* ======================================================================== */

function ConfirmationItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-5 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
      <span className="text-sm text-[#444444]">{label}</span>

      <span className="text-sm font-medium text-[#D4AF37]">{value}</span>
    </div>
  );
}
