import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mic2, Music2, Sparkles, Star, Users } from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";
import { getProfileCreateOrSetupUrl } from "@/lib/auth";

export const metadata = {
  title: "Talent Directory | Delhi Casting Agency (DCA)",
  description:
    "Explore actors, models, child artists, influencers, dancers and voice artists across dedicated talent categories with Delhi Casting Agency.",
};

const talentCategories = [
  {
    title: "Actors",
    description:
      "Explore dedicated actor categories for leading, supporting and character roles across film, television and OTT productions.",
    href: "/actors/",
    icon: Star,
    image: "/images/actors/talent male actore.png",
    segments: [],
  },
  {
    title: "Models",
    description:
      "Discover professional modeling divisions covering fashion, editorial, runway and commercial assignments.",
    href: "/models/",
    icon: Sparkles,
    image: "/images/actors/model femal 1.png",
    segments: [],
  },
  {
    title: "Child Artists",
    description:
      "A dedicated category for charismatic young performers with strict parental accompaniment and child welfare standards.",
    href: "/child-artists/",
    icon: Users,
    image: "/images/actors/talent child actor.png",
    segments: [],
  },
  {
    title: "Influencers",
    description:
      "Explore creator categories for digital campaigns, brand collaborations, social media and content production.",
    href: "/influencers/",
    icon: Sparkles,
    image: "/images/actors/any talent section horizonatlly.png",
    segments: [],
  },
  {
    title: "Dancers",
    description:
      "Discover professional dancer categories for choreography, music videos, stage shows and performance assignments.",
    href: "/dancers/",
    icon: Music2,
    image: "/images/actors/female photography.png",
    segments: [],
  },
  {
    title: "Voice Artists",
    description:
      "Explore voice talent divisions for multilingual dubbing, advertising commercials, narration and radio broadcasting.",
    href: "/voice-artists/",
    icon: Mic2,
    image: "/images/actors/ChatGPT Image Aug 21, 2026, 02_50_55 PM (2).png",
    segments: [],
  },
];

export default function TalentsPage() {
  return (
    <main className="bg-white min-h-screen text-[#111111]">
      {/* Hero Header */}
      <section className="relative isolate overflow-hidden border-b border-gray-200 bg-[#F7F7F5] px-4 sm:px-6 lg:px-8 pb-10 pt-32 sm:pb-14 sm:pt-36">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            {/* 1. Eyebrow */}
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37] mb-3">
              Talent Directory
            </p>

            {/* 2. Wide horizontal premium talent/model image banner */}
            <div className="relative w-full aspect-[21/7] max-h-[260px] sm:max-h-[300px] rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200 shadow-md mb-6 bg-gray-100">
              <Image
                src="/images/actors/talent horizontal.png"
                alt="Delhi Casting Agency Talent Directory"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            </div>

            {/* 3. Main heading */}
            <h1 className="max-w-4xl text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-[#111111]">
              Discover Talent Categories
            </h1>

            {/* 4. Description */}
            <p className="mt-4 max-w-3xl text-base sm:text-lg font-normal leading-relaxed text-[#444444]">
              Explore actors, models, child artists, influencers, dancers and voice artists across dedicated talent categories.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Breadcrumb Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Talents" }]}
        />
      </div>

      {/* Talent Hub Grid Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <Reveal>
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#666666] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              Talent Hub
            </span>

            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#111111]">
              Find the talent category that fits your profile
            </h2>

            <p className="mt-3 text-sm sm:text-base font-normal leading-relaxed text-[#444444]">
              Browse dedicated talent categories and explore the different
              segments available on the platform.
            </p>
          </div>
        </Reveal>

        {/* 3-Col Desktop, 2-Col Tablet, 1-Col Mobile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {talentCategories.map((category, index) => {
            const Icon = category.icon;

            return (
              <Reveal key={category.title} delay={index * 0.05} className="h-full">
                <div className="group flex flex-col justify-between h-full bg-white border border-gray-200 rounded-2xl sm:rounded-3xl overflow-hidden hover:border-[#d4af37]/60 hover:shadow-md transition-all duration-500 shadow-xs">
                  {/* Top Horizontal Image */}
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  </div>

                  <div className="flex flex-col flex-1 p-6 sm:p-7 pt-4">
                    {/* Icon & Arrow Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20">
                        <Icon className="h-6 w-6" />
                      </div>

                      <Link
                        href={category.href}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-[#555555] transition-colors hover:border-[#d4af37] hover:text-[#d4af37] hover:bg-gray-50"
                        aria-label={`Explore ${category.title}`}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>

                    {/* Category Title */}
                    <h2 className="text-2xl font-bold tracking-tight text-[#111111] group-hover:text-[#d4af37] transition-colors">
                      {category.title}
                    </h2>

                    {/* Category Description */}
                    <p className="mt-2.5 text-sm font-normal leading-relaxed text-[#555555]">
                      {category.description}
                    </p>
                  </div>

                  {/* Explore Category CTA */}
                  <div className="p-6 sm:p-7 pt-0 mt-auto border-t border-gray-200 flex items-center justify-between shrink-0">
                    <Link
                      href={category.href}
                      className="inline-flex items-center text-sm font-bold text-[#111111] hover:text-[#d4af37] transition-colors group/cta"
                    >
                      <span>Explore {category.title}</span>
                      <ArrowRight className="ml-1.5 h-4 w-4 text-[#d4af37] transition-transform group-hover/cta:translate-x-1" />
                    </Link>
                    <span className="text-xs text-[#666666] font-medium">
                      DCA Verified
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* For Artists Callout */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
        <Reveal>
          <div className="rounded-3xl border border-gray-200 bg-[#F7F7F5] p-8 sm:p-12 shadow-xs">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
                  For Artists
                </span>

                <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#111111]">
                  Ready to showcase your talent?
                </h2>

                <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-[#444444]">
                  Create your artist profile and provide accurate information
                  about your experience, skills and portfolio.
                </p>
              </div>

              <div className="flex items-center">
                <Link
                  href={getProfileCreateOrSetupUrl()}
                  className="inline-flex items-center justify-center rounded-xl bg-[#d4af37] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#c59b27] shadow-md"
                >
                  Create Your Profile
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Global CTA Section */}
      <CTASection
        eyebrow="Explore Opportunities"
        title="Find the category that matches your talent."
        description="Explore dedicated talent categories and learn more about the types of profiles the platform supports."
        buttonLabel="View Casting Calls"
        buttonHref="/casting-calls/"
      />
    </main>
  );
}
