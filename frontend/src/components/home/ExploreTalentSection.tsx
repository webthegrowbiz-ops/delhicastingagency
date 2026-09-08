"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { getActorsByCategory } from "@/data/actors";
import { getModelsByCategory } from "@/data/models";
import { getAllDancers } from "@/data/dancers";
import { getAllInfluencers } from "@/data/influencers";
import { getAllChildArtists } from "@/data/child-artists";
import { getAllVoiceArtists } from "@/data/voice-artists";

interface TalentItem {
  id: string;
  name: string;
  categoryLabel: string;
  location: string;
  mainImage: string;
  profileRoute: string;
}

interface CategoryGroup {
  id: string;
  title: string;
  route: string;
  items: TalentItem[];
}

export function ExploreTalentSection() {
  const femaleActors = getActorsByCategory("female").slice(0, 2).map((a) => ({
    id: a.id,
    name: a.name,
    categoryLabel: a.categoryLabel,
    location: a.location.split("/")[0].trim(),
    mainImage: a.mainImage,
    profileRoute: `/actors/profile/${a.id}`,
  }));

  const maleActors = getActorsByCategory("male").slice(0, 2).map((a) => ({
    id: a.id,
    name: a.name,
    categoryLabel: a.categoryLabel,
    location: a.location.split("/")[0].trim(),
    mainImage: a.mainImage,
    profileRoute: `/actors/profile/${a.id}`,
  }));

  const femaleModels = getModelsByCategory("female-models").slice(0, 2).map((m) => ({
    id: m.id,
    name: m.name,
    categoryLabel: m.categoryLabel,
    location: m.location.split("/")[0].trim(),
    mainImage: m.mainImage,
    profileRoute: `/models/profile/${m.id}`,
  }));

  const maleModels = getModelsByCategory("male-models").slice(0, 2).map((m) => ({
    id: m.id,
    name: m.name,
    categoryLabel: m.categoryLabel,
    location: m.location.split("/")[0].trim(),
    mainImage: m.mainImage,
    profileRoute: `/models/profile/${m.id}`,
  }));

  const influencers = getAllInfluencers().slice(0, 2).map((inf) => ({
    id: inf.id,
    name: inf.name,
    categoryLabel: inf.categoryLabel,
    location: inf.location.split("/")[0].trim(),
    mainImage: inf.mainImage,
    profileRoute: `/influencers/profile/${inf.id}`,
  }));

  const dancers = getAllDancers().slice(0, 2).map((d) => ({
    id: d.id,
    name: d.name,
    categoryLabel: d.categoryLabel,
    location: d.location.split("/")[0].trim(),
    mainImage: d.mainImage,
    profileRoute: `/dancers/profile/${d.id}`,
  }));

  const childArtists = getAllChildArtists().slice(0, 2).map((ca) => ({
    id: ca.id,
    name: ca.name,
    categoryLabel: ca.categoryLabel,
    location: ca.location.split("/")[0].trim(),
    mainImage: ca.mainImage,
    profileRoute: `/child-artists/profile/${ca.id}`,
  }));

  const voiceArtists = getAllVoiceArtists().slice(0, 2).map((va) => ({
    id: va.id,
    name: va.name,
    categoryLabel: va.categoryLabel,
    location: va.location.split("/")[0].trim(),
    mainImage: va.mainImage,
    profileRoute: `/voice-artists/profile/${va.id}`,
  }));

  const categories: CategoryGroup[] = [
    { id: "female-actors", title: "Female Actors", route: "/actors/female", items: femaleActors },
    { id: "male-actors", title: "Male Actors", route: "/actors/male", items: maleActors },
    { id: "female-models", title: "Female Models", route: "/models/female-models", items: femaleModels },
    { id: "male-models", title: "Male Models", route: "/models/male-models", items: maleModels },
    { id: "influencers", title: "Influencers", route: "/influencers", items: influencers },
    { id: "dancers", title: "Dancers", route: "/dancers", items: dancers },
    { id: "child-artists", title: "Child Artists", route: "/child-artists", items: childArtists },
    { id: "voice-artists", title: "Voice Artists", route: "/voice-artists", items: voiceArtists },
  ];

  return (
    <section className="relative isolate bg-white text-[#111111] py-16 sm:py-20 lg:py-24 border-b border-[#E5E5E5]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-14 text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-[#D4AF37] mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              EXPLORE OUR TALENT
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#111111]">
              EXPLORE OUR TALENT
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#444444] leading-relaxed">
              Discover talented actors, models and creative artists ready for your next project.
            </p>
          </div>
        </Reveal>

        {/* 8 Talent Categories with Clean Downward Spacing & Flex Header Layout */}
        <div className="space-y-12 sm:space-y-16">
          {categories.map((cat) => (
            <Reveal key={cat.id}>
              <div className="pt-8 sm:pt-12 border-t border-[#E5E5E5] first:border-t-0 first:pt-0">
                {/* Category Header: Title (LEFT) | EXPLORE CATEGORY → (RIGHT) */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-4 mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight text-[#111111]">
                    {cat.title}
                  </h3>

                  <Link
                    href={cat.route}
                    className="group/link inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-[0.08em] text-[#111111] hover:text-[#D4AF37] transition-colors shrink-0"
                  >
                    <span>EXPLORE CATEGORY</span>
                    <ArrowRight className="h-4 w-4 text-[#D4AF37] transition-transform duration-300 group-hover/link:translate-x-1.5" />
                  </Link>
                </div>

                {/* Grid of Large Featured Talent Images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  {cat.items.map((item) => (
                    <Link
                      key={item.id}
                      href={item.profileRoute}
                      className="group relative block overflow-hidden rounded-2xl bg-[#F7F7F5] border border-[#E5E5E5] shadow-xs transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#D4AF37]/60 hover:shadow-md cursor-pointer"
                    >
                      {/* 3:4 Aspect Ratio Editorial Image */}
                      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F7F7F5]">
                        <Image
                          src={item.mainImage}
                          alt={item.name}
                          fill
                          unoptimized
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/85 via-[#111111]/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

                        {/* Minimal Info Overlay */}
                        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 text-white z-10">
                          <h4 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-[#D4AF37]">
                            {item.name}
                          </h4>
                          <p className="mt-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#D4AF37]">
                            {item.categoryLabel}
                          </p>
                          <div className="mt-2 flex items-center gap-1.5 text-xs text-white/80">
                            <MapPin className="h-3.5 w-3.5 text-[#D4AF37]" />
                            <span>{item.location}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
