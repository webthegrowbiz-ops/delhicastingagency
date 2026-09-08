"use client";

import React from "react";
import { Filter, Search, X } from "lucide-react";

interface CastingFiltersProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function CastingFilters({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}: CastingFiltersProps) {
  return (
    <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#F7F7F5] border border-gray-200 mb-8 space-y-4 shadow-xs overflow-hidden">
      {/* Top Row: Search Input */}
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666] pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search casting calls by title, role or location..."
          className="w-full pl-11 pr-10 py-3 rounded-xl sm:rounded-2xl bg-white border border-gray-300 text-[#111111] placeholder-[#777777] text-sm sm:text-base focus:outline-none focus:border-[#d4af37] transition-all shadow-2xs"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#111111] transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Bottom Row: Category Filter Pills */}
      <div className="pt-3 border-t border-gray-200 flex flex-wrap items-center gap-2">
        <span className="text-xs text-[#666666] font-semibold uppercase tracking-wider mr-1 flex items-center gap-1.5 shrink-0">
          <Filter className="w-3.5 h-3.5 text-[#d4af37]" />
          Category:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => onSelectCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
              selectedCategory === cat
                ? "bg-[#d4af37] text-white shadow-xs font-bold"
                : "bg-white text-[#555555] hover:bg-gray-100 hover:text-[#111111] border border-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
