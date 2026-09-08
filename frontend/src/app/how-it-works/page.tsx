import Image from "next/image";
import {
  CheckCircle2,
  FileText,
  Search,
  UserCheck,
  Megaphone,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CTASection } from "@/components/ui/cta-section";
import { Reveal } from "@/components/ui/reveal";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Registration & Profile Creation",
    description:
      "Register your artist profile by submitting your basic details, talent categories, and contact information.",
    image: "/images/actors/registration.jpg",
  },
  {
    number: "02",
    icon: UserCheck,
    title: "Verification & Onboarding",
    description:
      "Your profile and talent categories are reviewed to ensure authentic representation across the platform.",
    image: "/images/actors/verification.jpg",
  },
  {
    number: "03",
    icon: Search,
    title: "Portfolio & Skill Showcase",
    description:
      "Present high-quality headshots, physical attributes, experience, and past work to highlight your unique abilities.",
    image: "/images/actors/protfolio.jpg",
  },
  {
    number: "04",
    icon: Megaphone,
    title: "Auditions & Casting Opportunities",
    description:
      "Discover and respond to verified casting calls matching your profile across films, TV, OTT, fashion, and commercial campaigns.",
    image: "/images/actors/casting calls.jpg",
  },
];

const preparationItems = [
  {
    title: "Basic Information",
    image: "/images/actors/basic info.jpg",
  },
  {
    title: "Profile Photos",
    image: "/images/actors/profile photo.webp",
  },
  {
    title: "Experience & Skills",
    image: "/images/actors/experience skills.jpg",
  },
  {
    title: "Portfolio / Social Links",
    image: "/images/actors/Portfolio-Social Links.jpg",
  },
];

export const metadata = {
  title: "How It Works | Delhi Casting Agency (DCA)",
  description:
    "Understand the step-by-step journey from artist profile registration to portfolio preparation and exploring verified casting calls.",
};

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-white text-[#111111]">
      {/* Hero Header */}
      <section className="relative isolate overflow-hidden border-b border-gray-200 bg-[#F7F7F5] px-6 pb-12 pt-28 sm:pb-16 sm:pt-36">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              How It Works
            </p>

            <div className="relative mb-8 aspect-21/7 max-h-[280px] w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-md">
              <Image
                src="/images/actors/how it work horizontal.png"
                alt="How It Works - Delhi Casting Agency"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <h1 className="font-serif text-3xl font-extrabold tracking-tight text-[#111111] sm:text-5xl md:text-6xl">
              From Registration to Casting Opportunities
            </h1>

            <p className="mt-4 max-w-3xl text-base font-normal leading-relaxed text-[#444444] sm:text-lg">
              Understand the journey from creating your artist profile to exploring relevant casting calls.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 py-6">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "How It Works" }]} />
      </div>

      {/* The Process */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <Reveal>
          <div className="mb-10 max-w-3xl">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              <Sparkles className="h-3.5 w-3.5" />
              THE PROCESS
            </span>

            <h2 className="mt-3 font-serif text-3xl font-extrabold tracking-tight text-[#111111] sm:text-4xl">
              A simple journey for artists
            </h2>

            <p className="mt-3 text-base leading-relaxed text-[#444444]">
              The platform follows a straightforward journey: registration, verification, portfolio preparation and discovering relevant casting calls.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <Reveal key={step.number} delay={index * 0.05}>
                <div className="group flex flex-col justify-between overflow-hidden rounded-xl border border-gray-200 bg-[#F7F7F5] p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:bg-white md:flex-row md:items-center">
                  <div className="flex flex-1 items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-white font-serif text-xl font-bold text-[#D4AF37] shadow-xs">
                      {step.number}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-[#D4AF37]" />
                        <h3 className="font-serif text-xl font-bold tracking-tight text-[#111111]">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-[#555555] sm:text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="relative mt-4 aspect-16/10 w-full shrink-0 overflow-hidden rounded-lg bg-gray-100 md:mt-0 md:w-48">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="200px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Before You Register */}
      <section className="border-y border-gray-200 bg-[#F7F7F5] py-14">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="max-w-4xl">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                <ShieldCheck className="h-4 w-4" />
                BEFORE YOU REGISTER
              </span>

              <h2 className="mt-3 font-serif text-3xl font-extrabold tracking-tight text-[#111111] sm:text-4xl">
                Prepare your profile
              </h2>

              <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#444444]">
                A well-presented profile makes it easier to communicate your talent, experience and skills when exploring opportunities.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {preparationItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05} className="h-full">
                <div className="group flex h-full flex-col justify-between overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition duration-300 hover:border-[#D4AF37]">
                  <div>
                    <div className="relative mb-4 aspect-16/10 w-full overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="250px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#D4AF37]" />
                      <h3 className="font-serif text-base font-bold text-[#111111]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-[#666666]">
                      Keep this information clear and up to date in your artist profile.
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Global CTA */}
      <CTASection
        eyebrow="Start Your Journey"
        title="Ready to create your artist profile?"
        description="Register your talent profile and explore the platform."
        buttonLabel="Register Now"
        buttonHref="/profile/setup"
      />
    </main>
  );
}
