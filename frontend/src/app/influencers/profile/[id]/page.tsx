import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getAllInfluencers, getInfluencerById, getRelatedInfluencers } from "@/data/influencers";
import { InfluencerProfileView } from "@/components/influencers/InfluencerProfileView";

interface InfluencerProfilePageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const influencers = getAllInfluencers();
  return influencers.map((influencer) => ({
    id: influencer.id,
  }));
}

export async function generateMetadata({
  params,
}: InfluencerProfilePageProps): Promise<Metadata> {
  const { id } = await params;
  const influencer = getInfluencerById(id);

  if (!influencer) {
    return {
      title: "Creator Profile | Delhi Casting Agency",
    };
  }

  return {
    title: `${influencer.name} - ${influencer.categoryLabel} | Delhi Casting Agency`,
    description: `${influencer.name} (${influencer.handle}) is a verified ${influencer.categoryLabel} based in ${influencer.location} with ${influencer.followers} followers. View collaboration details.`,
  };
}

export default async function InfluencerProfilePage({
  params,
}: InfluencerProfilePageProps) {
  const { id } = await params;
  const influencer = getInfluencerById(id);

  if (!influencer) {
    notFound();
  }

  const similarInfluencers = getRelatedInfluencers(influencer.id, influencer.category, 8);

  return <InfluencerProfileView influencer={influencer} similarInfluencers={similarInfluencers} />;
}
