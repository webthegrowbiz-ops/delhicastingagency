"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, ArrowRight, Calendar, CheckCircle2, MapPin, ShieldCheck, Tag, User, DollarSign, Clapperboard } from "lucide-react";
import type { CastingCallItem } from "@/data/casting-calls";

interface CastingDetailModalProps {
  item: CastingCallItem | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (item: CastingCallItem) => void;
}

export function CastingDetailModal({
  item,
  isOpen,
  onClose,
  onApply,
}: CastingDetailModalProps) {
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

  if (!isOpen || !item) return null;

  const statusColor =
    item.status === "VERIFIED"
      ? "bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/30"
      : item.status === "CLOSING SOON"
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : "bg-emerald-50 text-emerald-700 border-emerald-200";

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4 sm:p-6 overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl my-8 flex flex-col text-left max-h-[90vh] overflow-y-auto text-[#111111]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close"
          className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 rounded-full text-gray-400 hover:text-[#111111] hover:bg-gray-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Category & Status Header */}
        <div className="flex items-center gap-3 mb-3 pr-10">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d4af37]">
            {item.category}
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${statusColor}`}>
            {item.status}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight leading-snug mb-5">
          {item.title}
        </h2>

        {/* Banner Image */}
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl bg-gray-100 mb-6 border border-gray-200 shrink-0">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
        </div>

        {/* Scannable Project Specs Grid */}
        <div className="mb-6 p-5 rounded-2xl bg-[#F7F7F5] border border-gray-200 grid grid-cols-2 sm:grid-cols-3 gap-4 shadow-xs">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#666666] flex items-center gap-1.5 mb-1">
              <Tag className="w-3 h-3 text-[#d4af37]" />
              Type
            </span>
            <p className="text-sm font-semibold text-[#111111]">{item.productionType}</p>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#666666] flex items-center gap-1.5 mb-1">
              <MapPin className="w-3 h-3 text-[#d4af37]" />
              Location
            </span>
            <p className="text-sm font-semibold text-[#111111]">{item.location}</p>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#666666] flex items-center gap-1.5 mb-1">
              <User className="w-3 h-3 text-[#d4af37]" />
              Gender &amp; Age
            </span>
            <p className="text-sm font-semibold text-[#111111]">{item.gender} ({item.ageRange})</p>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#666666] flex items-center gap-1.5 mb-1">
              <DollarSign className="w-3 h-3 text-[#d4af37]" />
              Remuneration
            </span>
            <p className="text-sm font-semibold text-[#d4af37]">{item.compensation}</p>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#666666] flex items-center gap-1.5 mb-1">
              <Calendar className="w-3 h-3 text-[#d4af37]" />
              Deadline
            </span>
            <p className="text-sm font-semibold text-[#111111]">{item.deadline}</p>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#666666] flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-3 h-3 text-[#d4af37]" />
              Verification
            </span>
            <p className="text-sm font-semibold text-emerald-600">DCA Verified</p>
          </div>
        </div>

        {/* Section 1: Overview */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37] mb-2 flex items-center gap-2">
            <Clapperboard className="w-3.5 h-3.5" />
            About the Casting
          </h3>
          <p className="text-sm sm:text-base leading-relaxed text-[#444444]">
            {item.description}
          </p>
        </div>

        {/* Section 2: Role Details */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-[#111111] mb-2">Role Requirements</h4>
          <p className="text-xs sm:text-sm leading-relaxed text-[#555555] mb-3">
            {item.roleDetails}
          </p>
          <div className="space-y-2">
            {item.requirements.map((req, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#444444]">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: What to Prepare */}
        <div className="mb-6 p-4 rounded-2xl bg-[#F7F7F5] border border-gray-200 shadow-xs">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#d4af37] mb-2">
            What to Prepare for Application
          </h4>
          <div className="space-y-2">
            {item.whatToPrepare.map((prep, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#444444]">
                <span className="w-5 h-5 rounded-full bg-[#d4af37]/10 text-[#d4af37] font-semibold text-[11px] flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span>{prep}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Footer */}
        <div className="mt-4 pt-5 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#666666]">
            Delhi Casting Agency coordinates verified talent submissions directly with casting directors.
          </p>
          <button
            type="button"
            onClick={() => {
              onClose();
              onApply(item);
            }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#d4af37] hover:bg-[#c59b27] text-white font-semibold text-sm transition-all duration-200 shadow-md w-full sm:w-auto shrink-0"
          >
            <span>Apply for this Role</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
