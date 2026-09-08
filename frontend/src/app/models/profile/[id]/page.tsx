import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getAllModels, getModelById, getRelatedModels } from "@/data/models";
import { ModelProfileView } from "@/components/models/ModelProfileView";

interface ModelProfilePageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const models = getAllModels();
  return models.map((model) => ({
    id: model.id,
  }));
}

export async function generateMetadata({
  params,
}: ModelProfilePageProps): Promise<Metadata> {
  const { id } = await params;
  const model = getModelById(id);

  if (!model) {
    return {
      title: "Model Profile | Delhi Casting Agency",
    };
  }

  return {
    title: `${model.name} - ${model.categoryLabel} | Delhi Casting Agency`,
    description: `${model.name} is a verified ${model.categoryLabel} (${model.role}) based in ${model.location}. View complete specifications, portfolio, and booking details.`,
  };
}

export default async function ModelProfilePage({
  params,
}: ModelProfilePageProps) {
  const { id } = await params;
  const model = getModelById(id);

  if (!model) {
    notFound();
  }

  const similarModels = getRelatedModels(model.id, model.category, 8);

  return <ModelProfileView model={model} similarModels={similarModels} />;
}
