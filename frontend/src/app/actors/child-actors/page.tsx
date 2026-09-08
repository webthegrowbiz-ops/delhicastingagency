import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Smile, ShieldCheck } from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";
import { getActorsByCategory, getCategoryBySlug, ACTOR_CATEGORIES } from "@/data/actors";
import { ActorGrid } from "@/components/actors/ActorGrid";

export const metadata = {
  title: "Child Actors Roster | Delhi Casting Agency (DCA)",
  description:
    "Discover talented child actors and young performers available for age-appropriate TV commercials, feature films, TV shows, and print shoots.",
};

const childSafetyPoints = [
  "Strict adherence to child artist working hour regulations and welfare norms",
  "Mandatory parental accompaniment or legal guardian consent on all sets",
  "Dedicated coordination for school and examination schedules",
  "Safe, supportive and professional audition environments",
];

export default function ChildActorsPage() {
  const category = getCategoryBySlug("child-actors")!;
  const actors = getActorsByCategory("child-actors");
  const otherCategories = ACTOR_CATEGORIES.filter((c) => c.slug !== "child-actors");

  return (
    <main className="bg-white min-h-screen text-[#111111]">
      {/* Streamlined Category Hero */}
      <section className="relative isolate overflow-hidden border-b border-gray-200 bg-[#F7F7F5] px-4 sm:px-6 lg:px-8 pb-8 pt-32 sm:pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Talents", href: "/talents/" },
                { label: "Actors", href: "/actors/" },
                { label: "Child Actors" },
              ]}
            />
          </div>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d4af37] mb-2">
              Talent Roster
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111111]">
              Child Actors
            </h1>
            <p className="mt-2.5 max-w-3xl text-sm sm:text-base text-[#444444] leading-relaxed">
              {category.heroDescription}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured Profiles Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6 pb-4 border-b border-gray-200">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold flex items-center gap-1.5 mb-1.5">
                <Smile className="w-3.5 h-3.5" />
                Young Performers
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
                Child Actor Profiles
              </h2>
            </div>
            <span className="text-xs sm:text-sm text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30 px-3.5 py-1.5 rounded-full self-start md:self-auto font-medium">
              Showing Verified Artists
            </span>
          </div>
        </Reveal>

        {/* Actor Cards Grid */}
        <Reveal delay={0.1}>
          <ActorGrid actors={actors} />
        </Reveal>
      </section>

      {/* Child Talent Guidelines & Guardian Support */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 lg:grid-cols-2 items-stretch">
          <Reveal>
            <div className="h-full bg-[#F7F7F5] border border-gray-200 rounded-3xl p-8 flex flex-col justify-between shadow-xs">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
                  Parent &amp; Guardian Info
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#111111] mt-3 mb-4">
                  Registering Your Child With DCA
                </h3>
                <p className="text-[#444444] text-sm sm:text-base leading-relaxed mb-4">
                  Delhi Casting Agency provides a safe, nurturing, and professionally managed gateway for talented kids looking to work in children&apos;s films, national TV commercials, and brand print campaigns.
                </p>
                <p className="text-[#444444] text-sm sm:text-base leading-relaxed">
                  All auditions and shoots are coordinated directly with parents or legal guardians, ensuring the child&apos;s academic priorities and emotional wellbeing are strictly protected.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href="/profile/setup"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#c59b27] transition-all shadow-md"
                >
                  Register Child Artist
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full bg-[#F7F7F5] border border-gray-200 rounded-3xl p-8 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-[#d4af37]/10 text-[#d4af37]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="text-xl font-bold text-[#111111]">
                    Child Talent Protection Standards
                  </h4>
                </div>
                <div className="space-y-3.5 mt-4">
                  {childSafetyPoints.map((pt, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-[#444444]">
                      <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 p-4 rounded-xl bg-white border border-gray-200 text-xs text-[#666666]">
                Note: Profile management and communication for child artists is managed exclusively by authorized parents or legal guardians.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Other Categories Switcher */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 border-t border-gray-200">
        <Reveal>
          <div className="mb-6">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Explore More Categories
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#111111]">
              Other Talent Divisions
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {otherCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={cat.route}
                className="p-4 rounded-xl bg-[#F7F7F5] border border-gray-200 hover:border-[#d4af37]/60 hover:bg-white transition-all group block text-center shadow-2xs"
              >
                <span className="text-sm font-semibold text-[#111111] group-hover:text-[#d4af37] transition-colors block">
                  {cat.title}
                </span>
                <span className="text-[11px] text-[#666666] block mt-1">
                  {cat.countLabel}
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Category CTA */}
      <CTASection
        eyebrow="Child Artist Casting"
        title="Looking for Charismatic Young Actors for Your Production?"
        description="Connect with DCA for verified child audition reels, parent-coordinated bookings, and commercial talent."
        buttonLabel="Contact Casting Team"
        buttonHref="/contact/"
      />
    </main>
  );
}
