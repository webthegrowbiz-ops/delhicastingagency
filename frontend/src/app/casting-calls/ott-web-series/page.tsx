import React from "react";
import { CASTING_CALLS } from "@/data/casting-calls";
import { CastingCallListingView } from "@/components/casting-calls/CastingCallListingView";

export const metadata = {
  title: "OTT & Web Series Casting Calls | Delhi Casting Agency (DCA)",
  description:
    "Explore web series casting calls for streaming platform originals, crime thrillers, drama series, and digital shows.",
};

export default function OttWebSeriesCastingPage() {
  return (
    <CastingCallListingView
      eyebrow="OTT &amp; Web Series Casting Calls"
      title="OTT &amp; Web Series Casting Listings"
      description="Casting calls for high-budget web series, streaming platform originals, multi-season dramas, and digital thrillers."
      heroBannerImage="/images/actors/all talent horizonatal img.png"
      initialCalls={CASTING_CALLS}
      defaultCategoryFilter="All"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Casting Calls", href: "/casting-calls/" },
        { label: "OTT / Web Series" },
      ]}
    />
  );
}
