import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";
import { CASTING_CATEGORIES } from "@/data/casting-calls";
import { CastingCategoryCard } from "@/components/casting-calls/CastingCategoryCard";

export const metadata = {
  title: "Casting Calls & Auditions | Delhi Casting Agency (DCA)",
  description:
    "Explore verified casting calls for actors, models, dancers, voice artists, influencers, Bollywood feature films, OTT web series, and TV commercials.",
};

export default function CastingCallsPage() {
  return (
    <main className="min-h-screen bg-white text-[#111111]">
      {/* Hero Header */}
      <section className="relative isolate overflow-hidden border-b border-gray-200 bg-[#F7F7F5] px-6 pb-12 pt-28 sm:pb-16 sm:pt-36">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              Casting Calls &amp; Auditions
            </p>

            <div className="relative mb-8 aspect-21/7 max-h-[280px] w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-md">
              <Image
                src="/images/actors/cating calls horizonattaly.png"
                alt="Delhi Casting Agency Casting Calls & Auditions"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <h1 className="font-serif text-3xl font-extrabold tracking-tight text-[#111111] sm:text-5xl md:text-6xl">
              Casting Calls &amp; Opportunities
            </h1>

            <p className="mt-4 max-w-3xl text-base font-normal leading-relaxed text-[#444444] sm:text-lg">
              Explore verified casting call categories across Bollywood feature films, OTT web series, television serials, national brand TVCs, runway fashion shows, and voice dubbing.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Breadcrumb Bar */}
      <div className="mx-auto max-w-7xl px-6 py-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Casting Calls" },
          ]}
        />
      </div>

      {/* Casting Call Categories Grid Section */}
      <section className="mx-auto max-w-7xl px-6 py-8 sm:py-16">
        <Reveal>
          <div className="mb-10 max-w-3xl">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              <Sparkles className="h-3.5 w-3.5" />
              Casting Divisions &amp; Hubs
            </span>

            <h2 className="mt-3 font-serif text-3xl font-extrabold tracking-tight text-[#111111] sm:text-4xl">
              Explore Casting Call Categories
            </h2>

            <p className="mt-3 text-base leading-relaxed text-[#444444]">
              Browse dedicated casting categories filtered by production type, discipline, and talent specialization. Every posting is 100% verified by DCA casting directors.
            </p>
          </div>
        </Reveal>

        {/* 3-Col Desktop, 2-Col Tablet, 1-Col Mobile Grid */}
        <div className="grid items-stretch gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {CASTING_CATEGORIES.map((category, index) => (
            <Reveal key={category.category} delay={index * 0.05} className="h-full">
              <CastingCategoryCard category={category} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* How to Approach Casting Calls Section */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <Reveal>
          <div className="rounded-xl border border-gray-200 bg-[#F7F7F5] p-8 shadow-xs sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                  <ShieldCheck className="h-4 w-4" />
                  Verified Casting Standard
                </span>

                <h2 className="mt-3 font-serif text-2xl font-bold tracking-tight text-[#111111] sm:text-3xl lg:text-4xl">
                  Safe &amp; Professional Audition Process
                </h2>

                <p className="mt-3 max-w-2xl text-xs leading-relaxed text-[#444444] sm:text-sm">
                  DCA ensures all casting calls are verified for authenticity. Review role requirements, prepare audition self-tapes, and submit directly through your verified DCA talent profile.
                </p>
              </div>

              <div className="flex items-center">
                <Link
                  href="/profile/setup"
                  className="inline-flex items-center justify-center rounded-full bg-[#111111] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-[#D4AF37]"
                >
                  Register as Talent
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Global CTA Section */}
      <CTASection
        eyebrow="Find Your Opportunity"
        title="Ready to apply for casting calls?"
        description="Create your DCA talent profile and submit your portfolio for suitable casting opportunities."
        buttonLabel="Register Now"
        buttonHref="/profile/setup"
      />
    </main>
  );
}
