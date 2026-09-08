import React from "react";
import type { Dancer } from "@/data/dancers";
import { DancerCard } from "./DancerCard";

interface DancerGridProps {
  dancers: Dancer[];
}

export function DancerGrid({ dancers }: DancerGridProps) {
  if (dancers.length === 0) {
    return (
      <div className="text-center py-16 px-4 rounded-2xl bg-[#F7F7F5] border border-[#E5E5E5]">
        <p className="text-[#555555] text-base">
          No dancers found matching this category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6">
      {dancers.map((dancer) => (
        <DancerCard key={dancer.id} dancer={dancer} />
      ))}
    </div>
  );
}
