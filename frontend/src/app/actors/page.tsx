import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Film, Star, UserCheck } from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { ACTOR_CATEGORIES } from "@/data/actors";
import { ActorCategoryCard } from "@/components/actors/ActorCategoryCard";

export const metadata = {
  title: "Actors & Casting Roster | Delhi Casting Agency (DCA)",
  description:
    "Explore Delhi Casting Agency's curated actor roster across Male Actors, Female Actors, Fresh Faces, Experienced Actors, Popular Stars, and Child Actors.",
};

export default function ActorsPage() {
  return (
    <main className="min-h-screen bg-white text-[#111111]">
      {/* Hero Header */}
      <section className="relative isolate overflow-hidden border-b border-gray-200 bg-[#F7F7F5] px-6 pb-12 pt-28 sm:pb-16 sm:pt-36 text-[#111111]">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              Talent Roster
            </p>

            <div className="relative mb-8 aspect-21/7 max-h-[280px] w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-md">
              <Image
                src="/images/actors/talwnt actor horizonatl.png"
                alt="Delhi Casting Agency Actors & Casting Portfolio"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <h1 className="font-serif text-3xl font-extrabold tracking-tight text-[#111111] sm:text-5xl md:text-6xl">
              Actors &amp; Casting Portfolio
            </h1>

            <p className="mt-4 max-w-3xl text-base font-normal leading-relaxed text-[#444444] sm:text-lg">
              Discover Delhi Casting Agency’s specialized actor roster. From emerging fresh faces and child artists to seasoned screen veterans and mainstream stars.
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
            { label: "Actors" },
          ]}
        />
      </div>

      {/* Categories Grid Section */}
      <section className="mx-auto max-w-7xl px-6 py-8 sm:py-16">
        <Reveal>
          <div className="mb-12 max-w-3xl">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              <Sparkles className="h-3.5 w-3.5" />
              Representation &amp; Casting Categories
            </span>

            <h2 className="mt-3 font-sans text-3xl font-extrabold tracking-tight text-[#111111] sm:text-4xl">
              Explore Actor Categories
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#444444]">
              Browse actors filtered by category, screen experience, and specialty.
              Every artist profile includes complete physical specifications, verified showreels, digital comp cards, and career credits.
            </p>
          </div>
        </Reveal>

        {/* 6 Category Cards Grid */}
        <div className="grid items-stretch gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {ACTOR_CATEGORIES.map((category, index) => (
            <Reveal key={category.slug} delay={index * 0.05} className="h-full">
              <ActorCategoryCard category={category} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Highlights / Features Banner */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <Reveal>
          <div className="grid gap-6 rounded-xl border border-gray-200 bg-[#F7F7F5] p-6 shadow-xs sm:p-8 md:grid-cols-3">
            <div className="flex items-start gap-4 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-white text-[#D4AF37] shadow-2xs">
                <Film className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#111111]">
                  Verified Video Showreels
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#555555]">
                  Screen tests, dramatic monologues and cinematic reels formatted for top casting directors.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 border-t border-gray-200 p-4 md:border-t-0 md:border-x md:px-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-white text-[#D4AF37] shadow-2xs">
                <Star className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#111111]">
                  Complete Comp Cards
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#555555]">
                  Interactive multi-tab portfolios including digitals, video reels, Instagram highlights and print work.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 border-t border-gray-200 p-4 md:border-t-0">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-white text-[#D4AF37] shadow-2xs">
                <UserCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#111111]">
                  Direct Casting Access
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#555555]">
                  Streamlined inquiry and audition scheduling direct with DCA talent managers in Delhi NCR.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* For Actors Registration Callout */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <Reveal>
          <div className="rounded-xl border border-gray-200 bg-[#F7F7F5] p-8 shadow-xs sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                  Talent Representation
                </span>

                <h2 className="mt-3 font-serif text-2xl font-bold tracking-tight text-[#111111] sm:text-3xl lg:text-4xl">
                  Are You an Actor Looking for Casting Opportunities?
                </h2>

                <p className="mt-3 max-w-2xl text-xs leading-relaxed text-[#444444] sm:text-sm">
                  Register your profile with Delhi Casting Agency to get discovered by directors, production houses, and casting coordinators across Bollywood, OTT series, and commercial advertising.
                </p>
              </div>

              <div className="flex items-center">
                <Link
                  href="/profile/setup"
                  className="inline-flex items-center justify-center rounded-full bg-[#111111] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-[#D4AF37]"
                >
                  Register as an Actor
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
