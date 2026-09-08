"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Clock, Film, Mail } from "lucide-react";
import type { VideoItem } from "@/data/actors";
import { VideoModal } from "./VideoModal";

interface VideoGalleryProps {
  videos: VideoItem[];
  actorName: string;
}

export function VideoGallery({ videos, actorName }: VideoGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  if (!videos || videos.length === 0) {
    return (
      <div className="bg-[#F7F7F5] border border-gray-200 rounded-2xl p-8 sm:p-12 text-center shadow-xs">
        <div className="max-w-md mx-auto flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center text-[#d4af37] mb-4">
            <Film className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-[#111111] mb-2">
            Showreel Coming Soon
          </h3>
          <p className="text-sm text-[#555555] leading-relaxed mb-6">
            The verified video showreel and audition footage for {actorName} are currently being processed by DCA talent management.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-[#d4af37] text-[#111111] hover:text-white font-semibold text-xs uppercase tracking-wider border border-gray-200 hover:border-[#d4af37] transition-all duration-300 shadow-xs"
          >
            <Mail className="w-4 h-4 text-[#d4af37]" />
            <span>Request Audition Reel</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            onClick={() => setSelectedVideo(video)}
            className="group bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:border-[#d4af37]/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between shadow-xs"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                unoptimized
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#d4af37] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-6 h-6 ml-0.5 fill-white" />
                </div>
              </div>

              {/* Duration Badge */}
              {video.duration && (
                <div className="absolute bottom-3 right-3 flex items-center gap-1 text-[11px] font-semibold text-white bg-black/80 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
                  <Clock className="w-3 h-3 text-[#d4af37]" />
                  <span>{video.duration}</span>
                </div>
              )}

              {/* Category Badge */}
              {video.category && (
                <div className="absolute top-3 left-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded bg-black/80 text-[#d4af37] border border-[#d4af37]/40 backdrop-blur-sm">
                    {video.category}
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-4 sm:p-5">
              <h4 className="text-base sm:text-lg font-bold text-[#111111] group-hover:text-[#d4af37] transition-colors leading-snug mb-1">
                {video.title}
              </h4>
              {video.description && (
                <p className="text-xs sm:text-sm text-[#555555] line-clamp-2">
                  {video.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={Boolean(selectedVideo)}
        video={selectedVideo}
        actorName={actorName}
        onClose={() => setSelectedVideo(null)}
      />
    </>
  );
}
