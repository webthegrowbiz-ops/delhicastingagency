"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, User, LayoutDashboard, Edit3, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export default function RegistrationSuccessPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profileData, setProfileData] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("artist-registration-complete") || localStorage.getItem("dca_artist_profile");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          requestAnimationFrame(() => {
            setProfileData(parsed.formData || parsed);
          });
        } catch (e) {
          console.error("Error reading saved profile data", e);
        }
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      {/* Header Banner */}
      <section className="relative isolate border-b border-gray-200 bg-[#F7F7F5] px-4 pt-28 pb-6 sm:pt-32 sm:pb-8 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="flex justify-center mb-3">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Register", href: "/profile/setup" },
                { label: "Success" },
              ]}
            />
          </div>
          <Reveal>
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200 shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5" />
              PROFILE CREATED SUCCESSFULLY
            </span>
            <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
              Welcome to Delhi Casting Agency
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#555555] max-w-xl mx-auto leading-relaxed">
              Your DCA artist profile has been submitted and verified. You can now access your dashboard, view casting calls, and manage your portfolio.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Success Content */}
      <section className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
        <Reveal>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs text-center">
            {profileData && (
              <div className="mb-6 rounded-xl border border-gray-200 bg-[#F7F7F5] p-4 text-left">
                <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-3">
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#111111]">{profileData.fullName || profileData.name || "Artist Profile"}</h3>
                    <p className="text-xs text-[#666666]">{profileData.city || "Delhi NCR"} • {profileData.gender || "Artist"}</p>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Active &amp; Verified
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#555555]">
                  <div><span className="font-semibold text-[#111111]">Mobile:</span> {profileData.mobile || profileData.phone || "Verified"}</div>
                  <div><span className="font-semibold text-[#111111]">Email:</span> {profileData.email || "Verified"}</div>
                  <div><span className="font-semibold text-[#111111]">Category:</span> {profileData.primaryCategory || "Actor / Talent"}</div>
                  <div><span className="font-semibold text-[#111111]">Photos Uploaded:</span> {profileData.photos?.length || 4} photos</div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
              <Link
                href="/profile/setup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#111111] hover:bg-[#D4AF37] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                <User className="w-4 h-4" />
                <span>View Full Profile</span>
              </Link>

              <Link
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#F7F7F5] hover:bg-gray-100 text-[#111111] border border-gray-200 font-bold text-xs uppercase tracking-wider transition-all shadow-xs"
              >
                <LayoutDashboard className="w-4 h-4 text-[#D4AF37]" />
                <span>Go to Dashboard</span>
              </Link>

              <Link
                href="/profile/setup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-gray-50 text-[#555555] border border-gray-200 font-semibold text-xs transition-all shadow-2xs"
              >
                <Edit3 className="w-4 h-4 text-[#D4AF37]" />
                <span>Edit Profile</span>
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-center gap-2 text-xs text-[#666666]">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>DCA Artist Membership &amp; Verification Active</span>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
