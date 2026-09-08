import React from "react";
import { CASTING_CALLS } from "@/data/casting-calls";
import { CastingCallListingView } from "@/components/casting-calls/CastingCallListingView";

export const metadata = {
  title: "TV Serial Casting Calls | Delhi Casting Agency (DCA)",
  description:
    "Explore auditions for daily soaps, prime-time television dramas, and national TV channel serials.",
};

export default function TvSerialsCastingPage() {
  return (
    <CastingCallListingView
      eyebrow="TV Serial Casting Calls"
      title="TV Serial &amp; Drama Casting Listings"
      description="Auditions for prime-time television serials, daily drama shows, and character roles across major Indian entertainment channels."
      heroBannerImage="/media/dca/casting-calls/dca-casting-tv-01.jpg"
      initialCalls={CASTING_CALLS}
      defaultCategoryFilter="All"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Casting Calls", href: "/casting-calls/" },
        { label: "TV Serials" },
      ]}
    />
  );
}
