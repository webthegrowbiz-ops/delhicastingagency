import React from "react";
import Link from "next/link";
import { ArrowRight, Users, Sparkles, CheckCircle2, UserPlus } from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";
import { getActorsByCategory, getCategoryBySlug, ACTOR_CATEGORIES } from "@/data/actors";
import { ActorGrid } from "@/components/actors/ActorGrid";

export const metadata = {
  title: "Fresh Faces Actor Roster | Delhi Casting Agency (DCA)",
  description:
    "Discover emerging actors and new talent ready for debut auditions, TV commercials, OTT shows and feature films with Delhi Casting Agency.",
};

const profilePoints = [
  "Recent, well-lit digital headshots & natural portraits",
  "Accurate age, height, and location specs",
  "Language proficiencies and accent capabilities",
  "Special talents: singing, dance, sports or martial arts",
  "Audition monologue or self-tape introduction link",
];

export default function FreshFacesPage() {
  const category = getCategoryBySlug("fresh-faces")!;
  const actors = getActorsByCategory("fresh-faces");
  const otherCategories = ACTOR_CATEGORIES.filter((c) => c.slug !== "fresh-faces");

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
                { label: "Fresh Faces" },
              ]}
            />
          </div>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d4af37] mb-2">
              Talent Roster
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111111]">
              Fresh Faces
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
                <Users className="w-3.5 h-3.5" />
                Emerging Talent
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
                Fresh Face Actor Profiles
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

      {/* Guidance for Aspiring Newcomers */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 lg:grid-cols-2 items-stretch">
          <Reveal>
            <div className="h-full bg-[#F7F7F5] border border-gray-200 rounded-3xl p-8 flex flex-col justify-between shadow-xs">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
                  For Aspiring Talents
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#111111] mt-3 mb-4">
                  Start Your Acting Journey With DCA
                </h3>
                <p className="text-[#444444] text-sm sm:text-base leading-relaxed mb-4">
                  The Fresh Faces division is dedicated to discovering new actors, college theatre artists, and passionate performers looking for their first professional screen opportunity.
                </p>
                <p className="text-[#444444] text-sm sm:text-base leading-relaxed">
                  Our talent managers help you build an audition-ready comp card, organize professional test shoots, and present your profile to prominent casting directors.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href="/profile/setup"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#c59b27] transition-all shadow-md"
                >
                  Register as a Fresh Face
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
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <h4 className="text-xl font-bold text-[#111111]">
                    Fresh Face Profile Checklist
                  </h4>
                </div>
                <div className="space-y-3 mt-4">
                  {profilePoints.map((pt, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-[#444444]">
                      <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 p-4 rounded-xl bg-white border border-gray-200 text-xs text-[#666666]">
                Tip: Keep headshots natural with minimal makeup to allow directors to envision diverse characters.
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
        eyebrow="Fresh Faces Casting"
        title="Ready to Cast or Audition New Talent?"
        description="Delhi Casting Agency connects promising new talent with ongoing film, web series, and commercial casting calls."
        buttonLabel="Register as Talent"
        buttonHref="/profile/setup"
      />
    </main>
  );
}
