"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  Users,
} from "lucide-react";

import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export default function CommunityAccessPage() {
  const router = useRouter();

  /*
   * Frontend-only community access page.
   *
   * No backend
   * No login
   * No API
   * No database
   * No real payment verification
   */

  const handleCommunityAccess = () => {
    /*
     * No real external community URL is provided by the
     * project/document, so we do not invent one.
     *
     * For now this button provides the intended UI action.
     */
    console.log("Community access selected");
  };

  return (
    <main className="bg-white min-h-screen text-[#111111]">
      {/* ================================================================ */}
      {/* PAGE HERO                                                        */}
      {/* ================================================================ */}

      <PageHero
        eyebrow="Community Access"
        title="Welcome to the Artist Community"
        description="Your registration journey is complete. Continue to the community access step."
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
              label: "Community Access",
            },
          ]}
        />
      </div>

      {/* ================================================================ */}
      {/* MAIN CONTENT                                                     */}
      {/* ================================================================ */}

      <section className="mx-auto max-w-5xl px-6 py-12 lg:px-8 lg:py-20">
        <Reveal>
          <div className="overflow-hidden rounded-[32px] border border-gray-200 bg-[#F7F7F5] p-7 text-center md:p-12 shadow-xs">
            {/* ========================================================== */}
            {/* SUCCESS ICON                                                 */}
            {/* ========================================================== */}

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37] text-white">
                <Users className="h-8 w-8" />
              </div>
            </div>

            {/* ========================================================== */}
            {/* HEADING                                                     */}
            {/* ========================================================== */}

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
              Registration Complete
            </p>

            <h1 className="mx-auto mt-4 max-w-3xl font-bold tracking-tight text-3xl text-[#111111] md:text-5xl">
              Your next step is community access.
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#444444]">
              Stay connected with the platform and follow the available
              community instructions after completing your registration.
            </p>

            {/* ========================================================== */}
            {/* STATUS CARD                                                  */}
            {/* ========================================================== */}

            <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-gray-200 bg-white p-6 text-left md:p-8 shadow-2xs">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#D4AF37]" />

                <h2 className="font-semibold text-[#111111]">
                  Registration Journey
                </h2>
              </div>

              <div className="mt-7 space-y-4">
                <JourneyItem
                  number="01"
                  title="Artist Registration"
                  completed
                />

                <JourneyItem number="02" title="Artist Profile" completed />

                <JourneyItem number="03" title="Payment Flow" completed />

                <JourneyItem number="04" title="Community Access" active />
              </div>
            </div>

            {/* ========================================================== */}
            {/* COMMUNITY CARD                                               */}
            {/* ========================================================== */}

            <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-[#D4AF37]/30 bg-white p-7 text-left md:p-8 shadow-2xs">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                  <MessageCircle className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-bold tracking-tight text-2xl text-[#111111]">
                    Join the Artist Community
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-[#444444]">
                    Use the community access option below to continue. Community
                    announcements, updates and relevant information can be
                    shared through the designated community channel.
                  </p>
                </div>
              </div>

              {/* Community CTA */}
              <div className="mt-7">
                <Button
                  type="button"
                  onClick={handleCommunityAccess}
                  className="group w-full justify-center sm:w-auto bg-[#D4AF37] text-white hover:bg-[#c59b27]"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Access Community
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>

            {/* ========================================================== */}
            {/* IMPORTANT NOTICE                                             */}
            {/* ========================================================== */}

            <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-gray-200 bg-white p-5">
              <div className="flex items-start gap-3 text-left">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#D4AF37]" />

                <p className="text-sm leading-7 text-[#666666]">
                  Community access is currently represented as a frontend
                  interface. No external community URL or backend connection has
                  been provided, so no unverified link has been added.
                </p>
              </div>
            </div>

            {/* ========================================================== */}
            {/* BACK TO HOME                                                  */}
            {/* ========================================================== */}

            <div className="mt-8 flex justify-center">
              <Button
                type="button"
                variant="ghost"
                onClick={() => router.push("/")}
                className="text-[#111111] hover:bg-gray-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

/* ======================================================================== */
/* JOURNEY ITEM                                                             */
/* ======================================================================== */

function JourneyItem({
  number,
  title,
  completed,
  active,
}: {
  number: string;
  title: string;
  completed?: boolean;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 rounded-2xl border p-4 ${
        active
          ? "border-[#D4AF37]/50 bg-[#D4AF37]/10"
          : "border-gray-200 bg-[#F7F7F5]"
      }`}
    >
      {/* Number / Check */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          completed
            ? "bg-[#D4AF37] text-white"
            : active
              ? "bg-[#D4AF37]/20 text-[#D4AF37]"
              : "bg-gray-200 text-[#666666]"
        }`}
      >
        {completed ? (
          <Check className="h-5 w-5" />
        ) : (
          <span className="text-xs font-semibold">{number}</span>
        )}
      </div>

      {/* Text */}
      <div className="flex-1">
        <p
          className={`text-sm font-medium ${
            active ? "text-[#D4AF37]" : "text-[#111111]"
          }`}
        >
          {title}
        </p>

        <p className="mt-1 text-xs text-[#666666]">
          {completed ? "Completed" : active ? "Current step" : "Pending"}
        </p>
      </div>
    </div>
  );
}
