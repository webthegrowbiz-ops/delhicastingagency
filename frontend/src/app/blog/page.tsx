import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
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
      "A practical guide for aspiring actors looking to understand the early steps of building an acting career.",
    href: "/blog/how-to-become-an-actor-in-bollywood/",
    icon: Sparkles,
  },
  {
    title: "How to Build a Modeling Portfolio",
    description:
      "Understand the key elements that can help you prepare a professional modeling portfolio.",
    href: "/blog/how-to-build-a-modeling-portfolio/",
    icon: FileText,
  },
  {
    title: "How to Avoid Casting Scams",
    description:
      "Learn how to identify suspicious casting approaches and make safer decisions when exploring opportunities.",
    href: "/blog/how-to-avoid-casting-scams/",
    icon: ShieldCheck,
  },
  {
    title: "Acting Audition Tips",
    description:
      "Useful guidance for preparing yourself and your material before an acting audition.",
    href: "/blog/acting-audition-tips/",
    icon: BookOpen,
  },
];

const categories = [
  {
    title: "Actors",
    description: "Articles and resources focused on actors and acting careers.",
    href: "/blog/category/actors/",
  },
  {
    title: "Models",
    description: "Resources and guidance for aspiring and working models.",
    href: "/blog/category/models/",
  },
  {
    title: "Industry News",
    description: "Industry-related updates, information and useful resources.",
    href: "/blog/category/industry-news/",
  },
];

export default function BlogPage() {
  return (
    <main className="bg-white min-h-screen text-[#111111]">
      <PageHero
        eyebrow="Blog & Resources"
        title="Industry Insights & Resources"
        description="Explore practical guides, career resources and useful information for actors, models and other talent."
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
            },
          ]}
        />
      </div>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Blog Hub
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111111] md:text-4xl">
              Practical resources for your entertainment career
            </h2>

            <p className="mt-5 text-base font-normal leading-8 text-[#444444]">
              Explore guides and resources covering acting, modeling, auditions,
              casting safety and other useful topics for talent.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Featured Articles */}
      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-16">
        <Reveal>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Featured Resources
            </p>

            <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[#111111] md:text-4xl">
              Explore our latest guides
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
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

                  <h3 className="mt-7 font-serif text-2xl font-bold tracking-tight text-[#111111]">
                    {article.title}
                  </h3>

                  <p className="mt-3 text-sm font-normal leading-7 text-[#444444]">
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

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
        <Reveal>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Browse by Topic
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111111] md:text-4xl">
              Explore resource categories
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {categories.map((category, index) => (
            <Reveal key={category.href} delay={index * 0.06}>
              <Link
                href={category.href}
                className="group block h-full rounded-2xl border border-gray-200 bg-[#F7F7F5] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 shadow-xs"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-bold tracking-tight text-[#111111]">
                    {category.title}
                  </h3>

                  <ArrowRight className="h-5 w-5 text-[#666666] transition-transform group-hover:translate-x-1 group-hover:text-[#D4AF37]" />
                </div>

                <p className="mt-4 text-sm font-normal leading-7 text-[#444444]">
                  {category.description}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Safety */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
        <Reveal>
          <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#F7F7F5] p-8 md:p-10 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                <ShieldCheck className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                  Safety & Awareness
                </p>

                <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#111111] md:text-3xl">
                  Learn how to recognise casting scams
                </h2>

                <p className="mt-4 max-w-3xl text-sm font-normal leading-7 text-[#444444] md:text-base">
                  Our resources include guidance designed to help talent make
                  informed decisions and recognise potentially suspicious
                  casting approaches.
                </p>

                <Link
                  href="/blog/how-to-avoid-casting-scams/"
                  className="mt-6 inline-flex items-center text-sm font-semibold text-[#D4AF37]"
                >
                  Read the Casting Scam Guide
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Quick Checklist */}
      <section className="mx-auto max-w-7xl px-6 pb-12 lg:px-8 lg:pb-20">
        <Reveal>
          <div className="rounded-3xl border border-gray-200 bg-[#F7F7F5] p-8 shadow-xs">
            <h2 className="text-2xl font-bold tracking-tight text-[#111111] md:text-3xl">
              Make the most of our resources
            </h2>

            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {[
                "Learn about your chosen talent category",
                "Prepare for auditions and casting opportunities",
                "Stay informed about industry-related topics",
              ].map((item) => (
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

      <CTASection
        eyebrow="Build Your Career"
        title="Ready to take the next step?"
        description="Explore our resources and prepare yourself for your next casting opportunity."
        buttonLabel="Register Now"
        buttonHref="/profile/setup"
      />
    </main>
  );
}
