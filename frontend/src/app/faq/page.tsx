
"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle, ShieldCheck } from "lucide-react";

import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";

const faqs = [
  {
    question: "How do I register as an artist?",
    answer:
      "Start by completing the artist registration form with your basic information. You can then continue to the profile step and add details such as height, languages, experience, social links and portfolio information.",
  },
  {
    question: "What information should I provide in my artist profile?",
    answer:
      "Keep your profile information accurate and up to date. Relevant information can include your basic details, talent category, experience, skills, recent photographs and portfolio or social media links.",
  },
  {
    question: "Do I need previous acting or modelling experience?",
    answer:
      "Not necessarily. The platform includes talent categories for different experience levels, including fresh faces. However, individual casting opportunities can have their own eligibility and experience requirements.",
  },
  {
    question: "Does registration guarantee casting work?",
    answer:
      "No. Registration or membership does not guarantee selection, auditions, roles or paid work. Every casting opportunity can have its own requirements and selection process.",
  },
  {
    question: "What types of talent can register?",
    answer:
      "The platform is structured around multiple talent categories, including actors, models, child artists, influencers, dancers and voice artists.",
  },
  {
    question: "What types of casting opportunities are available?",
    answer:
      "The planned casting structure covers categories such as Bollywood films, TV serials, OTT/web series, music videos, print advertisements, TV commercials and fashion shows. Specific opportunities should always be reviewed for their individual requirements.",
  },
  {
    question: "Can freshers register?",
    answer:
      "Yes. Fresh faces are included as a dedicated actor segment in the website structure. Having no previous professional experience does not automatically prevent someone from creating a talent profile, although individual casting calls may have specific requirements.",
  },
  {
    question: "How should I prepare my portfolio?",
    answer:
      "Use recent and clear photographs and provide relevant experience, skills and portfolio or social links. Your information should accurately represent your current appearance, abilities and experience.",
  },
  {
    question: "Are casting opportunities guaranteed after payment?",
    answer:
      "No. Payment or membership does not guarantee a casting opportunity, audition, selection or employment. Artists should carefully review the terms and details associated with any membership or casting opportunity.",
  },
  {
    question: "How can I avoid casting scams?",
    answer:
      "Be careful with unsolicited offers, unrealistic guarantees and requests for sensitive information. Always review the source of a casting opportunity and verify important details before making any payment or sharing personal information.",
  },
  {
    question: "Can I contact the agency if I have a question?",
    answer:
      "Yes. Use the Contact Us page to submit an enquiry. Official phone, email and community details should only be used once they have been verified and published by the agency.",
  },
  {
    question: "Is the website available across India?",
    answer:
      "The website structure describes the agency as fully online and does not include branch or city-specific URLs. Talent and casting categories are therefore organized around talent type and opportunity rather than individual city branches.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <main>
      {/* ================================================================ */}
      {/* PAGE HERO                                                        */}
      {/* ================================================================ */}

      <PageHero
        eyebrow="Frequently Asked Questions"
        title="Everything You Need to Know"
        description="Find answers about registration, talent profiles, membership and casting opportunities."
      />

      {/* ================================================================ */}
      {/* BREADCRUMB                                                       */}
      {/* ================================================================ */}

      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <Breadcrumb
          items={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: "FAQ",
            },
          ]}
        />
      </div>

      {/* ================================================================ */}
      {/* FAQ SECTION                                                       */}
      {/* ================================================================ */}

      <section className="mx-auto max-w-5xl px-6 py-12 lg:px-8 lg:py-20">
        <Reveal>
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Common Questions
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl font-bold tracking-tight text-3xl text-white md:text-4xl">
              Clear answers before you get started.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/75">
              Review the most common questions about creating a profile and
              exploring casting opportunities.
            </p>
          </div>
        </Reveal>

        {/* FAQ LIST */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <Reveal key={faq.question} delay={Math.min(index * 0.025, 0.25)}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-[#D4AF37]/30 bg-[#D4AF37]/[0.04]"
                      : "border-white/10 bg-white/[0.03]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                  >
                    <span
                      className={`font-medium transition-colors ${
                        isOpen ? "text-[#D4AF37]" : "text-white"
                      }`}
                    >
                      {faq.question}
                    </span>

                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37]"
                          : "border-white/10 bg-white/[0.03] text-white/75"
                      }`}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-white/10 px-6 pb-6 pt-5">
                        <p className="text-sm leading-7 text-white/75">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ================================================================ */}
      {/* IMPORTANT NOTICE                                                 */}
      {/* ================================================================ */}

      <section className="mx-auto max-w-5xl px-6 pb-16 lg:px-8">
        <Reveal>
          <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#D4AF37]/[0.05] p-7 md:p-9">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-bold tracking-tight text-2xl text-white">
                  Keep your expectations realistic.
                </h2>

                <p className="mt-3 text-sm leading-7 text-white/75">
                  Casting opportunities can have different requirements,
                  eligibility criteria and selection processes. Registration or
                  membership should not be understood as a guarantee of
                  selection or work.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================================================================ */}
      {/* CTA                                                               */}
      {/* ================================================================ */}

      <CTASection
        eyebrow="Still Have Questions?"
        title="We're here to help you get started."
        description="If you cannot find the answer you need, use the Contact Us page to send an enquiry."
        buttonLabel="Contact Us"
        buttonHref="/contact-us/"
      />

      {/* ================================================================ */}
      {/* CONTACT NOTE                                                      */}
      {/* ================================================================ */}

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
            <MessageCircle className="h-5 w-5 text-[#D4AF37]" />

            <p className="text-sm text-white/45">
              Need more information?{" "}
              <a
                href="/contact-us/"
                className="text-[#D4AF37] transition-colors hover:text-[#E8C85A]"
              >
                Contact the agency
              </a>
              .
            </p>
          </div>
        </Reveal>
      </section>
    </main>
  );
}