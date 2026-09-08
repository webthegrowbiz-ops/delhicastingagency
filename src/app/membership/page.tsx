"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CTASection } from "@/components/ui/cta-section";
import { Reveal } from "@/components/ui/reveal";
import { PremiumFlowModal, PremiumModalStep } from "@/components/premium-flow-modal";
import { isUserAuthenticated } from "@/lib/auth";

const includedItems = [
  {
    title: "Artist profile registration",
    description: "Part of the structured artist membership experience.",
    image: "/images/actors/registration.jpg",
    alt: "Artist profile registration for Delhi Casting Agency membership",
  },
  {
    title: "Talent category selection",
    description: "Part of the structured artist membership experience.",
    image: "/images/actors/talent category selection.webp",
    alt: "Talent category selection for actors, models, and performers",
  },
  {
    title: "Profile and portfolio information",
    description: "Part of the structured artist membership experience.",
    image: "/images/actors/basic info.jpg",
    alt: "Artist portfolio and profile information showcase",
  },
  {
    title: "Access to relevant platform sections",
    description: "Part of the structured artist membership experience.",
    image: "/images/actors/any talent section horizonatlly.png",
    alt: "Access to relevant casting and platform sections",
  },
  {
    title: "Ability to explore available casting opportunities",
    description: "Part of the structured artist membership experience.",
    image: "/images/actors/cating calls horizonattaly.png",
    alt: "Explore available casting opportunities and audition briefs",
  },
  {
    title: "A structured online artist profile experience",
    description: "Part of the structured artist membership experience.",
    image: "/images/actors/experience skills.jpg",
    alt: "A structured online artist profile experience",
  },
];

export default function MembershipPage() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInitialStep, setModalInitialStep] = useState<PremiumModalStep | undefined>(undefined);

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      {/* Hero Header */}
      <section className="relative isolate overflow-hidden border-b border-gray-200 bg-[#F7F7F5] px-6 pb-12 pt-28 sm:pb-16 sm:pt-36">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              Membership
            </p>

            <div className="relative mb-8 aspect-21/7 max-h-[280px] w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-md">
              <Image
                src="/images/actors/Membership.avif"
                alt="DCA Premium Artist Membership - Casting Journey"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <h1 className="font-serif text-3xl font-extrabold tracking-tight text-[#111111] sm:text-5xl md:text-6xl">
              Understanding Membership
            </h1>

            <p className="mt-4 max-w-3xl text-base font-normal leading-relaxed text-[#444444] sm:text-lg">
              Learn what is included in the platform experience and understand expectations before registering your artist profile.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 py-6">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Membership" }]} />
      </div>

      {/* What's Included */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <Reveal>
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              <Sparkles className="h-3.5 w-3.5" />
              What&apos;s Included
            </span>

            <h2 className="mt-3 font-serif text-3xl font-extrabold tracking-tight text-[#111111] sm:text-4xl">
              What your membership experience covers
            </h2>

            <p className="mt-3 text-base leading-relaxed text-[#444444]">
              The membership page is designed to clearly communicate the platform features and registration experience available to artists.
            </p>
          </div>
        </Reveal>

        <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {includedItems.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05} className="h-full">
              <div className="group flex h-full flex-col justify-between overflow-hidden rounded-xl border border-gray-200 bg-[#F7F7F5] p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:bg-white hover:shadow-xl">
                <div>
                  <div className="relative mb-4 aspect-16/10 w-full overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="350px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#111111]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#555555]">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Membership Fee & Overview */}
      <section className="mx-auto max-w-7xl px-6 py-12 border-t border-gray-200">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal>
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Artist 3-Month Plan */}
              <div className="rounded-xl border-2 border-[#D4AF37]/50 bg-white p-6 shadow-md relative flex flex-col justify-between">
                <span className="absolute -top-3 right-4 bg-[#D4AF37] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full">
                  Artist Membership
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                    Artist Premium Plan
                  </span>
                  <h3 className="mt-2 font-serif text-xl font-bold text-[#111111]">
                    3-Month Premium Membership
                  </h3>
                  <div className="mt-3 flex items-end gap-1">
                    <span className="text-lg font-bold text-[#D4AF37]">₹</span>
                    <span className="text-4xl font-extrabold text-[#D4AF37]">1,999</span>
                    <span className="text-xs font-semibold text-gray-500 mb-1"> / 3 months</span>
                  </div>
                  <p className="mt-2 text-xs text-[#555555]">
                    3 Months access for verified casting calls &amp; priority visibility.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!isUserAuthenticated()) {
                      router.push("/profile/setup");
                    } else {
                      setModalInitialStep("artist_checkout");
                      setModalOpen(true);
                    }
                  }}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#D4AF37] py-3 text-xs font-bold uppercase tracking-wider text-white transition duration-300 hover:bg-[#C59B27] cursor-pointer"
                >
                  <span>Become Premium — ₹1,999</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Brand Plan */}
              <div className="rounded-xl border border-gray-200 bg-[#F7F7F5] p-6 shadow-md">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                  Brand &amp; Casting Plan
                </span>
                <h3 className="mt-2 font-serif text-xl font-bold text-[#111111]">
                  Premium Casting Account
                </h3>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-lg font-bold text-[#D4AF37]">₹</span>
                  <span className="text-4xl font-extrabold text-[#D4AF37]">9,999</span>
                  <span className="text-xs font-semibold text-gray-500 mb-1"> / 3 months</span>
                </div>
                <p className="mt-2 text-xs text-[#555555]">
                  3 Months access for direct talent access &amp; priority casting placement.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (!isUserAuthenticated()) {
                      router.push("/register/brand");
                    } else {
                      setModalInitialStep("brand_checkout");
                      setModalOpen(true);
                    }
                  }}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#D4AF37] py-3 text-xs font-bold uppercase tracking-wider text-white transition duration-300 hover:bg-[#C59B27] cursor-pointer"
                >
                  <span>Become Premium — ₹9,999</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                What Membership Means
              </span>
              <h2 className="font-serif text-3xl font-extrabold text-[#111111]">
                A structured online experience for artists
              </h2>
              <p className="text-sm leading-relaxed text-[#444444]">
                Membership is intended to provide a structured platform experience for artists who want to present their profile and explore relevant opportunities.
              </p>
              <div className="space-y-3 text-xs leading-relaxed text-[#555555]">
                <p>Your profile can bring together important information about your talent, experience, skills, photographs and other portfolio details.</p>
                <p>The platform is organized into dedicated talent categories, helping artists discover sections and opportunities that are relevant to their profile.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Global CTA */}
      <CTASection
        eyebrow="Ready to Continue?"
        title="Create your artist profile."
        description="Start the registration journey and review the applicable membership information before payment."
        buttonLabel="Become Premium"
        buttonHref="#"
      />

      <PremiumFlowModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialStep={modalInitialStep}
      />
    </main>
  );
}
