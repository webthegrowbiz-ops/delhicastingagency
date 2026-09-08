"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  User,
} from "lucide-react";

import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { setDCAUserSession, getUserSession, getAuthToken } from "@/lib/auth";
import { API_URL } from "@/config/env";

const inputClass =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-[#111111] placeholder:text-gray-400 transition-all duration-300 focus:border-[#D4AF37] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/15 shadow-xs";

const selectClass =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-[#111111] transition-all duration-300 focus:border-[#D4AF37] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/15 shadow-xs";

export default function BrandRegisterPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    companyName: "",
    designation: "",
    category: "Production House",
    city: "New Delhi",
    state: "Delhi NCR",
    website: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const normalizedEmail = (formData.email || "").trim().toLowerCase();
    if (!normalizedEmail) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!formData.fullName.trim()) {
      setErrorMessage("Please enter the contact person's full name.");
      return;
    }

    if (!formData.companyName.trim()) {
      setErrorMessage("Please enter your company or casting name.");
      return;
    }

    const session = getUserSession();
    const existingToken = getAuthToken();

    let token = existingToken;
    let userId = session?.id;

    // If not authenticated as this brand user, register with the user's chosen password
    const isMatchingSession =
      Boolean(session?.isLoggedIn) &&
      (session?.role?.toLowerCase() === "brand") &&
      (session?.email?.toLowerCase() === normalizedEmail || session?.identifier?.toLowerCase() === normalizedEmail);

    if (!token || !isMatchingSession) {
      if (!formData.password || formData.password.length < 8) {
        setErrorMessage("Please enter a secure password with at least 8 characters.");
        return;
      }

      setSubmitting(true);

      try {
        const regRes = await fetch(`${API_URL}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: normalizedEmail,
            password: formData.password,
            role: "BRAND",
            fullName: formData.fullName.trim(),
            phone: formData.phone.trim() || undefined,
          }),
        });

        const regData = await regRes.json();

        // STRICT SECURITY: On collision, HALT immediately. Never auto-login, never overwrite.
        if (regRes.status === 409) {
          setErrorMessage(
            regData.message ||
              "This email is already registered. Please log in or use a different email address."
          );
          setSubmitting(false);
          return;
        }

        if (!regRes.ok || !regData.success || !regData.token) {
          setErrorMessage(regData.message || "Registration failed. Please check your information.");
          setSubmitting(false);
          return;
        }

        token = regData.token;
        userId = regData.user?.id;
        setDCAUserSession(normalizedEmail, "brand", true, token, userId);
      } catch (err) {
        console.error("Brand registration network error:", err);
        setErrorMessage("Network error during registration. Please try again.");
        setSubmitting(false);
        return;
      }
    } else {
      setSubmitting(true);
    }

    // Persist BrandProfile directly to backend
    if (token) {
      try {
        const profileRes = await fetch(`${API_URL}/api/brand/profile`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            companyName: formData.companyName.trim(),
            contactName: formData.fullName.trim(),
            phone: formData.phone.trim() || null,
            email: normalizedEmail,
            website: formData.website.trim() || null,
            city: formData.city.trim() || null,
            state: formData.state.trim() || null,
            companyDescription: formData.description.trim() || null,
          }),
        });

        const profileData = await profileRes.json();
        if (!profileRes.ok || !profileData.success) {
          setErrorMessage(profileData.message || "Failed to save brand profile. Please check your details.");
          setSubmitting(false);
          return;
        }
      } catch (err) {
        console.error("Failed to persist brand profile to backend:", err);
        setErrorMessage("Network error while saving profile. Please try again.");
        setSubmitting(false);
        return;
      }
    } else {
      setErrorMessage("Authentication required. Please log in.");
      setSubmitting(false);
      return;
    }

    setDCAUserSession(normalizedEmail, "brand", true, token, userId);

    try {
      localStorage.setItem(
        "dca_brand_profile",
        JSON.stringify({
          formData: { ...formData, password: "" },
          savedAt: new Date().toISOString(),
          completionPercentage: 90,
        })
      );
    } catch {
      // Ignore localStorage errors
    }

    setSubmitting(false);
    setSaved(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 500);
  };

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <PageHero
        eyebrow="Brand &amp; Casting Setup"
        title="Create Your Casting Profile"
        description="Register your company, brand or casting agency to source verified talent and post casting requirements."
      />

      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Register", href: "/profile/setup" },
            { label: "Brand & Casting Profile" },
          ]}
        />
      </div>

      <section className="mx-auto max-w-5xl px-6 py-8 lg:px-8 lg:py-12">
        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-8">
          {errorMessage && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700 shadow-xs">
              {errorMessage}
            </div>
          )}

          {/* SECTION 1 — CONTACT PERSON & ACCOUNT */}
          <Reveal>
            <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-md md:p-10">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                  <User size={20} />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                    SECTION 1
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-[#111111]">
                    Account Contact Person
                  </h2>
                </div>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Full Name */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#111111]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Rajesh Malhotra"
                    className={inputClass}
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#111111]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="brand_register_email"
                    name="email"
                    autoComplete="off"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. rajesh@productionhouse.com"
                    className={inputClass}
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#111111]">
                    Account Password *
                  </label>
                  <input
                    type="password"
                    id="brand_register_password"
                    name="password"
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min 8 characters"
                    className={inputClass}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#111111]">
                    Mobile / Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </Reveal>

          {/* SECTION 2 — COMPANY / ORGANIZATION DETAILS */}
          <Reveal delay={0.05}>
            <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-md md:p-10">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                  <Building2 size={20} />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                    SECTION 2
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-[#111111]">
                    Company &amp; Organization Details
                  </h2>
                </div>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {/* Company Name */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#111111]">
                    Company / Production Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g. Apex Film Studios"
                    className={inputClass}
                  />
                </div>

                {/* Designation */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#111111]">
                    Your Role / Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="e.g. Lead Casting Director"
                    className={inputClass}
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#111111]">
                    Organization Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="Production House">Production House</option>
                    <option value="Casting Director">Casting Director</option>
                    <option value="Brand / Agency">Brand / Commercial Agency</option>
                    <option value="Modeling Agency">Modeling Agency</option>
                    <option value="OTT / Web Series Team">OTT / Web Series Team</option>
                    <option value="Other">Other Talent Recruiter</option>
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#111111]">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="New Delhi"
                    className={inputClass}
                  />
                </div>

                {/* State */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#111111]">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Delhi NCR"
                    className={inputClass}
                  />
                </div>

                {/* Website */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#111111]">
                    Website / Social Link
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://company.com"
                    className={inputClass}
                  />
                </div>

                {/* Company Description */}
                <div className="md:col-span-3">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#111111]">
                    About Company / Casting Overview
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Briefly describe your production projects, casting requirements or talent preferences..."
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 border-t border-gray-200 pt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.push("/")}
              className="border border-gray-200 text-[#111111] hover:bg-gray-100"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={submitting}
              className="py-4 px-8 text-sm font-bold uppercase tracking-wider bg-[#111111] hover:bg-[#D4AF37] text-white"
            >
              {saved ? (
                <>
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Account Created!
                </>
              ) : submitting ? (
                "Processing..."
              ) : (
                <>
                  <span>Create Casting Account</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}
