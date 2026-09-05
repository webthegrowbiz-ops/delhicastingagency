import {
  Bell,
  UserPlus,
  Star,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

export interface NotificationItem {
  id: string;
  type:
    | "APPLICATION_SUBMITTED"
    | "APPLICATION_SHORTLISTED"
    | "APPLICATION_SELECTED"
    | "APPLICATION_REJECTED"
    | "NEW_APPLICATION"
    | "CASTING_APPROVED"
    | "CASTING_REJECTED"
    | "ARTIST_PROFILE_APPROVED"
    | "ARTIST_PROFILE_REJECTED"
    | "SYSTEM"
    | string;
  title: string;
  message: string;
  entityType?: string | null;
  entityId?: string | null;
  isRead: boolean;
  readAt?: string | null;
  createdAt: string;
}

/**
 * Returns an appropriate icon component based on the notification type.
 */
export function getNotificationIcon(type: string): {
  icon: LucideIcon;
  colorClass: string;
  bgClass: string;
} {
  switch (type) {
    case "NEW_APPLICATION":
      return {
        icon: UserPlus,
        colorClass: "text-blue-600",
        bgClass: "bg-blue-50 border-blue-200",
      };
    case "APPLICATION_SHORTLISTED":
      return {
        icon: Star,
        colorClass: "text-amber-600",
        bgClass: "bg-amber-50 border-amber-200",
      };
    case "APPLICATION_SELECTED":
    case "CASTING_APPROVED":
    case "ARTIST_PROFILE_APPROVED":
      return {
        icon: CheckCircle2,
        colorClass: "text-emerald-600",
        bgClass: "bg-emerald-50 border-emerald-200",
      };
    case "APPLICATION_REJECTED":
    case "CASTING_REJECTED":
      return {
        icon: XCircle,
        colorClass: "text-rose-600",
        bgClass: "bg-rose-50 border-rose-200",
      };
    case "ARTIST_PROFILE_REJECTED":
      return {
        icon: AlertCircle,
        colorClass: "text-rose-600",
        bgClass: "bg-rose-50 border-rose-200",
      };
    case "APPLICATION_SUBMITTED":
      return {
        icon: Briefcase,
        colorClass: "text-indigo-600",
        bgClass: "bg-indigo-50 border-indigo-200",
      };
    case "SYSTEM":
    default:
      return {
        icon: Bell,
        colorClass: "text-[#D4AF37]",
        bgClass: "bg-[#D4AF37]/10 border-[#D4AF37]/30",
      };
  }
}

/**
 * Converts ISO date string into human-readable relative time.
 */
export function getRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Recently";
    }

    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 30) {
      return "Just now";
    }
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) {
      return "Yesterday";
    }
    if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    }

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
  } catch {
    return "Recently";
  }
}
