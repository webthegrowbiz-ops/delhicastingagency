import Link from "next/link";
import { ArrowRight, CheckCircle2, UserRound } from "lucide-react";

import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";

const profilePoints = [
  "Recent and clear profile photographs",
  "Accurate acting experience and background",
  "Relevant acting skills and special abilities",
  "Languages and performance skills",
  "Portfolio or professional social links where relevant",
];

const talentTypes = [
  {
    title: "Fresh Faces",
    description:
      "Suitable for artists beginning their professional acting journey.",
    href: "/actors/fresh-faces/",
  },
  {
    title: "Experienced Actors",
    description: "For working actors with previous professional experience.",
    href: "/actors/experienced/",
  },
];

export default function MaleActorsPage() {
  return (
    <main className="bg-white min-h-screen text-[#111111]">
      <PageHero
        eyebrow="Male Actors"
        title="Male Actor Casting & Registration"
        description="Explore the male actor category and prepare a professional profile for relevant casting opportunities."
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
              label: "Actors",
              href: "/actors/",
            },
            {
              label: "Male Actors",
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
                Male Actor Category
              </p>

              <h2 className="mt-4 font-bold tracking-tight text-3xl text-[#111111] md:text-4xl">
                Present your acting profile professionally
              </h2>

              <p className="mt-5 text-base leading-8 text-[#444444]">
                The male actor category is designed for artists who want to
                present their acting profile and explore relevant casting
                opportunities.
              </p>

              <p className="mt-4 text-base leading-8 text-[#444444]">
                Keep your profile information accurate and up to date so that
                your experience, skills and portfolio clearly represent your
                current talent.
              </p>

              <Link
                href="/profile/setup"
                className="mt-8 inline-flex items-center rounded-xl bg-[#D4AF37] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c59b27] shadow-md"
              >
                Register as an Actor
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-[#F7F7F5] p-8 shadow-xs">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                  <UserRound className="h-6 w-6" />
                </div>

                <h3 className="mt-6 font-bold tracking-tight text-2xl text-[#111111]">
                  Build a complete profile
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#555555]">
                  Include the information that helps communicate your acting
                  profile clearly.
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

      {/* Profile Preparation */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Profile Preparation
            </p>

            <h2 className="mt-4 font-bold tracking-tight text-3xl text-[#111111] md:text-4xl">
              What to include in your profile
            </h2>

            <p className="mt-5 text-base leading-8 text-[#444444]">
              A clear profile makes it easier to communicate your experience,
              skills and suitability for different casting requirements.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {profilePoints.map((point, index) => (
            <Reveal key={point} delay={index * 0.05}>
              <div className="h-full rounded-2xl border border-gray-200 bg-[#F7F7F5] p-6 transition-colors hover:border-[#D4AF37]/40 shadow-xs">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
                  <CheckCircle2 className="h-4 w-4" />
                </div>

                <p className="mt-4 text-sm leading-7 text-[#444444]">{point}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Related Categories */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Explore More
            </p>

            <h2 className="mt-4 font-bold tracking-tight text-3xl text-[#111111] md:text-4xl">
              Explore other actor categories
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {talentTypes.map((item, index) => (
            <Reveal key={item.href} delay={index * 0.06}>
              <Link
                href={item.href}
                className="group block rounded-2xl border border-gray-200 bg-[#F7F7F5] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-white shadow-xs"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-bold tracking-tight text-xl text-[#111111]">
                    {item.title}
                  </h3>

                  <ArrowRight className="h-5 w-5 text-[#D4AF37] transition-transform group-hover:translate-x-1" />
                </div>

                <p className="mt-3 text-sm leading-7 text-[#555555]">
                  {item.description}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Important Note */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8 lg:pb-24">
        <Reveal>
          <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#F7F7F5] p-7 md:p-9 shadow-xs">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Important
            </p>

            <h2 className="mt-4 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
              Casting opportunities do not guarantee selection.
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#555555]">
              Individual casting opportunities can have their own requirements,
              eligibility criteria and selection processes. Registration or
              membership should not be understood as a guarantee of auditions,
              roles, employment or selection.
            </p>
          </div>
        </Reveal>
      </section>

      <CTASection
        eyebrow="Start Your Journey"
        title="Ready to create your actor profile?"
        description="Register your talent profile and provide accurate information about your acting experience, skills and portfolio."
        buttonLabel="Register Now"
        buttonHref="/profile/setup"
      />
    </main>
  );
}
