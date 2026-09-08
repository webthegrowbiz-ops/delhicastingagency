import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileText,
  Info,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";

const importantPoints = [
  {
    title: "No Guarantee of Selection",
    description:
      "Creating a profile, registering or becoming a member does not guarantee selection for an audition, casting opportunity, role or project.",
    icon: UserCheck,
  },
  {
    title: "No Guarantee of Employment",
    description:
      "Use of the website or its services does not guarantee employment, paid work, representation or any particular professional outcome.",
    icon: FileText,
  },
  {
    title: "Casting Decisions",
    description:
      "Individual casting opportunities can have their own requirements and selection processes. Final decisions may depend on the relevant casting or production team.",
    icon: CheckCircle2,
  },
  {
    title: "Review Each Opportunity",
    description:
      "Users should carefully review the requirements and information associated with each casting opportunity before applying.",
    icon: Info,
  },
];

const userResponsibilities = [
  "Keep your profile information accurate and up to date",
  "Review individual casting requirements before applying",
  "Provide truthful information about your experience and skills",
  "Verify important details before making payments or sharing sensitive information",
  "Read the applicable membership, payment and refund terms",
  "Use the website responsibly and lawfully",
];

export default function DisclaimerPage() {
  return (
    <main className="bg-white min-h-screen text-[#111111]">
      <PageHero
        eyebrow="Legal & Trust"
        title="Disclaimer"
        description="Important information about casting opportunities, membership, selection and professional outcomes."
      />

      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <Breadcrumb
          items={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: "Disclaimer",
            },
          ]}
        />
      </div>

      {/* Main Notice */}
      <section className="mx-auto max-w-5xl px-6 py-10 lg:px-8 lg:py-16">
        <Reveal>
          <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#F7F7F5] p-7 md:p-10 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                <ShieldCheck className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                  Important Notice
                </p>

                <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                  Casting opportunities are not guaranteed
                </h2>

                <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                  Registration or membership does not guarantee casting
                  selection, auditions, roles, paid work or employment. Every
                  casting opportunity can have its own requirements and
                  selection process.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Key Disclaimer Points */}
      <section className="mx-auto max-w-5xl px-6 py-10 lg:px-8 lg:py-16">
        <Reveal>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              What You Should Know
            </p>

            <h2 className="mt-4 font-bold tracking-tight text-3xl text-[#111111] md:text-4xl">
              Important information before using the platform
            </h2>

            <p className="mt-5 max-w-3xl text-sm leading-8 text-[#444444] md:text-base">
              Please understand the following points when creating a profile,
              becoming a member or exploring casting opportunities.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {importantPoints.map((point, index) => {
            const Icon = point.icon;

            return (
              <Reveal key={point.title} delay={index * 0.06}>
                <div className="h-full rounded-3xl border border-gray-200 bg-[#F7F7F5] p-7 shadow-xs">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 font-bold tracking-tight text-xl text-[#111111]">
                    {point.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#555555]">
                    {point.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Membership */}
      <section className="mx-auto max-w-5xl px-6 py-10 lg:px-8 lg:py-16">
        <Reveal>
          <div className="rounded-3xl border border-gray-200 bg-[#F7F7F5] p-8 md:p-10 shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
              <FileText className="h-6 w-6" />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Membership
            </p>

            <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
              Membership does not guarantee work
            </h2>

            <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
              Membership or payment for a service should not be understood as a
              promise that an artist will receive an audition, casting
              selection, role, employment or paid project.
            </p>

            <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
              Users should review the actual membership details, applicable
              terms and refund/cancellation conditions before completing a
              purchase.
            </p>

            <div className="mt-7 flex flex-wrap gap-4">
              <Link
                href="/membership/"
                className="inline-flex items-center text-sm font-semibold text-[#D4AF37]"
              >
                View Membership
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="/terms-and-conditions/"
                className="inline-flex items-center text-sm font-semibold text-[#666666] transition-colors hover:text-[#111111]"
              >
                Terms & Conditions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Casting Calls */}
      <section className="mx-auto max-w-5xl px-6 py-10 lg:px-8 lg:py-16">
        <Reveal>
          <div className="rounded-3xl border border-gray-200 bg-[#F7F7F5] p-8 md:p-10 shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
              <CheckCircle2 className="h-6 w-6" />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Casting Opportunities
            </p>

            <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
              Each casting call has its own requirements
            </h2>

            <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
              Casting calls can vary by role, production, talent category,
              experience, age range, skills, location requirements and other
              criteria. Always review the individual casting information before
              submitting an application.
            </p>

            <Link
              href="/casting-calls/"
              className="mt-7 inline-flex items-center text-sm font-semibold text-[#D4AF37]"
            >
              Explore Casting Calls
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* User Responsibilities */}
      <section className="mx-auto max-w-5xl px-6 py-10 lg:px-8 lg:py-16">
        <Reveal>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Your Responsibility
            </p>

            <h2 className="mt-4 font-bold tracking-tight text-3xl text-[#111111] md:text-4xl">
              Make informed decisions
            </h2>

            <p className="mt-5 max-w-3xl text-sm leading-8 text-[#444444] md:text-base">
              Users are responsible for reviewing information and making
              decisions appropriate to their own circumstances.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {userResponsibilities.map((item) => (
            <Reveal key={item}>
              <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-[#F7F7F5] p-5 shadow-2xs">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#D4AF37]" />

                <span className="text-sm leading-7 text-[#444444]">{item}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Scam Warning */}
      <section className="mx-auto max-w-5xl px-6 py-10 lg:px-8 lg:py-16">
        <Reveal>
          <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#F7F7F5] p-8 md:p-10 shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
              <AlertTriangle className="h-6 w-6" />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Safety
            </p>

            <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
              Be careful with unrealistic promises
            </h2>

            <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
              Be cautious with unsolicited offers, unrealistic guarantees or
              requests for sensitive information. Verify important details
              before making payments or sharing personal information.
            </p>

            <Link
              href="/blog/how-to-avoid-casting-scams/"
              className="mt-7 inline-flex items-center text-sm font-semibold text-[#D4AF37]"
            >
              Read How to Avoid Casting Scams
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* No Professional Advice */}
      <section className="mx-auto max-w-5xl px-6 py-10 lg:px-8 lg:py-16">
        <Reveal>
          <div className="rounded-3xl border border-gray-200 bg-[#F7F7F5] p-8 md:p-10 shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
              <Info className="h-6 w-6" />
            </div>

            <h2 className="mt-6 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
              Information is provided for general purposes
            </h2>

            <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
              Information published on this website is intended to help users
              understand the available services and opportunities. It should not
              be interpreted as a guarantee of a particular professional result.
            </p>

            <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
              Users should evaluate individual opportunities and applicable
              terms before taking action.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Related Legal Pages */}
      <section className="mx-auto max-w-5xl px-6 py-10 lg:px-8 lg:py-16">
        <Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/privacy-policy/"
              className="group rounded-2xl border border-gray-200 bg-[#F7F7F5] p-6 transition-all hover:-translate-y-1 hover:border-[#D4AF37]/40 shadow-xs"
            >
              <h3 className="font-bold tracking-tight text-lg text-[#111111]">
                Privacy Policy
              </h3>

              <div className="mt-4 inline-flex items-center text-sm font-semibold text-[#D4AF37]">
                View Policy
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </Link>

            <Link
              href="/terms-and-conditions/"
              className="group rounded-2xl border border-gray-200 bg-[#F7F7F5] p-6 transition-all hover:-translate-y-1 hover:border-[#D4AF37]/40 shadow-xs"
            >
              <h3 className="font-bold tracking-tight text-lg text-[#111111]">
                Terms & Conditions
              </h3>

              <div className="mt-4 inline-flex items-center text-sm font-semibold text-[#D4AF37]">
                View Terms
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </Link>

            <Link
              href="/refund-and-cancellation-policy/"
              className="group rounded-2xl border border-gray-200 bg-[#F7F7F5] p-6 transition-all hover:-translate-y-1 hover:border-[#D4AF37]/40 shadow-xs"
            >
              <h3 className="font-bold tracking-tight text-lg text-[#111111]">
                Refund & Cancellation
              </h3>

              <div className="mt-4 inline-flex items-center text-sm font-semibold text-[#D4AF37]">
                View Policy
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </Link>
          </div>
        </Reveal>
      </section>

      <CTASection
        eyebrow="Questions?"
        title="Need more information?"
        description="Review our legal pages or contact the agency for questions about the website and its services."
        buttonLabel="Contact Us"
        buttonHref="/contact/"
      />
    </main>
  );
}
