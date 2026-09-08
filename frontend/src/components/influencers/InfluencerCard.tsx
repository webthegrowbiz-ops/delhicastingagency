"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Influencer } from "@/data/influencers";

interface InfluencerCardProps {
  influencer: Influencer;
}

export function InfluencerCard({ influencer }: InfluencerCardProps) {
  return (
    <Link
      href={`/influencers/profile/${influencer.id}`}
      className="group block cursor-pointer"
    >
      {/* Editorial Portrait Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F7F7F5]">
        <Image
          src={influencer.mainImage}
          alt={`${influencer.name} - ${influencer.categoryLabel}`}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>

      {/* Understated Minimal Typography */}
      <div className="mt-3 text-left">
        <h3 className="font-serif text-base sm:text-lg font-bold tracking-tight text-[#111111] transition-colors duration-300 group-hover:text-[#D4AF37] truncate">
          {influencer.name}
        </h3>
        <p className="text-xs text-[#666666] tracking-wide uppercase font-medium mt-0.5 truncate">
          {influencer.location.split("/")[0].trim()}
        </p>
      </div>
    </Link>
  );
}
