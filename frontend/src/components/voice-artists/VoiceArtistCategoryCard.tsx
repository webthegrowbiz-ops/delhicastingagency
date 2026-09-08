import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { CategoryMeta } from "@/data/voice-artists";

interface VoiceArtistCategoryCardProps {
  category: CategoryMeta;
}

export function VoiceArtistCategoryCard({ category }: VoiceArtistCategoryCardProps) {
  return (
    <div className="group relative flex flex-col justify-between h-full overflow-hidden rounded-3xl border border-gray-200 bg-white text-[#111111] shadow-xs p-6 sm:p-7 transition-all duration-500 hover:border-[#d4af37]/60 hover:shadow-md hover:-translate-y-1.5 motion-reduce:hover:translate-y-0 motion-reduce:transition-none">
      <div className="flex flex-col flex-1">
        {/* 1. Top Eyebrow & Category Count */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#666666] flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#555555]" />
            {category.countLabel}
          </span>
        </div>

        {/* 2. Category Title (DCA GOLD) */}
        <h2 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-[#d4af37] group-hover:text-[#d4af37] transition-colors leading-tight mb-1">
          {category.title}
        </h2>

        {/* 3. Subtitle / Headline */}
        {category.headline && (
          <p className="text-xs sm:text-sm font-medium text-[#d4af37] mb-3">
            {category.headline}
          </p>
        )}

        {/* 4. Large Visual Image */}
        <Link
          href={category.route}
          className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#F7F7F5] my-3 border border-gray-200 shrink-0 block focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
        >
          <Image
            src={category.image}
            alt={`${category.title} Division - Delhi Casting Agency`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-700 ease-out motion-reduce:group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
        </Link>

        {/* 5. Category Description */}
        <p className="text-sm leading-relaxed text-[#555555] flex-1 mt-1">
          {category.description}
        </p>
      </div>

      {/* 6. Explore CTA link & DCA Verified Badge */}
      <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between shrink-0">
        <Link
          href={category.route}
          className="group/link inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-[0.08em] text-[#111111] hover:text-[#D4AF37] transition-colors"
        >
          <span>{category.ctaText}</span>
          <ArrowRight className="w-4 h-4 text-[#D4AF37] transition-transform duration-300 group-hover/link:translate-x-1.5 group-hover:translate-x-1.5" />
        </Link>

        <span className="text-xs text-[#666666] font-medium">
          DCA Verified
        </span>
      </div>
    </div>
  );
}
