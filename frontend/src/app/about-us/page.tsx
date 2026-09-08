import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { getProfileCreateOrSetupUrl } from "@/lib/auth";

export const metadata = {
  title: "About Us | Delhi Casting Agency (DCA)",
  description:
    "Learn about Delhi Casting Agency (DCA), our approach to talent representation, artist profiles, and casting opportunity discovery in India.",
};

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-white text-[#111111]">
      
      {/* HERO SECTION — TYPOGRAPHY & EDITORIAL HEADER */}
      <section className="relative isolate overflow-hidden border-b border-gray-200 bg-[#F7F7F5] px-6 pb-16 pt-28 sm:pb-20 sm:pt-36">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              <Sparkles size={14} />
              <span>ABOUT DELHI CASTING AGENCY</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-[#111111] sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
              Connecting Talent With the Right Opportunities
            </h1>

            <div className="mx-auto mt-6 max-w-3xl space-y-4 text-base font-normal leading-relaxed text-[#444444] sm:text-lg">
              <p>
                Delhi Casting Agency (DCA) is a talent and casting platform created for actors, models, performers and emerging artists looking to discover relevant opportunities across India&apos;s entertainment and creative industry.
              </p>
              <p>
                We aim to make the casting journey more organized, transparent and accessible by bringing talent and casting opportunities together through a professional digital platform.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="mx-auto max-w-6xl px-6 py-6">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
      </div>

      {/* SECTION 1 — OUR APPROACH */}
      <section className="mx-auto max-w-6xl px-6 py-12 lg:py-20">
        <Reveal>
          <div className="rounded-3xl border border-gray-200 bg-white p-8 md:p-14 shadow-md">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              OUR APPROACH
            </span>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#111111] sm:text-4xl">
              Built Around Talent, Opportunity &amp; Professionalism
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-[#444444] border-t border-gray-200 pt-6">
              <p>
                At DCA, we believe every artist has a unique identity, ability and story.
              </p>
              <p>
                Our platform is designed to help artists present themselves professionally, maintain relevant profile information and discover casting opportunities that match their talent, category and experience.
              </p>
              <p>
                We focus on creating a professional environment where aspiring and experienced artists can build their presence and stay connected with opportunities.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* SECTIONS 2 & 3 — FOR ARTISTS & FOR CASTING PROFESSIONALS */}
      <section className="mx-auto max-w-6xl px-6 py-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          
          {/* FOR ARTISTS */}
          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-gray-200 bg-white p-8 md:p-10 shadow-md">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                  FOR ARTISTS
                </span>

                <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#111111] sm:text-3xl">
                  A Professional Space for Actors, Models &amp; Artists
                </h2>

                <p className="mt-4 text-sm text-[#444444]">
                  DCA helps artists build and present a professional talent profile.
                </p>

                <ul className="mt-6 space-y-3.5 border-t border-gray-200 pt-6">
                  {[
                    "Create and maintain a professional artist profile",
                    "Add portfolio and casting photographs",
                    "Showcase skills, experience and talent categories",
                    "Maintain relevant physical and professional details",
                    "Discover casting calls and opportunities",
                    "Stay informed about relevant casting requirements",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#333333]">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#D4AF37] mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* FOR CASTING PROFESSIONALS */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-gray-200 bg-white p-8 md:p-10 shadow-md">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                  FOR CASTING PROFESSIONALS
                </span>

                <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#111111] sm:text-3xl">
                  Discover Talent More Efficiently
                </h2>

                <p className="mt-4 text-sm text-[#444444]">
                  DCA provides a platform where casting professionals can discover talent across different categories.
                </p>

                <ul className="mt-6 space-y-3.5 border-t border-gray-200 pt-6">
                  {[
                    "Talent category",
                    "Experience",
                    "Location",
                    "Skills",
                    "Physical specifications",
                    "Portfolio and profile information",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#333333]">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#D4AF37] mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 border-t border-gray-200 pt-4 text-xs leading-relaxed text-[#666666]">
                  This helps make the initial talent-discovery process more organized and efficient.
                </p>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* SECTION 4 — OUR COMMITMENT (4 TEXT CARDS) */}
      <section className="mx-auto max-w-6xl px-6 py-12 lg:py-20">
        <Reveal>
          <div className="mb-10 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              OUR COMMITMENT
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl">
              What We Stand For
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              num: "01",
              title: "PROFESSIONALISM",
              body: "We encourage artists to maintain accurate and professional profiles.",
            },
            {
              num: "02",
              title: "TRANSPARENCY",
              body: "Opportunity details and requirements should be reviewed carefully before applying.",
            },
            {
              num: "03",
              title: "ACCESSIBILITY",
              body: "We aim to make relevant casting opportunities easier for artists to discover through a digital platform.",
            },
            {
              num: "04",
              title: "TALENT FIRST",
              body: "Our platform is built around helping artists present their abilities and connect with opportunities.",
            },
          ].map((card, idx) => (
            <Reveal key={card.num} delay={idx * 0.05} className="h-full">
              <div className="flex h-full flex-col justify-between rounded-2xl border border-gray-200 bg-[#F7F7F5] p-6 shadow-sm transition duration-300 hover:border-[#D4AF37]/50">
                <div>
                  <span className="font-serif text-3xl font-extrabold text-[#D4AF37]">
                    {card.num}
                  </span>
                  <h3 className="mt-3 font-serif text-base font-bold tracking-wider text-[#111111]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#555555]">
                    {card.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SECTION 5 — HOW DCA WORKS (4 NUMBERED STEPS) */}
      <section className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
        <Reveal>
          <div className="rounded-3xl border border-gray-200 bg-white p-8 md:p-12 shadow-md">
            <div className="mb-10 text-center">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                HOW DCA WORKS
              </span>
              <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl">
                A Simple Journey From Profile to Opportunity
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  num: "01",
                  title: "CREATE YOUR PROFILE",
                  body: "Build your artist profile with your personal, professional and portfolio information.",
                },
                {
                  num: "02",
                  title: "COMPLETE YOUR PROFILE",
                  body: "Add relevant photographs, skills, experience and other casting information.",
                },
                {
                  num: "03",
                  title: "DISCOVER OPPORTUNITIES",
                  body: "Explore casting calls relevant to your talent category and profile.",
                },
                {
                  num: "04",
                  title: "APPLY & CONNECT",
                  body: "Review opportunity requirements and proceed according to the casting process.",
                },
              ].map((step) => (
                <div
                  key={step.num}
                  className="rounded-2xl border border-gray-200 bg-[#F7F7F5] p-6 shadow-xs"
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                    STEP {step.num}
                  </span>
                  <h3 className="mt-2 text-base font-bold text-[#111111]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#555555]">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* SECTION 6 — FINAL CTA SECTION (OUR VISION) */}
      <section className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-[#F7F7F5] p-8 md:p-14 text-center shadow-md">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              OUR VISION
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#111111] sm:text-5xl">
              Your Talent Deserves to Be Seen.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#444444] sm:text-lg">
              We want to build a professional digital ecosystem where talented individuals can present Governments and casting professionals can discover the right talent more efficiently.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={getProfileCreateOrSetupUrl()}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-[#C59B27] shadow-md"
              >
                <span>Create Your Profile</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/casting-calls/"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#111111] transition duration-300 hover:border-[#D4AF37] hover:text-[#D4AF37] shadow-xs"
              >
                <span>Explore Casting Opportunities</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

    </main>
  );
}
