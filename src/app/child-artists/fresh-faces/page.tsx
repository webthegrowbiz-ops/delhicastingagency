import React from "react";
import Link from "next/link";
import { Users, Sparkles } from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";
import { getChildArtistsByCategory, getChildCategoryBySlug, CHILD_ARTIST_CATEGORIES } from "@/data/child-artists";
import { ChildArtistGrid } from "@/components/child-artists/ChildArtistGrid";

export const metadata = {
  title: "Fresh Child Artists Roster | Delhi Casting Agency (DCA)",
  description:
    "Discover debut child actors and emerging young talents ready for commercial, print, and introductory screen auditions.",
};

export default function FreshChildArtistsPage() {
  const category = getChildCategoryBySlug("fresh-faces")!;
  const artists = getChildArtistsByCategory("fresh-faces");
  const otherCategories = CHILD_ARTIST_CATEGORIES.filter((c) => c.slug !== "fresh-faces");

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
                { label: "Child Artists", href: "/child-artists/" },
                { label: "Fresh Child Artists" },
              ]}
            />
          </div>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d4af37] mb-2">
              Talent Roster
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111111]">
              Fresh Child Artists
            </h1>
            <p className="mt-2.5 max-w-3xl text-sm sm:text-base text-[#444444] leading-relaxed">
              {category.heroDescription}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured Artists Grid Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6 pb-4 border-b border-gray-200">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold flex items-center gap-1.5 mb-1.5">
                <Users className="w-3.5 h-3.5" />
                Featured Junior Artists
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
                Fresh Child Artist Profiles
              </h2>
            </div>
            <span className="text-xs sm:text-sm text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30 px-3.5 py-1.5 rounded-full self-start md:self-auto font-medium">
              Showing Verified Artists
            </span>
          </div>
        </Reveal>

        {/* Child Artist Cards Grid */}
        <Reveal delay={0.1}>
          <ChildArtistGrid artists={artists} />
        </Reveal>
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
              Other Junior Divisions
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3.5 max-w-lg">
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
        eyebrow="New Child Talent"
        title="Ready to Audition Debut Child Artists?"
        description="Delhi Casting Agency connects promising new child talents with ongoing casting calls."
        buttonLabel="Register Child Artist"
        buttonHref="/profile/setup"
      />
    </main>
  );
}
