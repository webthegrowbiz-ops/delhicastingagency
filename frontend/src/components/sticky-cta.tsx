"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { SITE } from "@/lib/constants";

export function StickyCta() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      className="fixed inset-x-0 bottom-0 z-50 md:hidden"
    >
      <div className="border-t border-gray-200 bg-white/95 px-4 pb-[calc(env(safe-area-inset-bottom)+16px)] pt-4 backdrop-blur-2xl shadow-xl">
        <div className="mx-auto flex max-w-md items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-[#F7F7F5] px-4 py-4 shadow-sm">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#D4AF37] font-semibold">
              <Sparkles size={13} />
              3-Month Membership
            </div>

            <p className="mt-1 text-xl font-bold text-[#111111]">
              ₹{SITE.price.toLocaleString()}
            </p>

            <p className="text-xs text-[#555555]">3 Months Access</p>
          </div>

          {/* Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            onClick={() =>
              document.getElementById("pricing")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="group flex items-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#C59B27]"
          >
            Join Now
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}