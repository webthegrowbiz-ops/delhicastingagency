import React from "react";
import { CASTING_CALLS, getCastingCallsByCategory } from "@/data/casting-calls";
import { CastingCallListingView } from "@/components/casting-calls/CastingCallListingView";

export const metadata = {
  title: "Voice Artist Casting Calls | Delhi Casting Agency (DCA)",
  description:
    "Explore voice artist casting calls for multilingual dubbing, commercial voiceovers, audiobook narration, and radio broadcasting.",
};

export default function VoiceArtistCastingCallsPage() {
  const voiceCalls = getCastingCallsByCategory("voice-artists");

  return (
    <CastingCallListingView
      eyebrow="Voice Artist Casting Calls"
      title="Voice Artist Casting Call Listings"
      description="Explore voice opportunities for theatrical film dubbing, TV commercial voiceovers, radio jockeys, and multilingual audio narration."
      heroBannerImage="/media/dca/voice-artists/dca-voice-studio-01.jpg"
      initialCalls={voiceCalls.length > 0 ? voiceCalls : CASTING_CALLS}
      defaultCategoryFilter="Voice Artists"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Casting Calls", href: "/casting-calls/" },
        { label: "Voice Artists" },
      ]}
    />
  );
}
