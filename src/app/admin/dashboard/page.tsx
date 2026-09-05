"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ShieldCheck,
  Users,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Search,
  X,
  Tag,
  MapPin,
  Building,
  Building2,
  BarChart3,
  CreditCard,
} from "lucide-react";

import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import {
  isUserAuthenticated,
  getUserSession,
  getAuthToken,
  clearDCAUserSession,
} from "@/lib/auth";
import { API_URL } from "@/config/env";
import { NotificationBell } from "@/components/notifications/NotificationBell";

interface AdminStats {
  totalArtists: number;
  totalBrands: number;
  pendingArtists: number;
  approvedArtists: number;
  rejectedArtists: number;
  totalCastingCalls: number;
  pendingCastingCalls: number;
  approvedCastingCalls: number;
  rejectedCastingCalls: number;
  totalApplications: number;
  pendingApplications: number;
  shortlistedApplications: number;
  selectedApplications: number;
  rejectedApplications: number;
}

interface PendingArtist {
  id: string;
  userId: string;
  fullName: string;
  phone: string | null;
  gender: string | null;
  dateOfBirth: string | null;
  city: string | null;
  state: string | null;
  bio: string | null;
  height: string | null;
  weight: string | null;
  languages: string | null;
  skills: string | null;
  specialAbilities: string | null;
  profilePhoto: string | null;
  headshots: string | null;
  verificationStatus: string;
  submittedAt: string | null;
  user?: {
    email: string;
  };
}

interface PendingBrand {
  id: string;
  userId: string;
  companyName: string;
  contactName: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  city: string | null;
  state: string | null;
  companyDescription: string | null;
  companyLogo: string | null;
  verificationStatus: string;
  adminFeedback?: string | null;
  submittedAt: string | null;
  createdAt: string;
  user?: {
    id: string;
    email: string;
    createdAt: string;
  };
}

interface PendingCastingCall {
  id: string;
  brandId: string;
  title: string;
  description: string;
  category: string | null;
  location: string | null;
  compensation: string | null;
  startDate: string | null;
  endDate: string | null;
  ageMin: number | null;
  ageMax: number | null;
  gender: string | null;
  requirements: string | null;
  approvalStatus: string;
  submittedAt: string | null;
  createdAt: string;
  brand?: {
    id: string;
    email: string;
    brandProfile?: {
      companyName?: string | null;
      contactName?: string | null;
      companyLogo?: string | null;
    };
  };
}

interface AdminPaymentSummary {
  totalPayments: number;
  successfulPayments: number;
  pendingPayments: number;
  failedPayments: number;
  totalRevenue: number;
  artistPremiumPayments: number;
  brandPremiumPayments: number;
  activePremiumEntitlements: number;
  expiredPremiumEntitlements: number;
}

interface AdminPaymentRecord {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  plan: "ARTIST_PREMIUM" | "BRAND_PREMIUM";
  status: "PAID" | "PENDING" | "FAILED" | "REFUNDED";
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    email: string;
    role: string;
    artistProfile?: { fullName: string } | null;
    brandProfile?: { companyName: string } | null;
    entitlement?: {
      startedAt: string;
      expiresAt: string;
      plan: string;
    } | null;
  };
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "artists" | "castings" | "brands" | "payments">("overview");

  // Stats state
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  // Pending Artists state
  const [pendingArtists, setPendingArtists] = useState<PendingArtist[]>([]);
  const [loadingArtists, setLoadingArtists] = useState(false);
  const [artistsError, setArtistsError] = useState<string | null>(null);
  const [artistSearch, setArtistSearch] = useState("");

  // Pending Brands state
  const [pendingBrands, setPendingBrands] = useState<PendingBrand[]>([]);
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [brandsError, setBrandsError] = useState<string | null>(null);
  const [brandSearch, setBrandSearch] = useState("");

  // Pending Castings state
  const [pendingCastings, setPendingCastings] = useState<PendingCastingCall[]>([]);
  const [loadingCastings, setLoadingCastings] = useState(false);
  const [castingsError, setCastingsError] = useState<string | null>(null);
  const [castingSearch, setCastingSearch] = useState("");

  // Admin Payment Analytics state
  const [paymentsSummary, setPaymentsSummary] = useState<AdminPaymentSummary | null>(null);
  const [paymentsList, setPaymentsList] = useState<AdminPaymentRecord[]>([]);
  const [loadingPayments, setLoadingPayments] = useState(false);
  const [paymentsError, setPaymentsError] = useState<string | null>(null);
  const [paymentFilterPlan, setPaymentFilterPlan] = useState<string>("ALL");
  const [paymentFilterStatus, setPaymentFilterStatus] = useState<string>("ALL");
  const [paymentSearch, setPaymentSearch] = useState<string>("");
  const [paymentPage, setPaymentPage] = useState<number>(1);
  const [paymentTotalPages, setPaymentTotalPages] = useState<number>(1);

  // Action Modals State
  const [actionModal, setActionModal] = useState<{
    type: "approve_artist" | "reject_artist" | "approve_casting" | "reject_casting" | "view_artist" | "view_casting" | "approve_brand" | "reject_brand" | "view_brand";
    item: PendingArtist | PendingCastingCall | PendingBrand;
  } | null>(null);

  const [adminFeedback, setAdminFeedback] = useState("");
  const [submittingAction, setSubmittingAction] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    const token = getAuthToken();
    if (!token) return;

    setLoadingStats(true);
    setStatsError(null);

    try {
      const response = await fetch(`${API_URL}/api/admin/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        clearDCAUserSession();
        router.push("/login");
        return;
      }

      const data = (await response.json()) as {
        success: boolean;
        message?: string;
        stats?: AdminStats;
      };

      if (!response.ok || !data.success || !data.stats) {
        setStatsError(data.message || "Failed to fetch platform statistics");
        setLoadingStats(false);
        return;
      }

      setStats(data.stats);
      setLoadingStats(false);
    } catch (err: unknown) {
      console.error("Fetch admin stats error:", err);
      setStatsError("Unable to connect to backend server.");
      setLoadingStats(false);
    }
  }, [router]);

  const fetchPendingArtists = useCallback(async () => {
    const token = getAuthToken();
    if (!token) return;

    setLoadingArtists(true);
    setArtistsError(null);

    try {
      const response = await fetch(`${API_URL}/api/admin/artists/pending`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = (await response.json()) as {
        success: boolean;
        message?: string;
        artists?: PendingArtist[];
      };

      if (!response.ok || !data.success) {
        setArtistsError(data.message || "Failed to fetch pending artists");
        setLoadingArtists(false);
        return;
      }

      setPendingArtists(data.artists || []);
      setLoadingArtists(false);
    } catch (err: unknown) {
      console.error("Fetch pending artists error:", err);
      setArtistsError("Network error fetching pending artists.");
      setLoadingArtists(false);
    }
  }, []);

  const fetchPendingCastings = useCallback(async () => {
    const token = getAuthToken();
    if (!token) return;

    setLoadingCastings(true);
    setCastingsError(null);

    try {
      const response = await fetch(`${API_URL}/api/admin/casting/pending`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = (await response.json()) as {
        success: boolean;
        message?: string;
        castings?: PendingCastingCall[];
      };

      if (!response.ok || !data.success) {
        setCastingsError(data.message || "Failed to fetch pending casting calls");
        setLoadingCastings(false);
        return;
      }

      setPendingCastings(data.castings || []);
      setLoadingCastings(false);
    } catch (err: unknown) {
      console.error("Fetch pending castings error:", err);
      setCastingsError("Network error fetching pending casting calls.");
      setLoadingCastings(false);
    }
  }, []);

  const fetchPendingBrands = useCallback(async () => {
    const token = getAuthToken();
    if (!token) return;

    setLoadingBrands(true);
    setBrandsError(null);

    try {
      const response = await fetch(`${API_URL}/api/admin/brands/pending`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = (await response.json()) as {
        success: boolean;
        message?: string;
        brands?: PendingBrand[];
      };

      if (!response.ok || !data.success) {
        setBrandsError(data.message || "Failed to fetch pending brands");
        setLoadingBrands(false);
        return;
      }

      setPendingBrands(data.brands || []);
      setLoadingBrands(false);
    } catch (err: unknown) {
      console.error("Fetch pending brands error:", err);
      setBrandsError("Network error fetching pending brands.");
      setLoadingBrands(false);
    }
  }, []);

  const fetchPayments = useCallback(async () => {
    const token = getAuthToken();
    if (!token) return;

    setLoadingPayments(true);
    setPaymentsError(null);

    try {
      const params = new URLSearchParams();
      params.set("page", paymentPage.toString());
      params.set("limit", "15");
      if (paymentFilterPlan !== "ALL") params.set("plan", paymentFilterPlan);
      if (paymentFilterStatus !== "ALL") params.set("status", paymentFilterStatus);
      if (paymentSearch.trim()) params.set("search", paymentSearch.trim());

      const response = await fetch(`${API_URL}/api/admin/payments?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        clearDCAUserSession();
        router.push("/login");
        return;
      }

      const data = (await response.json()) as {
        success: boolean;
        message?: string;
        summary?: AdminPaymentSummary;
        pagination?: { totalPages: number };
        payments?: AdminPaymentRecord[];
      };

      if (response.ok && data.success && data.summary) {
        setPaymentsSummary(data.summary);
        setPaymentsList(data.payments || []);
        setPaymentTotalPages(data.pagination?.totalPages || 1);
      } else {
        setPaymentsError(data.message || "Failed to load payment analytics.");
      }
    } catch {
      setPaymentsError("Unable to connect to server. Please try again.");
    } finally {
      setLoadingPayments(false);
    }
  }, [router, paymentPage, paymentFilterPlan, paymentFilterStatus, paymentSearch]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!isUserAuthenticated()) {
        router.push("/login");
        return;
      }

      requestAnimationFrame(() => {
        const session = getUserSession();
        if (session?.role !== "admin" && session?.role !== "ADMIN") {
          router.push("/dashboard");
          return;
        }

        fetchStats();
        fetchPendingArtists();
        fetchPendingBrands();
        fetchPendingCastings();
        fetchPayments();
      });
    }
  }, [router, fetchStats, fetchPendingArtists, fetchPendingBrands, fetchPendingCastings, fetchPayments]);

  // Execute Approve / Reject Action
  const handleExecuteAction = async () => {
    if (!actionModal) return;

    const token = getAuthToken();
    if (!token) return;

    setSubmittingAction(true);
    setActionError(null);

    let url = "";
    const method = "PATCH";

    if (actionModal.type === "approve_artist") {
      url = `${API_URL}/api/admin/artists/${actionModal.item.id}/approve`;
    } else if (actionModal.type === "reject_artist") {
      url = `${API_URL}/api/admin/artists/${actionModal.item.id}/reject`;
    } else if (actionModal.type === "approve_casting") {
      url = `${API_URL}/api/admin/casting/${actionModal.item.id}/approve`;
    } else if (actionModal.type === "reject_casting") {
      url = `${API_URL}/api/admin/casting/${actionModal.item.id}/reject`;
    } else if (actionModal.type === "approve_brand") {
      url = `${API_URL}/api/admin/brands/${actionModal.item.id}/approve`;
    } else if (actionModal.type === "reject_brand") {
      url = `${API_URL}/api/admin/brands/${actionModal.item.id}/reject`;
    }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminFeedback: adminFeedback.trim() || undefined,
        }),
      });

      const data = (await response.json()) as {
        success: boolean;
        message?: string;
      };

      if (!response.ok || !data.success) {
        setActionError(data.message || "Failed to execute moderation action");
        setSubmittingAction(false);
        return;
      }

      setSubmittingAction(false);
      setActionModal(null);
      setAdminFeedback("");

      // Refresh Data
      fetchStats();
      fetchPendingArtists();
      fetchPendingBrands();
      fetchPendingCastings();
    } catch (err: unknown) {
      console.error("Moderation action error:", err);
      setActionError("Network error executing action.");
      setSubmittingAction(false);
    }
  };

  const filteredArtists = pendingArtists.filter((art) => {
    if (!artistSearch.trim()) return true;
    const q = artistSearch.toLowerCase();
    return (
      art.fullName.toLowerCase().includes(q) ||
      art.city?.toLowerCase().includes(q) ||
      art.skills?.toLowerCase().includes(q)
    );
  });

  const filteredCastings = pendingCastings.filter((cast) => {
    if (!castingSearch.trim()) return true;
    const q = castingSearch.toLowerCase();
    return (
      cast.title.toLowerCase().includes(q) ||
      cast.category?.toLowerCase().includes(q) ||
      cast.location?.toLowerCase().includes(q)
    );
  });

  const filteredBrands = pendingBrands.filter((br) => {
    if (!brandSearch.trim()) return true;
    const q = brandSearch.toLowerCase();
    return (
      br.companyName.toLowerCase().includes(q) ||
      (br.contactName && br.contactName.toLowerCase().includes(q)) ||
      (br.email && br.email.toLowerCase().includes(q)) ||
      (br.user?.email && br.user.email.toLowerCase().includes(q)) ||
      (br.city && br.city.toLowerCase().includes(q))
    );
  });

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <PageHero
        eyebrow="Superuser Administration"
        title="DCA Moderation Dashboard"
        description="Verify artist portfolios, review brand casting briefs, and monitor platform analytics."
      />

      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Admin Dashboard" },
          ]}
        />
      </div>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* LEFT NAVIGATION SIDEBAR */}
          <div className="lg:col-span-3 space-y-4">
            <Reveal>
              <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-md space-y-3">
                <div className="p-4 rounded-2xl bg-[#111111] text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={26} className="text-[#D4AF37]" />
                    <div>
                      <h2 className="font-serif text-base font-bold text-white">Admin Portal</h2>
                      <p className="text-[11px] text-gray-400">Delhi Casting Agency</p>
                    </div>
                  </div>
                  <NotificationBell />
                </div>

                <div className="space-y-1.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab("overview")}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-xs font-bold transition ${
                      activeTab === "overview"
                        ? "bg-[#D4AF37] text-white shadow-xs"
                        : "bg-[#F7F7F5] text-[#111111] hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <BarChart3 size={16} />
                      <span>Platform Overview</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("artists")}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-xs font-bold transition ${
                      activeTab === "artists"
                        ? "bg-[#D4AF37] text-white shadow-xs"
                        : "bg-[#F7F7F5] text-[#111111] hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      <span>Artist Verification</span>
                    </div>
                    <span className="rounded-full bg-amber-200/60 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                      {pendingArtists.length}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("castings")}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-xs font-bold transition cursor-pointer ${
                      activeTab === "castings"
                        ? "bg-[#D4AF37] text-white shadow-xs"
                        : "bg-[#F7F7F5] text-[#111111] hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} />
                      <span>Casting Moderation</span>
                    </div>
                    <span className="rounded-full bg-amber-200/60 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                      {pendingCastings.length}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("brands")}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-xs font-bold transition cursor-pointer ${
                      activeTab === "brands"
                        ? "bg-[#D4AF37] text-white shadow-xs"
                        : "bg-[#F7F7F5] text-[#111111] hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Building2 size={16} />
                      <span>Brand Verification</span>
                    </div>
                    <span className="rounded-full bg-amber-200/60 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                      {pendingBrands.length}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("payments")}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-xs font-bold transition cursor-pointer ${
                      activeTab === "payments"
                        ? "bg-[#D4AF37] text-white shadow-xs"
                        : "bg-[#F7F7F5] text-[#111111] hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard size={16} />
                      <span>Payment Analytics</span>
                    </div>
                    {paymentsSummary && (
                      <span className="rounded-full bg-emerald-200/60 px-2 py-0.5 text-[10px] font-bold text-emerald-900">
                        ₹{paymentsSummary.totalRevenue.toLocaleString("en-IN")}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </Reveal>
          </div>

          {/* MAIN CONTENT PANEL */}
          <div className="lg:col-span-9">
            
            {/* TAB 1: OVERVIEW STATS */}
            {activeTab === "overview" && (
              <Reveal>
                <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-md space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-[#111111]">
                        Platform Analytics &amp; System Health
                      </h2>
                      <p className="text-xs text-[#555555] mt-0.5">
                        Live aggregate metrics retrieved directly from PostgreSQL
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={fetchStats}
                      disabled={loadingStats}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-[#F7F7F5] px-3.5 py-2 text-xs font-bold text-[#111111] hover:bg-[#D4AF37] hover:text-white transition shadow-2xs cursor-pointer disabled:opacity-50"
                    >
                      <RefreshCw size={14} className={loadingStats ? "animate-spin" : ""} />
                      <span>Refresh Stats</span>
                    </button>
                  </div>

                  {loadingStats ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-8">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="animate-pulse h-24 rounded-2xl bg-[#F7F7F5] border border-gray-200" />
                      ))}
                    </div>
                  ) : statsError ? (
                    <div className="p-8 text-center rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
                      <AlertTriangle className="w-10 h-10 text-amber-600 mx-auto mb-2" />
                      <p className="text-xs mb-3">{statsError}</p>
                      <button type="button" onClick={fetchStats} className="px-4 py-2 bg-[#D4AF37] text-white rounded-xl text-xs font-bold">
                        Retry
                      </button>
                    </div>
                  ) : stats ? (
                    <div className="space-y-6">
                      {/* User Stats Grid */}
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                          User &amp; Registration Metrics
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-xs">
                          <div className="p-4 rounded-2xl border border-gray-200 bg-[#F7F7F5]">
                            <span className="text-gray-500 font-medium block">Total Artists</span>
                            <span className="text-2xl font-bold text-[#111111] mt-1 block">{stats.totalArtists}</span>
                          </div>

                          <div className="p-4 rounded-2xl border border-gray-200 bg-[#F7F7F5]">
                            <span className="text-gray-500 font-medium block">Total Brands</span>
                            <span className="text-2xl font-bold text-[#111111] mt-1 block">{stats.totalBrands}</span>
                          </div>

                          <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50 text-amber-900">
                            <span className="font-medium block">Pending Artists</span>
                            <span className="text-2xl font-bold mt-1 block">{stats.pendingArtists}</span>
                          </div>

                          <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-900">
                            <span className="font-medium block">Approved Artists</span>
                            <span className="text-2xl font-bold mt-1 block">{stats.approvedArtists}</span>
                          </div>

                          <div className="p-4 rounded-2xl border border-rose-200 bg-rose-50 text-rose-900">
                            <span className="font-medium block">Rejected Artists</span>
                            <span className="text-2xl font-bold mt-1 block">{stats.rejectedArtists}</span>
                          </div>
                        </div>
                      </div>

                      {/* Casting Calls Grid */}
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                          Casting Call Brief Metrics
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                          <div className="p-4 rounded-2xl border border-gray-200 bg-[#F7F7F5]">
                            <span className="text-gray-500 font-medium block">Total Castings</span>
                            <span className="text-2xl font-bold text-[#111111] mt-1 block">{stats.totalCastingCalls}</span>
                          </div>

                          <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50 text-amber-900">
                            <span className="font-medium block">Pending Moderation</span>
                            <span className="text-2xl font-bold mt-1 block">{stats.pendingCastingCalls}</span>
                          </div>

                          <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-900">
                            <span className="font-medium block">Approved &amp; Live</span>
                            <span className="text-2xl font-bold mt-1 block">{stats.approvedCastingCalls}</span>
                          </div>

                          <div className="p-4 rounded-2xl border border-rose-200 bg-rose-50 text-rose-900">
                            <span className="font-medium block">Rejected Castings</span>
                            <span className="text-2xl font-bold mt-1 block">{stats.rejectedCastingCalls}</span>
                          </div>
                        </div>
                      </div>

                      {/* Application Metrics */}
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                          Application Audition Submissions
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-xs">
                          <div className="p-4 rounded-2xl border border-gray-200 bg-[#F7F7F5]">
                            <span className="text-gray-500 font-medium block">Total Applications</span>
                            <span className="text-2xl font-bold text-[#111111] mt-1 block">{stats.totalApplications}</span>
                          </div>

                          <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50 text-amber-900">
                            <span className="font-medium block">Pending Review</span>
                            <span className="text-2xl font-bold mt-1 block">{stats.pendingApplications}</span>
                          </div>

                          <div className="p-4 rounded-2xl border border-blue-200 bg-blue-50 text-blue-900">
                            <span className="font-medium block">Shortlisted</span>
                            <span className="text-2xl font-bold mt-1 block">{stats.shortlistedApplications}</span>
                          </div>

                          <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-900">
                            <span className="font-medium block">Selected</span>
                            <span className="text-2xl font-bold mt-1 block">{stats.selectedApplications}</span>
                          </div>

                          <div className="p-4 rounded-2xl border border-rose-200 bg-rose-50 text-rose-900">
                            <span className="font-medium block">Rejected</span>
                            <span className="text-2xl font-bold mt-1 block">{stats.rejectedApplications}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </Reveal>
            )}

            {/* TAB 2: ARTIST VERIFICATION QUEUE */}
            {activeTab === "artists" && (
              <Reveal>
                <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-md space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-4 gap-3">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-[#111111]">
                        Artist Profile Verification Queue
                      </h2>
                      <p className="text-xs text-[#555555] mt-0.5">
                        Review submitted portfolios before granting platform verification status.
                      </p>
                    </div>

                    <div className="relative w-full sm:w-64">
                      <Search size={14} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search name, city, skills..."
                        value={artistSearch}
                        onChange={(e) => setArtistSearch(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 bg-[#F7F7F5] pl-9 pr-3 py-2 text-xs focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>

                  {loadingArtists ? (
                    <div className="space-y-4 py-4">
                      {[1, 2].map((i) => (
                        <div key={i} className="animate-pulse h-32 rounded-2xl bg-[#F7F7F5] border border-gray-200" />
                      ))}
                    </div>
                  ) : artistsError ? (
                    <div className="p-6 text-center text-xs text-amber-800 bg-amber-50 rounded-2xl border border-amber-200">
                      {artistsError}
                    </div>
                  ) : filteredArtists.length > 0 ? (
                    <div className="space-y-4">
                      {filteredArtists.map((art) => {
                        const avatar =
                          art.profilePhoto ||
                          (art.headshots ? art.headshots.split(",")[0].trim() : "/images/actors/editorial_grid_1.png");

                        return (
                          <div
                            key={art.id}
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-[#F7F7F5] p-5 transition hover:border-[#D4AF37] shadow-2xs"
                          >
                            <div className="flex items-center gap-4">
                              <div className="relative aspect-square w-16 overflow-hidden rounded-xl border border-gray-300 shrink-0 bg-gray-100">
                                <Image src={avatar} alt={art.fullName} fill className="object-cover" />
                              </div>

                              <div>
                                <h3 className="font-serif text-base font-bold text-[#111111]">
                                  {art.fullName}
                                </h3>
                                <p className="text-xs text-[#555555] mt-0.5">
                                  {art.gender || "Artist"} • {art.city || "City N/A"}, {art.state || "State N/A"}
                                </p>
                                <p className="text-[11px] text-gray-400 mt-1">
                                  Submitted {art.submittedAt ? new Date(art.submittedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Recently"}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                              <button
                                type="button"
                                onClick={() => setActionModal({ type: "view_artist", item: art })}
                                className="px-3 py-2 rounded-xl border border-gray-300 bg-white text-xs font-semibold text-[#111111] hover:bg-gray-100 transition cursor-pointer"
                              >
                                Comp Card
                              </button>

                              <button
                                type="button"
                                onClick={() => setActionModal({ type: "approve_artist", item: art })}
                                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition cursor-pointer"
                              >
                                Approve
                              </button>

                              <button
                                type="button"
                                onClick={() => setActionModal({ type: "reject_artist", item: art })}
                                className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition cursor-pointer"
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-10 text-center text-xs text-gray-500 rounded-2xl border border-gray-200 bg-[#F7F7F5]">
                      <CheckCircle2 size={36} className="mx-auto mb-2 text-emerald-600" />
                      <p className="font-bold text-[#111111]">No Pending Artists</p>
                      <p className="mt-0.5 text-gray-500">All submitted artist portfolios have been reviewed.</p>
                    </div>
                  )}
                </div>
              </Reveal>
            )}

            {/* TAB 3: CASTING MODERATION QUEUE */}
            {activeTab === "castings" && (
              <Reveal>
                <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-md space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-4 gap-3">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-[#111111]">
                        Casting Call Moderation Queue
                      </h2>
                      <p className="text-xs text-[#555555] mt-0.5">
                        Verify brand casting briefs before publishing to public portal.
                      </p>
                    </div>

                    <div className="relative w-full sm:w-64">
                      <Search size={14} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search title, category..."
                        value={castingSearch}
                        onChange={(e) => setCastingSearch(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 bg-[#F7F7F5] pl-9 pr-3 py-2 text-xs focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>

                  {loadingCastings ? (
                    <div className="space-y-4 py-4">
                      {[1, 2].map((i) => (
                        <div key={i} className="animate-pulse h-32 rounded-2xl bg-[#F7F7F5] border border-gray-200" />
                      ))}
                    </div>
                  ) : castingsError ? (
                    <div className="p-6 text-center text-xs text-amber-800 bg-amber-50 rounded-2xl border border-amber-200">
                      {castingsError}
                    </div>
                  ) : filteredCastings.length > 0 ? (
                    <div className="space-y-4">
                      {filteredCastings.map((cast) => (
                        <div
                          key={cast.id}
                          className="rounded-2xl border border-gray-200 bg-[#F7F7F5] p-5 sm:p-6 transition hover:border-[#D4AF37] shadow-2xs space-y-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/60 pb-3">
                            <div className="flex items-center gap-2">
                              <span className="rounded-full bg-[#D4AF37]/20 px-2.5 py-0.5 text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                                {cast.category || "General"}
                              </span>
                              <span className="text-xs text-[#666666] flex items-center gap-1">
                                <Building size={12} className="text-gray-400" />
                                {cast.brand?.brandProfile?.companyName || "Verified Brand"}
                              </span>
                            </div>

                            <span className="text-xs text-gray-400">
                              Submitted {cast.submittedAt ? new Date(cast.submittedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Recently"}
                            </span>
                          </div>

                          <div>
                            <h3 className="font-serif text-lg font-bold text-[#111111]">
                              {cast.title}
                            </h3>
                            <p className="mt-1 text-xs text-[#555555] line-clamp-2">
                              {cast.description}
                            </p>
                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#444444]">
                              <span className="flex items-center gap-1">
                                <MapPin size={12} className="text-[#D4AF37]" />
                                {cast.location || "Mumbai"}
                              </span>
                              <span className="flex items-center gap-1 font-semibold text-[#111111]">
                                <Tag size={12} className="text-[#D4AF37]" />
                                {cast.compensation || "Paid Opportunity"}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-end gap-2 border-t border-gray-200/60 pt-3">
                            <button
                              type="button"
                              onClick={() => setActionModal({ type: "view_casting", item: cast })}
                              className="px-3 py-1.5 rounded-xl border border-gray-300 bg-white text-xs font-semibold text-[#111111] hover:bg-gray-100 transition cursor-pointer"
                            >
                              Brief Details
                            </button>

                            <button
                              type="button"
                              onClick={() => setActionModal({ type: "approve_casting", item: cast })}
                              className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition cursor-pointer"
                            >
                              Approve Post
                            </button>

                            <button
                              type="button"
                              onClick={() => setActionModal({ type: "reject_casting", item: cast })}
                              className="px-4 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition cursor-pointer"
                            >
                              Reject Post
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-10 text-center text-xs text-gray-500 rounded-2xl border border-gray-200 bg-[#F7F7F5]">
                      <CheckCircle2 size={36} className="mx-auto mb-2 text-emerald-600" />
                      <p className="font-bold text-[#111111]">No Pending Casting Calls</p>
                      <p className="mt-0.5 text-gray-500">All submitted casting briefs have been moderated.</p>
                    </div>
                  )}
                </div>
              </Reveal>
            )}

            {/* TAB: BRAND VERIFICATION QUEUE */}
            {activeTab === "brands" && (
              <Reveal>
                <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-md space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-4 gap-3">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-[#111111]">
                        Brand Profile Verification Queue
                      </h2>
                      <p className="text-xs text-[#555555] mt-0.5">
                        Review submitted brand companies before granting verification status and casting privileges.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="relative w-full sm:w-64">
                        <Search size={14} className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search company, contact, city..."
                          value={brandSearch}
                          onChange={(e) => setBrandSearch(e.target.value)}
                          className="w-full rounded-xl border border-gray-300 bg-[#F7F7F5] pl-9 pr-3 py-2 text-xs focus:border-[#D4AF37] focus:outline-none"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={fetchPendingBrands}
                        disabled={loadingBrands}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-[#F7F7F5] px-3.5 py-2 text-xs font-bold text-[#111111] hover:bg-[#D4AF37] hover:text-white transition shadow-2xs cursor-pointer disabled:opacity-50"
                      >
                        <RefreshCw size={14} className={loadingBrands ? "animate-spin" : ""} />
                        <span>Refresh</span>
                      </button>
                    </div>
                  </div>

                  {loadingBrands ? (
                    <div className="space-y-4 py-4">
                      {[1, 2].map((i) => (
                        <div key={i} className="animate-pulse h-32 rounded-2xl bg-[#F7F7F5] border border-gray-200" />
                      ))}
                    </div>
                  ) : brandsError ? (
                    <div className="p-6 text-center text-xs text-amber-800 bg-amber-50 rounded-2xl border border-amber-200">
                      {brandsError}
                    </div>
                  ) : filteredBrands.length > 0 ? (
                    <div className="space-y-4">
                      {filteredBrands.map((brand) => (
                        <div
                          key={brand.id}
                          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-[#F7F7F5] p-5 transition hover:border-[#D4AF37] shadow-2xs"
                        >
                          <div className="flex items-center gap-4">
                            <div className="relative aspect-square w-16 overflow-hidden rounded-xl border border-gray-300 shrink-0 bg-white flex items-center justify-center text-[#D4AF37]">
                              {brand.companyLogo ? (
                                <Image
                                  src={brand.companyLogo}
                                  alt={brand.companyName}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <Building2 size={28} />
                              )}
                            </div>

                            <div>
                              <h3 className="font-serif text-base font-bold text-[#111111]">
                                {brand.companyName}
                              </h3>
                              <p className="text-xs text-[#555555] mt-0.5">
                                {brand.contactName || "Contact N/A"} • {brand.email || brand.user?.email || "Email N/A"} • {brand.city || "City N/A"}, {brand.state || "State N/A"}
                              </p>
                              {brand.website && (
                                <p className="text-[11px] text-[#D4AF37] mt-0.5">
                                  {brand.website}
                                </p>
                              )}
                              <p className="text-[11px] text-gray-400 mt-1">
                                Registered {brand.createdAt ? new Date(brand.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Recently"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                            <button
                              type="button"
                              onClick={() => setActionModal({ type: "view_brand", item: brand })}
                              className="px-3 py-2 rounded-xl border border-gray-300 bg-white text-xs font-semibold text-[#111111] hover:bg-gray-100 transition cursor-pointer"
                            >
                              Details
                            </button>

                            <button
                              type="button"
                              onClick={() => setActionModal({ type: "approve_brand", item: brand })}
                              className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition cursor-pointer"
                            >
                              Approve
                            </button>

                            <button
                              type="button"
                              onClick={() => setActionModal({ type: "reject_brand", item: brand })}
                              className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition cursor-pointer"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-gray-200 bg-[#F7F7F5] p-10 text-center text-xs text-[#555555]">
                      <Building2 size={36} className="mx-auto mb-2 text-gray-300" />
                      <p className="font-serif text-base font-bold text-[#111111]">
                        No Pending Brands
                      </p>
                      <p className="text-[#666666] mt-1">
                        All brand registration profiles have been audited and resolved.
                      </p>
                    </div>
                  )}
                </div>
              </Reveal>
            )}

            {/* TAB 4: PAYMENT ANALYTICS */}
            {activeTab === "payments" && (
              <Reveal>
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-[#111111]">
                        Payment Analytics & Entitlement Moderation
                      </h2>
                      <p className="text-xs text-[#555555]">
                        Monitor total platform revenue, membership plan statistics, and 3-month premium access entitlements from PostgreSQL.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => fetchPayments()}
                      className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs font-bold text-[#111111] hover:bg-gray-100 transition cursor-pointer shadow-2xs"
                    >
                      <RefreshCw size={14} className={loadingPayments ? "animate-spin" : ""} />
                      <span>Refresh Data</span>
                    </button>
                  </div>

                  {/* SUMMARY CARDS GRID */}
                  {paymentsSummary && (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {/* Total Revenue Card */}
                      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                            Total Revenue
                          </span>
                          <CreditCard className="h-5 w-5 text-emerald-600" />
                        </div>
                        <p className="mt-3 font-serif text-3xl font-extrabold text-emerald-900">
                          ₹{paymentsSummary.totalRevenue.toLocaleString("en-IN")}
                        </p>
                        <p className="mt-1 text-[11px] text-emerald-700">
                          From {paymentsSummary.successfulPayments} verified PAID payments
                        </p>
                      </div>

                      {/* Total Transactions Card */}
                      <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-5 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
                            Total Transactions
                          </span>
                          <BarChart3 className="h-5 w-5 text-blue-600" />
                        </div>
                        <p className="mt-3 font-serif text-3xl font-extrabold text-blue-900">
                          {paymentsSummary.totalPayments}
                        </p>
                        <div className="mt-1 flex items-center gap-2 text-[11px] text-blue-700 font-medium">
                          <span>{paymentsSummary.successfulPayments} Paid</span>
                          <span>•</span>
                          <span>{paymentsSummary.pendingPayments} Pending</span>
                        </div>
                      </div>

                      {/* Plan Breakdown Card */}
                      <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                            Plan Memberships
                          </span>
                          <Tag className="h-5 w-5 text-amber-600" />
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div>
                            <span className="text-xs text-gray-500">Artist (₹1,999)</span>
                            <p className="font-bold text-lg text-[#111111]">
                              {paymentsSummary.artistPremiumPayments}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-gray-500">Brand (₹9,999)</span>
                            <p className="font-bold text-lg text-[#111111]">
                              {paymentsSummary.brandPremiumPayments}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Active Entitlements Card */}
                      <div className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-white p-5 shadow-2xs sm:col-span-2 lg:col-span-3 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                            <ShieldCheck size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-indigo-950">
                              3-Month Premium Entitlements
                            </h4>
                            <p className="text-xs text-indigo-700">
                              Current status of user access rights across the platform
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
                              Active Access
                            </span>
                            <p className="font-serif text-2xl font-bold text-emerald-900">
                              {paymentsSummary.activePremiumEntitlements}
                            </p>
                          </div>
                          <div className="text-center">
                            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                              Expired Access
                            </span>
                            <p className="font-serif text-2xl font-bold text-gray-600">
                              {paymentsSummary.expiredPremiumEntitlements}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SEARCH & FILTERS BAR */}
                  <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-2xs space-y-3">
                    <div className="grid gap-3 sm:grid-cols-12">
                      <div className="relative sm:col-span-6">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          value={paymentSearch}
                          onChange={(e) => {
                            setPaymentSearch(e.target.value);
                            setPaymentPage(1);
                          }}
                          placeholder="Search by Email or Order ID..."
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-xs text-[#111111] focus:border-[#D4AF37] focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <select
                          value={paymentFilterPlan}
                          onChange={(e) => {
                            setPaymentFilterPlan(e.target.value);
                            setPaymentPage(1);
                          }}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 px-3 text-xs text-[#111111] focus:border-[#D4AF37] focus:bg-white focus:outline-none cursor-pointer"
                        >
                          <option value="ALL">All Plans</option>
                          <option value="ARTIST_PREMIUM">Artist Premium (₹1,999)</option>
                          <option value="BRAND_PREMIUM">Brand Premium (₹9,999)</option>
                        </select>
                      </div>

                      <div className="sm:col-span-3">
                        <select
                          value={paymentFilterStatus}
                          onChange={(e) => {
                            setPaymentFilterStatus(e.target.value);
                            setPaymentPage(1);
                          }}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 px-3 text-xs text-[#111111] focus:border-[#D4AF37] focus:bg-white focus:outline-none cursor-pointer"
                        >
                          <option value="ALL">All Statuses</option>
                          <option value="PAID">PAID</option>
                          <option value="PENDING">PENDING</option>
                          <option value="FAILED">FAILED</option>
                          <option value="REFUNDED">REFUNDED</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* LOADING SKELETON */}
                  {loadingPayments && (
                    <div className="space-y-3 py-4">
                      {[1, 2, 3, 4, 5].map((idx) => (
                        <div
                          key={idx}
                          className="h-16 w-full rounded-2xl bg-gray-100 animate-pulse"
                        />
                      ))}
                    </div>
                  )}

                  {/* ERROR STATE */}
                  {!loadingPayments && paymentsError && (
                    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center">
                      <AlertTriangle size={32} className="mx-auto mb-2 text-rose-600" />
                      <p className="font-bold text-rose-900 text-sm">{paymentsError}</p>
                      <button
                        type="button"
                        onClick={() => fetchPayments()}
                        className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 transition cursor-pointer shadow-xs"
                      >
                        <RefreshCw size={14} />
                        <span>Retry</span>
                      </button>
                    </div>
                  )}

                  {/* EMPTY STATE */}
                  {!loadingPayments && !paymentsError && paymentsList.length === 0 && (
                    <div className="rounded-2xl border border-gray-200 bg-[#F7F7F5] p-12 text-center text-xs text-gray-500">
                      <CreditCard size={40} className="mx-auto mb-3 text-[#D4AF37]" />
                      <p className="font-serif text-base font-bold text-[#111111]">
                        No payment records found
                      </p>
                      <p className="mt-1 text-gray-400">
                        No transactions match the selected filters or search query.
                      </p>
                    </div>
                  )}

                  {/* PAYMENTS HISTORY TABLE */}
                  {!loadingPayments && !paymentsError && paymentsList.length > 0 && (
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-[#111111]">
                          <thead className="bg-[#F7F7F5] border-b border-gray-200 text-[11px] font-bold uppercase tracking-wider text-gray-600">
                            <tr>
                              <th className="px-4 py-3.5">User</th>
                              <th className="px-4 py-3.5">Plan</th>
                              <th className="px-4 py-3.5">Amount</th>
                              <th className="px-4 py-3.5">Status</th>
                              <th className="px-4 py-3.5">Order / Gateway ID</th>
                              <th className="px-4 py-3.5">Date</th>
                              <th className="px-4 py-3.5">Access Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {paymentsList.map((pay) => {
                              const userName =
                                pay.user?.artistProfile?.fullName ||
                                pay.user?.brandProfile?.companyName ||
                                pay.user?.email ||
                                "User";
                              const isPaid = pay.status === "PAID";
                              const entitlement = pay.user?.entitlement;
                              const isEntitlementActive =
                                entitlement?.expiresAt &&
                                new Date(entitlement.expiresAt) > new Date();

                              return (
                                <tr key={pay.id} className="hover:bg-gray-50/80 transition">
                                  <td className="px-4 py-3.5 font-medium">
                                    <div className="font-bold text-[#111111]">{userName}</div>
                                    <div className="text-[10px] text-gray-400">{pay.user?.email}</div>
                                  </td>

                                  <td className="px-4 py-3.5">
                                    <span className="font-semibold text-gray-800">
                                      {pay.plan === "BRAND_PREMIUM" ? "Brand Premium" : "Artist Premium"}
                                    </span>
                                  </td>

                                  <td className="px-4 py-3.5 font-bold text-[#111111]">
                                    ₹{pay.amount.toLocaleString("en-IN")}
                                  </td>

                                  <td className="px-4 py-3.5">
                                    {isPaid ? (
                                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                                        <CheckCircle2 size={12} />
                                        PAID
                                      </span>
                                    ) : pay.status === "PENDING" ? (
                                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">
                                        PENDING
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-[10px] font-bold text-rose-800">
                                        {pay.status}
                                      </span>
                                    )}
                                  </td>

                                  <td className="px-4 py-3.5 text-[11px] font-mono text-gray-500">
                                    <div>{pay.razorpayOrderId || pay.id.substring(0, 18)}</div>
                                    {pay.razorpayPaymentId && (
                                      <div className="text-[10px] text-emerald-700">{pay.razorpayPaymentId}</div>
                                    )}
                                  </td>

                                  <td className="px-4 py-3.5 text-gray-500 whitespace-nowrap">
                                    {new Date(pay.createdAt).toLocaleDateString("en-IN", {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    })}
                                  </td>

                                  <td className="px-4 py-3.5 whitespace-nowrap">
                                    {isEntitlementActive ? (
                                      <span className="rounded-md bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                                        Active until {new Date(entitlement.expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                                      </span>
                                    ) : (
                                      <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                                        Inactive / Expired
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      {/* PAGINATION BAR */}
                      {paymentTotalPages > 1 && (
                        <div className="flex items-center justify-between border-t border-gray-200 bg-[#F7F7F5] px-4 py-3 text-xs">
                          <span className="text-gray-500 font-medium">
                            Page {paymentPage} of {paymentTotalPages}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setPaymentPage((p) => Math.max(1, p - 1))}
                              disabled={paymentPage <= 1}
                              className="rounded-lg border border-gray-300 bg-white px-3 py-1 text-xs font-bold text-[#111111] disabled:opacity-40 cursor-pointer"
                            >
                              Previous
                            </button>
                            <button
                              type="button"
                              onClick={() => setPaymentPage((p) => Math.min(paymentTotalPages, p + 1))}
                              disabled={paymentPage >= paymentTotalPages}
                              className="rounded-lg border border-gray-300 bg-white px-3 py-1 text-xs font-bold text-[#111111] disabled:opacity-40 cursor-pointer"
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Reveal>
            )}

          </div>
        </div>
      </section>

      {/* APPROVE / REJECT CONFIRMATION & FEEDBACK MODAL */}
      {actionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-2xl my-8 space-y-4">
            <button
              type="button"
              onClick={() => {
                setActionModal(null);
                setAdminFeedback("");
                setActionError(null);
              }}
              className="absolute right-5 top-5 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 cursor-pointer"
            >
              <X size={20} />
            </button>

            {actionModal.type.startsWith("view") ? (
              <div className="space-y-4 text-xs">
                <h2 className="font-serif text-xl font-bold text-[#111111]">
                  {"companyName" in actionModal.item
                    ? actionModal.item.companyName
                    : "fullName" in actionModal.item
                    ? actionModal.item.fullName
                    : actionModal.item.title}
                </h2>
                <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-gray-200 leading-relaxed text-[#333333]">
                  {"companyName" in actionModal.item
                    ? actionModal.item.companyDescription || "No company description provided"
                    : "bio" in actionModal.item
                    ? actionModal.item.bio || "No bio provided"
                    : actionModal.item.description}
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <h2 className="font-serif text-xl font-bold text-[#111111]">
                  {actionModal.type.includes("approve") ? "Confirm Approval" : "Confirm Rejection"}
                </h2>

                <p className="text-gray-600">
                  Target: <span className="font-bold text-[#111111]">
                    {"companyName" in actionModal.item
                      ? actionModal.item.companyName
                      : "fullName" in actionModal.item
                      ? actionModal.item.fullName
                      : actionModal.item.title}
                  </span>
                </p>

                {actionError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 font-bold">
                    {actionError}
                  </div>
                )}

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Admin Moderation Feedback (Optional):
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter review notes for artist or brand..."
                    value={adminFeedback}
                    onChange={(e) => setAdminFeedback(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 p-3 focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
                  <button
                    type="button"
                    onClick={() => setActionModal(null)}
                    className="px-4 py-2 rounded-xl border border-gray-300 text-gray-600 font-bold hover:bg-gray-100"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    disabled={submittingAction}
                    onClick={handleExecuteAction}
                    className={`px-5 py-2 rounded-xl font-bold text-white transition cursor-pointer disabled:opacity-50 ${
                      actionModal.type.includes("approve") ? "bg-emerald-600 hover:bg-emerald-700" : "bg-rose-600 hover:bg-rose-700"
                    }`}
                  >
                    {submittingAction ? "Processing..." : actionModal.type.includes("approve") ? "Approve Now" : "Reject Now"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
