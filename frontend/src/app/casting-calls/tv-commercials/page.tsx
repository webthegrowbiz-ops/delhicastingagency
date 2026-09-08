import React from "react";
import { CASTING_CALLS } from "@/data/casting-calls";
import { CastingCallListingView } from "@/components/casting-calls/CastingCallListingView";

export const metadata = {
  title: "TV Commercial (TVC) Casting Calls | Delhi Casting Agency (DCA)",
  description:
    "Explore commercial casting calls for national brand TVCs, television advertisements, and digital video campaigns.",
};

export default function TvCommercialsCastingPage() {
  return (
    <CastingCallListingView
      eyebrow="TV Commercial Casting Calls"
      title="TV Commercial (TVC) Casting Listings"
      description="Commercial casting calls for leading national brands, television advertisements, and high-impact digital commercial video campaigns."
      heroBannerImage="/media/dca/casting-calls/dca-casting-commercial-01.jpg"
      initialCalls={CASTING_CALLS}
      defaultCategoryFilter="All"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Casting Calls", href: "/casting-calls/" },
        { label: "TV Commercials" },
      ]}
    />
  );
}
