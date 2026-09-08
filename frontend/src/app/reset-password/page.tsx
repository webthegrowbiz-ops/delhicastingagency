"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/config/env";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pl-11 text-xs sm:text-sm text-[#111111] placeholder:text-gray-400 transition-all duration-300 focus:border-[#D4AF37] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 shadow-2xs";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenFromUrl = searchParams.get("token") || "";

  const [token, setToken] = useState(tokenFromUrl);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token.trim()) {
      setError("Password reset token is missing. Please use the link sent to your email.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token.trim(),
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
      } else {
        setError(data.message || "Failed to reset password. The link may be expired or already used.");
      }
    } catch (err) {
      console.error("Reset password error:", err);
      setError("Unable to connect to backend server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="space-y-5 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 size={32} />
        </div>
        <div>
          <h3 className="font-serif text-xl font-bold text-[#111111]">Password Reset Complete</h3>
          <p className="mt-2 text-xs sm:text-sm text-[#555555] leading-relaxed">
            Your new password has been set securely. All previous active sessions have been safely logged out.
          </p>
        </div>
        <div className="pt-2">
          <Button
            onClick={() => router.push("/login")}
            className="w-full justify-center py-3.5 text-xs sm:text-sm font-bold uppercase tracking-[0.16em] bg-[#D4AF37] hover:bg-[#c59b27] text-white transition-all shadow-xs"
          >
            <span>Login With New Password</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleReset} className="space-y-4">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-center text-xs font-semibold text-red-600">
          {error}
        </div>
      )}

      {/* Manual Token input if token was not in URL */}
      {!tokenFromUrl && (
        <div>
          <label
            htmlFor="token"
            className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#111111]"
          >
            Reset Code / Token
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
              <ShieldCheck size={16} />
            </div>
            <input
              id="token"
              name="token"
              type="text"
              required
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste the reset code from your email"
              className={inputClass}
            />
          </div>
        </div>
      )}

      <div>
        <label
          htmlFor="newPassword"
          className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#111111]"
        >
          New Password
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
            <Lock size={16} />
          </div>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="At least 8 characters"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#111111]"
        >
          Confirm New Password
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
            <Lock size={16} />
          </div>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter new password"
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
          "Updating Password..."
        ) : (
          <>
            <span>Set New Password</span>
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
          <span>Back to Login</span>
        </Link>
      </div>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen bg-white text-[#111111]">
      {/* Header Banner */}
      <section className="relative isolate overflow-hidden border-b border-gray-200 bg-[#F7F7F5] px-4 pt-28 pb-4 sm:pt-32 sm:pb-6 text-center">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              SECURITY VERIFICATION
            </span>
            <h1 className="mt-1 font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#111111]">
              Set New Password
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[#555555] max-w-xl mx-auto leading-relaxed">
              Choose a strong, unique password to secure your Delhi Casting Agency account.
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
            { label: "Reset Password" },
          ]}
        />
      </div>

      {/* Card Section */}
      <section className="mx-auto max-w-xl px-4 pb-12 pt-2">
        <Reveal>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
            <Suspense fallback={<div className="p-8 text-center text-xs text-gray-500">Loading form...</div>}>
              <ResetPasswordForm />
            </Suspense>

            {/* Security Guarantee */}
            <div className="mt-6 flex items-center justify-center gap-1.5 border-t border-gray-100 pt-4 text-center text-[11px] font-medium text-[#666666]">
              <ShieldCheck size={14} className="text-[#D4AF37]" />
              <span>Bcrypt 12-Rounds Hashing &amp; Instant Session Invalidation</span>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
