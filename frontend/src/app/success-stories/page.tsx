import Link from "next/link";
import { ArrowRight, Quote, ShieldCheck, Star, Users } from "lucide-react";

import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContentSection } from "@/components/ui/content-section";
import { CTASection } from "@/components/ui/cta-section";
import { Reveal } from "@/components/ui/reveal";

const storyTypes = [
  {
    icon: <Users className="h-5 w-5" />,
    title: "Artist Journeys",
    description:
      "Profiles and experiences can be shared here when verified information is available.",
  },
  {
    icon: <Star className="h-5 w-5" />,
    title: "Testimonials",
    description:
      "Genuine feedback from artists can help future talent understand the platform experience.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Verified Stories",
    description:
      "Only genuine and verifiable placements or project experiences should be presented as success stories.",
  },
];

export default function SuccessStoriesPage() {
  return (
    <main className="bg-white min-h-screen text-[#111111]">
      {/* Hero */}
      <PageHero
        eyebrow="Success Stories"
        title="Real Talent Journeys, Told With Transparency"
        description="Discover artist experiences, testimonials and verified project journeys as they become available."
      />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Success Stories" }]}
        />
      </div>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Talent Experiences"
              title="Stories should be genuine, specific and verifiable"
              description="Success stories are most valuable when they reflect real artist experiences and clearly explain what happened."
              align="left"
            />

            <div className="mt-8 space-y-5 text-base leading-8 text-[#444444]">
              <p>
                This section is designed to showcase genuine experiences from
                artists who have used the platform and participated in relevant
                opportunities.
              </p>

              <p>
                Any placement, project or casting result presented here should
                be supported by information that can be verified and should not
                be presented as a guaranteed outcome for other artists.
              </p>

              <p>
                As verified stories become available, this page can be expanded
                with individual artist profiles, testimonials and project case
                studies.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#F7F7F5] p-8 shadow-xs">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                <Quote className="h-6 w-6" />
              </div>

              <blockquote className="mt-7 font-bold tracking-tight text-2xl leading-9 text-[#111111]">
                “Real experiences matter more than promises.”
              </blockquote>

              <p className="mt-5 text-sm leading-7 text-[#555555]">
                Future testimonials should be published only with appropriate
                permission and accurate context.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story Categories */}
      <ContentSection
        eyebrow="What You Can Expect"
        title="A transparent approach to success stories"
      >
        <p className="mx-auto max-w-3xl text-center text-base leading-7 text-[#444444]">
          The page can bring together different types of genuine artist
          experiences without making unrealistic promises about casting
          outcomes.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {storyTypes.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <div className="h-full rounded-2xl border border-gray-200 bg-[#F7F7F5] p-7 shadow-xs transition-all duration-300 hover:border-[#D4AF37]/40 hover:bg-white">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                  {item.icon}
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
      </ContentSection>

      {/* Current State */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <Reveal>
          <div className="rounded-3xl border border-gray-200 bg-[#F7F7F5] p-8 text-center lg:p-12 shadow-xs">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
              <ShieldCheck className="h-6 w-6" />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Verified Content
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl font-bold tracking-tight text-3xl text-[#111111] md:text-4xl">
              Genuine stories will be added as verified experiences become
              available.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#444444]">
              We do not present unverified placements, fabricated testimonials
              or guaranteed casting outcomes as success stories.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <Reveal>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xs">
            <p className="text-center text-sm leading-7 text-[#666666]">
              Casting opportunities and selection decisions vary by project. An
              artist&apos;s experience does not guarantee the same outcome for
              another artist.
            </p>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <CTASection
        eyebrow="Begin Your Journey"
        title="Ready to create your artist profile?"
        description="Explore the platform and start building your professional talent profile."
        buttonLabel="Register Now"
        buttonHref="/profile/setup"
      />

      {/* Secondary Link */}
      <section className="mx-auto max-w-7xl px-6 py-12 text-center lg:px-8 lg:py-16">
        <Reveal>
          <Link
            href="/how-it-works/"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#D4AF37] transition-colors hover:text-[#111111]"
          >
            See How It Works
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
