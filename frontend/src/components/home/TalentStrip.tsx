"use client";

import Image from "next/image";

const TALENT_PHOTOS = [
  { src: "/media/dca/about/dca-about-hero-01.jpg", name: "Aarav Sharma", category: "Actor" },
  { src: "/media/dca/models/dca-model-female-01.jpg", name: "Ananya Roy", category: "Editorial Model" },
  { src: "/media/dca/models/dca-model-male-01.jpg", name: "Kabir Mehta", category: "Commercial Lead" },
  { src: "/media/dca/models/dca-model-catalogue-01.jpg", name: "Riya Verma", category: "Child Artist" },
  { src: "/media/dca/models/dca-model-fashion-01.jpg", name: "Zara Khan", category: "High Fashion" },
  { src: "/media/dca/about/dca-about-studio-01.jpg", name: "Rohan Kapoor", category: "Theatre & Film" },
];

export function TalentStrip() {
  const duplicated = [...TALENT_PHOTOS, ...TALENT_PHOTOS, ...TALENT_PHOTOS];

  return (
    <section className="overflow-hidden border-b border-gray-200 bg-[#F7F7F5] py-12">
      <div className="mb-6 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
          DCA Roster Spotlight
        </p>
      </div>

      <div className="relative flex w-full overflow-hidden">
        <div className="flex animate-[marquee_35s_linear_infinite] gap-6 whitespace-nowrap">
          {duplicated.map((item, idx) => (
            <div
              key={idx}
              className="group relative h-64 w-48 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:h-72 sm:w-56"
            >
              <Image
                src={item.src}
                alt={item.name}
                fill
                sizes="224px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/85 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <p className="font-serif text-lg font-bold text-white">{item.name}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#D4AF37]">
                  {item.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
