"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, Lock, Mail, ShieldCheck, Sparkles, Key, QrCode, Copy, Check } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { setDCAUserSession } from "@/lib/auth";
import { API_URL } from "@/config/env";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pl-11 text-xs sm:text-sm text-[#111111] placeholder:text-gray-400 transition-all duration-300 focus:border-[#D4AF37] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 shadow-2xs";

type AppRole = "artist" | "brand" | "admin" | "ARTIST" | "BRAND" | "ADMIN";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // MFA State Management
  const [mfaStep, setMfaStep] = useState<"NONE" | "SETUP" | "VERIFY" | "BACKUP_CODES">("NONE");
  const [mfaToken, setMfaToken] = useState("");
  const [manualKey, setManualKey] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [copiedCodes, setCopiedCodes] = useState(false);
  const [pendingUserSession, setPendingUserSession] = useState<{ email: string; role: AppRole; token: string; id: string } | null>(null);

  const isRegistered = searchParams.get("registered") === "true";
  const success = isRegistered
    ? "Account created successfully! Please log in with your email and password."
    : "";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!identifier.trim() || !password) {
      setError("Please enter your Email Address / Mobile Number and Password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: identifier.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Invalid email or password. Please try again.");
        setLoading(false);
        return;
      }

      // Handle Admin MFA Challenge
      if (data.mfaRequired) {
        setMfaToken(data.mfaToken);
        setLoading(false);

        if (data.mfaSetupRequired || !data.mfaEnrolled) {
          // Fetch MFA Secret & setup details
          const setupRes = await fetch(`${API_URL}/api/auth/mfa/setup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mfaToken: data.mfaToken }),
          });
          const setupData = await setupRes.json();

          if (setupRes.ok && setupData.success) {
            setManualKey(setupData.manualKey);
            setMfaStep("SETUP");
          } else {
            setError(setupData.message || "Failed to initialize MFA setup.");
          }
        } else {
          setMfaStep("VERIFY");
        }
        return;
      }

      // Store user session & JWT token for Artist / Brand
      setDCAUserSession(
        data.user.email,
        data.user.role as AppRole,
        false,
        data.token,
        data.user.id
      );

      setLoading(false);

      if (data.user.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else if (data.user.role === "BRAND" || data.user.role === "brand") {
        router.push("/dashboard");
      } else {
        router.push("/profile/setup");
      }
    } catch (err: unknown) {
      console.error("Login request error:", err);
      setError("Unable to connect to backend server. Please make sure the server is running.");
      setLoading(false);
    }
  };

  const handleMfaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!mfaCode.trim()) {
      setError("Please enter your 6-digit Authenticator Code or Backup Code.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/mfa/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mfaToken,
          code: mfaCode.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Invalid verification code. Please try again.");
        setLoading(false);
        return;
      }

      setLoading(false);

      if (data.backupCodes && data.backupCodes.length > 0) {
        setBackupCodes(data.backupCodes);
        setPendingUserSession({
          email: data.user.email,
          role: data.user.role as AppRole,
          token: data.token,
          id: data.user.id,
        });
        setMfaStep("BACKUP_CODES");
      } else {
        setDCAUserSession(data.user.email, data.user.role as AppRole, false, data.token, data.user.id);
        router.push("/admin/dashboard");
      }
    } catch (err) {
      console.error("MFA verify error:", err);
      setError("Failed to verify MFA code.");
      setLoading(false);
    }
  };

  const handleFinishMfaSetup = () => {
    if (pendingUserSession) {
      setDCAUserSession(
        pendingUserSession.email,
        pendingUserSession.role,
        false,
        pendingUserSession.token,
        pendingUserSession.id
      );
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
      {/* Registration Success Message */}
      {success && (
        <div className="mb-4 flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center text-xs font-semibold text-emerald-700">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-center text-xs font-semibold text-red-600">
          {error}
        </div>
      )}

      {/* STEP: STANDARD LOGIN */}
      {mfaStep === "NONE" && (
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="identifier"
              className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#111111]"
            >
              Email Address or Mobile Number
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                <Mail size={16} />
              </div>
              <input
                id="identifier"
                name="identifier"
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="you@example.com or +91 9876543210"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-xs font-bold uppercase tracking-wider text-[#111111]"
              >
                Password
              </label>
              <a
                href="#forgot-password"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Password reset instructions will be sent to your registered Email/Phone.");
                }}
                className="text-xs font-semibold text-[#111111] hover:text-[#D4AF37] transition-colors"
              >
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                <Lock size={16} />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
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
              "Logging in..."
            ) : (
              <>
                <span>Login to Account</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <div className="mt-5 border-t border-gray-200 pt-4 space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
              <span className="text-[#555555] font-medium text-center sm:text-left">
                Don&apos;t have an artist profile yet?
              </span>
              <Link
                href="/profile/setup"
                className="inline-flex items-center gap-1.5 shrink-0 rounded-xl bg-[#D4AF37] px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-white transition duration-200 hover:bg-[#C59B27] shadow-2xs cursor-pointer"
              >
                <span>Create Your Profile</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
              <span className="text-[#555555] font-medium text-center sm:text-left">
                Are you a Brand or Casting Agency?
              </span>
              <Link
                href="/register/brand"
                className="inline-flex items-center gap-1.5 shrink-0 rounded-xl border border-gray-300 bg-[#F7F7F5] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#333333] transition duration-200 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-white shadow-2xs cursor-pointer"
              >
                <span>Register as Brand</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#D4AF37]" />
              </Link>
            </div>
          </div>
        </form>
      )}

      {/* STEP: ADMIN MFA FIRST-TIME SETUP */}
      {mfaStep === "SETUP" && (
        <form onSubmit={handleMfaSubmit} className="space-y-4">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37] mb-2">
              <QrCode size={24} />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#111111]">Set Up Two-Factor Authentication</h3>
            <p className="text-xs text-gray-500 mt-1">
              Scan manual setup key in Google / Microsoft Authenticator app.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-[#F7F7F5] p-3 text-center">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
              Manual Setup Secret Key
            </span>
            <code className="block text-sm font-mono font-bold tracking-widest text-[#111111] select-all break-all">
              {manualKey}
            </code>
          </div>

          <div>
            <label htmlFor="mfaCodeSetup" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#111111]">
              Enter 6-Digit Verification Code
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                <Key size={16} />
              </div>
              <input
                id="mfaCodeSetup"
                type="text"
                maxLength={6}
                required
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                placeholder="123456"
                className={inputClass}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full justify-center py-3.5 text-xs sm:text-sm font-bold uppercase tracking-[0.16em] bg-[#D4AF37] hover:bg-[#c59b27] text-white transition-all shadow-xs"
          >
            {loading ? "Verifying..." : "Verify & Enable MFA"}
          </Button>
        </form>
      )}

      {/* STEP: ADMIN MFA VERIFICATION */}
      {mfaStep === "VERIFY" && (
        <form onSubmit={handleMfaSubmit} className="space-y-4">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37] mb-2">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#111111]">Admin Two-Factor Authentication</h3>
            <p className="text-xs text-gray-500 mt-1">
              Enter 6-digit code from Authenticator app or 8-character Backup Code.
            </p>
          </div>

          <div>
            <label htmlFor="mfaCodeVerify" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#111111]">
              Authenticator or Backup Code
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                <Key size={16} />
              </div>
              <input
                id="mfaCodeVerify"
                type="text"
                required
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                placeholder="6-digit PIN or backup code"
                className={inputClass}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full justify-center py-3.5 text-xs sm:text-sm font-bold uppercase tracking-[0.16em] bg-[#D4AF37] hover:bg-[#c59b27] text-white transition-all shadow-xs"
          >
            {loading ? "Verifying..." : "Verify & Access Admin Dashboard"}
          </Button>
        </form>
      )}

      {/* STEP: BACKUP CODES DISPLAY (SHOW ONCE ONLY) */}
      {mfaStep === "BACKUP_CODES" && (
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600 mb-2">
            <Key size={24} />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#111111]">Save Your Backup Recovery Codes</h3>
          <p className="text-xs text-red-600 font-semibold">
            IMPORTANT: These backup codes will ONLY be shown once! Store them securely.
          </p>

          <div className="grid grid-cols-2 gap-2 rounded-xl border border-gray-200 bg-[#F7F7F5] p-4 text-center font-mono text-sm font-bold text-[#111111]">
            {backupCodes.map((code, idx) => (
              <div key={idx} className="bg-white p-2 rounded-lg border border-gray-200 shadow-2xs">
                {code}
              </div>
            ))}
          </div>

          <Button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(backupCodes.join("\n"));
              setCopiedCodes(true);
            }}
            className="w-full justify-center py-2 text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-800 hover:bg-gray-200"
          >
            {copiedCodes ? <Check size={14} className="mr-1 text-emerald-600" /> : <Copy size={14} className="mr-1" />}
            {copiedCodes ? "Copied to Clipboard!" : "Copy Backup Codes"}
          </Button>

          <Button
            type="button"
            onClick={handleFinishMfaSetup}
            className="w-full justify-center py-3.5 text-xs sm:text-sm font-bold uppercase tracking-[0.16em] bg-[#D4AF37] hover:bg-[#c59b27] text-white transition-all shadow-xs"
          >
            <span>Proceed to Admin Dashboard</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Encrypted Security Badge */}
      <div className="mt-5 flex items-center justify-center gap-1.5 text-center text-[11px] font-medium text-[#666666]">
        <ShieldCheck size={14} className="text-[#D4AF37]" />
        <span>100% Encrypted &amp; Secure Portal</span>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white text-[#111111]">
      {/* Compact Luxury Header Banner */}
      <section className="relative isolate overflow-hidden border-b border-gray-200 bg-[#F7F7F5] px-4 pt-28 pb-4 sm:pt-32 sm:pb-6 text-center">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              DCA SECURITY PORTAL
            </span>
            <h1 className="mt-1 font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#111111]">
              Welcome Back
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[#555555] max-w-xl mx-auto leading-relaxed">
              Login to access your profile, casting calls, and platform management.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Compact Breadcrumb */}
      <div className="mx-auto max-w-xl px-4 py-2 text-center flex justify-center">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Login" }]} />
      </div>

      {/* First-Viewport Centered Login Card Section */}
      <section className="mx-auto max-w-xl px-4 pb-12 pt-2">
        <Reveal>
          <Suspense fallback={<div className="p-8 text-center text-xs text-gray-500">Loading portal...</div>}>
            <LoginContent />
          </Suspense>
        </Reveal>
      </section>
    </main>
  );
}
