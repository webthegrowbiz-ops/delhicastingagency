import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Database,
  FileText,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";

const privacyPoints = [
  {
    title: "Information You Provide",
    description:
      "Information you submit through registration, profile creation, contact forms or other website forms may be collected for the purposes explained at the point of collection.",
    icon: UserCheck,
  },
  {
    title: "Profile & Portfolio Information",
    description:
      "Talent profile information and portfolio material may be used to create and manage your profile and support relevant casting-related services.",
    icon: FileText,
  },
  {
    title: "Website & Technical Information",
    description:
      "Technical information associated with your use of the website may be processed where necessary to operate, secure and improve the website.",
    icon: Database,
  },
  {
    title: "Payment Information",
    description:
      "Where payments are made, payment processing should be handled according to the applicable payment provider's terms and privacy practices.",
    icon: LockKeyhole,
  },
];

const userRights = [
  "Review the information associated with your account or profile where applicable",
  "Request correction of inaccurate information",
  "Ask questions about how your information is used",
  "Contact the agency regarding privacy-related concerns",
];

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white min-h-screen text-[#111111]">
      <PageHero
        eyebrow="Legal & Trust"
        title="Privacy Policy"
        description="Information about how personal information may be handled when you use the Way To Bollywood website and services."
      />

      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <Breadcrumb
          items={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: "Privacy Policy",
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
                  Please Read
                </p>

                <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                  Your privacy matters
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#444444] md:text-base">
                  This page explains the general categories of information that
                  may be handled when you use this website. The final published
                  policy should contain the agency&apos;s actual legal entity
                  details, contact information, applicable retention periods and
                  other specific legal terms.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Policy Details */}
      <section className="mx-auto max-w-5xl px-6 py-10 lg:px-8 lg:py-16">
        <Reveal>
          <div className="space-y-10">
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                01
              </p>

              <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                Who We Are
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                This website is operated by:
              </p>

              <div className="mt-5 rounded-2xl border border-gray-200 bg-[#F7F7F5] p-6 shadow-xs">
                <p className="text-sm leading-7 text-[#555555]">
                  <strong className="text-[#111111]">
                    Business / Agency Name:
                  </strong>{" "}
                  [INSERT REAL LEGAL / BUSINESS NAME]
                </p>

                <p className="mt-2 text-sm leading-7 text-[#555555]">
                  <strong className="text-[#111111]">Website:</strong> [INSERT REAL
                  WEBSITE URL]
                </p>

                <p className="mt-2 text-sm leading-7 text-[#555555]">
                  <strong className="text-[#111111]">Privacy Contact:</strong>{" "}
                  [INSERT REAL PRIVACY CONTACT EMAIL]
                </p>
              </div>
            </section>

            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                02
              </p>

              <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                Information We May Collect
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                Depending on how you use the website, information may be
                provided when you register, create a talent profile, contact us,
                submit information or use other available services.
              </p>

              <div className="mt-7 grid gap-5 md:grid-cols-2">
                {privacyPoints.map((point) => {
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

            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                03
              </p>

              <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                How Information May Be Used
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                Information may be used for purposes connected with operating
                the website and providing the services you request, including
                managing registrations, profiles, communications and relevant
                casting-related activities.
              </p>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                The exact purposes and legal basis for processing should be
                confirmed in the final version of this policy based on the
                actual services and systems used by the business.
              </p>
            </section>

            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                04
              </p>

              <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                Sharing of Information
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                Personal information should only be shared or disclosed as
                permitted by the applicable privacy policy, law and the services
                actually used by the business.
              </p>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                The final policy should identify relevant service providers,
                processors or other recipients where applicable. Do not publish
                generic claims here without verifying the actual services
                connected to the website.
              </p>
            </section>

            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                05
              </p>

              <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                Data Security
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                Reasonable security measures should be used to protect
                information handled through the website and associated services.
                No online system can be represented as completely risk-free.
              </p>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                The final policy should describe the actual security practices
                used by the business rather than making unsupported technical
                claims.
              </p>
            </section>

            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                06
              </p>

              <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                Data Retention
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                Information should be retained only for as long as necessary for
                the applicable purpose, legal obligations or other legitimate
                requirements.
              </p>

              <div className="mt-5 rounded-2xl border border-gray-200 bg-[#F7F7F5] p-6 shadow-xs">
                <p className="text-sm leading-7 text-[#555555]">
                  <strong className="text-[#111111]">
                    Actual retention periods:
                  </strong>{" "}
                  [INSERT VERIFIED RETENTION DETAILS]
                </p>
              </div>
            </section>

            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                07
              </p>

              <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                Your Privacy Requests
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                Depending on applicable law, you may have rights relating to
                information held about you. Contact the business using the
                verified privacy contact details for questions or requests.
              </p>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {userRights.map((right) => (
                  <div
                    key={right}
                    className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-[#F7F7F5] p-5 shadow-2xs"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#D4AF37]" />

                    <span className="text-sm leading-7 text-[#444444]">
                      {right}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                08
              </p>

              <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                Contact Us About Privacy
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                For privacy-related questions or requests, contact:
              </p>

              <div className="mt-5 flex items-start gap-4 rounded-2xl border border-gray-200 bg-[#F7F7F5] p-6 shadow-xs">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-[#D4AF37]" />

                <div>
                  <p className="text-sm font-semibold text-[#111111]">
                    Privacy Contact
                  </p>

                  <p className="mt-2 text-sm text-[#555555]">
                    [INSERT REAL PRIVACY EMAIL ADDRESS]
                  </p>
                </div>
              </div>
            </section>

            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                09
              </p>

              <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                Policy Updates
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                This policy may need to be updated when the website, services,
                processing practices or applicable legal requirements change.
                The published policy should show its actual effective or updated
                date.
              </p>

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
        eyebrow="Privacy & Trust"
        title="Questions about your information?"
        description="Contact the agency using the verified privacy contact details provided in this policy."
        buttonLabel="Contact Us"
        buttonHref="/contact/"
      />
    </main>
  );
}
