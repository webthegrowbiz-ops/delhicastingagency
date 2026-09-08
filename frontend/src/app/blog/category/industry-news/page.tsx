import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clapperboard,
  FileText,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";

const articles = [
  {
    title: "How to Become an Actor in Bollywood",
    description:
      "A practical guide to understanding the early steps of building an acting career and exploring suitable opportunities.",
    href: "/blog/how-to-become-an-actor-in-bollywood/",
    icon: Clapperboard,
  },
  {
    title: "How to Build a Modeling Portfolio",
    description:
      "Learn how to prepare a clear and relevant modeling portfolio for suitable casting and modeling opportunities.",
    href: "/blog/how-to-build-a-modeling-portfolio/",
    icon: FileText,
  },
  {
    title: "Acting Audition Tips",
    description:
      "Practical preparation guidance for auditions, self-tapes and acting casting opportunities.",
    href: "/blog/acting-audition-tips/",
    icon: BookOpen,
  },
];

const topics = [
  {
    title: "Career Opportunities",
    description:
      "Learn about different paths, preparation and opportunities across the entertainment industry.",
  },
  {
    title: "Casting & Auditions",
    description:
      "Understand how to prepare for casting calls and present yourself professionally.",
  },
  {
    title: "Industry Awareness",
    description:
      "Stay informed about useful topics that can help talent make better career decisions.",
  },
];

const reminders = [
  "Keep your professional profile and portfolio current",
  "Read casting requirements carefully before applying",
  "Continue developing your skills and experience",
  "Use reliable information when making career decisions",
  "Be cautious of unrealistic promises or guaranteed work",
  "Keep your professional and personal information accurate",
];

export default function IndustryNewsPage() {
  return (
    <main className="bg-white min-h-screen text-[#111111]">
      <PageHero
        eyebrow="Industry News & Resources"
        title="Entertainment Industry News & Insights"
        description="Explore useful industry resources, career guidance and practical information for actors, models and other talent."
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
              label: "Industry News",
            },
          ]}
        />
      </div>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
              <TrendingUp className="h-7 w-7" />
            </div>

            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Industry Resources
            </p>

            <h2 className="mt-4 font-bold tracking-tight text-3xl text-[#111111] md:text-5xl">
              Useful insights for your entertainment career
            </h2>

            <p className="mt-6 text-base leading-8 text-[#444444] md:text-lg">
              Explore practical information about careers, casting, auditions,
              portfolios and other topics relevant to talent.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#666666]">
              Industry information can change over time, so always verify
              important details from the relevant official or professional
              source.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Articles */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-20">
        <Reveal>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Featured Resources
            </p>

            <h2 className="mt-4 font-bold tracking-tight text-3xl text-[#111111] md:text-4xl">
              Explore our industry resources
            </h2>

            <p className="mt-5 max-w-3xl text-base leading-8 text-[#444444]">
              Start with these practical guides to help you understand different
              aspects of building a career in entertainment.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => {
            const Icon = article.icon;

            return (
              <Reveal key={article.href} delay={index * 0.06}>
                <Link
                  href={article.href}
                  className="group block h-full rounded-3xl border border-gray-200 bg-[#F7F7F5] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-white shadow-xs"
                >
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                      <Icon className="h-6 w-6" />
                    </div>

                    <ArrowRight className="h-5 w-5 text-[#666666] transition-transform group-hover:translate-x-1 group-hover:text-[#D4AF37]" />
                  </div>

                  <h3 className="mt-7 font-bold tracking-tight text-xl text-[#111111]">
                    {article.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#555555]">
                    {article.description}
                  </p>

                  <div className="mt-6 inline-flex items-center text-sm font-semibold text-[#D4AF37]">
                    Read Resource
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Topics */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-20">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Topics
            </p>

            <h2 className="mt-4 font-bold tracking-tight text-3xl text-[#111111] md:text-4xl">
              What you can learn here
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {topics.map((topic, index) => (
            <Reveal key={topic.title} delay={index * 0.06}>
              <div className="h-full rounded-3xl border border-gray-200 bg-[#F7F7F5] p-7 shadow-xs">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                  <Sparkles className="h-5 w-5" />
                </div>

                <h3 className="mt-6 font-bold tracking-tight text-xl text-[#111111]">
                  {topic.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#555555]">
                  {topic.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Career Reminders */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-20">
        <Reveal>
          <div className="rounded-3xl border border-gray-200 bg-[#F7F7F5] p-8 md:p-10 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                <CheckCircle2 className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                  Career Reminders
                </p>

                <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                  Keep these principles in mind
                </h2>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-[#444444] md:text-base">
                  Use industry resources as a starting point and make decisions
                  based on accurate, relevant information.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {reminders.map((reminder) => (
                <div
                  key={reminder}
                  className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#D4AF37]" />

                  <span className="text-sm leading-7 text-[#444444]">
                    {reminder}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Safety */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-20">
        <Reveal>
          <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#F7F7F5] p-8 md:p-10 shadow-xs">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Trust & Safety
            </p>

            <h2 className="mt-4 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
              Learn how to recognise casting scams
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#444444] md:text-base">
              Staying informed also means knowing how to evaluate casting
              opportunities carefully. Learn about common warning signs and
              safer ways to verify opportunities.
            </p>

            <Link
              href="/blog/how-to-avoid-casting-scams/"
              className="mt-7 inline-flex items-center text-sm font-semibold text-[#D4AF37]"
            >
              Read the Casting Scam Guide
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      <CTASection
        eyebrow="Stay Informed"
        title="Keep learning and building your career"
        description="Explore our resources and prepare yourself for suitable entertainment industry opportunities."
        buttonLabel="Explore All Resources"
        buttonHref="/blog/"
      />
    </main>
  );
}
