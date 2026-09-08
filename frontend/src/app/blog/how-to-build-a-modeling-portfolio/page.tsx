import Link from "next/link";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  FileText,
  ImageIcon,
  Sparkles,
} from "lucide-react";

import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";

const portfolioSteps = [
  {
    number: "01",
    title: "Start With Clear Photos",
    description:
      "Use recent, clear photographs that allow your appearance and overall presentation to be seen accurately.",
  },
  {
    number: "02",
    title: "Choose Relevant Images",
    description:
      "Select images that represent the type of modeling work you want to pursue instead of filling your portfolio with unrelated photographs.",
  },
  {
    number: "03",
    title: "Show Different Looks",
    description:
      "Where appropriate, include a useful range of looks, expressions and styling that demonstrates your versatility.",
  },
  {
    number: "04",
    title: "Add Your Professional Details",
    description:
      "Keep relevant information such as experience, skills and other professional details accurate and current.",
  },
  {
    number: "05",
    title: "Include Relevant Work",
    description:
      "If you have previous modeling work, include suitable examples that demonstrate your experience and abilities.",
  },
  {
    number: "06",
    title: "Keep It Updated",
    description:
      "Review your portfolio regularly and replace outdated material when your appearance, experience or work changes.",
  },
];

const checklist = [
  "Recent and clear photographs",
  "A suitable variety of relevant looks",
  "Accurate professional information",
  "Relevant modeling experience",
  "Current contact information",
  "Portfolio material that represents your present appearance",
];

const mistakes = [
  "Using very old photographs",
  "Uploading too many unrelated images",
  "Using heavily edited photographs that do not represent your current appearance",
  "Providing inaccurate professional information",
  "Leaving your portfolio unchanged as your experience develops",
];

export default function HowToBuildAModelingPortfolioPage() {
  return (
    <main className="bg-white min-h-screen text-[#111111]">
      <PageHero
        eyebrow="Modeling Career Guide"
        title="How to Build a Modeling Portfolio"
        description="Learn how to prepare a clear, professional and relevant modeling portfolio for suitable casting and modeling opportunities."
      />

      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <Breadcrumb
          items={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: "Blog",
              href: "/blog/",
            },
            {
              label: "How to Build a Modeling Portfolio",
            },
          ]}
        />
      </div>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
        <Reveal>
          <article className="mx-auto max-w-4xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
              <Camera className="h-7 w-7" />
            </div>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Modeling Portfolio Guide
            </p>

            <h2 className="mt-4 font-bold tracking-tight text-3xl leading-tight text-[#111111] md:text-5xl">
              Create a portfolio that represents you accurately
            </h2>

            <p className="mt-6 text-base leading-8 text-[#444444] md:text-lg">
              A modeling portfolio should make it easy to understand your
              appearance, presentation, experience and the type of modeling work
              you are interested in.
            </p>

            <p className="mt-5 text-base leading-8 text-[#444444] md:text-lg">
              The goal is not to include as many photographs as possible. A
              focused collection of relevant, current and clear material can
              communicate your profile more effectively.
            </p>
          </article>
        </Reveal>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-20">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Step by Step
            </p>

            <h2 className="mt-4 font-bold tracking-tight text-3xl text-[#111111] md:text-4xl">
              How to build your modeling portfolio
            </h2>

            <p className="mt-5 text-base leading-8 text-[#444444]">
              Use these steps to organise your portfolio and keep it relevant to
              the opportunities you want to pursue.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {portfolioSteps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.05}>
              <div className="h-full rounded-3xl border border-gray-200 bg-[#F7F7F5] p-7 shadow-xs">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-sm font-semibold text-[#D4AF37]">
                  {step.number}
                </div>

                <h3 className="mt-6 font-bold tracking-tight text-xl text-[#111111]">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#555555]">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Photos */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-gray-200 bg-[#F7F7F5] p-8 shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                <ImageIcon className="h-6 w-6" />
              </div>

              <h2 className="mt-6 font-bold tracking-tight text-2xl text-[#111111]">
                Keep photographs current
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#555555]">
                Your portfolio should represent your present appearance. Avoid
                relying entirely on photographs that no longer reflect how you
                currently look.
              </p>

              <p className="mt-4 text-sm leading-7 text-[#555555]">
                Clear photographs are generally more useful than excessive
                editing or effects that make your appearance difficult to
                assess.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-gray-200 bg-[#F7F7F5] p-8 shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                <Sparkles className="h-6 w-6" />
              </div>

              <h2 className="mt-6 font-bold tracking-tight text-2xl text-[#111111]">
                Show relevant versatility
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#555555]">
                Include different suitable looks or styles when they help
                communicate the type of modeling work you can perform.
              </p>

              <p className="mt-4 text-sm leading-7 text-[#555555]">
                Keep the selection focused rather than adding photographs simply
                to increase the size of your portfolio.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Checklist */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-20">
        <Reveal>
          <div className="rounded-3xl border border-gray-200 bg-[#F7F7F5] p-8 md:p-10 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                <FileText className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                  Portfolio Checklist
                </p>

                <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                  Before you submit your profile
                </h2>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-[#444444] md:text-base">
                  Check that your portfolio contains current and accurate
                  information.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {checklist.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#D4AF37]" />

                  <span className="text-sm leading-7 text-[#444444]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Common Mistakes */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-20">
        <Reveal>
          <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#F7F7F5] p-8 md:p-10 shadow-xs">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Common Mistakes
            </p>

            <h2 className="mt-4 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
              Things to avoid
            </h2>

            <div className="mt-7 space-y-4">
              {mistakes.map((mistake) => (
                <div
                  key={mistake}
                  className="flex items-start gap-3 text-sm leading-7 text-[#444444]"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                  <span>{mistake}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Casting Link */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-20">
        <Reveal>
          <div className="rounded-3xl border border-gray-200 bg-[#F7F7F5] p-8 md:p-10 shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
              <Camera className="h-6 w-6" />
            </div>

            <h2 className="mt-6 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
              Explore model opportunities
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#444444] md:text-base">
              Once your portfolio is prepared, explore relevant model categories
              and casting opportunities that match your profile.
            </p>

            <Link
              href="/models/"
              className="mt-7 inline-flex items-center text-sm font-semibold text-[#D4AF37]"
            >
              Explore Model Categories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      <CTASection
        eyebrow="Build Your Profile"
        title="Ready to showcase your modeling profile?"
        description="Keep your portfolio current and explore modeling opportunities that match your profile."
        buttonLabel="Register as a Model"
        buttonHref="/profile/setup"
      />
    </main>
  );
}
