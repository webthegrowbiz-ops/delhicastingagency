export type InfluencerCategorySlug =
  | "fashion-influencers"
  | "lifestyle-influencers"
  | "instagram-influencers"
  | "youtube-influencers";

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  thumbnail: string;
  videoUrl?: string;
  description?: string;
}

export interface InstagramItem {
  id: string;
  image: string;
  caption: string;
  likes: string;
  comments: string;
  handle?: string;
}

export interface PrintItem {
  id: string;
  image: string;
  brand: string;
  campaign: string;
  year: string;
}

export interface ExperienceCredit {
  project: string;
  role: string;
  type: "Brand Collaboration" | "Product Launch" | "Digital Campaign" | "Event Attendance";
  year: string;
  directorOrClient?: string;
}

export interface Influencer {
  id: string;
  name: string;
  category: InfluencerCategorySlug;
  categoryLabel: string;
  role: string;
  age: number;
  height: string;
  experience: string;
  location: string;
  languages: string[];
  followersCount: string;
  followers?: string;
  handle?: string;
  platform?: string;
  engagementRate?: string;
  primaryNiche?: string;
  niche: string[];
  mainImage: string;
  badge?: string;
  about: string;
  skills: string[];
  experienceCredits: ExperienceCredit[];
  photos: string[];
  videos: VideoItem[];
  instagram: InstagramItem[];
  print: PrintItem[];
}

export interface CategoryMeta {
  slug: InfluencerCategorySlug;
  title: string;
  headline: string;
  description: string;
  heroDescription: string;
  ctaText: string;
  countLabel: string;
  image: string;
  route: string;
}

export const INFLUENCER_CATEGORIES: CategoryMeta[] = [
  {
    slug: "fashion-influencers",
    title: "Fashion Influencers",
    headline: "Style Creators & Fashion Content Specialists",
    description: "Trending fashion creators specializing in outfit styling reels, luxury brand unboxings, seasonal lookbooks, and fashion week coverage.",
    heroDescription: "Explore fashion creators driving style trends, street fashion, and high-impact brand partnerships across digital platforms.",
    ctaText: "Explore Fashion Influencers",
    countLabel: "20+ Style Creators",
    image: "/images/talents/influencers/aanya-mehta-main.jpg",
    route: "/influencers/fashion-influencers/",
  },
  {
    slug: "lifestyle-influencers",
    title: "Lifestyle Influencers",
    headline: "Wellness, Travel & Daily Vlogging Creators",
    description: "Engaging lifestyle creators sharing authentic daily routines, luxury hotel reviews, wellness tips, and consumer tech recommendations.",
    heroDescription: "Connect with authentic lifestyle creators driving consumer trust, brand integration, and high engagement across social media.",
    ctaText: "Explore Lifestyle Influencers",
    countLabel: "25+ Lifestyle Creators",
    image: "/images/talents/influencers/rohan-kapoor-inf-main.jpg",
    route: "/influencers/lifestyle-influencers/",
  },
  {
    slug: "instagram-influencers",
    title: "Instagram Influencers",
    headline: "Reels & Short-Form Content Pioneers",
    description: "High-reach Instagram creators commanding loyal followings through viral reels, aesthetic grids, and interactive stories.",
    heroDescription: "Browse high-converting Instagram creators with verified engagement rates for sponsored posts and digital activations.",
    ctaText: "Explore Instagram Influencers",
    countLabel: "30+ Instagram Creators",
    image: "/images/talents/influencers/aanya-mehta-main.jpg",
    route: "/influencers/instagram-influencers/",
  },
  {
    slug: "youtube-influencers",
    title: "YouTube Influencers",
    headline: "Long-Form Vloggers & Video Reviewers",
    description: "Established YouTubers producing in-depth video reviews, cinematic travel vlogs, beauty tutorials, and brand integration videos.",
    heroDescription: "Discover high-authority YouTube creators offering deep brand integration, dedicated video reviews, and long-term audience impact.",
    ctaText: "Explore YouTube Influencers",
    countLabel: "15+ YouTube Creators",
    image: "/images/talents/influencers/rohan-kapoor-inf-main.jpg",
    route: "/influencers/youtube-influencers/",
  },
];

export const INFLUENCERS_DATA: Influencer[] = [
  {
    id: "aanya-mehta",
    name: "Aanya Mehta",
    category: "fashion-influencers",
    categoryLabel: "Fashion Influencer",
    role: "Luxury Fashion & Beauty Creator",
    age: 24,
    height: "5'8\"",
    experience: "4 Years",
    location: "New Delhi / NCR",
    languages: ["English", "Hindi"],
    followersCount: "450K+",
    niche: ["Luxury Fashion", "Skincare", "Haute Couture", "Travel"],
    mainImage: "/images/talents/influencers/aanya-mehta-main.jpg",
    badge: "Top Fashion Creator",
    about: "Aanya Mehta is a prominent Delhi-based fashion and luxury lifestyle content creator known for high-aesthetic Instagram reels and brand partnerships with global cosmetics brands.",
    skills: ["Reel Direction", "Aesthetic Styling", "Brand Integration", "Live Hosting"],
    experienceCredits: [
      { project: "Sephora India Festive Edit", role: "Brand Ambassador", type: "Brand Collaboration", year: "2025" },
    ],
    photos: [
      "/images/talents/influencers/aanya-mehta/01.jpg",
      "/images/talents/influencers/aanya-mehta/02.jpg",
      "/images/talents/influencers/aanya-mehta/03.jpg",
      "/images/talents/influencers/aanya-mehta/04.jpg",
      "/images/talents/influencers/aanya-mehta/05.jpg"
],
    videos: [],
    instagram: [],
    print: [],
  },
  {
    id: "rohan-kapoor",
    name: "Rohan Kapoor",
    category: "lifestyle-influencers",
    categoryLabel: "Lifestyle Influencer",
    role: "Fitness & Tech Vlogger",
    age: 27,
    height: "6'0\"",
    experience: "5 Years",
    location: "New Delhi / Gurugram",
    languages: ["English", "Hindi", "Punjabi"],
    followersCount: "680K+",
    niche: ["Fitness", "Consumer Tech", "Men's Grooming", "Automotive"],
    mainImage: "/images/talents/influencers/rohan-kapoor-inf-main.jpg",
    badge: "Verified Creator",
    about: "Rohan Kapoor is a dynamic lifestyle vlogger and tech enthusiast delivering high-production video reviews, workout routines, and men's grooming recommendations.",
    skills: ["Cinematic Vlogging", "Product Reviewing", "Fitness Coaching", "Public Speaking"],
    experienceCredits: [
      { project: "OnePlus Nord Series Launch", role: "Featured Tech Reviewer", type: "Product Launch", year: "2025" },
    ],
    photos: [
      "/images/talents/influencers/rohan-kapoor/01.jpg",
      "/images/talents/influencers/rohan-kapoor/02.jpg",
      "/images/talents/influencers/rohan-kapoor/03.jpg",
      "/images/talents/influencers/rohan-kapoor/04.jpeg",
      "/images/talents/influencers/rohan-kapoor/05.jpg"
    ],
    videos: [],
    instagram: [],
    print: [],
  },
  {
    id: "kriti-sharma-inf",
    name: "Kriti Sharma",
    category: "fashion-influencers",
    categoryLabel: "Fashion Influencer",
    role: "High-Fashion & Luxury Creator",
    handle: "@kritisharma_style",
    platform: "Instagram & YouTube",
    followers: "520K",
    age: 24,
    height: "5'7\"",
    experience: "4 Years",
    location: "New Delhi",
    languages: ["English", "Hindi"],
    followersCount: "520K+",
    niche: ["Fashion", "Styling", "Luxury"],
    mainImage: "/images/actors/fashion influencer.png",
    badge: "Verified Creator",
    about: "Kriti Sharma is a high-fashion digital creator specializing in luxury lookbooks and runway trend breakdowns.",
    skills: ["Fashion Styling", "Lookbook Editing", "Brand Collaborations"],
    experienceCredits: [
      { project: "Zara Spring Collection", role: "Featured Stylist", type: "Brand Collaboration", year: "2025" }
    ],
    photos: ["/images/actors/fashion influencer.png"],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "arjun-vlog",
    name: "Arjun Vlogs",
    category: "youtube-influencers",
    categoryLabel: "YouTube Creator",
    role: "Travel & Moto Vlogger",
    handle: "@arjunvlogsofficial",
    platform: "YouTube",
    followers: "1.2M",
    age: 26,
    height: "5'11\"",
    experience: "5 Years",
    location: "Gurugram / Delhi",
    languages: ["Hindi", "English"],
    followersCount: "1.2M+",
    niche: ["Travel", "Automotive", "Vlogging"],
    mainImage: "/images/actors/lifestyle influencer.jpg",
    badge: "Top Creator",
    about: "Arjun is a premier travel and automotive vlogger documenting road trips, supercar reviews, and luxury resort stays.",
    skills: ["4K Video Production", "Drone Cinematography", "Sponsorship Integration"],
    experienceCredits: [
      { project: "Mahindra Thar Expedition", role: "Vlogger Lead", type: "Product Launch", year: "2024" }
    ],
    photos: ["/images/actors/lifestyle influencer.jpg"],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "riya-insta",
    name: "Riya Malhotra",
    category: "instagram-influencers",
    categoryLabel: "Instagram Influencer",
    role: "Beauty & Skincare Creator",
    handle: "@riyamalhotra_official",
    platform: "Instagram",
    followers: "890K",
    age: 23,
    height: "5'6\"",
    experience: "4 Years",
    location: "New Delhi",
    languages: ["English", "Hindi"],
    followersCount: "890K+",
    niche: ["Beauty", "Skincare", "Reels"],
    mainImage: "/images/actors/insta influencer.png",
    badge: "Verified Creator",
    about: "Riya Malhotra creates viral short-form beauty tutorials and lifestyle reels with over 50M+ monthly impressions.",
    skills: ["Short Form Video", "Makeup Tutorials", "Brand Endorsement"],
    experienceCredits: [
      { project: "Maybelline New York Reel Series", role: "Brand Ambassador", type: "Digital Campaign", year: "2025" }
    ],
    photos: ["/images/actors/insta influencer.png"],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "kabir-tech",
    name: "Kabir Tech",
    category: "lifestyle-influencers",
    categoryLabel: "Lifestyle Influencer",
    role: "Tech & Grooming Vlogger",
    handle: "@kabir_lifestyle",
    platform: "Instagram & YouTube",
    followers: "410K",
    age: 27,
    height: "6'0\"",
    experience: "5 Years",
    location: "Delhi NCR",
    languages: ["English", "Hindi"],
    followersCount: "410K+",
    niche: ["Tech Gadgets", "Grooming", "Fitness"],
    mainImage: "/images/actors/editorial_grid_4.png",
    badge: "Verified Creator",
    about: "Kabir focuses on smart lifestyle tech, wearable fitness devices, and urban men's grooming routines.",
    skills: ["Tech Reviews", "Fitness Vlogging", "Unboxing"],
    experienceCredits: [
      { project: "Samsung Galaxy Ecosystem", role: "Reviewer", type: "Product Launch", year: "2024" }
    ],
    photos: ["/images/actors/editorial_grid_4.png"],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "tanvi-beauty",
    name: "Tanvi Beauty",
    category: "fashion-influencers",
    categoryLabel: "Fashion Influencer",
    role: "Ethnic & Festive Stylist",
    handle: "@tanvibeauty_style",
    platform: "Instagram",
    followers: "350K",
    age: 22,
    height: "5'7\"",
    experience: "3 Years",
    location: "New Delhi",
    languages: ["Hindi", "English"],
    followersCount: "350K+",
    niche: ["Ethnic Wear", "Festive Styling"],
    mainImage: "/images/actors/editorial_grid_2.png",
    badge: "Verified Creator",
    about: "Tanvi specializes in ethnic bridal styling, saree draping tutorials, and festive fashion edits.",
    skills: ["Ethnic Styling", "Festive Lookbooks", "Reel Production"],
    experienceCredits: [
      { project: "FabIndia Festive Edit", role: "Creator Partner", type: "Digital Campaign", year: "2024" }
    ],
    photos: ["/images/actors/editorial_grid_2.png"],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "siddharth-vlogs",
    name: "Siddharth Vlogs",
    category: "youtube-influencers",
    categoryLabel: "YouTube Creator",
    role: "Food & Lifestyle Host",
    handle: "@siddharthvlogs",
    platform: "YouTube",
    followers: "750K",
    age: 25,
    height: "5'11\"",
    experience: "4 Years",
    location: "Noida / Delhi",
    languages: ["Hindi", "English"],
    followersCount: "750K+",
    niche: ["Urban Culture", "Food Vlogs"],
    mainImage: "/images/actors/editorial_grid_5.png",
    badge: "Top Creator",
    about: "Siddharth hosts popular street food discovery vlogs and urban youth culture shows.",
    skills: ["Food Vlogging", "Live Interactivity", "Storytelling"],
    experienceCredits: [
      { project: "Zomato Food Fest", role: "Host Vlogger", type: "Event Attendance", year: "2025" }
    ],
    photos: ["/images/actors/editorial_grid_5.png"],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "pooja-reels",
    name: "Pooja Reels",
    category: "instagram-influencers",
    categoryLabel: "Instagram Influencer",
    role: "Dance & Fashion Reels Creator",
    handle: "@poojareelsofficial",
    platform: "Instagram",
    followers: "600K",
    age: 24,
    height: "5'6.5\"",
    experience: "3 Years",
    location: "Delhi",
    languages: ["Hindi", "English"],
    followersCount: "600K+",
    niche: ["Dance Reels", "Fashion"],
    mainImage: "/images/actors/editorial_grid_3.png",
    badge: "Verified Creator",
    about: "Pooja combines high-energy dance trends with street fashion styling on Instagram Reels.",
    skills: ["Dance Trends", "Fashion Reels", "Virality"],
    experienceCredits: [
      { project: "Puma India Reel Campaign", role: "Dance Creator", type: "Digital Campaign", year: "2024" }
    ],
    photos: ["/images/actors/editorial_grid_3.png"],
    videos: [],
    instagram: [],
    print: []
  }
];

export function getAllInfluencers(): Influencer[] {
  return INFLUENCERS_DATA;
}

export function getInfluencerById(id: string): Influencer | undefined {
  return INFLUENCERS_DATA.find((inf) => inf.id === id);
}

export function getInfluencersByCategory(category: InfluencerCategorySlug): Influencer[] {
  return INFLUENCERS_DATA.filter((inf) => inf.category === category);
}

export function getRelatedInfluencers(currentId: string, category: InfluencerCategorySlug, limit: number = 8): Influencer[] {
  const sameCategory = INFLUENCERS_DATA.filter((i) => i.id !== currentId && i.category === category);
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const otherInfluencers = INFLUENCERS_DATA.filter((i) => i.id !== currentId && i.category !== category);
  return [...sameCategory, ...otherInfluencers].slice(0, limit);
}

export function getInfluencerCategoryBySlug(slug: InfluencerCategorySlug): CategoryMeta | undefined {
  return INFLUENCER_CATEGORIES.find((c) => c.slug === slug);
}
