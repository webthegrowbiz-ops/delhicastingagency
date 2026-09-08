import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Camera,
  CheckCircle2,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";

const profilePoints = [
  "Recent and clear profile photographs",
  "Accurate profile and measurement information",
  "Relevant commercial or modeling experience",
  "Advertising, lifestyle or product-related skills",
  "Portfolio or professional social links where relevant",
];

const opportunityTypes = [
  {
    title: "Advertising",
    description:
      "Commercial profiles can be relevant for advertising campaigns and brand communication.",
  },
  {
    title: "Brand Campaigns",
    description:
      "Present your profile for potential lifestyle, product and brand-focused requirements.",
  },
  {
    title: "Catalogue & E-commerce",
    description:
      "Commercial modeling can include catalogue, product and online retail requirements.",
  },
  {
    title: "Lifestyle Content",
    description:
      "Explore profiles and opportunities where natural presentation and relatable appearances are important.",
  },
];

const relatedCategories = [
  {
    title: "Fashion Models",
    description: "Explore fashion-focused modeling opportunities.",
    href: "/models/fashion-models/",
  },
  {
    title: "Plus-Size Models",
    description: "Explore the dedicated plus-size modeling category.",
    href: "/models/plus-size-models/",
  },
  {
    title: "Fitness Models",
    description:
      "Explore modeling opportunities focused on fitness and wellness.",
    href: "/models/fitness-models/",
  },
];

export default function CommercialModelsPage() {
  return (
    <main className="bg-white min-h-screen text-[#111111]">
      <PageHero
        eyebrow="Commercial Models"
        title="Commercial Model Casting & Registration"
        description="Explore the commercial model category for advertising, brand, catalogue, lifestyle and other commercial requirements."
      />

      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <Breadcrumb
          items={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: "Talents",
              href: "/talents/",
            },
            {
              label: "Models",
              href: "/models/",
            },
            {
              label: "Commercial Models",
            },
          ]}
        />
      </div>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                Commercial Model Category
              </p>

              <h2 className="mt-4 font-bold tracking-tight text-3xl text-[#111111] md:text-4xl">
                Present your commercial modeling profile
              </h2>

              <p className="mt-5 text-base leading-8 text-[#444444]">
                The commercial model category is designed for talent interested
                in advertising, brand campaigns, catalogues, lifestyle content
                and other commercial modeling requirements.
              </p>

              <p className="mt-4 text-base leading-8 text-[#444444]">
                Keep your photographs, experience, skills and portfolio
                information accurate so your profile clearly represents your
                current capabilities.
              </p>

              <Link
                href="/profile/setup"
                className="mt-8 inline-flex items-center rounded-xl bg-[#D4AF37] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c59b27] shadow-md"
              >
                Register as a Model
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-[#F7F7F5] p-8 shadow-xs">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                  <ShoppingBag className="h-6 w-6" />
                </div>

                <h3 className="mt-6 font-bold tracking-tight text-2xl text-[#111111]">
                  Build a commercial-ready profile
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#555555]">
                  Highlight the qualities and experience that are relevant to
                  commercial and brand-focused requirements.
                </p>

                <div className="mt-6 space-y-3">
                  {profilePoints.slice(0, 3).map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-3 text-sm text-[#444444]"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Opportunity Types */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Commercial Opportunities
            </p>

            <h2 className="mt-4 font-bold tracking-tight text-3xl text-[#111111] md:text-4xl">
              Types of commercial requirements
            </h2>

            <p className="mt-5 text-base leading-8 text-[#444444]">
              Commercial modeling can cover a wide range of brand and
              advertising requirements. Always review the specific details of
              each casting opportunity.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {opportunityTypes.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <div className="h-full rounded-2xl border border-gray-200 bg-[#F7F7F5] p-6 transition-colors hover:border-[#D4AF37]/40 shadow-xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                  <BriefcaseBusiness className="h-5 w-5" />
                </div>

                <h3 className="mt-5 font-bold tracking-tight text-xl text-[#111111]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#555555]">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Profile Preparation */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
        <Reveal>
          <div className="rounded-3xl border border-gray-200 bg-[#F7F7F5] p-8 md:p-10 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                <Camera className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                  Profile Preparation
                </p>

                <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                  Keep your commercial profile current
                </h2>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-[#444444] md:text-base">
                  Use recent photographs and provide accurate information about
                  your experience, skills and portfolio. A clear profile helps
                  communicate your suitability for different requirements.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {profilePoints.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#D4AF37]" />

                  <span className="text-sm leading-7 text-[#444444]">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Related Categories */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Explore More
            </p>

            <h2 className="mt-4 font-bold tracking-tight text-3xl text-[#111111] md:text-4xl">
              Explore other modeling categories
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {relatedCategories.map((item, index) => (
            <Reveal key={item.href} delay={index * 0.05}>
              <Link
                href={item.href}
                className="group block h-full rounded-2xl border border-gray-200 bg-[#F7F7F5] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-white shadow-xs"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-bold tracking-tight text-xl text-[#111111]">
                    {item.title}
                  </h3>

                  <ArrowRight className="h-5 w-5 shrink-0 text-[#D4AF37] transition-transform group-hover:translate-x-1" />
                </div>

                <p className="mt-3 text-sm leading-7 text-[#555555]">
                  {item.description}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Important Notice */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8 lg:pb-24">
        <Reveal>
          <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#F7F7F5] p-7 md:p-9 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                <Sparkles className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                  Important
                </p>

                <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                  Commercial opportunities do not guarantee selection.
                </h2>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-[#555555]">
                  Individual commercial opportunities can have their own
                  requirements, eligibility criteria and selection processes.
                  Registration or membership does not guarantee auditions,
                  bookings, employment or selection.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <CTASection
        eyebrow="Start Your Journey"
        title="Ready to showcase your commercial profile?"
        description="Register your talent profile and explore commercial modeling opportunities available on the platform."
        buttonLabel="Register Now"
        buttonHref="/profile/setup"
      />
    </main>
  );
}
