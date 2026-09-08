"use client";

import { ShieldCheck, Sparkles } from "lucide-react";

import { Reveal } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";
import { STATS } from "@/lib/constants";

const MARQUEE_ITEMS = [
  "🎬 VERIFIED CASTING OPPORTUNITIES",
  "⭐ 3-MONTH PREMIUM MEMBERSHIP",
  "📱 DAILY WHATSAPP UPDATES",
  "🎥 BOLLYWOOD • OTT • TV • ADS",
  "🔒 100% SECURE ONLINE PAYMENT",
];

export function ProofStrip() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section className="relative overflow-hidden border-y border-gray-200 bg-[#F7F7F5]">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06),transparent_70%)]" />

      {/* Top Marquee */}
      <div className="relative overflow-hidden border-b border-gray-200 py-4">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 whitespace-nowrap border-r border-gray-200 px-8"
            >
              <Sparkles size={14} className="text-[#D4AF37] opacity-80" />

              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#333333]">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <Reveal>
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-5 py-2 text-sm font-medium text-[#D4AF37]">
              <ShieldCheck size={16} />
              Trusted Across India
            </div>

            <h2 className="mt-6 text-3xl font-bold text-[#111111] md:text-5xl">
              Thousands of Artists
              <span className="block text-[#D4AF37]">
                Trust Delhi Casting Agency
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#444444]">
              Join one of India&apos;s growing communities of aspiring actors,
              models and performers receiving verified casting opportunities.
            </p>
          </div>

          <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-6">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group flex min-h-[170px] flex-col items-center justify-center rounded-[28px] border border-gray-200 bg-white px-6 py-8 text-center shadow-sm backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#D4AF37]/50 hover:shadow-md"
              >
                <Counter target={stat.target} label={stat.label} />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
