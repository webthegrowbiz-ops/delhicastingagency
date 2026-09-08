import React from "react";
import type { Influencer } from "@/data/influencers";
import { InfluencerCard } from "./InfluencerCard";

interface InfluencerGridProps {
  influencers: Influencer[];
}

export function InfluencerGrid({ influencers }: InfluencerGridProps) {
  if (influencers.length === 0) {
    return (
      <div className="text-center py-16 px-4 rounded-2xl bg-[#F7F7F5] border border-[#E5E5E5]">
        <p className="text-[#555555] text-base">
          No influencers found matching this category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6">
      {influencers.map((influencer) => (
        <InfluencerCard key={influencer.id} influencer={influencer} />
      ))}
    </div>
  );
}
