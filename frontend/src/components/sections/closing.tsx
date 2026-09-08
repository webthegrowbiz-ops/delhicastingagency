"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

export function Closing() {
  return (
    <section className="relative overflow-hidden bg-white py-24 border-b border-gray-200">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06),transparent_65%)]" />

      <Reveal>
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden rounded-3xl sm:rounded-[36px] border border-gray-200 bg-[#F7F7F5] p-6 sm:p-8 md:p-14 text-center shadow-md backdrop-blur-xl"
          >
            {/* Glow */}
            <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#D4AF37]/10 blur-[120px]" />

            <div className="relative z-10">
              {/* Badge */}
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-5 py-2 text-sm font-medium text-[#D4AF37]">
                <Sparkles size={15} />
                Premium Membership
              </div>

              {/* Heading */}
              <h2 className="mt-8 text-4xl font-bold leading-tight text-[#111111] md:text-6xl">
                Start Your
                <span className="block text-[#D4AF37]">Bollywood Journey</span>
              </h2>

              {/* Description */}
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#444444]">
                Join thousands of aspiring actors and models who have already
                become members of {SITE.agency}. Take the next step toward your
                dream with verified casting opportunities.
              </p>

              {/* Trust */}
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-[#333333] shadow-xs">
                  <ShieldCheck size={16} className="text-[#D4AF37]" />
                  Secure Payment
                </div>

                <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-[#333333] shadow-xs">
                  ⭐ 3-Month Membership
                </div>
              </div>

              {/* CTA */}
              <motion.div className="mt-12" whileHover={{ scale: 1.03 }}>
                <Button
                  size="block"
                  className="group"
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent("open-premium-modal"));
                  }}
                >
                  Become a Premium Member
                  <ArrowRight
                    size={18}
                    className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Button>
              </motion.div>

              {/* Price */}
              <p className="mt-6 text-base text-[#555555]">
                Artist Premium Payment of{" "}
                <span className="font-semibold text-[#D4AF37]">
                  ₹{SITE.price.toLocaleString()}
                </span>{" "}
                • 3-Month Access
              </p>
            </div>
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}
