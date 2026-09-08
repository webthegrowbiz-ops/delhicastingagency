"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

// Brand Logo SVG Components
function NetflixLogo() {
  return (
    <svg className="h-6 sm:h-7 w-auto fill-[#E50914]" viewBox="0 0 111 30">
      <path d="M105.06 14.28L110.2 29.17H105.14L102.53 21.68H96.95L94.34 29.17H89.28L94.42 14.28H105.06ZM99.74 13.62L98.24 19.3H101.24L99.74 13.62Z" fill="none" />
      <text x="0" y="22" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="22" letterSpacing="1" fill="#E50914">NETFLIX</text>
    </svg>
  );
}

function PrimeVideoLogo() {
  return (
    <div className="flex items-center gap-1.5 font-black text-[#111111] text-sm sm:text-base tracking-tight">
      <span className="text-[#00A8E1]">prime</span>
      <span className="text-[#111111]">video</span>
      <svg className="w-4 h-2.5 text-[#00A8E1] fill-current" viewBox="0 0 40 15">
        <path d="M0 5 Q 20 15 40 0 L 35 3 L 38 -2 Z" />
      </svg>
    </div>
  );
}

function ZeeTvLogo() {
  return (
    <div className="flex items-center gap-2 px-1">
      <span className="text-base sm:text-lg font-black text-purple-600 tracking-wider">ZEE</span>
      <span className="text-xs font-extrabold text-white px-1.5 py-0.5 bg-purple-600 rounded">TV</span>
    </div>
  );
}

function SonyLogo() {
  return (
    <div className="flex flex-col items-center">
      <span className="text-sm sm:text-base font-black tracking-widest text-[#111111]">SONY</span>
      <span className="text-[9px] font-bold tracking-tighter text-[#D4AF37]">ENTERTAINMENT</span>
    </div>
  );
}

function ColorsTvLogo() {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex -space-x-1">
        <span className="w-2.5 h-2.5 rounded-full bg-pink-500 inline-block opacity-90" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block opacity-90" />
        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block opacity-90" />
      </div>
      <span className="text-xs sm:text-sm font-extrabold text-[#111111] tracking-widest">COLORS</span>
    </div>
  );
}

function DisneyHotstarLogo() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs sm:text-sm font-black text-blue-600 tracking-tight">Disney+</span>
      <span className="text-xs sm:text-sm font-black text-amber-500">hotstar</span>
    </div>
  );
}

function JioCinemaLogo() {
  return (
    <div className="flex items-center gap-1 bg-pink-50 px-2.5 py-1 rounded-lg border border-pink-200">
      <span className="text-xs sm:text-sm font-black text-pink-600">Jio</span>
      <span className="text-xs sm:text-sm font-bold text-gray-900">Cinema</span>
    </div>
  );
}

function YrfLogo() {
  return (
    <div className="flex items-center gap-1.5 font-black text-[#D4AF37] text-xs sm:text-sm tracking-widest border border-[#D4AF37]/50 px-2 py-0.5 rounded">
      <span>YRF</span>
      <span className="text-[9px] text-[#444444] font-semibold">STUDIOS</span>
    </div>
  );
}

function BalajiLogo() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 to-amber-200 text-white flex items-center justify-center text-xs font-black">B</span>
      <span className="text-xs sm:text-sm font-extrabold text-[#111111] tracking-wider">BALAJI</span>
    </div>
  );
}

function MtvLogo() {
  return (
    <div className="flex items-center gap-1 bg-yellow-400 text-black font-black text-xs sm:text-sm px-2 py-0.5 rounded italic">
      <span>M</span>
      <span className="text-[9px] font-bold not-italic text-black/90">TV</span>
    </div>
  );
}

function TimesLogo() {
  return (
    <div className="flex items-center gap-1">
      <span className="text-xs sm:text-sm font-black text-[#111111] tracking-widest border-b border-red-500 pb-0.5">TIMES</span>
      <span className="text-[9px] font-bold text-red-500">NETWORK</span>
    </div>
  );
}

function NdtvLogo() {
  return (
    <div className="flex items-center gap-1 bg-red-600 px-2 py-0.5 rounded text-white font-black text-xs sm:text-sm tracking-tight">
      <span>NDTV</span>
    </div>
  );
}

const BRAND_LOGOS = [
  { id: "netflix", component: NetflixLogo },
  { id: "prime-video", component: PrimeVideoLogo },
  { id: "zee-tv", component: ZeeTvLogo },
  { id: "sony", component: SonyLogo },
  { id: "colors", component: ColorsTvLogo },
  { id: "disney-hotstar", component: DisneyHotstarLogo },
  { id: "jiocinema", component: JioCinemaLogo },
  { id: "yrf", component: YrfLogo },
  { id: "balaji", component: BalajiLogo },
  { id: "mtv", component: MtvLogo },
  { id: "times", component: TimesLogo },
  { id: "ndtv", component: NdtvLogo },
];

export function BrandMarquee() {
  const marqueeItems = [...BRAND_LOGOS, ...BRAND_LOGOS];

  return (
    <section className="relative overflow-hidden border-b border-gray-200 bg-white py-12 lg:py-16">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.04),transparent_75%)] pointer-events-none" />

      {/* Header */}
      <Reveal>
        <div className="relative mx-auto max-w-6xl px-4 text-center mb-8 sm:mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D4AF37] inline-flex items-center gap-2 mb-2">
            <Sparkles size={13} className="text-[#D4AF37]" />
            INDUSTRY NETWORK
          </span>

          <h3 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111111]">
            Industry Brands &amp; Platforms
          </h3>

          <p className="mt-2 text-xs sm:text-sm font-normal text-[#444444] max-w-xl mx-auto">
            Operating within the broader entertainment, streaming, media, fashion, and broadcast ecosystem.
          </p>
        </div>
      </Reveal>

      {/* Infinite Horizontal Marquee */}
      <div className="relative w-full overflow-hidden border-y border-gray-200 py-5 bg-[#F7F7F5]">
        {/* Left & Right Fading Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#F7F7F5] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#F7F7F5] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center gap-4 sm:gap-6">
          {marqueeItems.map((item, index) => {
            const LogoComponent = item.component;
            return (
              <div
                key={index}
                className="group flex items-center justify-center whitespace-nowrap rounded-2xl border border-gray-200 bg-white px-6 py-4 transition-all duration-300 hover:border-[#D4AF37]/50 shadow-xs cursor-default shrink-0 min-w-[140px] sm:min-w-[160px] h-[58px]"
              >
                <LogoComponent />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
