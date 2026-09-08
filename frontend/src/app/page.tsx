import { Hero } from "@/components/sections/hero";
import { TalentStrip } from "@/components/home/TalentStrip";
import { ExploreTalentSection } from "@/components/home/ExploreTalentSection";
import { ProofStrip } from "@/components/sections/proof-strip";
import { BrandMarquee } from "@/components/sections/brand-marquee";
import { WhatYouGet } from "@/components/sections/what-you-get";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { Closing } from "@/components/sections/closing";
import { StickyCta } from "@/components/sticky-cta";

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-white text-[#111111] pb-16 md:pb-0">
        <Hero />
        <TalentStrip />
        <ExploreTalentSection />
        <ProofStrip />
        <BrandMarquee />
        <WhatYouGet />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Closing />
      </main>
      <StickyCta />
    </>
  );
}
