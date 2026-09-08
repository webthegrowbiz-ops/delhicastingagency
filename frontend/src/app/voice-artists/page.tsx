import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";
import { VOICE_ARTIST_CATEGORIES } from "@/data/voice-artists";
import { VoiceArtistCategoryCard } from "@/components/voice-artists/VoiceArtistCategoryCard";

export const metadata = {
  title: "Voice Artists & Dubbing Talents | Delhi Casting Agency (DCA)",
  description:
    "Explore Delhi Casting Agency's verified voice talent roster across Dubbing Artists, Voice Over Narrators, and Radio Jockeys.",
};

export default function VoiceArtistsPage() {
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
                src="/images/actors/vpice artist horizontal.jpg"
                alt="Delhi Casting Agency Voice Artists & Dubbing Talents"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <h1 className="font-serif text-3xl font-extrabold tracking-tight text-[#111111] sm:text-5xl md:text-6xl">
              Voice Artists &amp; Dubbing Talents
            </h1>

            <p className="mt-4 max-w-3xl text-base font-normal leading-relaxed text-[#444444] sm:text-lg">
              Explore voice talent divisions for multilingual film dubbing, advertising commercials, audiobook narration, and radio broadcasting.
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
            { label: "Voice Artists" },
          ]}
        />
      </div>

      {/* Categories Grid Section */}
      <section className="mx-auto max-w-7xl px-6 py-8 sm:py-16">
        <Reveal>
          <div className="mb-10 max-w-3xl">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              <Sparkles className="h-3.5 w-3.5" />
              Representation &amp; Voice Divisions
            </span>

            <h2 className="mt-3 font-serif text-3xl font-extrabold tracking-tight text-[#111111] sm:text-4xl">
              Explore Voice Categories
            </h2>

            <p className="mt-3 text-base leading-relaxed text-[#444444]">
              Browse broadcast-grade voice talents by vocal pitch, native languages, character modulation, and home studio capabilities.
            </p>
          </div>
        </Reveal>

        {/* 3 Category Cards Grid */}
        <div className="grid items-stretch gap-6 sm:gap-8 md:grid-cols-3">
          {VOICE_ARTIST_CATEGORIES.map((category, index) => (
            <Reveal key={category.slug} delay={index * 0.05} className="h-full">
              <VoiceArtistCategoryCard category={category} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Global CTA */}
      <CTASection
        eyebrow="Voice Casting &amp; Dubbing"
        title="Need Specialized Voices for Films or Commercials?"
        description="Delhi Casting Agency coordinates custom audition voice reels, language supervision, and studio recording."
        buttonLabel="Contact Voice Desk"
        buttonHref="/contact/"
      />
    </main>
  );
}
