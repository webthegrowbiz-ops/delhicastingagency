import Link from "next/link";
import { ArrowLeft, Clapperboard, Home, Search } from "lucide-react";

import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";

export default function Custom404Page() {
  return (
    <main>
      <PageHero
        eyebrow="Page Not Found"
        title="This page is not available"
        description="The page you're looking for may have moved, been removed, or the URL may be incorrect."
      />

      <section className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-24">
        <Reveal>
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-[#D4AF37]/20 bg-[#D4AF37]/[0.06] text-[#D4AF37]">
              <Clapperboard className="h-9 w-9" />
            </div>

            <p className="mt-8 font-bold tracking-tight text-7xl font-semibold text-[#D4AF37] md:text-8xl">
              404
            </p>

            <h2 className="mt-6 font-bold tracking-tight text-3xl text-white md:text-4xl">
              Looks like this scene is missing.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
              Don&apos;t worry. You can return to the homepage or explore our casting
              and talent categories to continue your journey.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#E8C85A]"
              >
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>

              <Link
                href="/casting-calls/"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
              >
                <Search className="mr-2 h-4 w-4" />
                Explore Casting Calls
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8 lg:pb-24">
        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                  Continue Exploring
                </p>

                <h3 className="mt-3 font-bold tracking-tight text-2xl text-white md:text-3xl">
                  Find your next opportunity
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75">
                  Browse actors, models, dancers, influencers, voice artists and
                  current casting categories.
                </p>
              </div>

              <Link
                href="/talents/"
                className="inline-flex shrink-0 items-center text-sm font-semibold text-[#D4AF37]"
              >
                Explore Talents
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <CTASection
        eyebrow="Way to Bollywood"
        title="Ready to start your journey?"
        description="Create your talent profile and explore opportunities available on the platform."
        buttonLabel="Register Now"
        buttonHref="/profile/setup"
      />
    </main>
  );
}
