"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ArrowRight, Sparkles } from "lucide-react";

interface AccountTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

export function AccountTypeModal({
  isOpen,
  onClose,
  title = "Join Delhi Casting Agency",
  subtitle = "Choose your registration type to create your official profile.",
}: AccountTypeModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="account-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[620px] bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col text-center text-[#111111]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close"
          className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 rounded-full text-gray-400 hover:text-[#111111] hover:bg-gray-100 transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Eyebrow */}
        <div className="mx-auto mb-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Select Registration Type</span>
        </div>

        {/* Heading */}
        <h3
          id="account-modal-title"
          className="font-sans text-2xl sm:text-[28px] font-extrabold text-[#111111] tracking-tight leading-snug mb-2"
        >
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-[#555555] max-w-md mx-auto mb-6 leading-relaxed">
          {subtitle}
        </p>

        {/* Two Options */}
        <div className="grid gap-4 sm:grid-cols-2 text-left mb-6">
          
          {/* OPTION 1: REGISTER AS ARTIST */}
          <Link
            href="/profile/setup"
            onClick={onClose}
            className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl border-2 border-gray-200 bg-[#F7F7F5] hover:bg-white hover:border-[#D4AF37] focus:border-[#D4AF37] focus-visible:outline-2 focus-visible:outline-[#D4AF37] focus-visible:outline-offset-2 transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-1 cursor-pointer"
          >
            <div>
              {/* Image & Badge Row */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="relative w-20 h-15 sm:w-22 sm:h-16 shrink-0 rounded-xl overflow-hidden border border-gray-200 shadow-2xs bg-gray-100">
                  <Image
                    src="/media/dca/actors/dca-actor-female-01.jpg"
                    alt="Artist Talent Portfolio"
                    fill
                    sizes="(max-width: 640px) 80px, 88px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-2.5 py-1 rounded-full shrink-0">
                  For Talent
                </span>
              </div>

              {/* Title & Description */}
              <h4 className="text-base sm:text-lg font-extrabold uppercase tracking-[0.1em] text-[#111111] group-hover:text-[#D4AF37] transition-colors mb-2 leading-tight">
                REGISTER AS<br />ARTIST
              </h4>
              <p className="text-xs text-[#555555] leading-relaxed font-normal">
                For Actors, Models, Dancers, Influencers, Child Artists &amp; Voice Performers.
              </p>
            </div>

            {/* Separator & Prominent CTA Button */}
            <div className="mt-5 pt-4 border-t border-gray-200">
              <div className="w-full py-2.5 px-3 rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-300 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider shadow-2xs">
                <span>CREATE ARTIST PROFILE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* OPTION 2: REGISTER AS BRAND */}
          <Link
            href="/register/brand"
            onClick={onClose}
            className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl border-2 border-gray-200 bg-[#F7F7F5] hover:bg-white hover:border-[#D4AF37] focus:border-[#D4AF37] focus-visible:outline-2 focus-visible:outline-[#D4AF37] focus-visible:outline-offset-2 transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-1 cursor-pointer"
          >
            <div>
              {/* Image & Badge Row */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="relative w-20 h-15 sm:w-22 sm:h-16 shrink-0 rounded-xl overflow-hidden border border-gray-200 shadow-2xs bg-gray-100">
                  <Image
                    src="/media/dca/about/dca-about-studio-01.jpg"
                    alt="Brand Casting Studio"
                    fill
                    sizes="(max-width: 640px) 80px, 88px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-2.5 py-1 rounded-full shrink-0">
                  For Clients
                </span>
              </div>

              {/* Title & Description */}
              <h4 className="text-base sm:text-lg font-extrabold uppercase tracking-[0.1em] text-[#111111] group-hover:text-[#D4AF37] transition-colors mb-2 leading-tight">
                REGISTER AS<br />BRAND
              </h4>
              <p className="text-xs text-[#555555] leading-relaxed font-normal">
                For Production Houses, Casting Directors, Agencies, Ad Brands &amp; Studios.
              </p>
            </div>

            {/* Separator & Prominent CTA Button */}
            <div className="mt-5 pt-4 border-t border-gray-200">
              <div className="w-full py-2.5 px-3 rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-300 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider shadow-2xs">
                <span>CREATE CASTING PROFILE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-[11px] text-[#777777]">
          Already have an account?{" "}
          <Link href="/login" onClick={onClose} className="text-[#D4AF37] hover:underline font-bold">
            Log In Here
          </Link>
        </p>
      </div>
    </div>
  );
}
