import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllActors,
  getActorById,
  getRelatedActors,
} from "@/data/actors";
import { ActorProfileView } from "@/components/actors/ActorProfileView";

interface ActorProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const actors = getAllActors();
  return actors.map((actor) => ({
    id: actor.id,
  }));
}

export async function generateMetadata({
  params,
}: ActorProfilePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const actor = getActorById(resolvedParams.id);

  if (!actor) {
    return {
      title: "Actor Not Found | Delhi Casting Agency",
    };
  }

  return {
    title: `${actor.name} - ${actor.role} | Delhi Casting Agency (DCA)`,
    description: `${actor.name} (${actor.categoryLabel}) - ${actor.experience} experience. ${actor.about.slice(0, 150)}...`,
  };
}

export default async function ActorProfilePage({
  params,
}: ActorProfilePageProps) {
  const resolvedParams = await params;
  const actor = getActorById(resolvedParams.id);

  if (!actor) {
    notFound();
  }

  const relatedActors = getRelatedActors(actor.id, actor.category, 8);

  return <ActorProfileView actor={actor} relatedActors={relatedActors} />;
}
