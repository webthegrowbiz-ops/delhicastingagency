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
  Mic2,
  Play,
  Volume2,
  Clock,
  Globe,
} from "lucide-react";

import type { VoiceArtist } from "@/data/voice-artists";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";
import { VoiceArtistQuickSpecs } from "./VoiceArtistQuickSpecs";
import { PortfolioGallery } from "@/components/actors/PortfolioGallery";
import { VideoGallery } from "@/components/actors/VideoGallery";
import { ImageLightbox } from "@/components/actors/ImageLightbox";

interface VoiceArtistProfileViewProps {
  artist: VoiceArtist;
  similarArtists: VoiceArtist[];
}

type VoiceTabType = "audio" | "video" | "photos";

export function VoiceArtistProfileView({
  artist,
  similarArtists,
}: VoiceArtistProfileViewProps) {
  const [activeTab, setActiveTab] = useState<VoiceTabType>("audio");
  const [headerLightboxOpen, setHeaderLightboxOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

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

  const photoImages = artist.photos || [artist.mainImage];

  return (
    <main className="bg-white min-h-screen text-[#111111]">
      {/* Breadcrumb Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-4">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Talents", href: "/talents/" },
            { label: "Voice Artists", href: "/voice-artists/" },
            { label: artist.categoryLabel, href: `/voice-artists/${artist.category}/` },
            { label: artist.name },
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
                src={artist.mainImage}
                alt={artist.name}
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
                <span>Book Voice Talent</span>
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
              {/* Badges ABOVE voice artist name */}
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 font-bold">
                  {artist.categoryLabel}
                </span>
                {artist.badge && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {artist.badge}
                  </span>
                )}
              </div>

              {/* Voice Artist Name */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
                {artist.name}
              </h1>

              {/* Role */}
              <p className="text-lg sm:text-xl text-[#d4af37] font-medium mt-1">
                {artist.role}
              </p>
            </div>

            {/* Voice Profile Details */}
            <VoiceArtistQuickSpecs artist={artist} />

            {/* Biography */}
            <div
              id="biography"
              className="bg-[#F7F7F5] border border-gray-200 rounded-2xl p-5 sm:p-6 scroll-mt-24 shadow-xs"
            >
              <h3 className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-3 flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Biography &amp; Studio Capabilities</span>
              </h3>
              <p className="text-[#444444] leading-relaxed text-sm sm:text-base">
                {artist.about}
              </p>
            </div>

            {/* Skills & Vocal Capabilities */}
            <div className="bg-[#F7F7F5] border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs">
              <h3 className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Vocal Capabilities &amp; Turnaround</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {artist.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white text-[#333333] border border-gray-200 font-medium shadow-2xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience Credits Table */}
            {artist.experienceCredits && artist.experienceCredits.length > 0 && (
              <div className="bg-[#F7F7F5] border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Selected Dubbing &amp; Voiceover Credits</span>
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 text-[#666666] uppercase tracking-wider text-[10px]">
                        <th className="pb-2.5 font-medium">Production / Ad</th>
                        <th className="pb-2.5 font-medium">Role</th>
                        <th className="pb-2.5 font-medium">Category</th>
                        <th className="pb-2.5 font-medium text-right">Year</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {artist.experienceCredits.map((credit, idx) => (
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

      {/* Voice Showcase Section (AUDIO / VIDEO / PHOTOS) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 border-t border-gray-200">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold flex items-center gap-1.5 mb-1">
                <Mic2 className="w-3.5 h-3.5" />
                Voice Reels &amp; Samples
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
                Verified Audio Demos &amp; Media
              </h2>
            </div>

            {/* Custom Voice Tabs: AUDIO / VIDEO / PHOTOS */}
            <div className="flex items-center gap-1.5 p-1.5 bg-[#F7F7F5] border border-gray-200 rounded-2xl self-start md:self-auto shadow-xs">
              <button
                onClick={() => setActiveTab("audio")}
                type="button"
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === "audio"
                    ? "bg-[#d4af37] text-white shadow-md"
                    : "text-[#555555] hover:text-[#111111] hover:bg-gray-100"
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>AUDIO</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/10 font-bold">
                  {artist.audios?.length || 0}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("video")}
                type="button"
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === "video"
                    ? "bg-[#d4af37] text-white shadow-md"
                    : "text-[#555555] hover:text-[#111111] hover:bg-gray-100"
                }`}
              >
                <Mic2 className="w-3.5 h-3.5" />
                <span>VIDEO</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/10 font-bold">
                  {artist.videos?.length || 0}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("photos")}
                type="button"
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === "photos"
                    ? "bg-[#d4af37] text-white shadow-md"
                    : "text-[#555555] hover:text-[#111111] hover:bg-gray-100"
                }`}
              >
                <span>PHOTOS</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/10 font-bold">
                  {photoImages.length}
                </span>
              </button>
            </div>
          </div>
        </Reveal>

        {/* Voice Tab Content */}
        <div className="mt-6">
          {activeTab === "audio" && (
            <div className="space-y-4">
              {artist.audios && artist.audios.length > 0 ? (
                artist.audios.map((audio) => {
                  const isPlaying = playingAudioId === audio.id;
                  return (
                    <div
                      key={audio.id}
                      className="bg-[#F7F7F5] border border-gray-200 hover:border-[#d4af37]/40 rounded-2xl p-5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
                    >
                      <div className="flex items-start sm:items-center gap-4">
                        <button
                          type="button"
                          onClick={() => setPlayingAudioId(isPlaying ? null : audio.id)}
                          className={`h-12 w-12 rounded-xl flex items-center justify-center transition-all shrink-0 ${
                            isPlaying
                              ? "bg-[#d4af37] text-white shadow-md"
                              : "bg-white hover:bg-[#d4af37] text-[#d4af37] hover:text-white border border-gray-200"
                          }`}
                          aria-label={isPlaying ? "Pause audio reel" : "Play audio reel"}
                        >
                          {isPlaying ? (
                            <Volume2 className="w-5 h-5 animate-pulse" />
                          ) : (
                            <Play className="w-5 h-5 ml-0.5" />
                          )}
                        </button>
                        <div>
                          <h4 className="text-base font-bold text-[#111111] leading-snug">
                            {audio.title}
                          </h4>
                          <p className="text-xs text-[#555555] mt-0.5">
                            {audio.description}
                          </p>
                          <div className="flex items-center gap-3 mt-2 text-[11px] text-[#d4af37]">
                            <span className="px-2 py-0.5 rounded-md bg-white border border-gray-200 font-semibold">
                              {audio.category}
                            </span>
                            <span className="flex items-center gap-1 text-[#666666]">
                              <Globe className="w-3 h-3 text-[#d4af37]" /> {audio.language}
                            </span>
                            <span className="flex items-center gap-1 text-[#666666]">
                              <Clock className="w-3 h-3 text-[#d4af37]" /> {audio.duration}
                            </span>
                          </div>
                        </div>
                      </div>

                      {isPlaying && (
                        <div className="px-3 py-1.5 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/20 text-[11px] text-[#d4af37] font-semibold self-start sm:self-center">
                          Playing Demo Audio
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 bg-[#F7F7F5] rounded-2xl border border-gray-200 shadow-xs">
                  <p className="text-[#555555] text-sm">
                    Voice reels and demo audios coming soon.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "video" && (
            <VideoGallery
              videos={artist.videos || []}
              actorName={artist.name}
            />
          )}

          {activeTab === "photos" && (
            <PortfolioGallery
              type="digitals"
              digitals={photoImages}
              actorName={artist.name}
            />
          )}
        </div>
      </section>

      {/* Similar Voice Artists */}
      {similarArtists.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
          <Reveal>
            <div className="flex items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                  More Voice Artists
                </span>
                <h3 className="text-2xl font-bold text-[#111111] tracking-tight mt-1">
                  Similar {artist.categoryLabel}s
                </h3>
              </div>
              <Link
                href={`/voice-artists/${artist.category}/`}
                className="text-xs sm:text-sm font-semibold text-[#d4af37] hover:text-[#c59b27] inline-flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {similarArtists.map((sim) => (
                <Link
                  key={sim.id}
                  href={`/voice-artists/profile/${sim.id}/`}
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
                      {(sim.voiceTexture || sim.voiceTone.join(", ")).split(",")[0]} • {sim.location.split("/")[0].trim()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* Voice Booking CTA */}
      <CTASection
        eyebrow="Voice Casting &amp; Studio Delivery"
        title={`Looking to Cast ${artist.name}?`}
        description="Delhi Casting Agency coordinates custom audition scripts, studio sessions, and broadcast-ready deliverables."
        buttonLabel="Contact Voice Desk"
        buttonHref="/contact/"
      />

      {/* Header Lightbox Modal */}
      <ImageLightbox
        isOpen={headerLightboxOpen}
        images={[{ image: artist.mainImage, title: artist.name }]}
        currentIndex={0}
        onClose={() => setHeaderLightboxOpen(false)}
        onNavigate={() => {}}
      />
    </main>
  );
}
