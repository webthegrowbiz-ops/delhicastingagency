import React from "react";
import { CASTING_CALLS, getCastingCallsByCategory } from "@/data/casting-calls";
import { CastingCallListingView } from "@/components/casting-calls/CastingCallListingView";

export const metadata = {
  title: "Model Casting Calls | Delhi Casting Agency (DCA)",
  description:
    "Explore modeling casting calls for fashion shows, runway events, brand commercials, lookbooks, and print advertisements.",
};

export default function ModelCastingCallsPage() {
  const modelCalls = getCastingCallsByCategory("models");

  return (
    <CastingCallListingView
      eyebrow="Model Casting Calls"
      title="Model Casting Call Listings"
      description="Explore verified modeling opportunities for fashion runways, editorial shoots, brand commercial advertisements, and lifestyle campaigns."
      heroBannerImage="/media/dca/models/dca-model-fashion-01.jpg"
      initialCalls={modelCalls.length > 0 ? modelCalls : CASTING_CALLS}
      defaultCategoryFilter="Models"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Casting Calls", href: "/casting-calls/" },
        { label: "Models" },
      ]}
    />
  );
}
