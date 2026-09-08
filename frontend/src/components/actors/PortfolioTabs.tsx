"use client";

import React from "react";
import { Camera, Video, Newspaper } from "lucide-react";

export type PortfolioTabKey = "digitals" | "video" | "instagram" | "print";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface PortfolioTabsProps {
  activeTab: PortfolioTabKey;
  onTabChange: (tab: PortfolioTabKey) => void;
  counts: {
    digitals: number;
    video: number;
    instagram: number;
    print: number;
  };
}

export function PortfolioTabs({
  activeTab,
  onTabChange,
  counts,
}: PortfolioTabsProps) {
  const tabs: {
    key: PortfolioTabKey;
    label: string;
    icon: React.ElementType;
    count: number;
  }[] = [
    {
      key: "digitals",
      label: "PHOTOS",
      icon: Camera,
      count: counts.digitals,
    },
    {
      key: "video",
      label: "VIDEO",
      icon: Video,
      count: counts.video,
    },
    {
      key: "instagram",
      label: "INSTAGRAM",
      icon: InstagramIcon,
      count: counts.instagram,
    },
    {
      key: "print",
      label: "PRINT",
      icon: Newspaper,
      count: counts.print,
    },
  ];

  return (
    <div className="border-b border-gray-200 pb-1">
      <nav
        className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-2"
        aria-label="Portfolio Sections"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const Icon = tab.icon;

          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              type="button"
              className={`flex items-center gap-2.5 px-4 sm:px-6 py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
                isActive
                  ? "bg-[#d4af37] text-white shadow-md border border-[#d4af37]"
                  : "bg-[#F7F7F5] text-[#555555] hover:text-[#111111] hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <Icon
                className={`w-4 h-4 ${
                  isActive ? "text-white" : "text-[#d4af37]"
                }`}
              />
              <span>{tab.label}</span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                  isActive
                    ? "bg-black/20 text-white"
                    : "bg-gray-200 text-[#444444]"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
