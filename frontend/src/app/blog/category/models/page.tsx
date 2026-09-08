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

const articles = [
  {
    title: "How to Build a Modeling Portfolio",
    description:
      "Learn how to prepare a clear, professional and relevant modeling portfolio for suitable opportunities.",
    href: "/blog/how-to-build-a-modeling-portfolio/",
    icon: Camera,
  },
];

const modelResources = [
  "Keep recent and clear photographs ready",
  "Make sure your portfolio represents your current appearance",
  "Include relevant modeling experience and skills",
  "Choose portfolio images that match your target modeling category",
  "Keep your professional information accurate",
  "Review your portfolio regularly and replace outdated material",
];

const portfolioTips = [
  {
    title: "Use Current Photos",
    description:
      "Choose photographs that accurately represent your current appearance rather than relying only on older images.",
  },
  {
    title: "Keep It Relevant",
    description:
      "Select images and information that are relevant to the type of modeling work you want to pursue.",
  },
  {
    title: "Show Your Strengths",
    description:
      "Use suitable photographs and portfolio material to communicate your presentation, versatility and experience.",
  },
];

export default function ModelsBlogCategoryPage() {
  return (
    <main className="bg-white min-h-screen text-[#111111]">
      <PageHero
        eyebrow="Models"
        title="Models Blog & Resources"
        description="Explore practical guides and resources for aspiring and working models."
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
              label: "Models",
            },
          ]}
        />
      </div>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
              <Camera className="h-7 w-7" />
            </div>

            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Model Resources
            </p>

            <h2 className="mt-4 font-bold tracking-tight text-3xl text-[#111111] md:text-5xl">
              Guides to help you prepare your modeling career
            </h2>

            <p className="mt-6 text-base leading-8 text-[#444444] md:text-lg">
              Explore practical resources covering modeling portfolios,
              presentation and preparation for suitable opportunities.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Articles */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-20">
        <Reveal>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Model Guides
            </p>

            <h2 className="mt-4 font-bold tracking-tight text-3xl text-[#111111] md:text-4xl">
              Explore model-focused articles
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

      {/* Portfolio Tips */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-20">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Portfolio Preparation
            </p>

            <h2 className="mt-4 font-bold tracking-tight text-3xl text-[#111111] md:text-4xl">
              Build a portfolio that represents you
            </h2>

            <p className="mt-5 text-base leading-8 text-[#444444]">
              A focused and current portfolio can make it easier to understand
              your profile and the type of modeling work you are interested in.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {portfolioTips.map((tip, index) => (
            <Reveal key={tip.title} delay={index * 0.06}>
              <div className="h-full rounded-3xl border border-gray-200 bg-[#F7F7F5] p-7 shadow-xs">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                  <ImageIcon className="h-5 w-5" />
                </div>

                <h3 className="mt-6 font-bold tracking-tight text-xl text-[#111111]">
                  {tip.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#555555]">
                  {tip.description}
                </p>
              </div>
            </Reveal>
          ))}
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
                  Model Checklist
                </p>

                <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                  Keep your modeling profile ready
                </h2>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-[#444444] md:text-base">
                  Review these points before applying for modeling
                  opportunities.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {modelResources.map((resource) => (
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

      {/* Explore Categories */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-20">
        <Reveal>
          <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#F7F7F5] p-8 md:p-10 shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
              <Sparkles className="h-6 w-6" />
            </div>

            <h2 className="mt-6 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
              Explore model categories
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#444444] md:text-base">
              Explore different model categories and identify opportunities that
              match your profile, experience and interests.
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
        eyebrow="Build Your Modeling Career"
        title="Ready to showcase your modeling profile?"
        description="Keep your portfolio current and explore modeling opportunities that match your profile."
        buttonLabel="Register as a Model"
        buttonHref="/profile/setup"
      />
    </main>
  );
}
