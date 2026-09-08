"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Share2,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowLeft,
  FileText,
  User,
} from "lucide-react";

import type { Model } from "@/data/models";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";
import { ModelQuickSpecs } from "./ModelQuickSpecs";
import { PortfolioTabs, type PortfolioTabKey } from "@/components/actors/PortfolioTabs";
import { PortfolioGallery } from "@/components/actors/PortfolioGallery";
import { VideoGallery } from "@/components/actors/VideoGallery";
import { ImageLightbox } from "@/components/actors/ImageLightbox";

interface ModelProfileViewProps {
  model: Model;
  similarModels: Model[];
}

export function ModelProfileView({
  model,
  similarModels,
}: ModelProfileViewProps) {
  const [activeTab, setActiveTab] = useState<PortfolioTabKey>("digitals");
  const [headerLightboxOpen, setHeaderLightboxOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const counts = {
    digitals: model.photos?.length || 0,
    video: model.videos?.length || 0,
    instagram: model.instagram?.length || 0,
    print: model.print?.length || 0,
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const scrollToBiography = () => {
    const el = document.getElementById("biography");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="bg-white min-h-screen text-[#111111]">
      {/* Breadcrumb Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-4">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Talents", href: "/talents/" },
            { label: "Models", href: "/models/" },
            { label: model.categoryLabel, href: `/models/${model.category}/` },
            { label: model.name },
          ]}
        />
      </div>

      {/* Profile Upper Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Photo Column */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div
              onClick={() => setHeaderLightboxOpen(true)}
              className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden bg-gray-100 border border-gray-200 shadow-md cursor-pointer group"
            >
              <Image
                src={model.mainImage}
                alt={model.name}
                fill
                priority
                unoptimized
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            </div>

            {/* Inquire & Share Action Buttons */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact/"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#d4af37] hover:bg-[#c59b27] text-white font-bold text-sm transition-all duration-300 shadow-md"
              >
                <Mail className="w-4 h-4" />
                <span>Book / Inquire</span>
              </Link>
              <button
                onClick={scrollToBiography}
                type="button"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-[#F7F7F5] hover:bg-gray-100 text-[#111111] border border-gray-200 text-sm font-semibold transition-colors shadow-xs"
              >
                <FileText className="w-4 h-4 text-[#d4af37]" />
                <span>View Biography</span>
              </button>
              <button
                onClick={handleShare}
                type="button"
                className="p-3 rounded-xl bg-[#F7F7F5] hover:bg-gray-100 text-[#111111] border border-gray-200 transition-colors relative shadow-xs"
                title="Share Profile"
              >
                <Share2 className="w-4 h-4 text-[#111111]" />
                {copied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#d4af37] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    Copied!
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Profile Overview, Details & Biography Column */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              {/* Badges ABOVE model name */}
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 font-bold">
                  {model.categoryLabel}
                </span>
                {model.badge && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {model.badge}
                  </span>
                )}
              </div>

              {/* Model Name */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
                {model.name}
              </h1>

              {/* Role */}
              <p className="text-lg sm:text-xl text-[#d4af37] font-medium mt-1">
                {model.role}
              </p>
            </div>

            {/* Model Details */}
            <ModelQuickSpecs model={model} />

            {/* Biography */}
            <div
              id="biography"
              className="bg-[#F7F7F5] border border-gray-200 rounded-2xl p-5 sm:p-6 scroll-mt-24 shadow-xs"
            >
              <h3 className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-3 flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Biography</span>
              </h3>
              <p className="text-[#444444] leading-relaxed text-sm sm:text-base">
                {model.about}
              </p>
            </div>

            {/* Skills & Experience */}
            <div className="bg-[#F7F7F5] border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs">
              <h3 className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Skills &amp; Specializations</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {model.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white text-[#333333] border border-gray-200 font-medium shadow-2xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Career Credits Table */}
            {model.experienceCredits && model.experienceCredits.length > 0 && (
              <div className="bg-[#F7F7F5] border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Selected Experience &amp; Runway Highlights</span>
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 text-[#666666] uppercase tracking-wider text-[10px]">
                        <th className="pb-2.5 font-medium">Project</th>
                        <th className="pb-2.5 font-medium">Role</th>
                        <th className="pb-2.5 font-medium">Category</th>
                        <th className="pb-2.5 font-medium text-right">Year</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {model.experienceCredits.map((credit, idx) => (
                        <tr key={idx} className="hover:bg-white transition-colors">
                          <td className="py-2.5 font-semibold text-[#111111]">
                            {credit.project}
                          </td>
                          <td className="py-2.5 text-[#555555]">{credit.role}</td>
                          <td className="py-2.5 text-[#d4af37] font-medium">{credit.type}</td>
                          <td className="py-2.5 text-right text-[#666666]">{credit.year}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Portfolio Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 border-t border-gray-200">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Artist Comp Card
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
                Interactive Portfolio
              </h2>
            </div>

            <PortfolioTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              counts={counts}
            />
          </div>
        </Reveal>

        {/* Tab Contents */}
        <div className="mt-6">
          {activeTab === "digitals" && (
            <PortfolioGallery
              type="digitals"
              digitals={model.photos || [model.mainImage]}
              actorName={model.name}
            />
          )}

          {activeTab === "video" && (
            <VideoGallery
              videos={model.videos || []}
              actorName={model.name}
            />
          )}

          {activeTab === "instagram" && (
            <PortfolioGallery
              type="instagram"
              instagram={model.instagram || []}
              actorName={model.name}
            />
          )}

          {activeTab === "print" && (
            <PortfolioGallery
              type="print"
              print={model.print || []}
              actorName={model.name}
            />
          )}
        </div>
      </section>

      {/* Similar Models */}
      {similarModels.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
          <Reveal>
            <div className="flex items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                  Discover More
                </span>
                <h3 className="text-2xl font-bold text-[#111111] tracking-tight mt-1">
                  Similar {model.categoryLabel}s
                </h3>
              </div>
              <Link
                href={`/models/${model.category}/`}
                className="text-xs sm:text-sm font-semibold text-[#d4af37] hover:text-[#c59b27] inline-flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {similarModels.map((sim) => (
                <Link
                  key={sim.id}
                  href={`/models/profile/${sim.id}/`}
                  className="group block bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#d4af37]/50 transition-all shadow-xs"
                >
                  <div className="relative aspect-[3/4] w-full bg-gray-100">
                    <Image
                      src={sim.mainImage}
                      alt={sim.name}
                      fill
                      unoptimized
                      sizes="25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-bold text-[#111111] group-hover:text-[#d4af37] transition-colors truncate">
                      {sim.name}
                    </p>
                    <p className="text-[11px] text-[#555555] truncate mt-0.5">
                      {sim.height} • {sim.location.split("/")[0].trim()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* Booking CTA */}
      <CTASection
        eyebrow="Model Booking &amp; Casting"
        title={`Interested in Booking ${model.name}?`}
        description="Delhi Casting Agency coordinates comp card requests, availability checking, fittings, and casting inquiries."
        buttonLabel="Submit Booking Inquiry"
        buttonHref="/contact/"
      />

      {/* Header Lightbox Modal */}
      <ImageLightbox
        isOpen={headerLightboxOpen}
        images={[{ image: model.mainImage, title: model.name }]}
        currentIndex={0}
        onClose={() => setHeaderLightboxOpen(false)}
        onNavigate={() => {}}
      />
    </main>
  );
}
