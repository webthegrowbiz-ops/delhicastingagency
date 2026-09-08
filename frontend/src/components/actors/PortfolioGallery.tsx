"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Maximize2, Heart, MessageCircle, Newspaper } from "lucide-react";
import type { InstagramItem, PrintItem } from "@/data/actors";
import { ImageLightbox } from "./ImageLightbox";

interface PortfolioGalleryProps {
  type: "digitals" | "instagram" | "print";
  digitals?: string[];
  instagram?: InstagramItem[];
  print?: PrintItem[];
  actorName: string;
}

export function PortfolioGallery({
  type,
  digitals = [],
  instagram = [],
  print = [],
  actorName,
}: PortfolioGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Normalize images for lightbox
  let lightboxItems: { image: string; title?: string; subtitle?: string }[] =
    [];

  if (type === "digitals") {
    lightboxItems = digitals.map((url, i) => ({
      image: url,
      title: `${actorName} — Photo #${i + 1}`,
    }));
  } else if (type === "instagram") {
    lightboxItems = instagram.map((item) => ({
      image: item.image,
      title: `${actorName} on Instagram`,
      subtitle: item.caption,
    }));
  } else if (type === "print") {
    lightboxItems = print.map((item) => ({
      image: item.image,
      title: `${item.brand} (${item.year})`,
      subtitle: `${item.campaign} — ${item.brand}`,
    }));
  }

  const handleOpenLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  if (lightboxItems.length === 0) {
    return (
      <div className="text-center py-12 px-4 bg-[#F7F7F5] border border-gray-200 rounded-2xl shadow-xs">
        <p className="text-[#555555] text-sm">
          No photos or portfolio media available in this section.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-6">
        {type === "digitals" &&
          digitals.map((url, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleOpenLightbox(index)}
              className="group relative w-full aspect-[3/4] bg-gray-100 border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden hover:border-[#d4af37]/60 hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#d4af37] shadow-xs"
            >
              <Image
                src={url}
                alt={`${actorName} photo ${index + 1}`}
                fill
                unoptimized
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="p-3 rounded-full bg-white/90 text-[#d4af37] border border-[#d4af37]/40 shadow-sm">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>
            </button>
          ))}

        {type === "instagram" &&
          instagram.map((item, index) => (
            <div
              key={item.id || index}
              onClick={() => handleOpenLightbox(index)}
              className="group relative w-full aspect-[4/5] bg-gray-100 border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer hover:border-[#d4af37]/60 hover:shadow-md transition-all duration-300 shadow-xs"
            >
              <Image
                src={item.image}
                alt={item.caption}
                fill
                unoptimized
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-4">
                <p className="text-white text-xs line-clamp-2 mb-2 font-medium">
                  {item.caption}
                </p>
                <div className="flex items-center gap-4 text-xs text-white/90">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                    {item.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 text-[#d4af37]" />
                    {item.comments}
                  </span>
                </div>
              </div>
            </div>
          ))}

        {type === "print" &&
          print.map((item, index) => (
            <div
              key={item.id || index}
              onClick={() => handleOpenLightbox(index)}
              className="group relative w-full aspect-[3/4] bg-gray-100 border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer hover:border-[#d4af37]/60 hover:shadow-md transition-all duration-300 shadow-xs"
            >
              <Image
                src={item.image}
                alt={`${item.brand} - ${item.campaign}`}
                fill
                unoptimized
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-4">
                <div className="flex items-center gap-1.5 text-[11px] text-[#d4af37] font-semibold uppercase tracking-wider mb-1">
                  <Newspaper className="w-3.5 h-3.5" />
                  <span>{item.brand}</span>
                </div>
                <h4 className="text-white font-bold text-sm leading-tight mb-1">
                  {item.campaign}
                </h4>
                <span className="text-[11px] text-white/80">{item.year}</span>
              </div>
            </div>
          ))}
      </div>

      {/* Lightbox Modal */}
      <ImageLightbox
        isOpen={lightboxOpen}
        images={lightboxItems}
        currentIndex={currentIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIndex) => setCurrentIndex(newIndex)}
      />
    </>
  );
}
