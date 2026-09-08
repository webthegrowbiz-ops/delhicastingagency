export interface TalentCategoryItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  href: string;
  count: string;
  tag: string;
}

export const TALENT_CATEGORIES: TalentCategoryItem[] = [
  {
    id: "actors",
    title: "Actors & Actresses",
    subtitle: "Screen & Stage Talent",
    description: "Versatile Indian lead actors, supporting cast, and theatre performers for feature films, web series, and OTT projects.",
    image: "/media/dca/about/dca-about-hero-01.jpg",
    href: "/actors",
    count: "500+ Verified",
    tag: "Film & OTT",
  },
  {
    id: "models",
    title: "Fashion & Commercial Models",
    subtitle: "High Fashion & Editorial",
    description: "Editorial, runway, print shoot, and commercial ad models representing modern Indian fashion aesthetics.",
    image: "/media/dca/models/dca-model-female-01.jpg",
    href: "/models",
    count: "350+ Models",
    tag: "Fashion & Ads",
  },
  {
    id: "child-artists",
    title: "Child Artists & Youth",
    subtitle: "Kids & Young Performers",
    description: "Talented young Indian actors and child models for family commercials, TV serials, and feature films.",
    image: "/media/dca/models/dca-model-catalogue-01.jpg",
    href: "/child-artists",
    count: "150+ Kids",
    tag: "Commercials & TV",
  },
  {
    id: "dancers",
    title: "Dancers & Choreographers",
    subtitle: "Movement & Performance",
    description: "Classical, contemporary, hip-hop, and Bollywood dancers trained for music videos, stage shows, and cinema.",
    image: "/media/dca/models/dca-model-fitness-01.jpg",
    href: "/dancers",
    count: "200+ Performers",
    tag: "Music & Stage",
  },
  {
    id: "influencers",
    title: "Digital Influencers & Creators",
    subtitle: "Content & Brand Ambassadors",
    description: "Digital creators and social media influencers with engaged Indian audiences for brand partnerships.",
    image: "/media/dca/models/dca-model-male-01.jpg",
    href: "/influencers",
    count: "180+ Creators",
    tag: "Digital & Social",
  },
  {
    id: "voice-artists",
    title: "Voice Artists & Dubbing",
    subtitle: "Voiceover & Audio Talent",
    description: "Multi-lingual Indian voice artists for dubbing, radio commercials, audiobooks, and animation projects.",
    image: "/media/dca/about/dca-about-studio-01.jpg",
    href: "/voice-artists",
    count: "120+ Voices",
    tag: "Dubbing & Audio",
  },
];
