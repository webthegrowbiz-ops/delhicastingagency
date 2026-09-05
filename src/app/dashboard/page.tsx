"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  Briefcase,
  Building2,
  Edit,
  LogOut,
  MapPin,
  Sparkles,
  User,
  Clock,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Tag,
  Calendar,
  Plus,
  Trash2,
  Users,
  Search,
  Filter,
  X,
  ExternalLink,
  Check,
} from "lucide-react";

import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import {
  isUserAuthenticated,
  getUserSession,
  getAuthToken,
  clearDCAUserSession,
  fetchBackendEntitlement,
  type ProfileStatus,
} from "@/lib/auth";
import { API_URL } from "@/config/env";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import {
  PremiumFlowModal,
  PremiumModalStep,
} from "@/components/premium-flow-modal";

interface BackendArtistProfile {
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
  chest: string | null;
  waist: string | null;
  hips: string | null;
  languages: string | null;
  skills: string | null;
  specialAbilities: string | null;
  profilePhoto: string | null;
  headshots: string | null;
  verificationStatus: ProfileStatus;
  adminFeedback: string | null;
  submittedAt: string | null;
  approvedAt: string | null;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

interface BackendArtistApplication {
  id: string;
  artistId: string;
  castingCallId: string;
  message: string | null;
  portfolioUrl: string | null;
  status: "PENDING" | "SHORTLISTED" | "SELECTED" | "REJECTED";
  adminFeedback: string | null;
  appliedAt: string;
  updatedAt: string;
  castingCall: {
    id: string;
    title: string;
    category: string | null;
    location: string | null;
    compensation: string | null;
    approvalStatus: string;
    brand?: {
      id?: string;
      email?: string;
      brandProfile?: {
        companyName?: string | null;
        companyLogo?: string | null;
      };
    };
  };
}

interface BrandCastingCall {
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
  approvalStatus: "PENDING_REVIEW" | "APPROVED" | "REJECTED";
  isClosed?: boolean;
  closedAt?: string | null;
  adminFeedback: string | null;
  submittedAt: string | null;
  approvedAt: string | null;
  createdAt: string;
  updatedAt: string;
  _count?: {
    applications: number;
  };
}

interface BrandApplicant {
  id: string;
  artistId: string;
  castingCallId: string;
  message: string | null;
  portfolioUrl: string | null;
  status: "PENDING" | "SHORTLISTED" | "SELECTED" | "REJECTED";
  adminFeedback: string | null;
  appliedAt: string;
  artist: {
    id: string;
    fullName: string;
    city: string | null;
    state: string | null;
    gender: string | null;
    dateOfBirth: string | null;
    height: string | null;
    weight: string | null;
    skills: string | null;
    languages: string | null;
    specialAbilities: string | null;
    profilePhoto: string | null;
    headshots: string | null;
    bio?: string | null;
    user?: {
      email: string;
    };
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<"artist" | "brand">("artist");
  const [activeTab, setActiveTab] = useState<"profile" | "opportunities" | "saved">("profile");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInitialStep, setModalInitialStep] = useState<PremiumModalStep | undefined>(undefined);
  const [profileStatus, setProfileStatus] = useState<ProfileStatus>("PENDING_REVIEW");
  const [isPremiumUser, setIsPremiumUser] = useState(false);

  // Artist Profile states
  const [profile, setProfile] = useState<BackendArtistProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  // Real Applications state for Artists
  const [applications, setApplications] = useState<BackendArtistApplication[]>([]);
  const [loadingApps, setLoadingApps] = useState<boolean>(false);
  const [appsError, setAppsError] = useState<string | null>(null);

  // Brand states
  const [brandCastings, setBrandCastings] = useState<BrandCastingCall[]>([]);
  const [loadingBrandCastings, setLoadingBrandCastings] = useState<boolean>(false);
  const [brandCastingsError, setBrandCastingsError] = useState<string | null>(null);

  // Brand Create/Edit Modal State
  const [castingModalOpen, setCastingModalOpen] = useState(false);
  const [editingCasting, setEditingCasting] = useState<BrandCastingCall | null>(null);
  const [castingFormData, setCastingFormData] = useState({
    title: "",
    description: "",
    category: "Actors",
    location: "Mumbai",
    compensation: "₹50,000 / Day",
    startDate: "",
    endDate: "",
    ageMin: "18",
    ageMax: "35",
    gender: "Any",
    requirements: "",
  });
  const [submittingCasting, setSubmittingCasting] = useState(false);
  const [castingFormError, setCastingFormError] = useState<string | null>(null);
  const [castingSuccessMsg, setCastingSuccessMsg] = useState<string | null>(null);

  // Brand Applicants State
  const [selectedCastingForApps, setSelectedCastingForApps] = useState<BrandCastingCall | null>(null);
  const [brandApplicants, setBrandApplicants] = useState<BrandApplicant[]>([]);
  const [loadingApplicants, setLoadingApplicants] = useState(false);
  const [applicantsError, setApplicantsError] = useState<string | null>(null);
  const [applicantFilterStatus, setApplicantFilterStatus] = useState<string>("ALL");
  const [applicantSearch, setApplicantSearch] = useState("");

  // Applicant Detail Modal
  const [selectedApplicantModal, setSelectedApplicantModal] = useState<BrandApplicant | null>(null);
  const [updatingAppId, setUpdatingAppId] = useState<string | null>(null);

  // Brand Profile State
  const [brandData, setBrandData] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
    companyName?: string;
    designation?: string;
    category?: string;
    city?: string;
    state?: string;
    website?: string;
    description?: string;
    companyLogo?: string | null;
    verificationStatus?: "PENDING_REVIEW" | "APPROVED" | "REJECTED";
    adminFeedback?: string | null;
  } | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!isUserAuthenticated()) {
      router.push("/login");
      return;
    }

    const loadLocalFallback = () => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("dca_artist_profile");
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (parsed.formData) {
              const fallbackProfile: BackendArtistProfile = {
                id: getUserSession()?.id || "artist-profile-local",
                userId: getUserSession()?.id || "artist-user-local",
                fullName: parsed.formData.fullName || "Aarav Sharma",
                phone: parsed.formData.phone || null,
                gender: parsed.formData.gender || "Male",
                dateOfBirth: parsed.formData.dob || null,
                city: parsed.formData.city || "New Delhi",
                state: parsed.formData.state || "Delhi NCR",
                bio: parsed.formData.portfolioDescription || null,
                height: parsed.formData.height || null,
                weight: parsed.formData.weight || null,
                chest: parsed.formData.chest || null,
                waist: parsed.formData.waist || null,
                hips: parsed.formData.hips || null,
                languages: parsed.formData.languages || null,
                skills: parsed.formData.skills || null,
                specialAbilities: parsed.formData.specialSkills || null,
                profilePhoto: parsed.photoFiles?.frontPhoto || null,
                headshots: [
                  parsed.photoFiles?.leftPhoto,
                  parsed.photoFiles?.rightPhoto,
                  parsed.photoFiles?.backPhoto,
                ]
                  .filter(Boolean)
                  .join(",") || null,
                verificationStatus: "APPROVED",
                adminFeedback: null,
                submittedAt: parsed.savedAt || new Date().toISOString(),
                approvedAt: new Date().toISOString(),
                createdAt: parsed.savedAt || new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                user: {
                  id: getUserSession()?.id || "artist-user-local",
                  email: parsed.formData.email || getUserSession()?.email || "artist@example.com",
                  role: "ARTIST",
                },
              };
              setProfile(fallbackProfile);
              setLoading(false);
              setNotFound(false);
              return true;
            }
          } catch (e) {
            console.error("Error parsing local artist profile", e);
          }
        }
      }
      return false;
    };

    const token = getAuthToken();
    if (!token) {
      if (loadLocalFallback()) return;
      router.push("/login");
      return;
    }

    setLoading(true);
    setError(null);
    setNotFound(false);

    try {
      const response = await fetch(`${API_URL}/api/artist/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        if (loadLocalFallback()) return;
        clearDCAUserSession();
        router.push("/login");
        return;
      }

      if (response.status === 404) {
        if (loadLocalFallback()) return;
        setNotFound(true);
        setLoading(false);
        return;
      }

      const data = (await response.json()) as {
        success: boolean;
        message?: string;
        profile?: BackendArtistProfile;
      };

      if (!response.ok || !data.success || !data.profile) {
        if (loadLocalFallback()) return;
        setError(data.message || "Failed to fetch artist profile");
        setLoading(false);
        return;
      }

      setProfile(data.profile);
      if (data.profile.verificationStatus) {
        setProfileStatus(data.profile.verificationStatus);
      }
      setLoading(false);
    } catch (err: unknown) {
      console.error("Dashboard fetch profile error:", err);
      if (loadLocalFallback()) return;
      setError("Unable to connect to backend server. Please check your connection.");
      setLoading(false);
    }
  }, [router]);

  const fetchApplications = useCallback(async () => {
    if (!isUserAuthenticated()) return;
    const token = getAuthToken();
    if (!token) return;

    setLoadingApps(true);
    setAppsError(null);

    try {
      const response = await fetch(`${API_URL}/api/artist/applications`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        clearDCAUserSession();
        router.push("/login");
        return;
      }

      const data = (await response.json()) as {
        success: boolean;
        message?: string;
        count?: number;
        applications?: BackendArtistApplication[];
      };

      if (!response.ok || !data.success) {
        setAppsError(data.message || "Failed to fetch submitted applications");
        setLoadingApps(false);
        return;
      }

      setApplications(data.applications || []);
      setLoadingApps(false);
    } catch (err: unknown) {
      console.error("Dashboard fetch applications error:", err);
      setAppsError("Unable to connect to backend server. Please check your connection.");
      setLoadingApps(false);
    }
  }, [router]);

  const fetchBrandCastings = useCallback(async () => {
    if (!isUserAuthenticated()) return;
    const token = getAuthToken();
    if (!token) return;

    setLoadingBrandCastings(true);
    setBrandCastingsError(null);

    try {
      const response = await fetch(`${API_URL}/api/brand/casting`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        clearDCAUserSession();
        router.push("/login");
        return;
      }

      const data = (await response.json()) as {
        success: boolean;
        message?: string;
        count?: number;
        castings?: BrandCastingCall[];
      };

      if (!response.ok || !data.success) {
        setBrandCastingsError(data.message || "Failed to fetch brand casting calls");
        setLoadingBrandCastings(false);
        return;
      }

      setBrandCastings(data.castings || []);
      setLoadingBrandCastings(false);
    } catch (err: unknown) {
      console.error("Dashboard fetch brand castings error:", err);
      setBrandCastingsError("Unable to connect to backend server.");
      setLoadingBrandCastings(false);
    }
  }, [router]);

  const fetchApplicantsForCasting = useCallback(async (castingId: string) => {
    const token = getAuthToken();
    if (!token) return;

    setLoadingApplicants(true);
    setApplicantsError(null);

    try {
      const response = await fetch(`${API_URL}/api/brand/casting/${castingId}/applications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = (await response.json()) as {
        success: boolean;
        message?: string;
        applications?: BrandApplicant[];
      };

      if (!response.ok || !data.success) {
        setApplicantsError(data.message || "Failed to fetch applicants");
        setLoadingApplicants(false);
        return;
      }

      setBrandApplicants(data.applications || []);
      setLoadingApplicants(false);
    } catch (err: unknown) {
      console.error("Fetch applicants error:", err);
      setApplicantsError("Network error. Unable to fetch applicants.");
      setLoadingApplicants(false);
    }
  }, []);

  const fetchBrandProfile = useCallback(async () => {
    const token = getAuthToken();
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/api/brand/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.profile) {
          let bp = data.profile;

          // Retrieve any existing local registration data from localStorage
          let localFormData: Record<string, string | undefined> | null = null;
          if (typeof window !== "undefined") {
            try {
              const rawBrand = localStorage.getItem("dca_brand_profile");
              if (rawBrand) {
                const parsed = JSON.parse(rawBrand);
                if (parsed.formData && typeof parsed.formData === "object") {
                  localFormData = parsed.formData;
                }
              }
            } catch (e) {
              console.warn("Failed to parse local brand profile for migration check:", e);
            }
          }

          // Check if the database companyName is an auto-provisioned placeholder
          const session = getUserSession();
          const userEmail = session?.email || "";
          const emailPrefix = userEmail.includes("@") ? userEmail.split("@")[0] : "";
          const isPlaceholderCompanyName =
            !bp.companyName ||
            bp.companyName === "Brand Partner" ||
            bp.companyName === "Brand" ||
            (!!emailPrefix && bp.companyName.toLowerCase() === emailPrefix.toLowerCase());

          // User-scoped one-time migration check
          const migrationKey = `dca_brand_migrated_${bp.userId || session?.id || "user"}`;
          const alreadyMigrated =
            typeof window !== "undefined"
              ? localStorage.getItem(migrationKey) === "true"
              : false;

          // Perform one-time migration if local data exists, migration hasn't run,
          // and database profile has missing fields or placeholder companyName
          if (localFormData && !alreadyMigrated) {
            const migrationPayload: {
              companyName?: string;
              contactName?: string;
              phone?: string;
              email?: string;
              website?: string;
              city?: string;
              state?: string;
              companyDescription?: string;
            } = {};

            // Only migrate fields that are missing/null in DB or where DB has the placeholder
            if (isPlaceholderCompanyName && localFormData.companyName?.trim()) {
              migrationPayload.companyName = localFormData.companyName.trim();
            }
            if (!bp.contactName && localFormData.fullName?.trim()) {
              migrationPayload.contactName = localFormData.fullName.trim();
            }
            if (!bp.phone && localFormData.phone?.trim()) {
              migrationPayload.phone = localFormData.phone.trim();
            }
            if (!bp.email && localFormData.email?.trim()) {
              migrationPayload.email = localFormData.email.trim();
            }
            if (!bp.website && localFormData.website?.trim()) {
              migrationPayload.website = localFormData.website.trim();
            }
            if (!bp.city && localFormData.city?.trim()) {
              migrationPayload.city = localFormData.city.trim();
            }
            if (!bp.state && localFormData.state?.trim()) {
              migrationPayload.state = localFormData.state.trim();
            }
            if (!bp.companyDescription && localFormData.description?.trim()) {
              migrationPayload.companyDescription = localFormData.description.trim();
            }

            if (Object.keys(migrationPayload).length > 0) {
              try {
                const putRes = await fetch(`${API_URL}/api/brand/profile`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify(migrationPayload),
                });

                if (putRes.ok) {
                  const putData = await putRes.json();
                  if (putData.success && putData.profile) {
                    bp = putData.profile;
                    if (typeof window !== "undefined") {
                      localStorage.setItem(migrationKey, "true");
                    }
                  }
                }
              } catch (migrationErr) {
                console.warn(
                  "Brand profile migration PUT failed (will retry on next load):",
                  migrationErr,
                );
              }
            } else {
              // Nothing needed migrating, mark complete
              if (typeof window !== "undefined") {
                localStorage.setItem(migrationKey, "true");
              }
            }
          }

          // Compute effective companyName: preserve localStorage companyName if DB is placeholder
          const effectiveCompanyName =
            isPlaceholderCompanyName && (localFormData?.companyName || bp.companyName)
              ? (localFormData?.companyName || bp.companyName)
              : bp.companyName;

          setBrandData((prev) => ({
            ...prev,
            companyName: effectiveCompanyName || prev?.companyName,
            fullName: bp.contactName || prev?.fullName,
            phone: bp.phone || prev?.phone,
            email: bp.email || prev?.email,
            website: bp.website || prev?.website,
            city: bp.city || prev?.city,
            state: bp.state || prev?.state,
            description: bp.companyDescription || prev?.description,
            companyLogo: bp.companyLogo || prev?.companyLogo || null,
            verificationStatus: bp.verificationStatus,
            adminFeedback: bp.adminFeedback,
          }));
        }
      }
    } catch (err) {
      console.warn("Error fetching backend brand profile:", err);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!isUserAuthenticated()) {
        router.push("/login");
        return;
      }

      requestAnimationFrame(() => {
        const session = getUserSession();
        if (session?.role === "admin" || session?.role === "ADMIN") {
          router.push("/admin/dashboard");
          return;
        }

        if (session?.role === "brand" || session?.role === "BRAND") {
          setUserRole("brand");
          try {
            const rawBrand = localStorage.getItem("dca_brand_profile");
            if (rawBrand) {
              const parsed = JSON.parse(rawBrand);
              if (parsed.formData) {
                setBrandData(parsed.formData);
              }
            }
          } catch (e) {
            console.warn("Failed to load local brand profile:", e);
          }
          fetchBrandCastings();
          fetchBrandProfile();
        } else {
          setUserRole("artist");
          fetchProfile();
          fetchApplications();
        }

        // Authoritative backend entitlement verification:
        // Do NOT trust localStorage isPremium as the source of truth.
        fetchBackendEntitlement().then((res) => {
          const isBrandAccount =
            session?.role === "brand" || session?.role === "BRAND";
          const expectedPlan = isBrandAccount
            ? "BRAND_PREMIUM"
            : "ARTIST_PREMIUM";

          if (res.isPremium && res.entitlement?.plan === expectedPlan) {
            setIsPremiumUser(true);
          } else {
            setIsPremiumUser(false);
          }
        });
      });
    }
  }, [router, fetchProfile, fetchApplications, fetchBrandCastings]);

  const handleLogout = () => {
    clearDCAUserSession();
    router.push("/login");
  };

  const handleOpenPremiumCheckout = () => {
    if (!isUserAuthenticated()) {
      router.push("/profile/setup");
      return;
    }
    const session = getUserSession();
    const isBrandAccount =
      userRole === "brand" ||
      session?.role === "brand" ||
      session?.role === "BRAND";
    if (isBrandAccount) {
      setModalInitialStep("brand_checkout");
    } else {
      setModalInitialStep("artist_checkout");
    }
    setModalOpen(true);
  };

  // Open Create/Edit Casting Modal
  const handleOpenCreateCasting = () => {
    if (brandData?.verificationStatus !== "APPROVED") {
      alert(
        brandData?.verificationStatus === "REJECTED"
          ? "Your brand account verification was rejected. You cannot post casting calls."
          : "Your brand account is currently under review. Admin approval is required before you can post casting calls."
      );
      return;
    }

    setEditingCasting(null);
    setCastingFormData({
      title: "",
      description: "",
      category: "Actors",
      location: "Mumbai",
      compensation: "₹50,000 / Day",
      startDate: "",
      endDate: "",
      ageMin: "18",
      ageMax: "35",
      gender: "Any",
      requirements: "",
    });
    setCastingFormError(null);
    setCastingSuccessMsg(null);
    setCastingModalOpen(true);
  };

  const handleOpenEditCasting = (casting: BrandCastingCall) => {
    setEditingCasting(casting);
    setCastingFormData({
      title: casting.title,
      description: casting.description,
      category: casting.category || "Actors",
      location: casting.location || "Mumbai",
      compensation: casting.compensation || "",
      startDate: casting.startDate ? casting.startDate.substring(0, 10) : "",
      endDate: casting.endDate ? casting.endDate.substring(0, 10) : "",
      ageMin: casting.ageMin !== null ? String(casting.ageMin) : "",
      ageMax: casting.ageMax !== null ? String(casting.ageMax) : "",
      gender: casting.gender || "Any",
      requirements: casting.requirements || "",
    });
    setCastingFormError(null);
    setCastingSuccessMsg(null);
    setCastingModalOpen(true);
  };

  const handleSaveCasting = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getAuthToken();
    if (!token) return;

    if (!castingFormData.title.trim()) {
      setCastingFormError("Title is required");
      return;
    }
    if (!castingFormData.description.trim()) {
      setCastingFormError("Description is required");
      return;
    }

    setSubmittingCasting(true);
    setCastingFormError(null);

    try {
      const isEdit = !!editingCasting;
      const url = isEdit
        ? `${API_URL}/api/casting/${editingCasting.id}`
        : `${API_URL}/api/casting`;
      const method = isEdit ? "PUT" : "POST";

      const payload = {
        title: castingFormData.title.trim(),
        description: castingFormData.description.trim(),
        category: castingFormData.category.trim(),
        location: castingFormData.location.trim(),
        compensation: castingFormData.compensation.trim(),
        startDate: castingFormData.startDate || undefined,
        endDate: castingFormData.endDate || undefined,
        ageMin: castingFormData.ageMin ? Number(castingFormData.ageMin) : undefined,
        ageMax: castingFormData.ageMax ? Number(castingFormData.ageMax) : undefined,
        gender: castingFormData.gender.trim(),
        requirements: castingFormData.requirements.trim() || undefined,
      };

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as {
        success: boolean;
        message?: string;
        castingCall?: BrandCastingCall;
      };

      if (!response.ok || !data.success) {
        setCastingFormError(data.message || "Failed to save casting call");
        setSubmittingCasting(false);
        return;
      }

      setCastingSuccessMsg(
        isEdit
          ? "Casting call updated and resubmitted for admin review!"
          : "Casting call submitted successfully for admin review!"
      );
      setSubmittingCasting(false);
      fetchBrandCastings();
      setTimeout(() => {
        setCastingModalOpen(false);
      }, 1500);
    } catch (err: unknown) {
      console.error("Save casting error:", err);
      setCastingFormError("Network error. Failed to save casting call.");
      setSubmittingCasting(false);
    }
  };

  const handleDeleteCasting = async (castingId: string) => {
    if (!confirm("Are you sure you want to close this casting call?")) {
      return;
    }

    const token = getAuthToken();
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/api/casting/${castingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchBrandCastings();
      } else {
        alert("Failed to delete casting call.");
      }
    } catch (err: unknown) {
      console.error("Delete casting error:", err);
      alert("Network error deleting casting call.");
    }
  };

  const handleUpdateApplicationStatus = async (
    applicationId: string,
    newStatus: "SHORTLISTED" | "SELECTED" | "REJECTED"
  ) => {
    const token = getAuthToken();
    if (!token) return;

    setUpdatingAppId(applicationId);

    try {
      const response = await fetch(
        `${API_URL}/api/brand/applications/${applicationId}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        setBrandApplicants((prev) =>
          prev.map((app) =>
            app.id === applicationId ? { ...app, status: newStatus } : app
          )
        );
        if (selectedApplicantModal && selectedApplicantModal.id === applicationId) {
          setSelectedApplicantModal((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      } else {
        alert("Failed to update candidate status.");
      }
    } catch (err: unknown) {
      console.error("Update status error:", err);
      alert("Network error updating status.");
    } finally {
      setUpdatingAppId(null);
    }
  };

  const isBrand = userRole === "brand";

  // Filtered applicants
  const filteredApplicants = brandApplicants.filter((app) => {
    if (applicantFilterStatus !== "ALL" && app.status !== applicantFilterStatus) {
      return false;
    }
    if (applicantSearch.trim()) {
      const q = applicantSearch.toLowerCase();
      const nameMatch = app.artist.fullName.toLowerCase().includes(q);
      const cityMatch = app.artist.city?.toLowerCase().includes(q);
      const skillsMatch = app.artist.skills?.toLowerCase().includes(q);
      return nameMatch || cityMatch || skillsMatch;
    }
    return true;
  });

  // Dynamic Profile Completion Percentage
  const completionPercentage = (() => {
    if (isBrand) {
      if (!brandData) return 90;
      const fields = [
        brandData.companyName,
        brandData.fullName,
        brandData.email,
        brandData.phone,
        brandData.category,
        brandData.city,
        brandData.state,
        brandData.description,
        brandData.website,
        brandData.designation,
      ];
      const filled = fields.filter((f) => f && String(f).trim().length > 0).length;
      return Math.min(100, Math.max(90, Math.round((filled / fields.length) * 100)));
    }
    if (!profile) return 90;
    const fields = [
      profile.fullName,
      profile.phone,
      profile.gender,
      profile.dateOfBirth,
      profile.city,
      profile.state,
      profile.bio,
      profile.height,
      profile.weight,
      profile.chest,
      profile.waist,
      profile.languages,
      profile.skills,
      profile.profilePhoto || profile.headshots,
    ];
    const filled = fields.filter((f) => f && String(f).trim().length > 0).length;
    return Math.min(100, Math.max(90, Math.round((filled / fields.length) * 100)));
  })();

  // Dynamic Profile Avatar URL
  const avatarUrl = (() => {
    if (isBrand) {
      if (brandData?.companyLogo && brandData.companyLogo.trim().length > 0) {
        return brandData.companyLogo.trim();
      }
      return null;
    }
    if (!profile) return null;
    if (profile.profilePhoto && profile.profilePhoto.trim().length > 0) {
      return profile.profilePhoto;
    }
    if (profile.headshots && profile.headshots.trim().length > 0) {
      const firstHeadshot = profile.headshots.split(",")[0].trim();
      if (firstHeadshot) return firstHeadshot;
    }
    return null;
  })();

  if (loading && !isBrand) {
    return (
      <main className="min-h-screen bg-white text-[#111111] flex flex-col items-center justify-center p-8">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#D4AF37]"></div>
        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-[#555555]">
          Loading Artist Profile...
        </p>
      </main>
    );
  }

  if (notFound && !isBrand) {
    return (
      <main className="min-h-screen bg-white text-[#111111]">
        <div className="mx-auto max-w-xl px-4 py-24 text-center">
          <div className="rounded-3xl border border-gray-200 bg-[#F7F7F5] p-8 shadow-xs">
            <User size={48} className="mx-auto text-[#D4AF37]" />
            <h2 className="mt-4 font-serif text-2xl font-bold text-[#111111]">
              No Profile Found
            </h2>
            <p className="mt-2 text-xs text-[#555555] leading-relaxed">
              You haven&apos;t created your artist profile details yet. Complete your
              profile to get verified and access casting calls.
            </p>
            <Link
              href="/profile/setup"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#C59B27]"
            >
              <span>Create Artist Profile</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (error && !isBrand) {
    return (
      <main className="min-h-screen bg-white text-[#111111] flex flex-col items-center justify-center p-8 text-center">
        <AlertTriangle size={44} className="text-amber-500" />
        <h2 className="mt-4 font-serif text-xl font-bold text-[#111111]">
          Failed to Load Profile
        </h2>
        <p className="mt-2 text-xs text-red-600 max-w-md">{error}</p>
        <button
          type="button"
          onClick={fetchProfile}
          className="mt-6 rounded-xl bg-[#D4AF37] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#C59B27] transition cursor-pointer shadow-xs"
        >
          Retry Connection
        </button>
      </main>
    );
  }

  const fullName = isBrand
    ? (brandData?.companyName || brandData?.fullName || "Brand Partner")
    : (profile?.fullName || "Artist");
  const email = isBrand
    ? (brandData?.email || getUserSession()?.email || "Not specified")
    : (profile?.user?.email || "Not specified");
  const phone = isBrand
    ? (brandData?.phone || "Not provided")
    : (profile?.phone || "Not provided");
  const city = isBrand ? (brandData?.city || "Mumbai") : (profile?.city || "Mumbai");
  const state = isBrand ? (brandData?.state || "Maharashtra") : (profile?.state || "Maharashtra");
  const gender = profile?.gender || "Artist";
  const height = profile?.height || "Not specified";
  const weight = profile?.weight || "Not specified";
  const chest = profile?.chest || "Not specified";
  const waist = profile?.waist || "Not specified";
  const languages = profile?.languages || "Not specified";
  const skills = profile?.skills || "Not specified";
  const specialSkills = profile?.specialAbilities || "Not specified";
  const adminFeedback = profile?.adminFeedback;

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <PageHero
        eyebrow={isBrand ? "Brand & Production Portal" : "Artist Portal"}
        title={isBrand ? "Brand Casting Dashboard" : `Welcome, ${fullName}`}
        description={
          isBrand
            ? "Manage active casting announcements, post project requirements, and source verified talent rosters."
            : "Manage your artist profile, portfolio headshots, and review verified casting calls."
        }
      />

      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: isBrand ? "Brand Dashboard" : "Artist Dashboard" },
          ]}
        />
      </div>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* LEFT SIDEBAR — USER ACTIONS, STATS & NAVIGATION */}
          <div className="lg:col-span-4 space-y-6">
            <Reveal>
              <div className="relative rounded-3xl border border-gray-200 bg-white p-6 shadow-md">
                <div className="absolute top-5 right-5 z-10">
                  <NotificationBell />
                </div>

                {/* Main Avatar */}
                <div className="relative mx-auto aspect-square w-32 overflow-hidden rounded-2xl border-2 border-[#D4AF37] shadow-md bg-gray-100 flex items-center justify-center">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt={fullName}
                      fill
                      className="object-cover"
                    />
                  ) : isBrand ? (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-2 text-[#D4AF37]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 shadow-xs">
                        <Building2 size={26} className="text-[#D4AF37]" />
                      </div>
                      <span className="mt-2 font-serif text-sm font-bold tracking-wider text-[#111111] truncate max-w-[110px] text-center">
                        {fullName && fullName !== "Brand Partner"
                          ? fullName
                              .split(" ")
                              .map((w) => w[0])
                              .filter(Boolean)
                              .slice(0, 3)
                              .join("")
                              .toUpperCase()
                          : "BRAND"}
                      </span>
                      <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest">
                        Casting Partner
                      </span>
                    </div>
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-2 text-[#D4AF37]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 shadow-xs">
                        <User size={26} className="text-[#D4AF37]" />
                      </div>
                      <span className="mt-2 font-serif text-sm font-bold tracking-wider text-[#111111] truncate max-w-[110px] text-center">
                        {fullName && fullName !== "Artist"
                          ? fullName
                              .split(" ")
                              .map((w) => w[0])
                              .filter(Boolean)
                              .slice(0, 3)
                              .join("")
                              .toUpperCase()
                          : "ARTIST"}
                      </span>
                      <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest">
                        Artist Profile
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 text-center">
                  <h2 className="font-serif text-xl font-bold text-[#111111]">
                    {fullName}
                  </h2>
                  <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mt-0.5">
                    {isBrand
                      ? brandData?.verificationStatus === "APPROVED"
                        ? "Verified Brand Coordinator"
                        : brandData?.verificationStatus === "REJECTED"
                        ? "Brand Account (Rejected)"
                        : "Brand Coordinator (Under Review)"
                      : `${gender} Artist`}
                  </p>
                  <p className="mt-1 flex items-center justify-center gap-1 text-xs text-[#555555]">
                    <MapPin size={12} className="text-[#D4AF37]" />
                    {city}, {state}
                  </p>
                </div>

                {/* Profile Completion Bar (Artist & Brand) */}
                <div className="mt-6 border-t border-gray-200 pt-5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-[#555555]">Profile Completion Level</span>
                    <span className="text-[#D4AF37] font-bold">
                      {completionPercentage}%
                    </span>
                  </div>
                  <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-gray-100 border border-gray-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C59B27]"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs font-medium text-[#555555]">
                    You have completed {completionPercentage}% of your profile
                  </p>
                </div>

                {/* Navigation Tabs */}
                <div className="mt-6 space-y-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab("profile")}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-wider transition ${
                      activeTab === "profile"
                        ? "bg-[#D4AF37] text-white shadow-xs"
                        : "bg-[#F7F7F5] text-[#111111] hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      <span>
                        {isBrand ? "Company Overview" : "My Casting Profile"}
                      </span>
                    </div>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("opportunities")}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-wider transition ${
                      activeTab === "opportunities"
                        ? "bg-[#D4AF37] text-white shadow-xs"
                        : "bg-[#F7F7F5] text-[#111111] hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} />
                      <span>
                        {isBrand ? "My Casting Calls" : "My Applications"}
                      </span>
                    </div>
                    <span className="rounded-full bg-[#D4AF37]/20 px-2 py-0.5 text-[10px] font-bold text-[#D4AF37]">
                      {isBrand ? `${brandCastings.length} Active` : `${applications.length} Submitted`}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("saved")}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-wider transition ${
                      activeTab === "saved"
                        ? "bg-[#D4AF37] text-white shadow-xs"
                        : "bg-[#F7F7F5] text-[#111111] hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isBrand ? <Users size={16} /> : <Bookmark size={16} />}
                      <span>
                        {isBrand ? "Talent Sourcing Roster" : "Saved Audition Calls"}
                      </span>
                    </div>
                    <span className="rounded-full bg-gray-200 px-2 py-0.5 text-[10px] font-bold text-[#555555]">
                      {isBrand ? `${brandApplicants.length} Candidates` : "4 Saved"}
                    </span>
                  </button>
                </div>

                {/* PREMIUM CTA CARD IN SIDEBAR */}
                <div className="mt-6 rounded-2xl border border-[#D4AF37]/40 bg-[#F7F7F5] p-5 text-center shadow-xs">
                  {isPremiumUser ? (
                    <>
                      <div className="inline-flex items-center justify-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                        <CheckCircle2 size={13} className="text-emerald-600" />
                        <span>Active Premium Member</span>
                      </div>
                      <h3 className="mt-2 font-serif text-sm font-bold text-[#111111]">
                        {isBrand ? "Brand Premium Active" : "Artist Premium Active"}
                      </h3>
                    </>
                  ) : (
                    <>
                      <div className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#D4AF37]">
                        <Sparkles size={13} />
                        <span>{isBrand ? "Brand Premium" : "Artist Premium"}</span>
                      </div>

                      <h3 className="mt-2 font-serif text-sm font-bold text-[#111111]">
                        {isBrand ? "Premium Casting Account" : "Artist Premium Membership"}
                      </h3>

                      <button
                        type="button"
                        onClick={handleOpenPremiumCheckout}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#D4AF37] py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#C59B27] cursor-pointer"
                      >
                        <span>
                          {isBrand ? "GO PREMIUM — ₹9,999" : "UPGRADE TO PREMIUM"}
                        </span>
                        <ArrowRight size={14} />
                      </button>
                    </>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-6 border-t border-gray-200 pt-5 space-y-3">
                  {isBrand && (
                    <button
                      type="button"
                      onClick={handleOpenCreateCasting}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#111111] py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#D4AF37] cursor-pointer"
                    >
                      <Plus size={16} />
                      <span>Post New Casting Call</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-3 text-xs font-bold uppercase tracking-wider text-red-600 transition hover:bg-red-500 hover:text-white cursor-pointer"
                  >
                    <LogOut size={14} />
                    <span>Logout Account</span>
                  </button>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT MAIN DISPLAY AREA — PROFILE PREVIEW / CASTING CALLS / CANDIDATE ROSTER */}
          <div className="lg:col-span-8">
            
            {/* TAB 1: PROFILE / COMPANY OVERVIEW */}
            {activeTab === "profile" && (
              <Reveal>
                <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-md">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-5">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                        {isBrand ? "Company Overview" : "Artist Portfolio"}
                      </span>
                      <h2 className="font-serif text-2xl font-bold text-[#111111]">
                        {fullName}
                      </h2>
                    </div>

                    <Link
                      href={isBrand ? "/register/brand" : "/profile/setup"}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-[#F7F7F5] px-4 py-2 text-xs font-bold text-[#111111] transition hover:bg-[#D4AF37] hover:text-white"
                    >
                      <Edit size={14} />
                      <span>Edit</span>
                    </Link>
                  </div>

                  {/* Brand Status Banners */}
                  {isBrand && brandData?.verificationStatus === "PENDING_REVIEW" && (
                    <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-amber-900">
                      <Clock className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                          Brand Profile Under Review
                        </h4>
                        <p className="mt-0.5 text-xs text-amber-800">
                          Your brand profile has been submitted and is currently being reviewed by DCA administrators. You will receive an update once approved. Admin approval is required before you can post casting calls.
                        </p>
                      </div>
                    </div>
                  )}

                  {isBrand && brandData?.verificationStatus === "REJECTED" && (
                    <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50/80 p-4 text-red-900">
                      <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-red-900">
                          Brand Verification Rejected
                        </h4>
                        <p className="mt-0.5 text-xs text-red-800">
                          {brandData.adminFeedback
                            ? `Admin Feedback: ${brandData.adminFeedback}`
                            : "Your brand profile verification was rejected. Please update your company details or contact support."}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl border border-gray-200 bg-[#F7F7F5] p-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        {isBrand ? "Brand Verification Status" : "DCA Verification Status"}
                      </span>
                      <p className="mt-1 text-sm font-bold">
                        {isBrand ? (
                          brandData?.verificationStatus === "APPROVED" ? (
                            <span className="inline-flex items-center gap-1.5 text-emerald-700">
                              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                              Approved Brand Account
                            </span>
                          ) : brandData?.verificationStatus === "REJECTED" ? (
                            <span className="inline-flex items-center gap-1.5 text-red-700">
                              <span className="h-2 w-2 rounded-full bg-red-500"></span>
                              Profile Rejected
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-amber-700">
                              <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                              Profile Under Review
                            </span>
                          )
                        ) : (
                          profileStatus
                        )}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-[#F7F7F5] p-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Location
                      </span>
                      <p className="mt-1 text-sm text-[#111111] font-bold">
                        {city}, {state}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-[#F7F7F5] p-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        {isBrand ? "Posted Casting Calls" : "Submitted Applications"}
                      </span>
                      <p className="mt-1 text-sm text-[#111111] font-bold">
                        {isBrand ? brandCastings.length : applications.length}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-[#F7F7F5] p-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Profile Level
                      </span>
                      <p className="mt-1 text-sm text-[#D4AF37] font-bold">
                        {completionPercentage}% Complete
                      </p>
                    </div>
                  </div>

                  {!isBrand && (
                    <div className="mt-8 border-t border-gray-200 pt-6 space-y-6 text-xs">
                      <div>
                        <h3 className="font-serif text-base font-bold text-[#111111] mb-3">
                          Contact Details &amp; Physical Attributes
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div className="p-3 rounded-xl bg-[#F7F7F5] border border-gray-200">
                            <span className="text-[10px] text-gray-400 font-bold uppercase block">Contact Email</span>
                            <span className="font-bold text-[#111111] truncate block">{email}</span>
                          </div>
                          <div className="p-3 rounded-xl bg-[#F7F7F5] border border-gray-200">
                            <span className="text-[10px] text-gray-400 font-bold uppercase block">Phone</span>
                            <span className="font-bold text-[#111111]">{phone}</span>
                          </div>
                          <div className="p-3 rounded-xl bg-[#F7F7F5] border border-gray-200">
                            <span className="text-[10px] text-gray-400 font-bold uppercase block">Height</span>
                            <span className="font-bold text-[#111111]">{height}</span>
                          </div>
                          <div className="p-3 rounded-xl bg-[#F7F7F5] border border-gray-200">
                            <span className="text-[10px] text-gray-400 font-bold uppercase block">Weight</span>
                            <span className="font-bold text-[#111111]">{weight}</span>
                          </div>
                          <div className="p-3 rounded-xl bg-[#F7F7F5] border border-gray-200">
                            <span className="text-[10px] text-gray-400 font-bold uppercase block">Chest</span>
                            <span className="font-bold text-[#111111]">{chest}</span>
                          </div>
                          <div className="p-3 rounded-xl bg-[#F7F7F5] border border-gray-200">
                            <span className="text-[10px] text-gray-400 font-bold uppercase block">Waist</span>
                            <span className="font-bold text-[#111111]">{waist}</span>
                          </div>
                          <div className="p-3 rounded-xl bg-[#F7F7F5] border border-gray-200 sm:col-span-2">
                            <span className="text-[10px] text-gray-400 font-bold uppercase block">Languages</span>
                            <span className="font-bold text-[#111111] truncate block">{languages}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-serif text-base font-bold text-[#111111] mb-2">
                          Skills &amp; Specialization
                        </h3>
                        <p className="text-gray-600 leading-relaxed">{skills}</p>
                        <p className="mt-2 text-gray-500 font-medium">
                          Special Abilities: <span className="text-[#111111] font-bold">{specialSkills}</span>
                        </p>
                      </div>

                      {adminFeedback && (
                        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
                          <span className="font-bold block mb-1">DCA Verification Notes:</span>
                          <p>{adminFeedback}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {isBrand && (
                    <div className="mt-8 border-t border-gray-200 pt-6">
                      {brandData && (
                        <div className="mb-6 space-y-4 text-xs">
                          <h3 className="font-serif text-base font-bold text-[#111111]">
                            Company &amp; Coordinator Details
                          </h3>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div className="p-3 rounded-xl bg-[#F7F7F5] border border-gray-200">
                              <span className="text-[10px] text-gray-400 font-bold uppercase block">Company Name</span>
                              <span className="font-bold text-[#111111] truncate block">{brandData.companyName || fullName}</span>
                            </div>
                            <div className="p-3 rounded-xl bg-[#F7F7F5] border border-gray-200">
                              <span className="text-[10px] text-gray-400 font-bold uppercase block">Contact Person</span>
                              <span className="font-bold text-[#111111] truncate block">{brandData.fullName || "Coordinator"}</span>
                            </div>
                            <div className="p-3 rounded-xl bg-[#F7F7F5] border border-gray-200">
                              <span className="text-[10px] text-gray-400 font-bold uppercase block">Official Email</span>
                              <span className="font-bold text-[#111111] truncate block">{email}</span>
                            </div>
                            <div className="p-3 rounded-xl bg-[#F7F7F5] border border-gray-200">
                              <span className="text-[10px] text-gray-400 font-bold uppercase block">Phone</span>
                              <span className="font-bold text-[#111111]">{phone}</span>
                            </div>
                            <div className="p-3 rounded-xl bg-[#F7F7F5] border border-gray-200">
                              <span className="text-[10px] text-gray-400 font-bold uppercase block">Category</span>
                              <span className="font-bold text-[#111111]">{brandData.category || "Production"}</span>
                            </div>
                            <div className="p-3 rounded-xl bg-[#F7F7F5] border border-gray-200">
                              <span className="text-[10px] text-gray-400 font-bold uppercase block">Designation</span>
                              <span className="font-bold text-[#111111]">{brandData.designation || "Executive"}</span>
                            </div>
                            {brandData.website && (
                              <div className="p-3 rounded-xl bg-[#F7F7F5] border border-gray-200 sm:col-span-2">
                                <span className="text-[10px] text-gray-400 font-bold uppercase block">Website</span>
                                <span className="font-bold text-[#D4AF37] truncate block">{brandData.website}</span>
                              </div>
                            )}
                          </div>
                          {brandData.description && (
                            <div className="mt-3">
                              <span className="text-[10px] text-gray-400 font-bold uppercase block mb-1">Company Description</span>
                              <p className="text-gray-600 leading-relaxed">{brandData.description}</p>
                            </div>
                          )}
                        </div>
                      )}

                      <h3 className="font-serif text-lg font-bold text-[#111111] mb-3">
                        Brand Quick Actions
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={handleOpenCreateCasting}
                          className="flex items-center gap-3 p-4 rounded-2xl border border-gray-200 bg-[#F7F7F5] hover:border-[#D4AF37] transition text-left cursor-pointer"
                        >
                          <div className="p-3 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                            <Plus size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-sm text-[#111111]">Create Casting Call</p>
                            <p className="text-xs text-gray-500">Post project brief for admin review</p>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveTab("opportunities")}
                          className="flex items-center gap-3 p-4 rounded-2xl border border-gray-200 bg-[#F7F7F5] hover:border-[#D4AF37] transition text-left cursor-pointer"
                        >
                          <div className="p-3 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                            <Briefcase size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-sm text-[#111111]">Manage My Casting Calls</p>
                            <p className="text-xs text-gray-500">View active posts &amp; edit details</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            )}

            {/* TAB 2: MY CASTING CALLS (BRAND) / MY APPLICATIONS (ARTIST) */}
            {activeTab === "opportunities" && (
              <Reveal>
                <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-4 mb-6 gap-3">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-[#111111]">
                        {isBrand ? "My Casting Calls" : "My Submitted Applications"}
                      </h2>
                      <p className="text-xs text-[#555555] mt-0.5">
                        {isBrand
                          ? "Manage project requirements created by your brand account"
                          : "Track your audition submissions and status updates in real-time."}
                      </p>
                    </div>

                    {isBrand ? (
                      <button
                        type="button"
                        onClick={handleOpenCreateCasting}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-[#D4AF37] px-4 py-2 text-xs font-bold text-white hover:bg-[#C59B27] transition shadow-xs cursor-pointer"
                      >
                        <Plus size={15} />
                        <span>Post New Casting</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={fetchApplications}
                        disabled={loadingApps}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-[#F7F7F5] px-3.5 py-2 text-xs font-bold text-[#111111] hover:bg-[#D4AF37] hover:text-white transition shadow-2xs cursor-pointer disabled:opacity-50"
                      >
                        <RefreshCw size={14} className={loadingApps ? "animate-spin" : ""} />
                        <span>Refresh</span>
                      </button>
                    )}
                  </div>

                  {/* BRAND CASTING MANAGEMENT LIST */}
                  {isBrand ? (
                    <div>
                      {loadingBrandCastings ? (
                        <div className="space-y-4 py-4">
                          {[1, 2].map((i) => (
                            <div key={i} className="animate-pulse rounded-2xl border border-gray-200 bg-[#F7F7F5] p-5 h-32" />
                          ))}
                        </div>
                      ) : brandCastingsError ? (
                        <div className="p-8 text-center rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 shadow-xs">
                          <AlertTriangle className="w-10 h-10 text-amber-600 mx-auto mb-2" />
                          <p className="text-xs text-amber-800 mb-4">{brandCastingsError}</p>
                          <button
                            type="button"
                            onClick={fetchBrandCastings}
                            className="px-4 py-2 rounded-xl bg-[#D4AF37] text-white text-xs font-bold"
                          >
                            Retry
                          </button>
                        </div>
                      ) : brandCastings.length > 0 ? (
                        <div className="space-y-4">
                          {brandCastings.map((call) => {
                            const statusColor = call.isClosed
                              ? "bg-gray-100 text-gray-800 border-gray-300"
                              : call.approvalStatus === "APPROVED"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                              : call.approvalStatus === "REJECTED"
                              ? "bg-rose-50 text-rose-800 border-rose-300"
                              : "bg-amber-50 text-amber-800 border-amber-300";

                            return (
                              <div
                                key={call.id}
                                className="rounded-2xl border border-gray-200 bg-[#F7F7F5] p-5 sm:p-6 transition hover:border-[#D4AF37] shadow-2xs space-y-4"
                              >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/60 pb-3">
                                  <div className="flex items-center gap-2">
                                    <span className="rounded-full bg-[#D4AF37]/20 px-2.5 py-0.5 text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                                      {call.category || "General"}
                                    </span>
                                    <span className="text-xs text-[#666666] flex items-center gap-1">
                                      <Calendar size={12} className="text-gray-400" />
                                      Created {new Date(call.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                    </span>
                                  </div>

                                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${statusColor}`}>
                                    {call.isClosed ? (
                                      <X size={13} />
                                    ) : call.approvalStatus === "APPROVED" ? (
                                      <CheckCircle2 size={13} />
                                    ) : call.approvalStatus === "REJECTED" ? (
                                      <AlertTriangle size={13} />
                                    ) : (
                                      <Clock size={13} />
                                    )}
                                    <span>{call.isClosed ? "CLOSED" : call.approvalStatus}</span>
                                  </div>
                                </div>

                                <div>
                                  <h3 className="font-serif text-lg font-bold text-[#111111]">
                                    {call.title}
                                  </h3>
                                  <p className="mt-1 text-xs text-[#555555] line-clamp-2">
                                    {call.description}
                                  </p>
                                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#444444]">
                                    <span className="flex items-center gap-1">
                                      <MapPin size={12} className="text-[#D4AF37]" />
                                      {call.location || "Mumbai"}
                                    </span>
                                    <span className="flex items-center gap-1 font-semibold text-[#111111]">
                                      <Tag size={12} className="text-[#D4AF37]" />
                                      {call.compensation || "Paid"}
                                    </span>
                                    <span className="flex items-center gap-1 text-[#D4AF37] font-bold">
                                      <Users size={12} />
                                      {call._count?.applications || 0} Applicants
                                    </span>
                                  </div>
                                </div>

                                {/* Actions Bar */}
                                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200/60 pt-3">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedCastingForApps(call);
                                      fetchApplicantsForCasting(call.id);
                                      setActiveTab("saved");
                                    }}
                                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#111111] px-4 py-2 text-xs font-bold text-white hover:bg-[#D4AF37] transition cursor-pointer"
                                  >
                                    <Users size={14} />
                                    <span>View Applicants ({call._count?.applications || 0})</span>
                                  </button>

                                  <div className="flex items-center gap-2">
                                    {call.isClosed ? (
                                      <span className="inline-flex items-center gap-1 rounded-xl border border-gray-300 bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-500 cursor-not-allowed">
                                        <X size={13} />
                                        <span>Closed</span>
                                      </span>
                                    ) : (
                                      <>
                                        <button
                                          type="button"
                                          onClick={() => handleOpenEditCasting(call)}
                                          className="inline-flex items-center gap-1 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-[#111111] hover:bg-gray-100 transition cursor-pointer"
                                        >
                                          <Edit size={13} />
                                          <span>Edit</span>
                                        </button>

                                        <button
                                          type="button"
                                          onClick={() => handleDeleteCasting(call.id)}
                                          className="inline-flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-500 hover:text-white transition cursor-pointer"
                                        >
                                          <Trash2 size={13} />
                                          <span>Close</span>
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="rounded-2xl border border-gray-200 bg-[#F7F7F5] p-10 text-center text-xs text-[#555555]">
                          <Briefcase size={40} className="mx-auto mb-3 text-[#D4AF37]" />
                          <h3 className="font-serif text-lg font-bold text-[#111111] mb-1">
                            No Casting Calls Posted Yet
                          </h3>
                          <p className="max-w-md mx-auto leading-relaxed text-[#666666]">
                            Create your first casting call for feature films, web series, or commercials to start receiving verified artist audition applications.
                          </p>
                          <button
                            type="button"
                            onClick={handleOpenCreateCasting}
                            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#C59B27] transition shadow-xs"
                          >
                            <Plus size={16} />
                            <span>Post First Casting Call</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* ARTIST APPLICATIONS LIST */
                    <div>
                      {loadingApps ? (
                        <div className="space-y-4 py-4">
                          {[1, 2].map((i) => (
                            <div key={i} className="animate-pulse rounded-2xl border border-gray-200 bg-[#F7F7F5] p-5 h-32" />
                          ))}
                        </div>
                      ) : appsError ? (
                        <div className="p-8 text-center rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 shadow-xs">
                          <AlertTriangle className="w-10 h-10 text-amber-600 mx-auto mb-2" />
                          <p className="text-xs text-amber-800 mb-4">{appsError}</p>
                          <button
                            type="button"
                            onClick={fetchApplications}
                            className="px-4 py-2 rounded-xl bg-[#D4AF37] text-white text-xs font-bold"
                          >
                            Retry Connection
                          </button>
                        </div>
                      ) : applications.length > 0 ? (
                        <div className="space-y-4">
                          {applications.map((app) => {
                            const statusColor =
                              app.status === "SELECTED"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                : app.status === "SHORTLISTED"
                                ? "bg-blue-50 text-blue-800 border-blue-300"
                                : app.status === "REJECTED"
                                ? "bg-rose-50 text-rose-800 border-rose-300"
                                : "bg-amber-50 text-amber-800 border-amber-300";

                            const statusText =
                              app.status === "SELECTED"
                                ? "Selected for Audition / Role!"
                                : app.status === "SHORTLISTED"
                                ? "Shortlisted by Director"
                                : app.status === "REJECTED"
                                ? "Not Selected"
                                : "Application Submitted (Pending Review)";

                            return (
                              <div
                                key={app.id}
                                className="rounded-2xl border border-gray-200 bg-[#F7F7F5] p-5 sm:p-6 transition hover:border-[#D4AF37] shadow-2xs space-y-3"
                              >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/60 pb-3">
                                  <div className="flex items-center gap-2">
                                    <span className="rounded-full bg-[#D4AF37]/20 px-2.5 py-0.5 text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                                      {app.castingCall.category || "General"}
                                    </span>
                                    <span className="text-xs text-[#666666]">
                                      Applied {new Date(app.appliedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                    </span>
                                  </div>

                                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${statusColor}`}>
                                    {app.status === "SELECTED" || app.status === "SHORTLISTED" ? (
                                      <CheckCircle2 size={13} />
                                    ) : app.status === "REJECTED" ? (
                                      <AlertTriangle size={13} />
                                    ) : (
                                      <Clock size={13} />
                                    )}
                                    <span>{statusText}</span>
                                  </div>
                                </div>

                                <div>
                                  <h3 className="font-serif text-lg font-bold text-[#111111]">
                                    {app.castingCall.title}
                                  </h3>
                                  <p className="mt-1 text-xs text-[#555555]">
                                    Location: {app.castingCall.location || "Mumbai"} • Compensation: {app.castingCall.compensation || "Paid"}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="rounded-2xl border border-gray-200 bg-[#F7F7F5] p-10 text-center text-xs text-[#555555]">
                          <Briefcase size={40} className="mx-auto mb-3 text-[#D4AF37]" />
                          <h3 className="font-serif text-lg font-bold text-[#111111] mb-1">
                            No Applications Submitted Yet
                          </h3>
                          <Link
                            href="/casting-calls/"
                            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#C59B27] transition shadow-xs"
                          >
                            <span>Browse Live Casting Calls</span>
                            <ArrowRight size={14} />
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Reveal>
            )}

            {/* TAB 3: TALENT SOURCING ROSTER (BRAND) / SAVED (ARTIST) */}
            {activeTab === "saved" && (
              <Reveal>
                <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-4 mb-6 gap-3">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-[#111111]">
                        {isBrand ? "Talent Sourcing Candidate Roster" : "Saved Audition Calls"}
                      </h2>
                      <p className="text-xs text-[#555555] mt-0.5">
                        {isBrand
                          ? selectedCastingForApps
                            ? `Applicants for: "${selectedCastingForApps.title}"`
                            : "Select a casting call to review applicant comp cards"
                          : "Bookmarked items for quick reference"}
                      </p>
                    </div>
                  </div>

                  {isBrand ? (
                    <div>
                      {/* Casting Call Picker */}
                      <div className="mb-6">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                          Select Active Casting Call:
                        </label>
                        <select
                          value={selectedCastingForApps?.id || ""}
                          onChange={(e) => {
                            const call = brandCastings.find((c) => c.id === e.target.value);
                            if (call) {
                              setSelectedCastingForApps(call);
                              fetchApplicantsForCasting(call.id);
                            }
                          }}
                          className="w-full rounded-xl border border-gray-300 bg-[#F7F7F5] px-4 py-2.5 text-xs font-bold text-[#111111] focus:border-[#D4AF37] focus:outline-none"
                        >
                          <option value="" disabled>-- Select a Casting Call --</option>
                          {brandCastings.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.title} ({c._count?.applications || 0} applicants)
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Filter Bar */}
                      {selectedCastingForApps && (
                        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl border border-gray-200 bg-[#F7F7F5]">
                          <div className="relative w-full sm:w-64">
                            <Search size={14} className="absolute left-3 top-3 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Search candidate name, skills..."
                              value={applicantSearch}
                              onChange={(e) => setApplicantSearch(e.target.value)}
                              className="w-full rounded-xl border border-gray-300 bg-white pl-9 pr-3 py-2 text-xs focus:border-[#D4AF37] focus:outline-none"
                            />
                          </div>

                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Filter size={14} className="text-gray-500 shrink-0" />
                            <select
                              value={applicantFilterStatus}
                              onChange={(e) => setApplicantFilterStatus(e.target.value)}
                              className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-semibold focus:border-[#D4AF37] focus:outline-none"
                            >
                              <option value="ALL">All Statuses</option>
                              <option value="PENDING">Pending Review</option>
                              <option value="SHORTLISTED">Shortlisted</option>
                              <option value="SELECTED">Selected</option>
                              <option value="REJECTED">Rejected</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {/* Applicants List */}
                      {loadingApplicants ? (
                        <div className="space-y-4 py-4">
                          {[1, 2].map((i) => (
                            <div key={i} className="animate-pulse rounded-2xl border border-gray-200 bg-[#F7F7F5] p-5 h-28" />
                          ))}
                        </div>
                      ) : applicantsError ? (
                        <div className="p-6 text-center text-xs text-rose-600 bg-rose-50 rounded-2xl border border-rose-200">
                          {applicantsError}
                        </div>
                      ) : !selectedCastingForApps ? (
                        <div className="p-8 text-center text-xs text-gray-500 rounded-2xl border border-gray-200 bg-[#F7F7F5]">
                          Please select one of your casting calls from the dropdown above to view applicant comp cards.
                        </div>
                      ) : filteredApplicants.length > 0 ? (
                        <div className="space-y-4">
                          {filteredApplicants.map((app) => {
                            const avatar =
                              app.artist.profilePhoto ||
                              (app.artist.headshots ? app.artist.headshots.split(",")[0].trim() : "/images/actors/editorial_grid_1.png");

                            const statusBadge =
                              app.status === "SELECTED"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                : app.status === "SHORTLISTED"
                                ? "bg-blue-50 text-blue-800 border-blue-300"
                                : app.status === "REJECTED"
                                ? "bg-rose-50 text-rose-800 border-rose-300"
                                : "bg-amber-50 text-amber-800 border-amber-300";

                            return (
                              <div
                                key={app.id}
                                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-[#F7F7F5] p-5 transition hover:border-[#D4AF37] shadow-2xs"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="relative aspect-square w-16 overflow-hidden rounded-xl border border-gray-300 shrink-0 bg-gray-100">
                                    <Image src={avatar} alt={app.artist.fullName} fill className="object-cover" />
                                  </div>

                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h3 className="font-serif text-base font-bold text-[#111111]">
                                        {app.artist.fullName}
                                      </h3>
                                      <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${statusBadge}`}>
                                        {app.status}
                                      </span>
                                    </div>
                                    <p className="text-xs text-[#555555] mt-0.5">
                                      {app.artist.gender || "Artist"} • {app.artist.city || "Location N/A"}
                                    </p>
                                    {app.artist.skills && (
                                      <p className="text-[11px] text-[#666666] line-clamp-1 mt-1">
                                        Skills: {app.artist.skills}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                {/* Status Action Controls */}
                                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto shrink-0 border-t sm:border-0 pt-3 sm:pt-0">
                                  <button
                                    type="button"
                                    onClick={() => setSelectedApplicantModal(app)}
                                    className="px-3 py-1.5 rounded-xl border border-gray-300 bg-white text-xs font-semibold text-[#111111] hover:bg-gray-100 transition cursor-pointer"
                                  >
                                    Comp Card
                                  </button>

                                  <button
                                    type="button"
                                    disabled={updatingAppId === app.id}
                                    onClick={() => handleUpdateApplicationStatus(app.id, "SHORTLISTED")}
                                    className="px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50 text-xs font-bold text-blue-700 hover:bg-blue-600 hover:text-white transition cursor-pointer disabled:opacity-50"
                                  >
                                    Shortlist
                                  </button>

                                  <button
                                    type="button"
                                    disabled={updatingAppId === app.id}
                                    onClick={() => handleUpdateApplicationStatus(app.id, "SELECTED")}
                                    className="px-3 py-1.5 rounded-xl border border-emerald-200 bg-emerald-50 text-xs font-bold text-emerald-700 hover:bg-emerald-600 hover:text-white transition cursor-pointer disabled:opacity-50"
                                  >
                                    Select
                                  </button>

                                  <button
                                    type="button"
                                    disabled={updatingAppId === app.id}
                                    onClick={() => handleUpdateApplicationStatus(app.id, "REJECTED")}
                                    className="px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 text-xs font-bold text-rose-700 hover:bg-rose-600 hover:text-white transition cursor-pointer disabled:opacity-50"
                                  >
                                    Reject
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="p-8 text-center text-xs text-gray-500 rounded-2xl border border-gray-200 bg-[#F7F7F5]">
                          No applicants found matching the selected filters.
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-gray-200 bg-[#F7F7F5] p-8 text-center text-xs text-[#555555]">
                      <Bookmark size={32} className="mx-auto mb-3 text-[#D4AF37]" />
                      <p>You have 4 saved items in your account.</p>
                    </div>
                  )}
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* CREATE / EDIT CASTING CALL MODAL */}
      {castingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-2xl my-8">
            <button
              type="button"
              onClick={() => setCastingModalOpen(false)}
              className="absolute right-5 top-5 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 cursor-pointer"
            >
              <X size={20} />
            </button>

            <h2 className="font-serif text-xl font-bold text-[#111111] mb-1">
              {editingCasting ? "Edit Casting Call" : "Create New Casting Call"}
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              {editingCasting
                ? "Modifying material details will resubmit this post for Admin verification."
                : "Submit your production requirement. Posts go live after DCA Admin review."}
            </p>

            {castingFormError && (
              <div className="mb-4 rounded-xl bg-red-50 p-3 text-xs text-red-600 font-semibold border border-red-200">
                {castingFormError}
              </div>
            )}

            {castingSuccessMsg && (
              <div className="mb-4 rounded-xl bg-emerald-50 p-3 text-xs text-emerald-800 font-bold border border-emerald-200 flex items-center gap-2">
                <Check size={16} />
                <span>{castingSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveCasting} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Casting Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lead Female Actor — Bollywood Feature Film"
                  value={castingFormData.title}
                  onChange={(e) => setCastingFormData({ ...castingFormData, title: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Detailed audition requirements, character arc, shoot schedule..."
                  value={castingFormData.description}
                  onChange={(e) => setCastingFormData({ ...castingFormData, description: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    placeholder="Actors, Models, Dancers..."
                    value={castingFormData.category}
                    onChange={(e) => setCastingFormData({ ...castingFormData, category: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Shoot Location</label>
                  <input
                    type="text"
                    placeholder="Mumbai / Delhi NCR"
                    value={castingFormData.location}
                    onChange={(e) => setCastingFormData({ ...castingFormData, location: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Compensation</label>
                  <input
                    type="text"
                    placeholder="₹50,000 / Day"
                    value={castingFormData.compensation}
                    onChange={(e) => setCastingFormData({ ...castingFormData, compensation: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Min Age</label>
                  <input
                    type="number"
                    value={castingFormData.ageMin}
                    onChange={(e) => setCastingFormData({ ...castingFormData, ageMin: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Max Age</label>
                  <input
                    type="number"
                    value={castingFormData.ageMax}
                    onChange={(e) => setCastingFormData({ ...castingFormData, ageMax: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
                <button
                  type="button"
                  onClick={() => setCastingModalOpen(false)}
                  className="rounded-xl border border-gray-300 px-5 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submittingCasting}
                  className="rounded-xl bg-[#D4AF37] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#C59B27] cursor-pointer disabled:opacity-50"
                >
                  {submittingCasting ? "Submitting..." : editingCasting ? "Save & Resubmit" : "Post Casting Call"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* APPLICANT COMP CARD DETAIL MODAL */}
      {selectedApplicantModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-2xl my-8 space-y-6">
            <button
              type="button"
              onClick={() => setSelectedApplicantModal(null)}
              className="absolute right-5 top-5 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="relative aspect-square w-32 rounded-2xl overflow-hidden border-2 border-[#D4AF37] shrink-0 bg-gray-100">
                <Image
                  src={
                    selectedApplicantModal.artist.profilePhoto ||
                    (selectedApplicantModal.artist.headshots ? selectedApplicantModal.artist.headshots.split(",")[0].trim() : "/images/actors/editorial_grid_1.png")
                  }
                  alt={selectedApplicantModal.artist.fullName}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-2xl font-bold text-[#111111]">
                    {selectedApplicantModal.artist.fullName}
                  </h2>
                  <span className="px-3 py-1 rounded-full border text-xs font-bold bg-amber-50 text-amber-800 border-amber-200">
                    {selectedApplicantModal.status}
                  </span>
                </div>
                <p className="text-xs text-[#555555] mt-1 flex items-center gap-2">
                  <span>{selectedApplicantModal.artist.gender || "Artist"}</span>
                  <span>•</span>
                  <span>{selectedApplicantModal.artist.city || "Location N/A"}</span>
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Applied on {new Date(selectedApplicantModal.appliedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
            </div>

            {selectedApplicantModal.message && (
              <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-gray-200 text-xs">
                <span className="font-bold text-gray-500 block mb-1">Audition Note:</span>
                <p className="italic text-[#333333]">&quot;{selectedApplicantModal.message}&quot;</p>
              </div>
            )}

            {selectedApplicantModal.portfolioUrl && (
              <div className="text-xs">
                <span className="font-bold text-gray-500 block mb-1">Portfolio Link:</span>
                <a
                  href={selectedApplicantModal.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#D4AF37] font-bold hover:underline"
                >
                  <span>{selectedApplicantModal.portfolioUrl}</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs border-t border-gray-200 pt-4">
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Height</span>
                <span className="font-bold text-[#111111]">{selectedApplicantModal.artist.height || "N/A"}</span>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Weight</span>
                <span className="font-bold text-[#111111]">{selectedApplicantModal.artist.weight || "N/A"}</span>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Languages</span>
                <span className="font-bold text-[#111111] truncate block">{selectedApplicantModal.artist.languages || "N/A"}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-gray-200 pt-4">
              <button
                type="button"
                onClick={() => handleUpdateApplicationStatus(selectedApplicantModal.id, "SHORTLISTED")}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition cursor-pointer"
              >
                Shortlist Candidate
              </button>

              <button
                type="button"
                onClick={() => handleUpdateApplicationStatus(selectedApplicantModal.id, "SELECTED")}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition cursor-pointer"
              >
                Select Candidate
              </button>

              <button
                type="button"
                onClick={() => handleUpdateApplicationStatus(selectedApplicantModal.id, "REJECTED")}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition cursor-pointer"
              >
                Reject Candidate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Premium Checkout Modal Component */}
      <PremiumFlowModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialStep={modalInitialStep}
      />
    </main>
  );
}
