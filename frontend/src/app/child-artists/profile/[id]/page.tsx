import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getAllChildArtists, getChildArtistById, getRelatedChildArtists } from "@/data/child-artists";
import { ChildArtistProfileView } from "@/components/child-artists/ChildArtistProfileView";

interface ChildArtistProfilePageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const artists = getAllChildArtists();
  return artists.map((artist) => ({
    id: artist.id,
  }));
}

export async function generateMetadata({
  params,
}: ChildArtistProfilePageProps): Promise<Metadata> {
  const { id } = await params;
  const artist = getChildArtistById(id);

  if (!artist) {
    return {
      title: "Child Artist Profile | Delhi Casting Agency",
    };
  }

  return {
    title: `${artist.name} - ${artist.categoryLabel} | Delhi Casting Agency`,
    description: `${artist.name} is a verified ${artist.categoryLabel} (${artist.role}) based in ${artist.location}. View verified portfolio and guardian contact details.`,
  };
}

export default async function ChildArtistProfilePage({
  params,
}: ChildArtistProfilePageProps) {
  const { id } = await params;
  const artist = getChildArtistById(id);

  if (!artist) {
    notFound();
  }

  const similarArtists = getRelatedChildArtists(artist.id, artist.category, 8);

  return <ChildArtistProfileView artist={artist} similarArtists={similarArtists} />;
}
