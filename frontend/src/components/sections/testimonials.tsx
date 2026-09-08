"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const TESTIMONIALS = [
  {
    quote:
      "The registration process was smooth and I started receiving verified casting opportunities very quickly.",
    name: "Priya Sharma",
    role: "Aspiring Actor",
    city: "Delhi",
  },
  {
    quote:
      "Daily WhatsApp updates helped me stay informed about new casting calls. The experience has been professional throughout.",
    name: "Rohan Verma",
    role: "Model",
    city: "Mumbai",
  },
  {
    quote:
      "I appreciate the genuine opportunities and the support provided during my membership journey.",
    name: "Simran Kaur",
    role: "Content Creator",
    city: "Pune",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="relative py-28 overflow-hidden bg-white border-b border-gray-200">
      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05),transparent_70%)]" />

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Heading */}
        <Reveal>
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.3em] text-[#D4AF37] uppercase">
              The Experience
            </p>

            <h2 className="mt-4 text-4xl md:text-6xl font-bold text-[#111111]">
              What Our Members Say
            </h2>
          </div>
        </Reveal>

        {/* Carousel */}
        <div className="relative flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -40 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-2xl"
            >
              <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-[#F7F7F5] p-10 shadow-sm backdrop-blur-xl">
                {/* Quote icon */}
                <Quote
                  className="absolute right-6 top-6 text-[#D4AF37]/20"
                  size={60}
                />

                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="fill-[#D4AF37] text-[#D4AF37]"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="mt-6 text-lg leading-8 italic text-[#333333]">
                  “{TESTIMONIALS[index].quote}”
                </p>

                {/* User */}
                <div className="mt-10 flex items-center gap-4">
                  <div>
                    <h4 className="text-[#111111] font-semibold text-lg">
                      {TESTIMONIALS[index].name}
                    </h4>
                    <p className="text-sm text-[#666666]">
                      {TESTIMONIALS[index].role} • {TESTIMONIALS[index].city}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-0 md:-left-12 h-11 w-11 flex items-center justify-center rounded-full border border-gray-200 bg-white text-[#111111] hover:bg-gray-100 transition shadow-xs"
          >
            ←
          </button>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-0 md:-right-12 h-11 w-11 flex items-center justify-center rounded-full border border-gray-200 bg-white text-[#111111] hover:bg-gray-100 transition shadow-xs"
          >
            →
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-8 gap-2">
          {TESTIMONIALS.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors ${
                i === index ? "bg-[#D4AF37]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
