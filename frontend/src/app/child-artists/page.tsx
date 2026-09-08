import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ShieldCheck } from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";
import { CHILD_ARTIST_CATEGORIES } from "@/data/child-artists";
import { ChildArtistCategoryCard } from "@/components/child-artists/ChildArtistCategoryCard";

export const metadata = {
  title: "Child Artists & Junior Talent Roster | Delhi Casting Agency (DCA)",
  description:
    "Explore Delhi Casting Agency's curated child artist roster across Child Boys, Child Girls, and Fresh Child Talents with verified parental coordination.",
};

export default function ChildArtistsPage() {
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
                src="/images/actors/child artist horizontal.png"
                alt="Delhi Casting Agency Child Artists Roster"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <h1 className="font-serif text-3xl font-extrabold tracking-tight text-[#111111] sm:text-5xl md:text-6xl">
              Child Artists &amp; Junior Talent
            </h1>

            <p className="mt-4 max-w-3xl text-base font-normal leading-relaxed text-[#444444] sm:text-lg">
              Discover talented child actors and young performers available for age-appropriate TV commercials, feature films, TV shows, and print shoots.
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
            { label: "Child Artists" },
          ]}
        />
      </div>

      {/* Categories Grid Section */}
      <section className="mx-auto max-w-7xl px-6 py-8 sm:py-16">
        <Reveal>
          <div className="mb-10 max-w-3xl">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              <Sparkles className="h-3.5 w-3.5" />
              Representation &amp; Junior Divisions
            </span>

            <h2 className="mt-3 font-serif text-3xl font-extrabold tracking-tight text-[#111111] sm:text-4xl">
              Explore Child Artist Categories
            </h2>

            <p className="mt-3 text-base leading-relaxed text-[#444444]">
              Browse young performers with verified parental consent, strict child welfare compliance, and audition readiness.
            </p>
          </div>
        </Reveal>

        {/* 3 Category Cards Grid */}
        <div className="grid items-stretch gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {CHILD_ARTIST_CATEGORIES.map((category, index) => (
            <Reveal key={category.slug} delay={index * 0.05} className="h-full">
              <ChildArtistCategoryCard category={category} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Guardian Standards Callout */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <Reveal>
          <div className="rounded-xl border border-gray-200 bg-[#F7F7F5] p-8 shadow-xs sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                  <ShieldCheck className="h-4 w-4" />
                  Child Welfare Standard
                </span>

                <h2 className="mt-3 font-serif text-2xl font-bold tracking-tight text-[#111111] sm:text-3xl lg:text-4xl">
                  Safe &amp; Protected Creative Environments
                </h2>

                <p className="mt-3 max-w-2xl text-xs leading-relaxed text-[#444444] sm:text-sm">
                  DCA adheres to strict child welfare standards, ensuring educational priority, parental accompaniment on set, and capped working hours.
                </p>
              </div>

              <div className="flex items-center">
                <Link
                  href="/profile/setup"
                  className="inline-flex items-center justify-center rounded-full bg-[#111111] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-[#D4AF37]"
                >
                  Register Child Artist
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Global CTA */}
      <CTASection
        eyebrow="Child Artist Casting"
        title="Looking for Charismatic Young Performers?"
        description="Delhi Casting Agency coordinates child audition tapes, parent-supervised shoot schedules, and commercial talent."
        buttonLabel="Contact Junior Casting"
        buttonHref="/contact/"
      />
    </main>
  );
}
