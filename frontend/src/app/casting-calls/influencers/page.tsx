import React from "react";
import { CASTING_CALLS, getCastingCallsByCategory } from "@/data/casting-calls";
import { CastingCallListingView } from "@/components/casting-calls/CastingCallListingView";

export const metadata = {
  title: "Influencer Casting Calls | Delhi Casting Agency (DCA)",
  description:
    "Explore influencer and digital creator casting calls for brand collaborations, Instagram reel campaigns, and video promotions.",
};

export default function InfluencerCastingCallsPage() {
  const influencerCalls = getCastingCallsByCategory("influencers");

  return (
    <CastingCallListingView
      eyebrow="Influencer Casting Calls"
      title="Influencer &amp; Creator Casting Listings"
      description="Explore digital campaigns, Instagram reel collaborations, brand endorsements, and YouTube video activations."
      heroBannerImage="/media/dca/influencers/dca-influencer-community-01.jpg"
      initialCalls={influencerCalls.length > 0 ? influencerCalls : CASTING_CALLS}
      defaultCategoryFilter="Influencers"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Casting Calls", href: "/casting-calls/" },
        { label: "Influencers" },
      ]}
    />
  );
}
