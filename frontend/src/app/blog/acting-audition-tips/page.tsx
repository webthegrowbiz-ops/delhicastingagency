import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Camera,
  CheckCircle2,
  Clapperboard,
  Mic2,
  Sparkles,
  UserCheck,
} from "lucide-react";

import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";

const auditionSteps = [
  {
    number: "01",
    title: "Read the Brief Carefully",
    description:
      "Understand the character, scene, language, format and other requirements before preparing your audition.",
  },
  {
    number: "02",
    title: "Understand the Character",
    description:
      "Think about the character's situation, emotions, motivations and relationship with the other characters.",
  },
  {
    number: "03",
    title: "Practise the Scene",
    description:
      "Rehearse the dialogue and work on expressions, body language, timing and natural delivery.",
  },
  {
    number: "04",
    title: "Prepare Your Self-Tape",
    description:
      "When a self-tape is requested, record a clear and focused performance that follows the casting instructions.",
  },
  {
    number: "05",
    title: "Stay Natural",
    description:
      "Avoid forcing expressions or overacting. Focus on understanding the scene and delivering the performance naturally.",
  },
  {
    number: "06",
    title: "Submit Correctly",
    description:
      "Check the required format, files and submission instructions before sending your audition material.",
  },
];

const preparationChecklist = [
  "Read the complete casting brief",
  "Understand the role and scene",
  "Practise dialogue and delivery",
  "Check pronunciation and language requirements",
  "Prepare appropriate clothing and appearance",
  "Record clear and stable video when a self-tape is required",
  "Check audio quality before submission",
  "Follow the stated submission instructions",
];

const selfTapeTips = [
  "Use a quiet location with minimal background noise",
  "Make sure your face is clearly visible",
  "Use stable framing and suitable lighting",
  "Keep the background simple and distraction-free",
  "Speak clearly and ensure the audio can be understood",
  "Follow any specific self-tape instructions provided",
];

export default function ActingAuditionTipsPage() {
  return (
    <main className="bg-white min-h-screen text-[#111111]">
      <PageHero
        eyebrow="Acting Audition Guide"
        title="Acting Audition Tips"
        description="Practical tips to help actors prepare for auditions, self-tapes and casting opportunities."
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
              label: "Acting Audition Tips",
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
              Audition Preparation
            </p>

            <h2 className="mt-4 font-bold tracking-tight text-3xl leading-tight text-[#111111] md:text-5xl">
              Prepare with confidence before your next audition
            </h2>

            <p className="mt-6 text-base leading-8 text-[#444444] md:text-lg">
              A good audition starts before you enter the room or press the
              record button. Understanding the brief, preparing the scene and
              following the submission requirements can help you present
              yourself professionally.
            </p>

            <p className="mt-5 text-base leading-8 text-[#444444] md:text-lg">
              Every casting opportunity can have different requirements, so
              always prioritise the instructions provided for that specific
              opportunity.
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
              How to prepare for an acting audition
            </h2>

            <p className="mt-5 text-base leading-8 text-[#444444]">
              Use these steps as a practical preparation framework while
              adapting them to the requirements of each casting call.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {auditionSteps.map((step, index) => (
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

      {/* Performance */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-gray-200 bg-[#F7F7F5] p-8 shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                <Sparkles className="h-6 w-6" />
              </div>

              <h2 className="mt-6 font-bold tracking-tight text-2xl text-[#111111]">
                Focus on the scene
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#555555]">
                Instead of concentrating only on memorising words, understand
                what your character wants in the scene and how the situation
                affects the performance.
              </p>

              <p className="mt-4 text-sm leading-7 text-[#555555]">
                Natural reactions, clear intention and appropriate emotional
                choices can help make a performance more believable.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-gray-200 bg-[#F7F7F5] p-8 shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                <UserCheck className="h-6 w-6" />
              </div>

              <h2 className="mt-6 font-bold tracking-tight text-2xl text-[#111111]">
                Present yourself professionally
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#555555]">
                Follow the casting instructions, arrive or submit on time when
                applicable and keep your communication professional.
              </p>

              <p className="mt-4 text-sm leading-7 text-[#555555]">
                Your profile and audition material should accurately represent
                your current skills and appearance.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Self Tape */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-20">
        <Reveal>
          <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#F7F7F5] p-8 md:p-10 shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
              <Camera className="h-6 w-6" />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Self-Tape Tips
            </p>

            <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
              Make your self-tape easy to watch
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#444444] md:text-base">
              If the casting call requests a self-tape, focus on following the
              exact instructions while keeping the recording clear and
              distraction-free.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {selfTapeTips.map((tip) => (
                <div
                  key={tip}
                  className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#D4AF37]" />

                  <span className="text-sm leading-7 text-[#444444]">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Checklist */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-20">
        <Reveal>
          <div className="rounded-3xl border border-gray-200 bg-[#F7F7F5] p-8 md:p-10 shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
              <BookOpen className="h-6 w-6" />
            </div>

            <h2 className="mt-6 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
              Final audition checklist
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#444444] md:text-base">
              Before submitting your audition, quickly review the following
              points.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {preparationChecklist.map((item) => (
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

      {/* Mindset */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-20">
        <Reveal>
          <div className="rounded-3xl border border-gray-200 bg-[#F7F7F5] p-8 md:p-10 shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
              <Mic2 className="h-6 w-6" />
            </div>

            <h2 className="mt-6 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
              Remember: every audition is an opportunity to learn
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#444444] md:text-base">
              Not every audition results in selection. Different productions
              have different requirements, and casting decisions can depend on
              many factors. Focus on preparing well, following the brief and
              continuing to improve your craft.
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

      {/* Related Articles */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-20">
        <Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            <Link
              href="/blog/how-to-become-an-actor-in-bollywood/"
              className="group rounded-2xl border border-gray-200 bg-[#F7F7F5] p-6 transition-all hover:-translate-y-1 hover:border-[#D4AF37]/40 shadow-xs"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                Related Guide
              </p>

              <h3 className="mt-3 font-bold tracking-tight text-xl text-[#111111]">
                How to Become an Actor in Bollywood
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
        eyebrow="Your Next Audition"
        title="Ready to explore acting opportunities?"
        description="Keep your profile updated, prepare your audition material and explore suitable casting calls."
        buttonLabel="Explore Casting Calls"
        buttonHref="/casting-calls/actors/"
      />
    </main>
  );
}
