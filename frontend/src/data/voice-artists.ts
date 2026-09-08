export type VoiceArtistCategorySlug =
  | "voice-over-artists"
  | "dubbing-artists"
  | "radio-voice-artists";

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  thumbnail: string;
  videoUrl?: string;
  description?: string;
}

export interface AudioSample {
  id: string;
  title: string;
  category: string;
  duration: string;
  audioUrl: string;
  language: string;
  tone: string;
  description?: string;
}

export interface ExperienceCredit {
  project: string;
  role: string;
  type: "Movie Dubbing" | "Radio Commercial" | "Corporate Narration" | "Documentary Voiceover";
  year: string;
  directorOrClient?: string;
}

export interface VoiceArtist {
  id: string;
  name: string;
  category: VoiceArtistCategorySlug;
  categoryLabel: string;
  role: string;
  age: number;
  experience: string;
  location: string;
  languages: string[];
  voiceTone: string[];
  voiceTexture?: string;
  vocalPitch?: string;
  accentStyles?: string[];
  accents: string[];
  homeStudio: boolean;
  mainImage: string;
  badge?: string;
  about: string;
  skills: string[];
  experienceCredits: ExperienceCredit[];
  audioSamples: AudioSample[];
  audios?: AudioSample[];
  videos?: VideoItem[];
  photos: string[];
}

export interface CategoryMeta {
  slug: VoiceArtistCategorySlug;
  title: string;
  headline: string;
  description: string;
  heroDescription: string;
  ctaText: string;
  countLabel: string;
  image: string;
  route: string;
}

export const VOICE_ARTIST_CATEGORIES: CategoryMeta[] = [
  {
    slug: "voice-over-artists",
    title: "Voice-Over Artists",
    headline: "Commercial & Corporate Voice Talent",
    description: "Professional voice actors for TVCs, corporate explainer videos, e-learning modules, and audiobook narrations.",
    heroDescription: "Explore versatile voice-over professionals offering crisp diction, authoritative tones, and professional studio delivery.",
    ctaText: "Explore Voice-Over Artists",
    countLabel: "20+ Voice Talents",
    image: "/images/talents/voice-artists/vikram-sharma-main.jpg",
    route: "/voice-artists/voice-over-artists/",
  },
  {
    slug: "dubbing-artists",
    title: "Dubbing Artists",
    headline: "Film & OTT Character Dubbing Specialists",
    description: "Skilled dubbing artists proficient in lip-sync dubbing, emotional character matching, and regional language translation.",
    heroDescription: "Connect with experienced dubbing actors delivering seamless character synchronization for international cinema and web series.",
    ctaText: "Explore Dubbing Artists",
    countLabel: "15+ Dubbing Pros",
    image: "/images/talents/voice-artists/nisha-rao-main.jpg",
    route: "/voice-artists/dubbing-artists/",
  },
  {
    slug: "radio-voice-artists",
    title: "Radio & Podcast Voices",
    headline: "Radio Presenters & Podcast Narrators",
    description: "High-energy radio spot artists and engaging podcast hosts providing upbeat commercial jingles and audio show hosting.",
    heroDescription: "Browse dynamic radio voices bringing rhythmic energy and friendly intimacy to radio advertisements and podcasts.",
    ctaText: "Explore Radio Voices",
    countLabel: "12+ Radio Voices",
    image: "/images/talents/voice-artists/vikram-sharma-main.jpg",
    route: "/voice-artists/radio-voice-artists/",
  },
];

export const VOICE_ARTISTS_DATA: VoiceArtist[] = [
  {
    id: "vikram-sharma",
    name: "Vikram Sharma",
    category: "voice-over-artists",
    categoryLabel: "Voice-Over Artist",
    role: "Corporate & Commercial Voice",
    age: 34,
    experience: "9 Years",
    location: "New Delhi",
    languages: ["Hindi", "English"],
    voiceTone: ["Baritone", "Authoritative", "Warm Corporate", "Documentary"],
    accents: ["Neutral Indian", "North Indian Hindi"],
    homeStudio: true,
    mainImage: "/images/talents/voice-artists/vikram-sharma-main.jpg",
    badge: "Master Voice Artist",
    about: "Vikram Sharma possesses a commanding baritone voice heard across 100+ national TV commercials, documentaries, and luxury car brand launches.",
    skills: ["Deep Baritone", "Documentary Narration", "Commercial Jingle Delivery", "Pro Studio Setup"],
    experienceCredits: [
      { project: "Mahindra SUV Commercial", role: "Main Brand Voice", type: "Radio Commercial", year: "2024" },
    ],
    audioSamples: [],
    photos: [
      "/images/talents/voice-artists/vikram-sharma/01.jpg",
      "/images/talents/voice-artists/vikram-sharma/02.png",
      "/images/talents/voice-artists/vikram-sharma/03.jpg",
      "/images/talents/voice-artists/vikram-sharma/04.jpg"
],
  },
  {
    id: "nisha-rao",
    name: "Nisha Rao",
    category: "dubbing-artists",
    categoryLabel: "Dubbing Artist",
    role: "Character Dubbing & Lip-Sync Pro",
    age: 29,
    experience: "6 Years",
    location: "New Delhi / Mumbai",
    languages: ["Hindi", "English", "Marathi"],
    voiceTone: ["Melodious", "Youthful", "Dramatic", "Character Voice"],
    accents: ["Neutral Hindi", "Urban English"],
    homeStudio: true,
    mainImage: "/images/talents/voice-artists/nisha-rao-main.jpg",
    badge: "Verified Dubbing Pro",
    about: "Nisha Rao is an expressive dubbing artist providing Hindi dubbed character voices for leading Hollywood blockbusters and South Indian feature films.",
    skills: ["Precision Lip Sync", "Dramatic Voice Acting", "Kids & Animated Voices"],
    experienceCredits: [
      { project: "Hollywood Animated Feature Hindi Dub", role: "Female Lead Voice", type: "Movie Dubbing", year: "2024" },
    ],
    audioSamples: [],
    photos: [
      "/images/talents/voice-artists/nisha-rao/01.jpg",
      "/images/talents/voice-artists/nisha-rao/02.png",
      "/images/talents/voice-artists/nisha-rao/03.jpg",
      "/images/talents/voice-artists/nisha-rao/04.jpg"
    ],
  },
  {
    id: "rohan-mehra-voice",
    name: "Rohan Mehra",
    category: "voice-over-artists",
    categoryLabel: "Voice Over Artist",
    role: "Documentary & Corporate Narrator",
    age: 30,
    experience: "7 Years",
    location: "New Delhi",
    languages: ["English", "Hindi"],
    voiceTexture: "Deep Baritone & Warm",
    voiceTone: ["Documentaries", "Corporate AVs", "E-Learning"],
    accents: ["Neutral English", "Formal Hindi"],
    homeStudio: true,
    mainImage: "/images/actors/Voice Over Artists.webp",
    badge: "Verified Voice Pro",
    about: "Rohan Mehra is a premier documentary narrator and corporate voice over artist with a broadcast-grade home studio.",
    skills: ["Narration", "Corporate Pitching", "Audio Mastering"],
    experienceCredits: [
      { project: "National Geographic India Edit", role: "Lead Narrator", type: "Documentary Voiceover", year: "2024" }
    ],
    audioSamples: [],
    photos: ["/images/actors/Voice Over Artists.webp"]
  },
  {
    id: "priya-rj",
    name: "Priya Sharma (RJ Priya)",
    category: "radio-voice-artists",
    categoryLabel: "Radio Voice Artist & RJ",
    role: "Radio Jockey & Podcast Host",
    age: 27,
    experience: "5 Years",
    location: "New Delhi / NCR",
    languages: ["Hindi", "English", "Punjabi"],
    voiceTexture: "Energetic & Peppy",
    voiceTone: ["Radio Jingles", "Podcasts", "Commercial Spots"],
    accents: ["Urban Delhi", "Punjabi Blend"],
    homeStudio: true,
    mainImage: "/images/actors/Radio Voice Artists & RJs.jpg",
    badge: "Top RJ & Voice Artist",
    about: "Priya Sharma is a popular FM Radio Jockey and podcast host known for high-energy promos and vibrant voice overs.",
    skills: ["Radio Hosting", "Jingle Delivery", "Conversational VO"],
    experienceCredits: [
      { project: "Red FM Morning Drive", role: "Host RJ", type: "Radio Commercial", year: "2025" }
    ],
    audioSamples: [],
    photos: ["/images/actors/Radio Voice Artists & RJs.jpg"]
  },
  {
    id: "arjun-dubbing",
    name: "Arjun Kapoor (Voice)",
    category: "dubbing-artists",
    categoryLabel: "Dubbing Artist",
    role: "Movie & Character Dubbing Pro",
    age: 32,
    experience: "8 Years",
    location: "Mumbai / Delhi",
    languages: ["Hindi", "English"],
    voiceTexture: "Resonant & Action Heavy",
    voiceTone: ["Feature Film Dubbing", "Action Anime", "OTT Series"],
    accents: ["Standard Hindi", "Nordic Accent Dub"],
    homeStudio: true,
    mainImage: "/images/actors/Dubbing Artists.jpeg",
    badge: "Verified Dubbing Pro",
    about: "Arjun is a seasoned dubbing performer who has provided Hindi voices for leading Hollywood superhero blockbusters.",
    skills: ["Lip Sync Precision", "Screaming & Action VO", "Character Modulation"],
    experienceCredits: [
      { project: "Marvel Feature Hindi Dub", role: "Superhero Lead Voice", type: "Movie Dubbing", year: "2024" }
    ],
    audioSamples: [],
    photos: ["/images/actors/Dubbing Artists.jpeg"]
  },
  {
    id: "simran-voice",
    name: "Simran Kaur",
    category: "voice-over-artists",
    categoryLabel: "Voice Over Artist",
    role: "Commercial & IVR Specialist",
    age: 26,
    experience: "4 Years",
    location: "New Delhi",
    languages: ["Hindi", "English"],
    voiceTexture: "Soft, Warm & Trustworthy",
    voiceTone: ["Commercial Ads", "IVR Systems", "Storytelling"],
    accents: ["Clear Hindi", "Corporate English"],
    homeStudio: true,
    mainImage: "/images/actors/editorial_grid_1.png",
    badge: "Verified Voice Pro",
    about: "Simran Kaur is the signature voice behind multiple national bank IVR lines and luxury brand commercials.",
    skills: ["Soft Modulation", "IVR Telephony", "Commercial Delivery"],
    experienceCredits: [
      { project: "HDFC Bank National IVR", role: "Signature Voice", type: "Radio Commercial", year: "2024" }
    ],
    audioSamples: [],
    photos: ["/images/actors/editorial_grid_1.png"]
  },
  {
    id: "karan-narrator",
    name: "Karan Verma",
    category: "radio-voice-artists",
    categoryLabel: "Radio Voice Artist & RJ",
    role: "Audiobook & Radio Specialist",
    age: 29,
    experience: "6 Years",
    location: "Gurugram",
    languages: ["Hindi", "English"],
    voiceTexture: "Cinematic & Deep",
    voiceTone: ["Audiobooks", "Radio Drama", "Short Films"],
    accents: ["Classic Hindi", "Urdu Diction"],
    homeStudio: true,
    mainImage: "/images/actors/editorial_grid_5.png",
    badge: "Audiobook Specialist",
    about: "Karan has narrated over 40+ bestselling Hindi audiobooks on Audible and Kuku FM with rich character differentiation.",
    skills: ["Character Acting", "Audiobook Pacing", "Urdu Pronunciation"],
    experienceCredits: [
      { project: "Audible Original Series", role: "Lead Narrator", type: "Corporate Narration", year: "2025" }
    ],
    audioSamples: [],
    photos: ["/images/actors/editorial_grid_5.png"]
  },
  {
    id: "tara-dubbing",
    name: "Tara Roy",
    category: "dubbing-artists",
    categoryLabel: "Dubbing Artist",
    role: "Animation & Anime Dubber",
    age: 25,
    experience: "4 Years",
    location: "New Delhi",
    languages: ["Hindi", "English", "Bengali"],
    voiceTexture: "High Pitch & Energetic",
    voiceTone: ["Cartoons", "Anime", "Gaming Characters"],
    accents: ["Kid Voice", "Fantasy Accent"],
    homeStudio: true,
    mainImage: "/images/actors/editorial_grid_2.png",
    badge: "Animation Pro",
    about: "Tara specializes in high-energy cartoon dubbing, video game character voices, and animated series.",
    skills: ["Child Voice Emulation", "Anime Dubbing", "Game Sound Effects"],
    experienceCredits: [
      { project: "Disney Channel Hindi Series", role: "Lead Anime Voice", type: "Movie Dubbing", year: "2024" }
    ],
    audioSamples: [],
    photos: ["/images/actors/editorial_grid_2.png"]
  },
  {
    id: "kabir-commercial-vo",
    name: "Kabir Malhotra",
    category: "voice-over-artists",
    categoryLabel: "Voice Over Artist",
    role: "TVC & Promo Voice",
    age: 28,
    experience: "5 Years",
    location: "Delhi NCR",
    languages: ["Hindi", "English"],
    voiceTexture: "Punchy, Dynamic & Youthful",
    voiceTone: ["TV Ads", "Movie Trailers", "Sports Promos"],
    accents: ["Youthful Hindi", "Indian English"],
    homeStudio: true,
    mainImage: "/images/actors/editorial_grid_4.png",
    badge: "Promo Specialist",
    about: "Kabir's energetic baritone is featured across sports promos, IPL ad spots, and high-impact movie trailers.",
    skills: ["Promo Punch", "High Energy", "Fast Pace VO"],
    experienceCredits: [
      { project: "IPL Promo Campaign", role: "Lead Promo Voice", type: "Radio Commercial", year: "2025" }
    ],
    audioSamples: [],
    photos: ["/images/actors/editorial_grid_4.png"]
  }
];

export function getAllVoiceArtists(): VoiceArtist[] {
  return VOICE_ARTISTS_DATA;
}

export function getVoiceArtistById(id: string): VoiceArtist | undefined {
  return VOICE_ARTISTS_DATA.find((va) => va.id === id);
}

export function getVoiceArtistsByCategory(category: VoiceArtistCategorySlug): VoiceArtist[] {
  return VOICE_ARTISTS_DATA.filter((va) => va.category === category);
}

export function getRelatedVoiceArtists(currentId: string, category: VoiceArtistCategorySlug, limit: number = 8): VoiceArtist[] {
  const sameCategory = VOICE_ARTISTS_DATA.filter((va) => va.id !== currentId && va.category === category);
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const otherArtists = VOICE_ARTISTS_DATA.filter((va) => va.id !== currentId && va.category !== category);
  return [...sameCategory, ...otherArtists].slice(0, limit);
}

export function getVoiceArtistCategoryBySlug(slug: VoiceArtistCategorySlug): CategoryMeta | undefined {
  return VOICE_ARTIST_CATEGORIES.find((c) => c.slug === slug);
}

export const getVoiceCategoryBySlug = getVoiceArtistCategoryBySlug;

