import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Mail,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";

const refundPoints = [
  {
    title: "Refund Eligibility",
    description:
      "[INSERT THE ACTUAL CONDITIONS UNDER WHICH A MEMBERSHIP OR SERVICE PAYMENT IS ELIGIBLE FOR A REFUND.]",
    icon: CheckCircle2,
  },
  {
    title: "Cancellation",
    description:
      "[INSERT THE ACTUAL CANCELLATION RULES, INCLUDING WHEN AND HOW A USER CAN CANCEL.]",
    icon: XCircle,
  },
  {
    title: "Processing Time",
    description: "[INSERT THE VERIFIED REFUND PROCESSING TIMELINE.]",
    icon: Clock3,
  },
  {
    title: "Non-Refundable Charges",
    description:
      "[INSERT ANY ACTUAL NON-REFUNDABLE FEES OR SERVICES, IF APPLICABLE.]",
    icon: AlertCircle,
  },
];

const processSteps = [
  {
    number: "01",
    title: "Review the Applicable Terms",
    description:
      "Review the refund and cancellation conditions that applied to your purchase at the time of payment.",
  },
  {
    number: "02",
    title: "Contact the Business",
    description:
      "Submit your refund or cancellation request through the verified contact method provided by the business.",
  },
  {
    number: "03",
    title: "Provide Relevant Details",
    description:
      "Provide the information required to identify the applicable registration, membership or transaction.",
  },
  {
    number: "04",
    title: "Wait for Review",
    description:
      "[INSERT THE ACTUAL REVIEW AND RESPONSE PROCESS USED BY THE BUSINESS.]",
  },
];

export default function RefundAndCancellationPolicyPage() {
  return (
    <main className="bg-white min-h-screen text-[#111111]">
      <PageHero
        eyebrow="Legal & Trust"
        title="Refund & Cancellation Policy"
        description="Information about cancellation and refund conditions for paid services or membership."
      />

      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <Breadcrumb
          items={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: "Refund & Cancellation Policy",
            },
          ]}
        />
      </div>

      {/* Important Notice */}
      <section className="mx-auto max-w-5xl px-6 py-10 lg:px-8 lg:py-16">
        <Reveal>
          <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#F7F7F5] p-7 md:p-9 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                <ShieldCheck className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                  Important
                </p>

                <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                  Please review the actual refund terms before payment
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#444444] md:text-base">
                  The final published policy must contain the business&apos;s actual
                  refund eligibility rules, cancellation conditions, processing
                  timelines and applicable exceptions. Those specific terms were
                  not provided in the website structure document.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Overview */}
      <section className="mx-auto max-w-5xl px-6 py-10 lg:px-8 lg:py-16">
        <Reveal>
          <div className="space-y-10">
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                01
              </p>

              <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                Scope of This Policy
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                This policy applies to paid services or membership purchases
                where the business has published applicable refund and
                cancellation terms.
              </p>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                The exact services covered by this policy should be confirmed by
                the business before publication.
              </p>
            </section>

            {/* Refund Cards */}
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                02
              </p>

              <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                Refund & Cancellation Conditions
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                The following sections are structured for the actual business
                rules to be inserted and verified.
              </p>

              <div className="mt-7 grid gap-5 md:grid-cols-2">
                {refundPoints.map((point) => {
                  const Icon = point.icon;

                  return (
                    <div
                      key={point.title}
                      className="rounded-3xl border border-gray-200 bg-[#F7F7F5] p-6 shadow-xs"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                        <Icon className="h-5 w-5" />
                      </div>

                      <h3 className="mt-5 font-bold tracking-tight text-xl text-[#111111]">
                        {point.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-[#555555]">
                        {point.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* No Guarantee */}
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                03
              </p>

              <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                Casting Selection Is Not Guaranteed
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                Registration or membership does not guarantee casting selection,
                auditions, roles or paid work. Membership should not be
                understood as a guarantee of selection or employment.
              </p>

              <div className="mt-6 rounded-2xl border border-[#D4AF37]/30 bg-[#F7F7F5] p-6 shadow-xs">
                <p className="text-sm leading-7 text-[#444444]">
                  Any refund rights should therefore be based on the actual
                  published refund and cancellation terms, not on whether a user
                  receives a casting opportunity.
                </p>
              </div>
            </section>

            {/* Request Process */}
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                04
              </p>

              <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                How to Request a Refund or Cancellation
              </h2>

              <div className="mt-7 space-y-4">
                {processSteps.map((step) => (
                  <div
                    key={step.number}
                    className="flex gap-5 rounded-2xl border border-gray-200 bg-[#F7F7F5] p-6 shadow-xs"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-sm font-semibold text-[#D4AF37]">
                      {step.number}
                    </div>

                    <div>
                      <h3 className="font-bold tracking-tight text-lg text-[#111111]">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-[#555555]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Required Information */}
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                05
              </p>

              <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                Information to Include in a Request
              </h2>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {[
                  "Full name",
                  "Registered email address",
                  "Relevant membership or registration details",
                  "Transaction or payment reference, where available",
                  "Date of transaction",
                  "Reason for the request, where required by the actual policy",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-[#F7F7F5] p-5 shadow-2xs"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#D4AF37]" />

                    <span className="text-sm leading-7 text-[#444444]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Processing */}
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                06
              </p>

              <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                Refund Processing
              </h2>

              <div className="mt-5 rounded-2xl border border-gray-200 bg-[#F7F7F5] p-6 shadow-xs">
                <p className="text-sm leading-7 text-[#555555]">
                  <strong className="text-[#111111]">
                    Verified processing timeline:
                  </strong>{" "}
                  [INSERT ACTUAL REFUND PROCESSING TIME]
                </p>

                <p className="mt-3 text-sm leading-7 text-[#555555]">
                  <strong className="text-[#111111]">Refund method:</strong> [INSERT
                  ACTUAL REFUND METHOD]
                </p>

                <p className="mt-3 text-sm leading-7 text-[#555555]">
                  <strong className="text-[#111111]">
                    Applicable payment-provider conditions:
                  </strong>{" "}
                  [INSERT VERIFIED DETAILS]
                </p>
              </div>
            </section>

            {/* Exceptions */}
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                07
              </p>

              <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                Exceptions & Special Conditions
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                Any exceptions to the standard refund or cancellation rules
                should be stated clearly here.
              </p>

              <div className="mt-5 rounded-2xl border border-gray-200 bg-[#F7F7F5] p-6 shadow-xs">
                <p className="text-sm leading-7 text-[#555555]">
                  [INSERT VERIFIED EXCEPTIONS, IF ANY.]
                </p>
              </div>
            </section>

            {/* Contact */}
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                08
              </p>

              <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                Contact for Refund Requests
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                Use the business&apos;s verified contact information to submit a
                refund or cancellation request.
              </p>

              <div className="mt-6 flex items-start gap-4 rounded-2xl border border-gray-200 bg-[#F7F7F5] p-6 shadow-xs">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-[#D4AF37]" />

                <div>
                  <p className="text-sm font-semibold text-[#111111]">
                    Refund Contact
                  </p>

                  <p className="mt-2 text-sm text-[#555555]">
                    [INSERT REAL REFUND / SUPPORT EMAIL ADDRESS]
                  </p>
                </div>
              </div>
            </section>

            {/* Policy Date */}
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                09
              </p>

              <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                Policy Information
              </h2>

              <div className="mt-5 rounded-2xl border border-gray-200 bg-[#F7F7F5] p-6 shadow-xs">
                <p className="text-sm text-[#555555]">
                  <strong className="text-[#111111]">Effective Date:</strong>{" "}
                  [INSERT VERIFIED EFFECTIVE DATE]
                </p>

                <p className="mt-2 text-sm text-[#555555]">
                  <strong className="text-[#111111]">Last Updated:</strong> [INSERT
                  VERIFIED LAST UPDATED DATE]
                </p>
              </div>
            </section>
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
              href="/disclaimer/"
              className="group rounded-2xl border border-gray-200 bg-[#F7F7F5] p-6 transition-all hover:-translate-y-1 hover:border-[#D4AF37]/40 shadow-xs"
            >
              <h3 className="font-bold tracking-tight text-lg text-[#111111]">Disclaimer</h3>

              <div className="mt-4 inline-flex items-center text-sm font-semibold text-[#D4AF37]">
                View Disclaimer
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </Link>
          </div>
        </Reveal>
      </section>

      <CTASection
        eyebrow="Need Help?"
        title="Have a question about a refund?"
        description="Contact the business using the verified support details provided in this policy."
        buttonLabel="Contact Us"
        buttonHref="/contact/"
      />
    </main>
  );
}
