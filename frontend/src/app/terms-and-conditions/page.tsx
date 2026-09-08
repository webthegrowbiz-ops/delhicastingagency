import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Gavel,
  Info,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";

const responsibilities = [
  {
    title: "Accurate Information",
    description:
      "Users should provide information that is accurate, current and relevant when creating or maintaining an account or talent profile.",
    icon: UserCheck,
  },
  {
    title: "Responsible Use",
    description:
      "The website and its services should be used only for legitimate purposes and in accordance with applicable laws.",
    icon: ShieldCheck,
  },
  {
    title: "Profile Content",
    description:
      "Users are responsible for the information, photographs and other material they submit to the website.",
    icon: FileText,
  },
  {
    title: "Review Opportunities",
    description:
      "Users should carefully review casting opportunities, requirements and applicable terms before proceeding.",
    icon: Info,
  },
];

const importantPoints = [
  "Provide accurate information when registering or updating your profile",
  "Keep your account or profile information current",
  "Do not misuse the website or submit unlawful or misleading material",
  "Review casting requirements before applying",
  "Do not represent yourself as another person",
  "Respect applicable intellectual property and privacy rights",
];

export default function TermsAndConditionsPage() {
  return (
    <main className="bg-white min-h-screen text-[#111111]">
      <PageHero
        eyebrow="Legal & Trust"
        title="Terms & Conditions"
        description="Terms governing the use of the Way To Bollywood website and its services."
      />

      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <Breadcrumb
          items={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: "Terms & Conditions",
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
                <Gavel className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                  Please Read
                </p>

                <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                  Terms for using this website
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#444444] md:text-base">
                  These terms describe general expectations for use of the
                  website. The final published legal terms should be reviewed
                  and approved by the business before going live.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Terms */}
      <section className="mx-auto max-w-5xl px-6 py-10 lg:px-8 lg:py-16">
        <Reveal>
          <div className="space-y-10">
            {/* 01 */}
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                01
              </p>

              <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                Acceptance of Terms
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                By accessing or using this website, users should review and
                agree to the applicable terms governing use of the website and
                services.
              </p>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                If you do not agree with the final applicable terms, you should
                not use the services to which those terms apply.
              </p>
            </section>

            {/* 02 */}
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                02
              </p>

              <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                Website Services
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                Way To Bollywood provides online services and resources intended
                to support talent discovery, profiles, casting-related
                opportunities and related activities.
              </p>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                The exact scope of services, availability and eligibility
                requirements should be based on the services actually offered by
                the business.
              </p>
            </section>

            {/* 03 */}
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                03
              </p>

              <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                User Responsibilities
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                Users are expected to use the website responsibly and provide
                information that is accurate and appropriate for the service
                being used.
              </p>

              <div className="mt-7 grid gap-5 md:grid-cols-2">
                {responsibilities.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-3xl border border-gray-200 bg-[#F7F7F5] p-6 shadow-xs"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                        <Icon className="h-5 w-5" />
                      </div>

                      <h3 className="mt-5 font-bold tracking-tight text-xl text-[#111111]">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-[#555555]">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 04 */}
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                04
              </p>

              <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                User Content
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                Users may submit information, photographs, portfolio material or
                other content where the website provides a relevant submission
                facility.
              </p>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                Users should have the necessary rights and permissions to submit
                material and should not upload unlawful, misleading or
                infringing content.
              </p>
            </section>

            {/* 05 */}
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                05
              </p>

              <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                Casting Opportunities
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                Casting opportunities may have individual requirements,
                selection processes and deadlines. Users should carefully review
                the information provided for each opportunity before applying.
              </p>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                Publication of an opportunity should not be interpreted as a
                guarantee of selection, employment or a particular outcome
                unless the applicable written terms expressly state otherwise.
              </p>
            </section>

            {/* 06 */}
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                06
              </p>

              <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                Payments & Membership
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                Where paid services or membership options are offered, the
                applicable price, inclusions, conditions and payment terms
                should be reviewed before purchase.
              </p>

              <div className="mt-5 rounded-2xl border border-gray-200 bg-[#F7F7F5] p-6 shadow-xs">
                <p className="text-sm leading-7 text-[#555555]">
                  <strong className="text-[#111111]">Important:</strong> The final
                  version should contain the business&apos;s actual membership
                  pricing, billing terms, renewal rules and other applicable
                  conditions. These details have not been provided in the source
                  document.
                </p>
              </div>

              <Link
                href="/refund-and-cancellation-policy/"
                className="mt-6 inline-flex items-center text-sm font-semibold text-[#D4AF37]"
              >
                View Refund & Cancellation Policy
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </section>

            {/* 07 */}
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                07
              </p>

              <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                Prohibited Use
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                Users should not use the website for unlawful activity,
                impersonation, fraud, harassment, unauthorised access or
                activities that interfere with the operation of the website or
                services.
              </p>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {importantPoints.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-[#F7F7F5] p-5 shadow-2xs"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#D4AF37]" />

                    <span className="text-sm leading-7 text-[#444444]">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* 08 */}
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                08
              </p>

              <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                Intellectual Property
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                Website content, branding, design, text, graphics and other
                protected material may be subject to intellectual property
                rights.
              </p>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                Users should not copy, reproduce, modify, distribute or use
                protected website material without appropriate permission,
                except where permitted by applicable law.
              </p>
            </section>

            {/* 09 */}
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                09
              </p>

              <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                Third-Party Services & Links
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                The website may use third-party services or link to external
                websites. The final terms should identify material third-party
                services where appropriate and explain any relevant limitations
                or responsibilities.
              </p>
            </section>

            {/* 10 */}
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                10
              </p>

              <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                Disclaimer
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                Information provided through the website should not be treated
                as a guarantee of casting selection, employment, representation
                or any particular professional outcome unless expressly stated
                in applicable written terms.
              </p>

              <Link
                href="/disclaimer/"
                className="mt-6 inline-flex items-center text-sm font-semibold text-[#D4AF37]"
              >
                Read Full Disclaimer
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </section>

            {/* 11 */}
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                11
              </p>

              <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                Changes to These Terms
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                These terms may need to be updated when services, website
                functionality or applicable legal requirements change.
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

            {/* 12 */}
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                12
              </p>

              <h2 className="mt-3 font-bold tracking-tight text-2xl text-[#111111] md:text-3xl">
                Contact
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#444444] md:text-base">
                For questions regarding these terms, contact the business using
                its verified contact details.
              </p>

              <div className="mt-5 rounded-2xl border border-gray-200 bg-[#F7F7F5] p-6 shadow-xs">
                <p className="text-sm leading-7 text-[#555555]">
                  <strong className="text-[#111111]">Business Name:</strong> [INSERT
                  REAL BUSINESS NAME]
                </p>

                <p className="mt-2 text-sm leading-7 text-[#555555]">
                  <strong className="text-[#111111]">Contact Email:</strong> [INSERT
                  REAL CONTACT EMAIL]
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
        eyebrow="Legal & Trust"
        title="Have questions about our terms?"
        description="Contact us for clarification regarding the services and applicable terms."
        buttonLabel="Contact Us"
        buttonHref="/contact/"
      />
    </main>
  );
}
