import React from "react";
import { CASTING_CALLS, getCastingCallsByCategory } from "@/data/casting-calls";
import { CastingCallListingView } from "@/components/casting-calls/CastingCallListingView";

export const metadata = {
  title: "Bollywood Film Casting Calls | Delhi Casting Agency (DCA)",
  description:
    "Explore feature-film casting calls for upcoming theatrical releases, major studio productions, and independent Bollywood films.",
};

export default function BollywoodFilmsCastingPage() {
  const filmCalls = getCastingCallsByCategory("bollywood-films");

  return (
    <CastingCallListingView
      eyebrow="Bollywood Film Casting Calls"
      title="Bollywood Feature Film Casting Listings"
      description="Prepare your talent profile for feature film auditions, lead character roles, supporting roles, and silver screen appearances."
      heroBannerImage="/media/dca/casting-calls/dca-casting-film-01.jpg"
      initialCalls={filmCalls.length > 0 ? filmCalls : CASTING_CALLS}
      defaultCategoryFilter="Bollywood Films"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Casting Calls", href: "/casting-calls/" },
        { label: "Bollywood Films" },
      ]}
    />
  );
}
