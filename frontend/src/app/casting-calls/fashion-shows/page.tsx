import React from "react";
import { CASTING_CALLS } from "@/data/casting-calls";
import { CastingCallListingView } from "@/components/casting-calls/CastingCallListingView";

export const metadata = {
  title: "Fashion Show Casting Calls | Delhi Casting Agency (DCA)",
  description:
    "Explore runway casting calls for fashion week shows, designer couture showcases, and luxury ramp presentations.",
};

export default function FashionShowsCastingPage() {
  return (
    <CastingCallListingView
      eyebrow="Fashion Show Casting Calls"
      title="Fashion Show &amp; Runway Casting Listings"
      description="Auditions for fashion week runway shows, designer collection showcases, and luxury couture ramp presentations."
      heroBannerImage="/media/dca/models/dca-model-fashion-01.jpg"
      initialCalls={CASTING_CALLS}
      defaultCategoryFilter="Models"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Casting Calls", href: "/casting-calls/" },
        { label: "Fashion Shows" },
      ]}
    />
  );
}
