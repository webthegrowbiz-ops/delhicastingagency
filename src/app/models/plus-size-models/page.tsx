import React from "react";
import Link from "next/link";
import { Users, Sparkles } from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";
import { getModelsByCategory, getModelCategoryBySlug, MODEL_CATEGORIES } from "@/data/models";
import { ModelGrid } from "@/components/models/ModelGrid";

export const metadata = {
  title: "Plus-Size Models Roster | Delhi Casting Agency (DCA)",
  description:
    "Explore confident, body-positive plus-size models for inclusive fashion, lifestyle, and retail campaigns.",
};

export default function PlusSizeModelsPage() {
  const category = getModelCategoryBySlug("plus-size-models")!;
  const models = getModelsByCategory("plus-size-models");
  const otherCategories = MODEL_CATEGORIES.filter((c) => c.slug !== "plus-size-models");

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
                { label: "Models", href: "/models/" },
                { label: "Plus-Size Models" },
              ]}
            />
          </div>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d4af37] mb-2">
              Talent Roster
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111111]">
              Plus-Size Models
            </h1>
            <p className="mt-2.5 max-w-3xl text-sm sm:text-base text-[#444444] leading-relaxed">
              {category.heroDescription}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured Models Grid Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6 pb-4 border-b border-gray-200">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold flex items-center gap-1.5 mb-1.5">
                <Users className="w-3.5 h-3.5" />
                Featured Artists
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
                Plus-Size Model Profiles
              </h2>
            </div>
            <span className="text-xs sm:text-sm text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30 px-3.5 py-1.5 rounded-full self-start md:self-auto font-medium">
              Showing Verified Models
            </span>
          </div>
        </Reveal>

        {/* Model Cards Grid */}
        <Reveal delay={0.1}>
          <ModelGrid models={models} />
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
              Other Modeling Divisions
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
        eyebrow="Inclusive Fashion Casting"
        title="Ready to Cast Empowering Curve &amp; Plus-Size Models?"
        description="Delhi Casting Agency represents verified plus-size models celebrating authentic confidence."
        buttonLabel="Contact Booking Desk"
        buttonHref="/contact/"
      />
    </main>
  );
}
