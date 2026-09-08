"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  UserCheck,
  Briefcase,
  HelpCircle,
} from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { getProfileCreateOrSetupUrl } from "@/lib/auth";
import { OFFICIAL_DCA_INSTAGRAM_URL, OFFICIAL_DCA_LINKEDIN_URL } from "@/data/media";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const labelClass =
  "mb-2.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#111111] sm:text-[13px]";

const inputClass =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-sm font-semibold text-[#111111] placeholder:text-gray-400 transition-all duration-300 focus:border-[#D4AF37] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/15 shadow-xs";

const selectClass =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-sm font-semibold text-[#111111] transition-all duration-300 focus:border-[#D4AF37] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/15 shadow-xs";

export default function ContactUsPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const mobile = formData.get("mobile") as string;
    const role = formData.get("role") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    if (!fullName || !email || !mobile || !role || !subject || !message) {
      setError("Please fill in all required fields before submitting your enquiry.");
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      
      {/* HERO / INTRO SECTION */}
      <section className="relative isolate overflow-hidden border-b border-gray-200 bg-[#F7F7F5] px-6 pb-16 pt-28 sm:pb-20 sm:pt-36">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              <Sparkles size={14} />
              <span>CONTACT DELHI CASTING AGENCY</span>
            </div>

            <h1 className="font-serif text-3xl font-extrabold tracking-tight text-[#111111] sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
              Let&apos;s Connect
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base font-normal leading-relaxed text-[#444444] sm:text-lg">
              Have a casting requirement, want to join as an artist, or have a question about Delhi Casting Agency? Send us a message and our team can get back to you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="mx-auto max-w-6xl px-6 py-6">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} />
      </div>

      {/* ENQUIRY SECTION & CONTACT PURPOSE BLOCKS */}
      <section className="mx-auto max-w-6xl px-6 py-10 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          
          {/* ENQUIRY FORM LEFT/MAIN */}
          <Reveal>
            <div className="rounded-3xl border border-gray-200 bg-white p-8 md:p-12 shadow-md">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                SEND AN ENQUIRY
              </span>

              <h2 className="mt-3 font-serif text-2xl font-bold tracking-tight text-[#111111] sm:text-3xl">
                How Can We Help?
              </h2>

              {error && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-600">
                  {error}
                </div>
              )}

              {submitted ? (
                <div className="mt-8 rounded-2xl border border-gray-200 bg-[#F7F7F5] p-8 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-[#D4AF37]" />
                  <h3 className="mt-4 font-serif text-xl font-bold text-[#111111]">
                    Enquiry Submitted Successfully
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#555555]">
                    Thank you for contacting Delhi Casting Agency. Our representative will review your enquiry and get back to you shortly.
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    className="mt-6 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className={labelClass}>
                      <span>Full Name</span>
                      <span className="text-[#D4AF37] font-bold">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      placeholder="Enter your full name"
                      className={inputClass}
                    />
                  </div>

                  {/* Email & Mobile Grid */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        <span>Email Address</span>
                        <span className="text-[#D4AF37] font-bold">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="mobile" className={labelClass}>
                        <span>Mobile Number</span>
                        <span className="text-[#D4AF37] font-bold">*</span>
                      </label>
                      <input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        required
                        placeholder="10-digit mobile number"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* I Am Role Selection */}
                  <div>
                    <label htmlFor="role" className={labelClass}>
                      <span>I am</span>
                      <span className="text-[#D4AF37] font-bold">*</span>
                    </label>
                    <select
                      id="role"
                      name="role"
                      required
                      defaultValue=""
                      className={selectClass}
                    >
                      <option value="" disabled>
                        Select your profile / role
                      </option>
                      <option value="Actor">Actor</option>
                      <option value="Model">Model</option>
                      <option value="Casting Director">Casting Director</option>
                      <option value="Production House">Production House</option>
                      <option value="Modeling Agency">Modeling Agency</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className={labelClass}>
                      <span>Subject</span>
                      <span className="text-[#D4AF37] font-bold">*</span>
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="e.g. Artist Profile Registration Enquiry"
                      className={inputClass}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className={labelClass}>
                      <span>Message</span>
                      <span className="text-[#D4AF37] font-bold">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Write your message or casting enquiry details..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group flex w-full items-center justify-center gap-2 rounded-full border border-[#D4AF37] bg-[#D4AF37] py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-[#C59B27] disabled:opacity-50 shadow-md"
                  >
                    {submitting ? (
                      <span>Submitting Enquiry...</span>
                    ) : (
                      <>
                        <span>Send Enquiry</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                </form>
              )}
            </div>
          </Reveal>

          {/* CONTACT PURPOSE BLOCKS RIGHT */}
          <div className="space-y-6">
            
            {/* FOR ARTISTS */}
            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                    <UserCheck size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                      FOR ARTISTS
                    </span>
                    <h3 className="mt-0.5 text-base font-bold text-[#111111]">
                      Artist Registration &amp; Profiles
                    </h3>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[#555555]">
                  Looking for casting opportunities or need help with your artist profile? Send us your enquiry or setup your casting profile online.
                </p>
              </div>
            </Reveal>

            {/* FOR CASTING PROFESSIONALS */}
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                      FOR CASTING PROFESSIONALS
                    </span>
                    <h3 className="mt-0.5 text-base font-bold text-[#111111]">
                      Talent Sourcing &amp; Project Placement
                    </h3>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[#555555]">
                  Looking for actors, models or other talent for your project? Connect with our casting desk to review verified talent rosters.
                </p>
              </div>
            </Reveal>

            {/* GENERAL ENQUIRIES */}
            <Reveal delay={0.15}>
              <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                    <HelpCircle size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                      GENERAL ENQUIRIES
                    </span>
                    <h3 className="mt-0.5 text-base font-bold text-[#111111]">
                      Platform &amp; General Questions
                    </h3>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[#555555]">
                  Have a question about Delhi Casting Agency? Send us your enquiry and our support team will respond promptly.
                </p>
              </div>
            </Reveal>

            {/* VERIFIED CONTACT CHANNELS */}
            <Reveal delay={0.2}>
              <div className="rounded-3xl border border-gray-200 bg-[#F7F7F5] p-7 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                  OFFICIAL CONTACT CHANNELS
                </span>

                <div className="mt-4 space-y-3.5 text-xs text-[#333333] font-medium">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                    <span>+91 7074545456</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                    <span>klmn@gmail.com</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                    <span>Delhi NCR / Serving Talent Across India</span>
                  </div>
                </div>

                <div className="mt-5 border-t border-gray-200 pt-4 flex flex-col gap-2 text-xs text-[#555555]">
                  <a
                    href={OFFICIAL_DCA_INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-[#D4AF37] transition-colors font-medium"
                  >
                    <InstagramIcon className="h-4 w-4 text-[#D4AF37]" />
                    <span>Instagram: @delhicastingagency</span>
                  </a>
                  <a
                    href={OFFICIAL_DCA_LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-[#D4AF37] transition-colors font-medium"
                  >
                    <LinkedinIcon className="h-4 w-4 text-[#D4AF37]" />
                    <span>LinkedIn: Delhi Casting Agency</span>
                  </a>
                </div>
              </div>
            </Reveal>

          </div>

        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-[#F7F7F5] p-8 md:p-14 text-center shadow-md">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              JOIN DELHICASTINGAGENCY
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#111111] sm:text-5xl">
              Looking for Casting Opportunities?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#444444] sm:text-lg">
              Create your artist profile and explore relevant casting opportunities.
            </p>

            <div className="mt-8 flex justify-center">
              <Link
                href={getProfileCreateOrSetupUrl()}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-[#C59B27] shadow-md"
              >
                <span>Create Your Profile</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

    </main>
  );
}
