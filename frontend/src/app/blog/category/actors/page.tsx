import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clapperboard,
  Mic2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";

const articles = [
  {
    title: "How to Become an Actor in Bollywood",
    description:
      "A practical guide to developing your acting skills, preparing your profile and exploring suitable casting opportunities.",
    href: "/blog/how-to-become-an-actor-in-bollywood/",
    icon: Clapperboard,
  },
  {
    title: "Acting Audition Tips",
    description:
      "Useful preparation tips for acting auditions, self-tapes and casting opportunities.",
    href: "/blog/acting-audition-tips/",
    icon: Mic2,
  },
  {
    title: "How to Avoid Casting Scams",
    description:
      "Learn how to identify warning signs, verify opportunities and protect your personal information.",
    href: "/blog/how-to-avoid-casting-scams/",
    icon: ShieldCheck,
  },
];

const actorResources = [
  "Build and maintain a professional actor profile",
  "Keep recent photographs and relevant acting material ready",
  "Prepare carefully for auditions and self-tapes",
  "Review casting requirements before applying",
  "Continue developing your acting skills",
  "Stay aware of casting safety and suspicious approaches",
];

export default function ActorsBlogCategoryPage() {
  return (
    <main className="bg-white min-h-screen text-[#111111]">
      <PageHero
        eyebrow="Actors"
        title="Actors Blog & Resources"
        description="Explore practical guides and resources for aspiring and working actors."
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
              label: "Actors",
            },
          ]}
        />
      </div>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
              <BookOpen className="h-7 w-7" />
            </div>

            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Actor Resources
            </p>

            <h2 className="mt-4 font-bold tracking-tight text-3xl text-[#111111] md:text-5xl">
              Guides to help you prepare for your acting journey
            </h2>

            <p className="mt-6 text-base leading-8 text-[#444444] md:text-lg">
              Explore practical resources covering acting careers, auditions,
              casting preparation and safety.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Articles */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-20">
        <Reveal>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Actor Guides
            </p>

            <h2 className="mt-4 font-bold tracking-tight text-3xl text-[#111111] md:text-4xl">
              Explore actor-focused articles
            </h2>
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
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Career Resources */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-20">
        <Reveal>
          <div className="rounded-3xl border border-gray-200 bg-[#F7F7F5] p-8 md:p-10 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                <Sparkles className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                  Career Preparation
                </p>

                <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                  Keep your actor profile ready
                </h2>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-[#444444] md:text-base">
                  Use these resources alongside consistent practice and
                  preparation when exploring acting opportunities.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {actorResources.map((resource) => (
                <div
                  key={resource}
                  className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#D4AF37]" />

                  <span className="text-sm leading-7 text-[#444444]">
                    {resource}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Casting */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-20">
        <Reveal>
          <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#F7F7F5] p-8 md:p-10 shadow-xs">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Next Step
            </p>

            <h2 className="mt-4 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
              Explore actor casting opportunities
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#444444] md:text-base">
              Once your profile and audition material are ready, explore casting
              calls that match your experience and requirements.
            </p>

            <Link
              href="/casting-calls/actors/"
              className="mt-7 inline-flex items-center text-sm font-semibold text-[#D4AF37]"
            >
              Explore Actor Casting Calls
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      <CTASection
        eyebrow="Build Your Acting Career"
        title="Ready to explore acting opportunities?"
        description="Keep learning, keep your profile updated and explore suitable casting opportunities."
        buttonLabel="Register as an Actor"
        buttonHref="/profile/setup"
      />
    </main>
  );
}
