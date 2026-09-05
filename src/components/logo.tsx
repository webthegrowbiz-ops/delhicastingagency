"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Transition } from "framer-motion";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  const syncPulseTransition: Transition = shouldReduceMotion
    ? {}
    : {
        repeat: Infinity,
        repeatDelay: 2,
        duration: 0.8,
        ease: "easeInOut",
      };

  return (
    <div className={cn("flex items-center gap-2.5 sm:gap-3.5 shrink-0 group cursor-pointer select-none", className)}>
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                scale: [1, 1.03, 1],
                borderColor: ["#E5E7EB", "#D4AF37", "#E5E7EB"],
                boxShadow: [
                  "0 1px 2px rgba(0,0,0,0.05)",
                  "0 0 14px rgba(212,175,55,0.35)",
                  "0 1px 2px rgba(0,0,0,0.05)",
                ],
              }
        }
        transition={syncPulseTransition}
        whileHover={{ scale: 1.05, y: -2 }}
        className="relative flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center overflow-hidden rounded-lg bg-white border border-gray-200 p-1 shadow-xs transition-all duration-300 group-hover:border-[#D4AF37] group-hover:shadow-[0_4px_20px_rgba(212,175,55,0.3)]"
      >
        {/* Synchronized Shimmer Sweep */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={shouldReduceMotion ? {} : { x: "200%" }}
          transition={syncPulseTransition}
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 motion-reduce:hidden"
        />

        <Image
          src="/images/logos/logo.png"
          alt="Delhi Casting Agency"
          width={80}
          height={80}
          priority
          className="h-full w-full object-contain relative z-0 transition-transform duration-300 group-hover:scale-102"
        />
      </motion.div>

      {/* Synchronized Text Animation */}
      <motion.span
        animate={
          shouldReduceMotion
            ? {}
            : {
                textShadow: [
                  "0 0 0px rgba(212,175,55,0)",
                  "0 0 8px rgba(212,175,55,0.5)",
                  "0 0 0px rgba(212,175,55,0)",
                ],
                opacity: [1, 0.9, 1],
              }
        }
        transition={syncPulseTransition}
        className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.14em] sm:tracking-[0.28em] text-[#D4AF37] whitespace-nowrap transition-colors duration-300 group-hover:text-[#B58B20]"
      >
        DELHI CASTING AGENCY
      </motion.span>
    </div>
  );
}