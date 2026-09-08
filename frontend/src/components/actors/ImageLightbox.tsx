"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxItem {
  image: string;
  title?: string;
  subtitle?: string;
}

interface ImageLightboxProps {
  isOpen: boolean;
  images: LightboxItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ImageLightbox({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const currentItem = images[currentIndex];

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handlePrev, handleNext, onClose]);

  if (!isOpen || !currentItem) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      {/* Top Bar with Counter & Close */}
      <div
        className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-white/90 bg-white/10 px-3 py-1 rounded-full border border-white/10">
            {currentIndex + 1} / {images.length}
          </span>
          {currentItem.title && (
            <span className="text-sm font-medium text-white/70 hidden sm:inline-block">
              {currentItem.title}
            </span>
          )}
        </div>

        <button
          onClick={onClose}
          type="button"
          aria-label="Close Lightbox"
          className="p-2.5 rounded-full bg-white/10 hover:bg-[#d4af37] text-white hover:text-black transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image View */}
      <div
        className="relative w-full max-w-5xl h-[75vh] sm:h-[82vh] mx-4 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full">
          <Image
            src={currentItem.image}
            alt={currentItem.title || `Portfolio photo ${currentIndex + 1}`}
            fill
            unoptimized
            sizes="100vw"
            priority
            className="object-contain select-none"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            type="button"
            aria-label="Previous Image"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-[#d4af37] text-white hover:text-black border border-white/10 hover:border-[#d4af37] transition-all duration-300 z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            type="button"
            aria-label="Next Image"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-[#d4af37] text-white hover:text-black border border-white/10 hover:border-[#d4af37] transition-all duration-300 z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Bottom Caption Bar */}
      {currentItem.subtitle && (
        <div
          className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-center bg-gradient-to-t from-black/90 to-transparent z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-sm sm:text-base text-white/90 font-medium max-w-2xl mx-auto">
            {currentItem.subtitle}
          </p>
        </div>
      )}
    </div>
  );
}
