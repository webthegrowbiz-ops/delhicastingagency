import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getAllDancers, getDancerById, getRelatedDancers } from "@/data/dancers";
import { DancerProfileView } from "@/components/dancers/DancerProfileView";

interface DancerProfilePageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const dancers = getAllDancers();
  return dancers.map((dancer) => ({
    id: dancer.id,
  }));
}

export async function generateMetadata({
  params,
}: DancerProfilePageProps): Promise<Metadata> {
  const { id } = await params;
  const dancer = getDancerById(id);

  if (!dancer) {
    return {
      title: "Dancer Profile | Delhi Casting Agency",
    };
  }

  return {
    title: `${dancer.name} - ${dancer.categoryLabel} | Delhi Casting Agency`,
    description: `${dancer.name} is a verified ${dancer.categoryLabel} (${dancer.role}) trained in ${dancer.danceStyles.join(", ")}. View performance reels and casting details.`,
  };
}

export default async function DancerProfilePage({
  params,
}: DancerProfilePageProps) {
  const { id } = await params;
  const dancer = getDancerById(id);

  if (!dancer) {
    notFound();
  }

  const similarDancers = getRelatedDancers(dancer.id, dancer.category, 8);

  return <DancerProfileView dancer={dancer} similarDancers={similarDancers} />;
}
