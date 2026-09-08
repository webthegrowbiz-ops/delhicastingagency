import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";
import { INFLUENCER_CATEGORIES } from "@/data/influencers";
import { InfluencerCategoryCard } from "@/components/influencers/InfluencerCategoryCard";

export const metadata = {
  title: "Influencers & Content Creators | Delhi Casting Agency (DCA)",
  description:
    "Explore Delhi Casting Agency's verified influencer roster across Instagram, YouTube, Lifestyle, and Fashion content creators.",
};

export default function InfluencersPage() {
  return (
    <main className="min-h-screen bg-white text-[#111111]">
      {/* Hero Header */}
      <section className="relative isolate overflow-hidden border-b border-gray-200 bg-[#F7F7F5] px-6 pb-12 pt-28 sm:pb-16 sm:pt-36">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              Talent Roster
            </p>

            <div className="relative mb-8 aspect-21/7 max-h-[280px] w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-md">
              <Image
                src="/images/actors/talent influencer horizontal.png"
                alt="Delhi Casting Agency Influencers & Content Creators"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <h1 className="font-serif text-3xl font-extrabold tracking-tight text-[#111111] sm:text-5xl md:text-6xl">
              Influencers &amp; Content Creators
            </h1>

            <p className="mt-4 max-w-3xl text-base font-normal leading-relaxed text-[#444444] sm:text-lg">
              Explore creator categories for digital campaigns, brand collaborations, social media reels, and high-impact content production.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Breadcrumb Bar */}
      <div className="mx-auto max-w-7xl px-6 py-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Talents", href: "/talents/" },
            { label: "Influencers" },
          ]}
        />
      </div>

      {/* Categories Grid Section */}
      <section className="mx-auto max-w-7xl px-6 py-8 sm:py-16">
        <Reveal>
          <div className="mb-10 max-w-3xl">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              <Sparkles className="h-3.5 w-3.5" />
              Representation &amp; Creator Divisions
            </span>

            <h2 className="mt-3 font-serif text-3xl font-extrabold tracking-tight text-[#111111] sm:text-4xl">
              Explore Creator Categories
            </h2>

            <p className="mt-3 text-base leading-relaxed text-[#444444]">
              Browse top digital creators categorized by platform, audience reach, engagement rates, and storytelling niches.
            </p>
          </div>
        </Reveal>

        {/* 4 Category Cards Grid */}
        <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {INFLUENCER_CATEGORIES.map((category, index) => (
            <Reveal key={category.slug} delay={index * 0.05} className="h-full">
              <InfluencerCategoryCard category={category} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Global CTA */}
      <CTASection
        eyebrow="Influencer Marketing"
        title="Ready to Launch a High-Impact Creator Campaign?"
        description="Delhi Casting Agency connects brands with verified creators across lifestyle, fashion, tech, and travel."
        buttonLabel="Inquire for Collaborations"
        buttonHref="/contact/"
      />
    </main>
  );
}
