import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getAllVoiceArtists, getVoiceArtistById, getRelatedVoiceArtists } from "@/data/voice-artists";
import { VoiceArtistProfileView } from "@/components/voice-artists/VoiceArtistProfileView";

interface VoiceArtistProfilePageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const artists = getAllVoiceArtists();
  return artists.map((artist) => ({
    id: artist.id,
  }));
}

export async function generateMetadata({
  params,
}: VoiceArtistProfilePageProps): Promise<Metadata> {
  const { id } = await params;
  const artist = getVoiceArtistById(id);

  if (!artist) {
    return {
      title: "Voice Artist Profile | Delhi Casting Agency",
    };
  }

  return {
    title: `${artist.name} - ${artist.categoryLabel} | Delhi Casting Agency`,
    description: `${artist.name} is a verified ${artist.categoryLabel} (${artist.role}) based in ${artist.location} with ${artist.voiceTexture}. View audio reels and booking details.`,
  };
}

export default async function VoiceArtistProfilePage({
  params,
}: VoiceArtistProfilePageProps) {
  const { id } = await params;
  const artist = getVoiceArtistById(id);

  if (!artist) {
    notFound();
  }

  const similarArtists = getRelatedVoiceArtists(artist.id, artist.category, 8);

  return <VoiceArtistProfileView artist={artist} similarArtists={similarArtists} />;
}
