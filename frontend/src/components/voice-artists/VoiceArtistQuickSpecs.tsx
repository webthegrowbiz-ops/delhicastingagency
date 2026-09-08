"use client";

import React from "react";
import {
  Mic2,
  Volume2,
  MapPin,
  Globe,
  Home,
  Sparkles,
  Calendar,
} from "lucide-react";
import type { VoiceArtist } from "@/data/voice-artists";

interface VoiceArtistQuickSpecsProps {
  artist: VoiceArtist;
}

export function VoiceArtistQuickSpecs({ artist }: VoiceArtistQuickSpecsProps) {
  const specs = [
    { label: "Voice Texture", value: artist.voiceTexture || artist.voiceTone.join(", "), icon: Volume2 },
    { label: "Vocal Pitch", value: artist.vocalPitch || "Baritone", icon: Mic2 },
    { label: "Accents & Dialects", value: (artist.accentStyles || artist.accents).join(", "), icon: Sparkles },
    { label: "Home Studio Setup", value: artist.homeStudio ? "Pro Studio Available" : "Standard", icon: Home },
    { label: "Native Languages", value: artist.languages.join(", "), icon: Globe },
    { label: "Location", value: artist.location, icon: MapPin },
    { label: "Age Category", value: `${artist.age} yrs`, icon: Calendar },
    { label: "Specialty", value: artist.role, icon: Mic2 },
  ];

  return (
    <div className="bg-[#F7F7F5] border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs">
      <h3 className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-4 flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
        <span>Voice Profile</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
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
