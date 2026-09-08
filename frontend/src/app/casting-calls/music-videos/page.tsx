import React from "react";
import { CASTING_CALLS } from "@/data/casting-calls";
import { CastingCallListingView } from "@/components/casting-calls/CastingCallListingView";

export const metadata = {
  title: "Music Video Casting Calls | Delhi Casting Agency (DCA)",
  description:
    "Explore casting calls for music video leads, featured performers, and dancers for record label singles.",
};

export default function MusicVideosCastingPage() {
  return (
    <CastingCallListingView
      eyebrow="Music Video Casting Calls"
      title="Music Video Casting Listings"
      description="Casting calls for music video leads, secondary performers, and synchronized dancers for independent and record label singles."
      heroBannerImage="/media/dca/casting-calls/dca-casting-music-01.avif"
      initialCalls={CASTING_CALLS}
      defaultCategoryFilter="All"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Casting Calls", href: "/casting-calls/" },
        { label: "Music Videos" },
      ]}
    />
  );
}
