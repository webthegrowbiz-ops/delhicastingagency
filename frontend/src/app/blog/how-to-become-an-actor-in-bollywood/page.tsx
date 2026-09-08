import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clapperboard,
  Mic2,
  Sparkles,
  UserPlus,
} from "lucide-react";

import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";

const steps = [
  {
    number: "01",
    title: "Understand Your Acting Goals",
    description:
      "Start by understanding the type of acting work you want to pursue and the kind of roles that match your interests and strengths.",
  },
  {
    number: "02",
    title: "Build Your Acting Skills",
    description:
      "Work on acting fundamentals, expression, dialogue delivery, body language and camera confidence.",
  },
  {
    number: "03",
    title: "Prepare Your Profile",
    description:
      "Create a professional talent profile with recent photographs, relevant experience and useful portfolio information.",
  },
  {
    number: "04",
    title: "Prepare Audition Material",
    description:
      "Keep suitable audition material, self-tapes, showreels or other relevant acting samples ready when required.",
  },
  {
    number: "05",
    title: "Explore Casting Opportunities",
    description:
      "Look for casting opportunities that match your profile and carefully review the requirements before applying.",
  },
  {
    number: "06",
    title: "Keep Improving",
    description:
      "Continue developing your skills, updating your profile and gaining relevant experience as you progress.",
  },
];

const profileChecklist = [
  "Recent and clear photographs",
  "Accurate personal and professional information",
  "Acting experience and relevant skills",
  "Portfolio, showreel or audition material where applicable",
  "Current contact information",
];

export default function HowToBecomeAnActorInBollywoodPage() {
  return (
    <main className="bg-white min-h-screen text-[#111111]">
      <PageHero
        eyebrow="Actor Career Guide"
        title="How to Become an Actor in Bollywood"
        description="A practical guide to preparing your acting profile, developing your skills and exploring suitable casting opportunities."
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
              label: "How to Become an Actor in Bollywood",
            },
          ]}
        />
      </div>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
        <Reveal>
          <article className="mx-auto max-w-4xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
              <Clapperboard className="h-7 w-7" />
            </div>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Bollywood Acting Guide
            </p>

            <h2 className="mt-4 font-bold tracking-tight text-3xl leading-tight text-[#111111] md:text-5xl">
              Start building your path as an actor
            </h2>

            <p className="mt-6 text-base leading-8 text-[#444444] md:text-lg">
              Becoming an actor is a process of developing your performance
              skills, preparing a professional profile and consistently
              exploring suitable opportunities.
            </p>

            <p className="mt-5 text-base leading-8 text-[#444444] md:text-lg">
              There is no single route into the industry. Different actors
              develop through different combinations of training, practice,
              auditions, experience and networking.
            </p>
          </article>
        </Reveal>
      </section>

      {/* Main Steps */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-20">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Step by Step
            </p>

            <h2 className="mt-4 font-bold tracking-tight text-3xl text-[#111111] md:text-4xl">
              A practical path for aspiring actors
            </h2>

            <p className="mt-5 text-base leading-8 text-[#444444]">
              Use these steps as a framework while developing your acting career
              and preparing for suitable opportunities.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
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

      {/* Skills */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-gray-200 bg-[#F7F7F5] p-8 shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                <Sparkles className="h-6 w-6" />
              </div>

              <h2 className="mt-6 font-bold tracking-tight text-2xl text-[#111111]">
                Skills worth developing
              </h2>

              <div className="mt-6 space-y-4">
                {[
                  "Expression and emotional range",
                  "Dialogue delivery",
                  "Body language",
                  "Camera confidence",
                  "Listening and scene awareness",
                ].map((skill) => (
                  <div
                    key={skill}
                    className="flex items-start gap-3 text-sm text-[#444444]"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#D4AF37]" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-gray-200 bg-[#F7F7F5] p-8 shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                <BookOpen className="h-6 w-6" />
              </div>

              <h2 className="mt-6 font-bold tracking-tight text-2xl text-[#111111]">
                Keep learning and practising
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#555555]">
                Regular practice can help you become more comfortable with
                auditions, self-tapes, scenes and different performance
                requirements.
              </p>

              <p className="mt-4 text-sm leading-7 text-[#555555]">
                Study performances, practise scenes and seek constructive
                feedback where possible.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Profile */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-20">
        <Reveal>
          <div className="rounded-3xl border border-gray-200 bg-[#F7F7F5] p-8 md:p-10 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                <UserPlus className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                  Actor Profile
                </p>

                <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                  Prepare your professional profile
                </h2>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-[#444444] md:text-base">
                  Keep your information current and make sure your profile
                  represents your abilities accurately.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {profileChecklist.map((item) => (
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

      {/* Casting */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-20">
        <Reveal>
          <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#F7F7F5] p-8 md:p-10 shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
              <Mic2 className="h-6 w-6" />
            </div>

            <h2 className="mt-6 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
              Be selective about casting opportunities
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#444444] md:text-base">
              Look for opportunities that match your profile and carefully
              review the requirements before submitting an application. Keep
              your professional information accurate and be cautious of requests
              that appear suspicious or inappropriate.
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

      {/* Related Resources */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-20">
        <Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            <Link
              href="/blog/acting-audition-tips/"
              className="group rounded-2xl border border-gray-200 bg-[#F7F7F5] p-6 transition-all hover:-translate-y-1 hover:border-[#D4AF37]/40 shadow-xs"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                Related Guide
              </p>

              <h3 className="mt-3 font-bold tracking-tight text-xl text-[#111111]">
                Acting Audition Tips
              </h3>

              <div className="mt-4 inline-flex items-center text-sm font-semibold text-[#D4AF37]">
                Read Guide
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            <Link
              href="/blog/how-to-avoid-casting-scams/"
              className="group rounded-2xl border border-gray-200 bg-[#F7F7F5] p-6 transition-all hover:-translate-y-1 hover:border-[#D4AF37]/40 shadow-xs"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                Safety Guide
              </p>

              <h3 className="mt-3 font-bold tracking-tight text-xl text-[#111111]">
                How to Avoid Casting Scams
              </h3>

              <div className="mt-4 inline-flex items-center text-sm font-semibold text-[#D4AF37]">
                Read Guide
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </Reveal>
      </section>

      <CTASection
        eyebrow="Start Your Journey"
        title="Ready to build your acting profile?"
        description="Register your talent profile and explore actor casting opportunities."
        buttonLabel="Register as an Actor"
        buttonHref="/profile/setup"
      />
    </main>
  );
}
