"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const WHY = [
  {
    title: "Verified Casting Calls",
    body: "Every opportunity is reviewed before reaching our members to reduce spam and fake listings.",
    image: "/images/actors/verified casting calls.png",
  },
  {
    title: "Direct Audition Access",
    body: "Receive genuine casting opportunities from production requirements.",
    image: "/images/icons/directaudition.png",
  },
  {
    title: "Priority Updates",
    body: "Premium members receive important casting updates before public listings.",
    image: "/images/icons/priority update.png",
  },
  {
    title: "Daily WhatsApp Alerts",
    body: "Fresh casting opportunities delivered directly to your phone.",
    image: "/images/icons/whatsaap.png",
  },
  {
    title: "Industry Community",
    body: "Connect with aspiring artists and stay informed about upcoming opportunities.",
    image: "/media/dca/influencers/dca-influencer-community-01.jpg",
  },
  {
    title: "3-Month Membership",
    body: "3 months access to verified audition calls and talent directory.",
    image: "/images/actors/Membership.avif",
  },
];

const WHERE = [
  {
    title: "Bollywood Films",
    body: "Feature films and independent productions.",
    image: "/images/actors/casting-calls bollywooed hrizontally.png",
  },
  {
    title: "Television Shows",
    body: "Daily soaps, reality shows and serials.",
    image: "/media/dca/casting-calls/dca-casting-tv-01.jpg",
  },
  {
    title: "OTT Platforms",
    body: "Web series and digital entertainment projects.",
    image: "/images/actors/looking for male & female.png",
  },
  {
    title: "Print Shoots",
    body: "Editorial, magazine and commercial photography.",
    image: "/media/dca/models/dca-model-print-01.png",
  },
  {
    title: "Fashion Shows",
    body: "Runway and designer showcases.",
    image: "/images/actors/Fashion Shows.webp",
  },
  {
    title: "Music Videos",
    body: "Professional music production opportunities.",
    image: "/media/dca/casting-calls/dca-casting-music-01.avif",
  },
  {
    title: "Brand Commercials",
    body: "Advertising campaigns and promotions.",
    image: "/images/actors/brand 1.png",
  },
  {
    title: "Catalogue Shoots",
    body: "Lifestyle and product catalogue photography.",
    image: "/media/dca/models/dca-model-catalogue-01.jpg",
  },
];

export function WhatYouGet() {
  const [tab, setTab] = useState<"why" | "where">("why");
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const cards = tab === "why" ? WHY : WHERE;

  const updateScrollState = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0 });
    const id = requestAnimationFrame(updateScrollState);
    return () => cancelAnimationFrame(id);
  }, [tab]);

  const scrollByCard = (direction: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-carousel-card]");
    const step = (card?.offsetWidth ?? 300) + 24;
    
    if (direction === "next") {
      const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
      if (isAtEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    } else {
      const isAtStart = el.scrollLeft <= 10;
      if (isAtStart) {
        el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
      } else {
        el.scrollBy({ left: -step, behavior: "smooth" });
      }
    }
    setTimeout(updateScrollState, 350);
  };

  useEffect(() => {
    if (shouldReduceMotion || isHovered) return;

    const timer = setInterval(() => {
      scrollByCard("next");
    }, 4500);

    return () => clearInterval(timer);
  }, [tab, isHovered, shouldReduceMotion]);

  return (
    <section
      id="benefits"
      className="relative overflow-hidden bg-white py-20 sm:py-24 md:py-28 border-b border-gray-200"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium text-[#D4AF37]">
              <Sparkles size={15} />
              Premium Membership
            </div>

            <h2 className="mt-6 text-3xl sm:text-4xl font-bold leading-tight text-[#111111] md:text-6xl">
              Everything Included
              <span className="block text-[#D4AF37]">In Your Membership</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8 text-[#444444]">
              Designed for aspiring actors and models looking for verified
              casting opportunities across films, OTT, television, fashion and
              commercial projects.
            </p>
          </div>
        </Reveal>

        {/* Quick Trust */}
        <Reveal>
          <div className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-3 sm:gap-4">
            {[
              "Verified Opportunities",
              "3-Month Membership",
              "Priority Updates",
              "Daily WhatsApp Alerts",
            ].map((label) => (
              <div
                key={label}
                className="rounded-full border border-gray-200 bg-[#F7F7F5] px-5 py-3 text-sm font-medium text-[#333333] shadow-xs"
              >
                {label}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Tabs */}
        <Reveal>
          <div className="mt-12 sm:mt-16 flex justify-center px-2">
            <div className="flex w-full max-w-md sm:w-auto rounded-full border border-gray-200 bg-[#F7F7F5] p-1.5 sm:p-2 shadow-xs">
              <TabButton active={tab === "why"} onClick={() => setTab("why")}>
                Why Members Join
              </TabButton>

              <TabButton
                active={tab === "where"}
                onClick={() => setTab("where")}
              >
                Where You Can Apply
              </TabButton>
            </div>
          </div>
        </Reveal>

        {/* Cards Carousel */}
        <div className="relative mt-12 sm:mt-16">
          {/* Left / Right controls */}
          <button
            type="button"
            aria-label="Previous cards"
            onClick={() => scrollByCard("prev")}
            className={cn(
              "absolute -left-2 sm:-left-5 top-1/2 z-20 hidden -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-[#111111] shadow-md transition-all duration-300 hover:scale-105 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:shadow-lg sm:flex cursor-pointer",
              canScrollLeft
                ? "opacity-100"
                : "opacity-40 hover:opacity-100",
            )}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            aria-label="Next cards"
            onClick={() => scrollByCard("next")}
            className={cn(
              "absolute -right-2 sm:-right-5 top-1/2 z-20 hidden -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-[#111111] shadow-md transition-all duration-300 hover:scale-105 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:shadow-lg sm:flex cursor-pointer",
              canScrollRight
                ? "opacity-100"
                : "opacity-40 hover:opacity-100",
            )}
          >
            <ChevronRight size={20} />
          </button>

          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent sm:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent sm:w-16" />

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              ref={trackRef}
              onScroll={updateScrollState}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-4 sm:gap-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {cards.map((item, index) => {
                return (
                  <motion.div
                    key={item.title}
                    data-carousel-card
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: index * 0.05,
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group relative w-[78%] shrink-0 snap-center rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-500 hover:border-[#D4AF37]/50 hover:shadow-xl sm:w-[300px] sm:p-8 lg:w-[320px]"
                  >
                    <div className="relative -mx-6 -mt-6 mb-5 h-48 overflow-hidden rounded-t-3xl bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-contain bg-[#111111]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>

                    <h3 className="relative z-10 mt-6 sm:mt-7 text-xl sm:text-2xl font-semibold text-[#111111] transition-colors duration-300 group-hover:text-[#D4AF37]">
                      {item.title}
                    </h3>

                    <p className="relative z-10 mt-3 sm:mt-4 text-sm sm:text-base leading-6 sm:leading-7 text-[#555555]">
                      {item.body}
                    </p>

                    <div className="absolute left-0 bottom-0 h-[2px] w-0 bg-gradient-to-r from-[#D4AF37] via-yellow-500 to-transparent transition-all duration-500 group-hover:w-full z-20" />
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 flex items-center justify-center gap-3 sm:hidden">
            <button
              type="button"
              aria-label="Previous cards"
              onClick={() => scrollByCard("prev")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[#111111] transition-all shadow-xs active:scale-95 hover:border-[#D4AF37]"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next cards"
              onClick={() => scrollByCard("next")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[#111111] transition-all shadow-xs active:scale-95 hover:border-[#D4AF37]"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex-1 sm:flex-none rounded-full px-4 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap",
        active
          ? "bg-[#D4AF37] text-white shadow-xs"
          : "text-[#555555] hover:text-[#111111]",
      )}
    >
      {children}
    </button>
  );
}