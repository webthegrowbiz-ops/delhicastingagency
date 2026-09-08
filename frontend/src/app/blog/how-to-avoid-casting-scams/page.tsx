import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  FileSearch,
  LockKeyhole,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";

const warningSigns = [
  {
    title: "Unrealistic Guarantees",
    description:
      "Be cautious of anyone promising guaranteed roles, auditions, employment or selection in exchange for payment.",
    icon: AlertTriangle,
  },
  {
    title: "Unsolicited Offers",
    description:
      "Be careful when an unknown person contacts you unexpectedly with an opportunity and pressures you to act quickly.",
    icon: UserCheck,
  },
  {
    title: "Pressure to Pay Immediately",
    description:
      "Requests for urgent payment before you have verified the opportunity should be treated carefully.",
    icon: CreditCard,
  },
  {
    title: "Requests for Sensitive Information",
    description:
      "Avoid sharing sensitive personal, financial or identity information until the source and purpose have been properly verified.",
    icon: LockKeyhole,
  },
];

const safetySteps = [
  {
    number: "01",
    title: "Verify the Source",
    description:
      "Check where the casting opportunity came from and whether the person or organisation can be independently verified.",
  },
  {
    number: "02",
    title: "Read the Requirements",
    description:
      "Review the opportunity carefully and make sure the requirements, process and expectations are clearly explained.",
  },
  {
    number: "03",
    title: "Question Unrealistic Claims",
    description:
      "Be cautious when someone guarantees success, a role or employment without a proper selection process.",
  },
  {
    number: "04",
    title: "Protect Your Information",
    description:
      "Do not share sensitive information simply because someone claims to represent a production, agency or casting team.",
  },
  {
    number: "05",
    title: "Verify Before Paying",
    description:
      "Before making any payment, understand exactly what the payment is for and verify the relevant terms.",
  },
  {
    number: "06",
    title: "Keep Records",
    description:
      "Keep relevant messages, emails, payment information and other records if you need to review or report an issue later.",
  },
];

const checklist = [
  "Who is offering the opportunity?",
  "Can the source be independently verified?",
  "What exactly is being offered?",
  "Are the requirements clearly explained?",
  "Is payment being requested?",
  "Are there guarantees that sound unrealistic?",
  "Are sensitive documents or information being requested?",
  "Have you reviewed the relevant terms before proceeding?",
];

export default function HowToAvoidCastingScamsPage() {
  return (
    <main className="bg-white min-h-screen text-[#111111]">
      <PageHero
        eyebrow="Casting Safety Guide"
        title="How to Avoid Casting Scams"
        description="Learn how to recognise warning signs, verify casting opportunities and protect your personal information."
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
              label: "How to Avoid Casting Scams",
            },
          ]}
        />
      </div>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
        <Reveal>
          <article className="mx-auto max-w-4xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
              <ShieldCheck className="h-7 w-7" />
            </div>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Trust & Safety
            </p>

            <h2 className="mt-4 font-bold tracking-tight text-3xl leading-tight text-[#111111] md:text-5xl">
              Protect yourself when exploring casting opportunities
            </h2>

            <p className="mt-6 text-base leading-8 text-[#444444] md:text-lg">
              The entertainment industry includes legitimate opportunities, but
              aspiring talent can also encounter misleading offers, unrealistic
              promises and fraudulent casting approaches.
            </p>

            <p className="mt-5 text-base leading-8 text-[#444444] md:text-lg">
              The safest approach is to slow down, verify important details and
              avoid making decisions based only on promises of guaranteed work
              or selection.
            </p>
          </article>
        </Reveal>
      </section>

      {/* Warning Signs */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-20">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Warning Signs
            </p>

            <h2 className="mt-4 font-bold tracking-tight text-3xl text-[#111111] md:text-4xl">
              Watch for these red flags
            </h2>

            <p className="mt-5 text-base leading-8 text-[#444444]">
              A single warning sign does not automatically prove that an
              opportunity is fraudulent, but multiple warning signs should make
              you stop and verify the situation carefully.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {warningSigns.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal key={item.title} delay={index * 0.06}>
                <div className="h-full rounded-3xl border border-gray-200 bg-[#F7F7F5] p-7 shadow-xs">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 font-bold tracking-tight text-xl text-[#111111]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#555555]">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Safety Steps */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-20">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Stay Safe
            </p>

            <h2 className="mt-4 font-bold tracking-tight text-3xl text-[#111111] md:text-4xl">
              A safer way to evaluate an opportunity
            </h2>

            <p className="mt-5 text-base leading-8 text-[#444444]">
              Use this checklist before sharing sensitive information,
              committing to an opportunity or making a payment.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {safetySteps.map((step, index) => (
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

      {/* Payment Safety */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-20">
        <Reveal>
          <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#F7F7F5] p-8 md:p-10 shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
              <CreditCard className="h-6 w-6" />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Before Making a Payment
            </p>

            <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
              Understand exactly what you are paying for
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#444444] md:text-base">
              Payment or membership should never be treated as a guarantee of an
              audition, casting opportunity, selection or employment. Carefully
              review the terms and details associated with any payment before
              proceeding.
            </p>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {[
                "Understand the purpose of the payment",
                "Review the applicable terms",
                "Avoid pressure-based decisions",
                "Keep payment records",
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

      {/* Verification Checklist */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-20">
        <Reveal>
          <div className="rounded-3xl border border-gray-200 bg-[#F7F7F5] p-8 md:p-10 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                <FileSearch className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                  Verification Checklist
                </p>

                <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                  Ask these questions before proceeding
                </h2>
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

      {/* Important Notice */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-20">
        <Reveal>
          <div className="rounded-3xl border border-gray-200 bg-[#F7F7F5] p-8 md:p-10 shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
              <ShieldCheck className="h-6 w-6" />
            </div>

            <h2 className="mt-6 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
              When in doubt, verify before acting
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#444444] md:text-base">
              Never let urgency or excitement force you into a decision. Verify
              important details independently, protect sensitive information and
              review the terms before making payments or committing to an
              opportunity.
            </p>

            <Link
              href="/contact/"
              className="mt-7 inline-flex items-center text-sm font-semibold text-[#D4AF37]"
            >
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      <CTASection
        eyebrow="Stay Informed"
        title="Explore casting opportunities with confidence"
        description="Keep your profile ready, review opportunities carefully and make informed decisions."
        buttonLabel="Explore Casting Calls"
        buttonHref="/casting-calls/"
      />
    </main>
  );
}
