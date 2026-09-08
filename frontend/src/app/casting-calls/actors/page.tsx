import React from "react";
import { CASTING_CALLS, getCastingCallsByCategory } from "@/data/casting-calls";
import { CastingCallListingView } from "@/components/casting-calls/CastingCallListingView";

export const metadata = {
  title: "Actor Casting Calls | Delhi Casting Agency (DCA)",
  description:
    "Explore verified actor casting calls across Bollywood feature films, OTT web series, television serials, and commercial ads.",
};

export default function ActorCastingCallsPage() {
  const actorCalls = getCastingCallsByCategory("actors");

  return (
    <CastingCallListingView
      eyebrow="Actor Casting Calls"
      title="Actor Casting Call Listings"
      description="Explore casting call opportunities for male actors, female actors, fresh faces, and character artists across leading film and OTT productions."
      heroBannerImage="/media/dca/actors/dca-actors-hero-banner.jpg"
      initialCalls={actorCalls.length > 0 ? actorCalls : CASTING_CALLS}
      defaultCategoryFilter="Actors"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Casting Calls", href: "/casting-calls/" },
        { label: "Actors" },
      ]}
    />
  );
}
