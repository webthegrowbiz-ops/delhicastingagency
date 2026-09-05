"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { getProfileCreateOrSetupUrl } from "@/lib/auth";

type Step = {
  num: string;
  tag: string;
  title: string;
  body: string;
};

const STEPS: Step[] = [
  {
    num: "01",
    tag: "REGISTER",
    title: "Create your profile",
    body: "Start your artist registration in under two minutes.",
  },
  {
    num: "02",
    tag: "PAY SECURELY",
    title: "One-time payment",
    body: "Complete your 3-month membership via Razorpay, UPI or card.",
  },
  {
    num: "03",
    tag: "COMPLETE PROFILE",
    title: "Add your details",
    body: "So casting teams can find the right fit for each project.",
  },
  {
    num: "04",
    tag: "GO LIVE",
    title: "Join WhatsApp",
    body: "Start receiving verified, daily casting calls.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 pt-24 overflow-hidden bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-[#D4AF37] tracking-[0.3em] text-sm uppercase font-semibold">
            The Reel
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#111111]">
            How It Works
          </h2>
        </div>

        <Reveal>
          {/* ================= DESKTOP ================= */}
          <div className="hidden md:flex relative items-center justify-between overflow-visible pt-10">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className="relative flex flex-col items-center"
              >
                <Card step={step} />

                {/* DESKTOP ARROW */}
                {i !== STEPS.length - 1 && (
                  <svg
                    className={`absolute ${
                      i % 2 === 0 ? "-top-15" : "top-full mt-0"
                    } left-full`}
                    width="120"
                    height="70"
                    viewBox="0 0 120 60"
                  >
                    <defs>
                      <marker
                        id={`arrow-d-${i}`}
                        markerWidth="8"
                        markerHeight="8"
                        refX="4"
                        refY="4"
                        orient="auto"
                      >
                        <path d="M0,0 L8,4 L0,8 Z" fill="#D4AF37" />
                      </marker>
                    </defs>

                    <path
                      d={
                        i % 2 === 0
                          ? "M0 50 C 30 -10, 70 -10, 100 30"
                          : "M10 3 C 30 80, 90 70, 110 20"
                      }
                      stroke="#D4AF37"
                      strokeWidth="2.5"
                      fill="transparent"
                      strokeLinecap="round"
                      markerEnd={`url(#arrow-d-${i})`}
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>

          {/* ================= MOBILE ================= */}
          <div className="md:hidden flex flex-col gap-0">
            {STEPS.map((step, i) => {
              const isRight = i % 2 === 1;

              return (
                <div key={step.num} className="relative">
                  {/* CARDS */}
                  <div className="flex w-full">
                    {!isRight ? (
                      <div className="w-full flex justify-start">
                        <Card step={step} />
                      </div>
                    ) : (
                      <div className="w-full flex justify-end">
                        <Card step={step} />
                      </div>
                    )}
                  </div>

                  {/* MOBILE ARROW */}
                  {i !== STEPS.length - 1 && (
                    <div className="md:hidden flex justify-center mt-[-20px] mb-[-45px]">
                      <svg width="120" height="70" viewBox="7 0 120 80">
                        <defs>
                          <marker
                            id="arrowMobile"
                            markerWidth="8"
                            markerHeight="8"
                            refX="4"
                            refY="4"
                            orient="auto"
                          >
                            <path d="M0,0 L8,4 L0,8 Z" fill="#D4AF37" />
                          </marker>
                        </defs>

                        <path
                          d={
                            isRight
                              ? "M110 10 C 60 100, 60 -10, 10 70"
                              : "M10 10 C 60 100, 60 -10, 110 70"
                          }
                          stroke="#D4AF37"
                          strokeWidth="2.5"
                          fill="transparent"
                          strokeLinecap="round"
                          markerEnd="url(#arrowMobile)"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= CARD ================= */
function Card({ step }: { step: Step }) {
  const content = (
    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 w-[260px] transition hover:border-[#D4AF37]">
      <span
        className="text-[48px] font-bold text-transparent"
        style={{ WebkitTextStroke: "1.5px #D4AF37" }}
      >
        {step.num}
      </span>

      <div className="mt-2 text-xs tracking-widest text-[#D92D20] font-semibold uppercase">
        {step.tag}
      </div>

      <h4 className="mt-2 text-lg font-semibold text-[#111111]">{step.title}</h4>

      <p className="mt-1 text-xs text-[#555555]">{step.body}</p>
    </div>
  );

  if (step.num === "01") {
    return (
      <Link href={getProfileCreateOrSetupUrl()} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
