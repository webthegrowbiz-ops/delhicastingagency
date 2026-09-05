"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProfileCreateOrSetupUrl } from "@/lib/auth";
import {
  ChevronRight,
  Sparkles,
  Award,
  Clapperboard,
  CheckCircle2,
  Mail,
  Share2,
  ArrowLeft,
  FileText,
  User,
} from "lucide-react";
import type { Actor } from "@/data/actors";
import { ActorQuickSpecs } from "./ActorQuickSpecs";
import { PortfolioTabs, type PortfolioTabKey } from "./PortfolioTabs";
import { PortfolioGallery } from "./PortfolioGallery";
import { VideoGallery } from "./VideoGallery";
import { ActorCard } from "./ActorCard";
import { ImageLightbox } from "./ImageLightbox";
import { Breadcrumb } from "@/components/ui/breadcrumb";

interface ActorProfileViewProps {
  actor: Actor;
  relatedActors: Actor[];
}

export function ActorProfileView({
  actor,
  relatedActors,
}: ActorProfileViewProps) {
  const [activeTab, setActiveTab] = useState<PortfolioTabKey>("digitals");
  const [headerLightboxOpen, setHeaderLightboxOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const counts = {
    digitals: actor.digitals.length,
    video: actor.videos.length,
    instagram: actor.instagram.length,
    print: actor.print.length,
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const scrollToBiography = (e: React.MouseEvent) => {
    e.preventDefault();
    const bioElement = document.getElementById("biography");
    if (bioElement) {
      bioElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      {/* Breadcrumb Bar */}
      <div className="border-b border-gray-200 bg-[#F7F7F5] pt-28 sm:pt-32 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Talents", href: "/talents/" },
              { label: "Actors", href: "/actors/" },
              { label: `${actor.categoryLabel}s`, href: `/actors/${actor.category}` },
              { label: actor.name },
            ]}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href={`/actors/${actor.category}`}
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#666666] hover:text-[#d4af37] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {actor.categoryLabel}s</span>
          </Link>
        </div>

        {/* Hero Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12">
          {/* Main Photo Column */}
          <div className="lg:col-span-5">
            <div
              onClick={() => setHeaderLightboxOpen(true)}
              className="group relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 hover:border-[#d4af37]/60 hover:shadow-xl transition-all duration-300 cursor-pointer shadow-md"
            >
              <Image
                src={actor.mainImage}
                alt={actor.name}
                fill
                priority
                unoptimized
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

              {/* Click to expand pill */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-200 text-xs text-[#111111] flex items-center gap-1.5 group-hover:border-[#d4af37] group-hover:text-[#d4af37] transition-colors shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>View Full Size</span>
              </div>
            </div>

            {/* Quick Actions under photo */}
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <Link
                href="/contact"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#d4af37] hover:bg-[#c59b27] text-white font-bold text-sm transition-all duration-300 shadow-md"
              >
                <Mail className="w-4 h-4" />
                <span>Inquire &amp; Cast</span>
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

          {/* Profile Overview, Model Details & Biography Column */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              {/* Badges ABOVE actor name */}
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 font-bold">
                  {actor.categoryLabel}
                </span>
                {actor.badge && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {actor.badge}
                  </span>
                )}
              </div>

              {/* Actor Name */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
                {actor.name}
              </h1>

              {/* Role */}
              <p className="text-lg sm:text-xl text-[#d4af37] font-medium mt-1">
                {actor.role}
              </p>
            </div>

            {/* Model Details */}
            <ActorQuickSpecs actor={actor} />

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
                {actor.about}
              </p>
            </div>

            {/* Skills & Talents */}
            <div className="bg-[#F7F7F5] border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs">
              <h3 className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Skills &amp; Special Talents</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {actor.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs sm:text-sm px-3 py-1.5 rounded-lg bg-white text-[#333333] border border-gray-200 hover:border-[#d4af37]/40 transition-colors shadow-2xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Experience & Credits Section */}
        <div className="mb-14 bg-[#F7F7F5] border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2.5 mb-6">
            <Award className="w-5 h-5 text-[#d4af37]" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#111111] tracking-tight">
              Featured Credits &amp; Performance History
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#444444] border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-xs uppercase tracking-wider text-[#666666]">
                  <th className="py-3 px-4">Project / Production</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Year</th>
                  <th className="py-3 px-4">Director / Banner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {actor.experienceCredits.map((credit, index) => (
                  <tr
                    key={index}
                    className="hover:bg-white transition-colors"
                  >
                    <td className="py-3.5 px-4 font-semibold text-[#111111]">
                      {credit.project}
                    </td>
                    <td className="py-3.5 px-4 text-[#d4af37] font-medium">
                      {credit.role}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-xs px-2.5 py-1 rounded bg-white border border-gray-200 text-[#333333]">
                        {credit.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#666666]">{credit.year}</td>
                    <td className="py-3.5 px-4 text-[#666666]">
                      {credit.directorOrClient || "Production Studio"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive Portfolio Section */}
        <section className="mb-16">
          <div className="mb-6">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold flex items-center gap-1.5 mb-2">
              <Clapperboard className="w-4 h-4 text-[#d4af37]" />
              Artist Media &amp; Comp Card
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
              Interactive Portfolio
            </h2>
          </div>

          {/* Tab navigation */}
          <PortfolioTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            counts={counts}
          />

          {/* Active Tab Panel */}
          <div className="mt-6">
            {activeTab === "digitals" && (
              <PortfolioGallery
                type="digitals"
                digitals={actor.digitals}
                actorName={actor.name}
              />
            )}
            {activeTab === "video" && (
              <VideoGallery videos={actor.videos} actorName={actor.name} />
            )}
            {activeTab === "instagram" && (
              <PortfolioGallery
                type="instagram"
                instagram={actor.instagram}
                actorName={actor.name}
              />
            )}
            {activeTab === "print" && (
              <PortfolioGallery
                type="print"
                print={actor.print}
                actorName={actor.name}
              />
            )}
          </div>
        </section>

        {/* Related Artists Section */}
        {relatedActors.length > 0 && (
          <section className="mb-16 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                  Discover More
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
                  Similar {actor.categoryLabel}s
                </h2>
              </div>
              <Link
                href={`/actors/${actor.category}`}
                className="text-xs sm:text-sm text-[#d4af37] hover:underline font-semibold"
              >
                View All {actor.categoryLabel}s &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {relatedActors.map((relActor) => (
                <ActorCard key={relActor.id} actor={relActor} />
              ))}
            </div>
          </section>
        )}

        {/* Call to Action Banner */}
        <section className="bg-[#F7F7F5] border border-gray-200 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-md">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
              Interested in Casting {actor.name}?
            </h2>
            <p className="text-[#555555] text-sm sm:text-base">
              Delhi Casting Agency manages casting inquiries, audition scheduling, contract coordination and direct representation.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-3.5 rounded-xl bg-[#d4af37] hover:bg-[#c59b27] text-white font-bold text-sm shadow-md transition-all duration-300"
              >
                Submit Casting Inquiry
              </Link>
              <Link
                href={getProfileCreateOrSetupUrl()}
                className="px-8 py-3.5 rounded-xl bg-white text-[#111111] hover:text-[#d4af37] font-semibold text-sm border border-gray-200 transition-all duration-300 shadow-xs"
              >
                Create Your Profile
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Header Image Lightbox */}
      <ImageLightbox
        isOpen={headerLightboxOpen}
        images={[{ image: actor.mainImage, title: actor.name }]}
        currentIndex={0}
        onClose={() => setHeaderLightboxOpen(false)}
        onNavigate={() => {}}
      />
    </main>
  );
}
