"use client";

import React from "react";
import {
  Calendar,
  Ruler,
  Clock,
  MapPin,
  Globe,
  Eye,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import type { ChildArtist } from "@/data/child-artists";

interface ChildArtistQuickSpecsProps {
  artist: ChildArtist;
}

export function ChildArtistQuickSpecs({ artist }: ChildArtistQuickSpecsProps) {
  const specs = [
    { label: "Age", value: `${artist.age} yrs`, icon: Calendar },
    { label: "Height", value: artist.height, icon: Ruler },
    { label: "Experience", value: artist.experience, icon: Clock },
    { label: "Location", value: artist.location, icon: MapPin },
    { label: "Languages", value: artist.languages.join(", "), icon: Globe },
    { label: "Eye Color", value: artist.eyeColor || "Dark Brown", icon: Eye },
    { label: "Hair Color", value: artist.hair || "Black", icon: Sparkles },
    { label: "Guardian Status", value: artist.guardianConsent ? String(artist.guardianConsent) : "Verified", icon: ShieldCheck },
  ];

  return (
    <div className="bg-[#F7F7F5] border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs">
      <h3 className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-4 flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
        <span>Artist Details</span>
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
        {specs.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col justify-between shadow-2xs"
            >
              <div className="flex items-center gap-1.5 text-[#666666] text-[11px] font-medium mb-1">
                <Icon className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span className="truncate">{item.label}</span>
              </div>
              <div className="text-[#111111] text-xs sm:text-sm font-semibold truncate" title={item.value}>
                {item.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
