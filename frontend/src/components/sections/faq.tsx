"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Sparkles } from "lucide-react";

import { Reveal } from "@/components/ui/reveal";

const FAQS = [
  {
    q: "Is this a one-time payment?",
    a: "Yes. Your membership requires only a one-time payment. There are no monthly subscriptions or renewal charges.",
  },
  {
    q: "Does membership guarantee a role?",
    a: "No. Membership provides access to verified casting opportunities and related services. Final selection depends entirely on the production team's requirements and your audition performance.",
  },
  {
    q: "Can beginners join?",
    a: "Absolutely. Whether you're just starting your acting journey or already have experience, you can become a member and apply for suitable opportunities.",
  },
  {
    q: "How will I receive casting updates?",
    a: "Verified casting opportunities are shared regularly through our official WhatsApp community and other communication channels after successful registration.",
  },
  {
    q: "What happens after registration?",
    a: "After your registration is completed, you'll receive your membership details along with instructions to access verified casting opportunities.",
  },
  {
    q: "Which projects can I apply for?",
    a: "Depending on the available opportunities, members may apply for Bollywood films, OTT platforms, television shows, advertisements, music videos, fashion shows and catalogue shoots.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-[#F7F7F5] py-28 border-b border-gray-200">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.06),transparent_65%)]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-5 py-2 text-sm font-medium text-[#D4AF37]">
              <Sparkles size={15} />
              Need Help?
            </div>

            <h2 className="mt-6 text-4xl font-bold leading-tight text-[#111111] md:text-6xl">
              Frequently Asked
              <span className="block text-[#D4AF37]">Questions</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#444444]">
              Find answers to the most common questions about our premium
              membership, verified casting opportunities and registration
              process.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-20 space-y-5">
            {FAQS.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={item.q}
                  layout
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs backdrop-blur-xl transition-all duration-300 hover:border-[#D4AF37]/50"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${index}`}
                    className="flex w-full items-center justify-between gap-6 px-7 py-6 text-left"
                  >
                    <span className="text-lg font-semibold text-[#111111]">
                      {item.q}
                    </span>

                    <motion.div
                      animate={{
                        rotate: isOpen ? 180 : 0,
                      }}
                      whileHover={{
                        scale: 1.2,
                        rotate: isOpen ? 180 : 90,
                      }}
                      whileTap={{
                        scale: 0.9,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 18,
                      }}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-[#F7F7F5] transition-all duration-300 hover:border-[#D4AF37]"
                    >
                      {isOpen ? (
                        <Minus size={18} className="text-[#D4AF37]" />
                      ) : (
                        <Plus size={18} className="text-[#D4AF37]" />
                      )}
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-${index}`}
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-7 pb-7">
                          <div className="h-px w-full bg-gradient-to-r from-[#D4AF37]/30 via-[#D4AF37]/15 to-transparent" />

                          <p className="mt-5 leading-8 text-[#555555]">
                            {item.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
