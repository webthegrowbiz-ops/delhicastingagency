"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ArrowRight,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { API_URL } from "@/config/env";
import {
  getProfileCreateOrSetupUrl,
  isUserAuthenticated,
  getUserProfileStatus,
  getAuthToken,
} from "@/lib/auth";

interface CastingApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  castingTitle?: string;
  castingCategory?: string;
  castingCallId?: string;
}

const CASTING_PHOTOS = [
  { src: "/media/dca/actors/dca-actor-female-01.jpg", alt: "Actor Audition" },
  { src: "/media/dca/actors/dca-actor-male-01.jpg", alt: "Screen Test" },
  { src: "/media/dca/casting-calls/dca-casting-commercial-01.jpg", alt: "Commercial Shoot" },
  { src: "/media/dca/models/dca-model-fashion-01.jpg", alt: "Fashion Runway" },
];

export function CastingApplyModal({
  isOpen,
  onClose,
  castingTitle,
  castingCategory = "Casting Call",
  castingCallId,
}: CastingApplyModalProps) {
  const [applied, setApplied] = useState(false);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileStatus, setProfileStatus] = useState<string>("DRAFT");

  // Form & API state
  const [message, setMessage] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    requestAnimationFrame(() => {
      setApplied(false);
      setIsAlreadyApplied(false);
      setMessage("");
      setPortfolioUrl("");
      setSubmitting(false);
      setApiError(null);

      const authed = isUserAuthenticated();
      setIsAuthenticated(authed);
      if (authed) {
        setProfileStatus(getUserProfileStatus());
      }
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isPending = isAuthenticated && profileStatus === "PENDING_REVIEW";
  const isApproved = isAuthenticated && (profileStatus === "APPROVED" || !profileStatus);
  const isNeedsUpdate =
    isAuthenticated &&
    (profileStatus === "REJECTED" ||
      profileStatus === "SUSPENDED" ||
      profileStatus === "DRAFT");

  const handleSubmitApplication = async () => {
    if (!castingCallId) {
      setApiError("Casting Call ID is missing. Please select a valid casting call.");
      return;
    }

    const token = getAuthToken();
    if (!token) {
      setApiError("Authentication session expired. Please log in again.");
      return;
    }

    try {
      setSubmitting(true);
      setApiError(null);

      const payload: {
        castingCallId: string;
        message?: string;
        portfolioUrl?: string;
      } = {
        castingCallId: castingCallId.trim(),
      };

      if (message.trim()) {
        payload.message = message.trim();
      }

      if (portfolioUrl.trim()) {
        payload.portfolioUrl = portfolioUrl.trim();
      }

      const res = await fetch(`${API_URL}/api/applications`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as {
        success: boolean;
        message?: string;
      };

      if (res.status === 201) {
        setApplied(true);
        setApiError(null);
      } else if (res.status === 409) {
        setIsAlreadyApplied(true);
        setApiError(
          data.message || "You have already applied for this casting call."
        );
      } else if (res.status === 401) {
        setApiError("Session expired. Please log in again to apply.");
      } else if (res.status === 403) {
        setApiError(
          data.message ||
            "Only verified artists with APPROVED profile status can submit casting applications."
        );
      } else if (res.status === 404) {
        setApiError(data.message || "Casting call not found.");
      } else {
        setApiError(
          data.message || "Unable to submit application. Please try again."
        );
      }
    } catch (err: unknown) {
      console.error("Submit application error:", err);
      setApiError(
        "Network error. Unable to connect to server. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="casting-modal-title"
      aria-describedby="casting-modal-desc"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[500px] bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Understated Close Button (×) */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close"
          className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 rounded-full text-gray-400 hover:text-[#111111] hover:bg-gray-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 4 Production Photos Collage */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3 mb-5 pt-1">
          {CASTING_PHOTOS.map((img, idx) => (
            <div
              key={idx}
              className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-xs group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                unoptimized
                sizes="(max-width: 640px) 20vw, 100px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
            </div>
          ))}
        </div>

        {/* Badge */}
        <div className="mx-auto mb-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs font-semibold text-[#d4af37]">
          {isPending ? (
            <Clock className="w-3.5 h-3.5 text-amber-600" />
          ) : (
            <ShieldCheck className="w-3.5 h-3.5" />
          )}
          <span>
            {isPending
              ? "Profile Approval Required"
              : "DCA Verified Casting Access"}
          </span>
        </div>

        {/* Heading */}
        <h3
          id="casting-modal-title"
          className="font-serif text-2xl sm:text-[26px] font-bold text-[#111111] tracking-tight leading-snug mb-2"
        >
          {applied
            ? "Application Submitted!"
            : isAlreadyApplied
            ? "Already Applied"
            : isPending
            ? "Profile Pending Review"
            : isAuthenticated
            ? "Apply for Casting Call"
            : "Register to Apply"}
        </h3>

        {/* Value Proposition & Description */}
        {applied ? (
          <div className="mb-6 space-y-2">
            <p className="text-sm sm:text-base text-emerald-700 font-semibold leading-relaxed max-w-sm mx-auto">
              Your application has been sent to the casting team.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
              <span>Status: PENDING</span>
            </div>
          </div>
        ) : isAlreadyApplied ? (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50/90 p-4 text-xs text-amber-950 leading-relaxed text-left">
            <p className="font-bold mb-1 text-amber-900">
              You have already applied for this casting call.
            </p>
            Your audition profile and comp card are currently under review by
            the director. You can check your application status in your artist
            dashboard.
          </div>
        ) : isPending ? (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-900 leading-relaxed text-left">
            <p className="font-bold mb-1 text-amber-800">
              Your profile is currently under review by our admin team.
            </p>
            Per DCA platform rules, artist profiles must receive admin approval
            before submitting casting applications. Application access will
            activate automatically upon approval.
          </div>
        ) : isNeedsUpdate ? (
          <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50/80 p-4 text-xs text-rose-900 leading-relaxed text-left">
            <p className="font-bold mb-1 text-rose-800">
              Profile completion or resubmission required.
            </p>
            Please update your profile details and portfolio photos as requested
            to submit for admin approval.
          </div>
        ) : (
          <>
            <p className="text-sm sm:text-base text-[#444444] font-medium leading-relaxed mb-2 max-w-sm mx-auto">
              {castingTitle ? (
                <>
                  Apply for{" "}
                  <span className="text-[#d4af37] font-semibold">
                    {castingTitle}
                  </span>{" "}
                  with your verified DCA profile.
                </>
              ) : (
                `Create your DCA profile to apply for verified ${castingCategory} opportunities.`
              )}
            </p>

            <p
              id="casting-modal-desc"
              className="text-xs sm:text-sm text-[#666666] leading-relaxed mb-4 max-w-sm mx-auto"
            >
              Submit your audition details to production directors and track your status in your dashboard.
            </p>
          </>
        )}

        {/* API Error Alert Banner */}
        {apiError && !isAlreadyApplied && (
          <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs text-left flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span className="leading-snug">{apiError}</span>
          </div>
        )}

        {/* Form Inputs for Approved Authenticated Artists */}
        {isApproved && !applied && !isAlreadyApplied && (
          <div className="space-y-3 mb-5 text-left">
            <div>
              <label
                htmlFor="audition-message"
                className="block text-xs font-semibold text-[#444444] mb-1"
              >
                Audition Message (Optional)
              </label>
              <textarea
                id="audition-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Introduce yourself or share relevant acting experience..."
                rows={2}
                maxLength={2000}
                disabled={submitting}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-[#111111] placeholder:text-gray-400 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] resize-none"
              />
            </div>

            <div>
              <label
                htmlFor="portfolio-url"
                className="block text-xs font-semibold text-[#444444] mb-1"
              >
                Portfolio / Showreel URL (Optional)
              </label>
              <input
                id="portfolio-url"
                type="url"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                placeholder="https://example.com/showreel"
                disabled={submitting}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-[#111111] placeholder:text-gray-400 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
              />
            </div>
          </div>
        )}

        {/* Actions Stack */}
        <div className="flex flex-col items-center gap-3 w-full">
          {applied ? (
            <button
              onClick={onClose}
              type="button"
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all duration-200 shadow-md"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Done</span>
            </button>
          ) : isAlreadyApplied ? (
            <Link
              href="/dashboard"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-[#d4af37] hover:bg-[#c59b27] text-white font-semibold text-sm transition-all duration-200 shadow-md"
            >
              <span>View Application Status in Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : isPending ? (
            <Link
              href="/dashboard"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-[#d4af37] hover:bg-[#c59b27] text-white font-semibold text-sm transition-all duration-200 shadow-md"
            >
              <span>View Profile Status in Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : isApproved ? (
            <button
              type="button"
              disabled={submitting}
              onClick={handleSubmitApplication}
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-[#d4af37] hover:bg-[#c59b27] text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Audition Profile...</span>
                </>
              ) : (
                <>
                  <span>Submit Audition Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          ) : isNeedsUpdate ? (
            <Link
              href="/profile/setup"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-[#d4af37] hover:bg-[#c59b27] text-white font-semibold text-sm transition-all duration-200 shadow-md"
            >
              <span>Update Profile &amp; Resubmit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              href={getProfileCreateOrSetupUrl()}
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-[#d4af37] hover:bg-[#c59b27] text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <span>Create Your Profile</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}

          <button
            onClick={onClose}
            type="button"
            className="text-xs sm:text-sm text-[#666666] hover:text-[#111111] transition-colors py-1 font-medium"
          >
            {applied ? "Close" : "Not now"}
          </button>
        </div>
      </div>
    </div>
  );
}
