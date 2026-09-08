import React from "react";
import type { Actor } from "@/data/actors";
import { ActorCard } from "./ActorCard";

interface ActorGridProps {
  actors: Actor[];
  emptyMessage?: string;
}

export function ActorGrid({
  actors,
  emptyMessage = "No actors found in this category at this time.",
}: ActorGridProps) {
  if (actors.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-[#F7F7F5] border border-[#E5E5E5] rounded-2xl">
        <p className="text-[#555555] text-base">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6">
      {actors.map((actor) => (
        <ActorCard key={actor.id} actor={actor} />
      ))}
    </div>
  );
}
