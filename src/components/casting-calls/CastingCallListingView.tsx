"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { Sparkles, Clapperboard, Film, ShieldCheck, AlertCircle, RefreshCw } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";
import { API_URL } from "@/config/env";
import type { CastingCallItem } from "@/data/casting-calls";
import { CastingCallCard } from "@/components/casting-calls/CastingCallCard";
import { CastingFilters } from "@/components/casting-calls/CastingFilters";
import { CastingDetailModal } from "@/components/casting-calls/CastingDetailModal";
import { CastingApplyModal } from "@/components/casting-calls/CastingApplyModal";

interface CastingCallListingViewProps {
  eyebrow?: string;
  title: string;
  description: string;
  heroBannerImage?: string;
  initialCalls?: CastingCallItem[];
  defaultCategoryFilter?: string;
  breadcrumbs: { label: string; href?: string }[];
}

interface RawBackendCastingCall {
  id: string;
  title: string;
  description: string;
  category?: string | null;
  location?: string | null;
  compensation?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  ageMin?: number | null;
  ageMax?: number | null;
  gender?: string | null;
  requirements?: string | null;
  approvalStatus: string;
  brand?: {
    id?: string;
    email?: string;
    brandProfile?: {
      companyName?: string;
      companyLogo?: string;
    };
  };
}

function mapBackendCastingToUI(call: RawBackendCastingCall): CastingCallItem {
  const ageRange =
    call.ageMin && call.ageMax
      ? `${call.ageMin}-${call.ageMax} Yrs`
      : call.ageMin
      ? `${call.ageMin}+ Yrs`
      : call.ageMax
      ? `Up to ${call.ageMax} Yrs`
      : "All Ages";

  const formattedDeadline = call.endDate
    ? new Date(call.endDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Open Auditions";

  const defaultImages = [
    "/images/actors/female actor model web series.png",
    "/images/actors/male lead actor feature flim actions.png",
    "/images/actors/traditional male actor casting.png",
    "/images/actors/fresh face female actor audition.png",
  ];
  const charCodeSum = (call.id || "").split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const fallbackImage = defaultImages[charCodeSum % defaultImages.length];

  return {
    id: call.id,
    slug: call.id,
    title: call.title,
    category: call.category || "General",
    categorySlug: (call.category || "general").toLowerCase().replace(/\s+/g, "-"),
    productionType: call.brand?.brandProfile?.companyName || "Verified Production",
    location: call.location || "Mumbai, India",
    gender: call.gender || "Any Gender",
    ageRange: ageRange,
    status: call.approvalStatus === "APPROVED" ? "VERIFIED" : "OPEN",
    deadline: formattedDeadline,
    compensation: call.compensation || "Paid Opportunity",
    description: call.description,
    roleDetails: call.description,
    requirements: call.requirements
      ? call.requirements.split("\n").filter((r) => r.trim())
      : ["Verified audition profile required", "Professional attitude"],
    whatToPrepare: [
      "Latest portfolio headshots",
      "Self-tape audition clip",
      "Updated acting resume / CV",
    ],
    image: call.brand?.brandProfile?.companyLogo || fallbackImage,
  };
}

export function CastingCallListingView({
  eyebrow = "Casting Calls",
  title,
  description,
  heroBannerImage = "/media/dca/about/dca-about-hero-01.jpg",
  defaultCategoryFilter = "All",
  breadcrumbs,
}: CastingCallListingViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategoryFilter);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [calls, setCalls] = useState<CastingCallItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedDetailCall, setSelectedDetailCall] = useState<CastingCallItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

  const [selectedApplyCall, setSelectedApplyCall] = useState<CastingCallItem | null>(null);
  const [isApplyOpen, setIsApplyOpen] = useState<boolean>(false);

  const categoriesList = useMemo(() => {
    return [
      "All",
      "Female",
      "Male",
      "Any Gender",
      "Actors",
      "Models",
      "Bollywood Feature Films",
      "OTT Web Series",
      "TV Commercials",
    ];
  }, []);

  const fetchCastingCalls = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();

      if (selectedCategory && selectedCategory !== "All") {
        const genderFilters = ["female", "male", "any gender"];
        if (genderFilters.includes(selectedCategory.toLowerCase())) {
          params.append("gender", selectedCategory);
        } else {
          params.append("category", selectedCategory);
        }
      }

      if (searchQuery.trim()) {
        params.append("search", searchQuery.trim());
      }

      const queryString = params.toString();
      const url = `${API_URL}/api/casting${queryString ? `?${queryString}` : ""}`;

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Failed to load casting calls (HTTP ${res.status})`);
      }

      const data = (await res.json()) as {
        success: boolean;
        message?: string;
        castings?: RawBackendCastingCall[];
      };

      if (data.success && Array.isArray(data.castings)) {
        const mapped = data.castings.map(mapBackendCastingToUI);
        setCalls(mapped);
      } else {
        throw new Error(data.message || "Invalid API response structure");
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Network error. Unable to connect to DCA backend.";
      setError(msg);
      setCalls([]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCastingCalls();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchCastingCalls]);

  const handleOpenDetails = (item: CastingCallItem) => {
    setSelectedDetailCall(item);
    setIsDetailOpen(true);
  };

  const handleOpenApply = (item: CastingCallItem) => {
    setSelectedApplyCall(item);
    setIsApplyOpen(true);
  };

  return (
    <main className="bg-white min-h-screen text-[#111111]">
      {/* Hero Header */}
      <section className="relative isolate overflow-hidden border-b border-gray-200 bg-[#F7F7F5] px-4 sm:px-6 lg:px-8 pb-12 pt-28 sm:pb-16 sm:pt-36">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d4af37] mb-3">
              {eyebrow}
            </p>

            <div className="relative w-full aspect-[21/7] max-h-[260px] sm:max-h-[300px] rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200 shadow-md mb-6 bg-gray-100">
              <Image
                src={heroBannerImage}
                alt={title}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            </div>

            <h1 className="max-w-4xl text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-[#111111]">
              {title}
            </h1>

            <p className="mt-4 max-w-3xl text-base sm:text-lg font-normal leading-relaxed text-[#444444]">
              {description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Breadcrumb Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <Breadcrumb items={breadcrumbs} />
      </div>

      {/* Main Casting Call Listing Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <Reveal>
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#666666] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              Verified Casting Opportunities
            </span>

            <h2 className="mt-3 font-extrabold tracking-tight text-3xl sm:text-4xl text-[#111111]">
              Live Audition Listings
            </h2>

            <p className="mt-3 text-base leading-relaxed text-[#444444]">
              Browse active casting requirements from verified directors, production houses, and DCA casting coordinators.
            </p>
          </div>
        </Reveal>

        {/* Filter Controls */}
        <CastingFilters
          categories={categoriesList}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch py-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-3xl border border-gray-200 bg-white p-6 h-[420px] flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-40 bg-gray-200 rounded-2xl w-full" />
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-16 bg-gray-100 rounded-2xl w-full" />
                  <div className="h-10 bg-gray-100 rounded w-full" />
                </div>
                <div className="h-10 bg-gray-200 rounded-xl w-full mt-4" />
              </div>
            ))}
          </div>
        ) : error ? (
          /* Error State */
          <div className="p-8 sm:p-12 text-center rounded-3xl bg-amber-50/70 border border-amber-200 text-amber-900 my-6 shadow-xs">
            <AlertCircle className="w-12 h-12 text-amber-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-amber-950 mb-2">Unable to Load Casting Calls</h3>
            <p className="text-sm text-amber-800 max-w-md mx-auto mb-5 leading-relaxed">
              {error}
            </p>
            <button
              type="button"
              onClick={() => fetchCastingCalls()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#d4af37] text-white font-semibold text-xs hover:bg-[#c59b27] transition-all shadow-sm"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry Connection</span>
            </button>
          </div>
        ) : calls.length > 0 ? (
          /* Real Approved Casting Call Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {calls.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.05} className="h-full">
                <CastingCallCard
                  item={item}
                  onViewDetails={handleOpenDetails}
                  onApply={handleOpenApply}
                />
              </Reveal>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="p-12 text-center rounded-3xl bg-[#F7F7F5] border border-gray-200 text-[#555555]">
            <Clapperboard className="w-12 h-12 text-[#d4af37] mx-auto mb-3" />
            <h3 className="text-xl font-bold text-[#111111] mb-2">No Approved Casting Calls Found</h3>
            <p className="text-sm text-[#555555] max-w-md mx-auto leading-relaxed">
              There are currently no approved casting calls matching your selected category or search filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-5 px-5 py-2.5 rounded-xl bg-[#d4af37] text-white font-semibold text-xs hover:bg-[#c59b27] transition-all shadow-sm"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </section>

      {/* Casting Process Highlights */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 sm:p-8 bg-[#F7F7F5] border border-gray-200 rounded-3xl shadow-xs">
            <div className="flex items-start gap-4 p-4">
              <div className="p-3 rounded-2xl bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20 flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[#111111] text-base sm:text-lg">
                  100% Verified Casting Calls
                </h3>
                <p className="text-[#555555] text-xs sm:text-sm mt-1 leading-relaxed">
                  Every casting brief is vetted by DCA coordinators to prevent scams and protect talent safety.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 md:border-x border-gray-200">
              <div className="p-3 rounded-2xl bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20 flex-shrink-0">
                <Film className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[#111111] text-base sm:text-lg">
                  Direct Production Access
                </h3>
                <p className="text-[#555555] text-xs sm:text-sm mt-1 leading-relaxed">
                  Direct audition submission links forwarded to casting directors in Bollywood, OTT, and TV.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4">
              <div className="p-3 rounded-2xl bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20 flex-shrink-0">
                <Clapperboard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[#111111] text-base sm:text-lg">
                  Structured Audition Briefs
                </h3>
                <p className="text-[#555555] text-xs sm:text-sm mt-1 leading-relaxed">
                  Clear specifications for age, gender, script preparation, and self-tape formatting.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Global CTA */}
      <CTASection
        eyebrow="Find Your Opportunity"
        title="Ready to apply for casting calls?"
        description="Create your DCA talent profile and submit your portfolio to verified directors."
        buttonLabel="Register Now"
        buttonHref="/profile/setup"
      />

      {/* Modals */}
      <CastingDetailModal
        item={selectedDetailCall}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onApply={(item) => {
          setSelectedApplyCall(item);
          setIsApplyOpen(true);
        }}
      />

      <CastingApplyModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        castingTitle={selectedApplyCall?.title}
        castingCategory={selectedApplyCall?.category}
        castingCallId={selectedApplyCall?.id}
      />
    </main>
  );
}
