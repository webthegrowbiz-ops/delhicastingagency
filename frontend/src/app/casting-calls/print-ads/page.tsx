import React from "react";
import { CASTING_CALLS } from "@/data/casting-calls";
import { CastingCallListingView } from "@/components/casting-calls/CastingCallListingView";

export const metadata = {
  title: "Print Ad & Catalogue Casting Calls | Delhi Casting Agency (DCA)",
  description:
    "Explore print advertisement casting calls for designer lookbooks, jewelry campaigns, and e-commerce catalogue shoots.",
};

export default function PrintAdsCastingPage() {
  return (
    <CastingCallListingView
      eyebrow="Print Ad Casting Calls"
      title="Print Ad &amp; Catalogue Casting Listings"
      description="Auditions and casting calls for print advertisements, designer lookbooks, high-end jewelry campaigns, and e-commerce catalogue shoots."
      heroBannerImage="/media/dca/models/dca-model-catalogue-01.jpg"
      initialCalls={CASTING_CALLS}
      defaultCategoryFilter="All"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Casting Calls", href: "/casting-calls/" },
        { label: "Print Ads" },
      ]}
    />
  );
}
