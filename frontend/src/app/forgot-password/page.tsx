"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/config/env";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pl-11 text-xs sm:text-sm text-[#111111] placeholder:text-gray-400 transition-all duration-300 focus:border-[#D4AF37] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 shadow-2xs";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        setMessage(
          data.message ||
            "If an account with that email exists, a secure password reset link has been sent. Please check your inbox."
        );
      } else {
        setError(data.message || "Unable to send reset email. Please try again later.");
      }
    } catch (err) {
      console.error("Forgot password request error:", err);
      setError("Unable to connect to backend server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      {/* Header Banner */}
      <section className="relative isolate overflow-hidden border-b border-gray-200 bg-[#F7F7F5] px-4 pt-28 pb-4 sm:pt-32 sm:pb-6 text-center">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              ACCOUNT RECOVERY
            </span>
            <h1 className="mt-1 font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#111111]">
              Forgot Your Password?
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[#555555] max-w-xl mx-auto leading-relaxed">
              Enter your registered email address and we&apos;ll send you a secure link to reset your password.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-xl px-4 py-2 text-center flex justify-center">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Login", href: "/login" },
            { label: "Forgot Password" },
          ]}
        />
      </div>

      {/* Card Section */}
      <section className="mx-auto max-w-xl px-4 pb-12 pt-2">
        <Reveal>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
            {submitted ? (
              <div className="space-y-5 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={26} />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#111111]">Check Your Email</h3>
                  <p className="mt-2 text-xs text-[#555555] leading-relaxed">
                    {message}
                  </p>
                  <p className="mt-1 text-[11px] text-[#888888]">
                    Be sure to check your spam or promotions folder if you don&apos;t see the email within a few minutes.
                  </p>
                </div>
                <div className="pt-2">
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#111111] hover:bg-[#222222] text-white rounded-xl transition-all shadow-xs"
                  >
                    <ArrowLeft size={16} />
                    <span>Back to Login</span>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-center text-xs font-semibold text-red-600">
                    {error}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#111111]"
                  >
                    Registered Email Address
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                      <Mail size={16} />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full justify-center py-3.5 text-xs sm:text-sm font-bold uppercase tracking-[0.16em] bg-[#D4AF37] hover:bg-[#c59b27] text-white transition-all shadow-xs"
                >
                  {loading ? (
                    "Sending Reset Link..."
                  ) : (
                    <>
                      <span>Send Password Reset Link</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <div className="mt-4 text-center">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#555555] hover:text-[#111111] transition-colors"
                  >
                    <ArrowLeft size={14} />
                    <span>Remember your password? Log in</span>
                  </Link>
                </div>
              </form>
            )}

            {/* Security Guarantee */}
            <div className="mt-6 flex items-center justify-center gap-1.5 border-t border-gray-100 pt-4 text-center text-[11px] font-medium text-[#666666]">
              <ShieldCheck size={14} className="text-[#D4AF37]" />
              <span>Cryptographically Secured Single-Use Token</span>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
