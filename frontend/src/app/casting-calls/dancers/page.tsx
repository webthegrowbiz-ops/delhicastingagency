import React from "react";
import { CASTING_CALLS, getCastingCallsByCategory } from "@/data/casting-calls";
import { CastingCallListingView } from "@/components/casting-calls/CastingCallListingView";

export const metadata = {
  title: "Dancer Casting Calls | Delhi Casting Agency (DCA)",
  description:
    "Explore dance casting calls for Bollywood feature film songs, music videos, background troupes, and live choreography stage shows.",
};

export default function DancerCastingCallsPage() {
  const dancerCalls = getCastingCallsByCategory("dancers");

  return (
    <CastingCallListingView
      eyebrow="Dancer Casting Calls"
      title="Dancer Casting Call Listings"
      description="Explore audition opportunities for lead soloists, synchronized background troupes, contemporary performers, and hip-hop dancers."
      heroBannerImage="/media/dca/about/dca-about-hero-01.jpg"
      initialCalls={dancerCalls.length > 0 ? dancerCalls : CASTING_CALLS}
      defaultCategoryFilter="Dancers"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Casting Calls", href: "/casting-calls/" },
        { label: "Dancers" },
      ]}
    />
  );
}
