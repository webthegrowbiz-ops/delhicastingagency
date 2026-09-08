export type ChildArtistCategorySlug =
  | "boys"
  | "girls"
  | "fresh-faces";

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
  type: "TV Commercial" | "Feature Film" | "Web Series" | "Print Campaign";
  year: string;
  directorOrClient?: string;
}

export interface ChildArtist {
  id: string;
  name: string;
  category: ChildArtistCategorySlug;
  categoryLabel: string;
  role: string;
  age: number;
  height: string;
  experience: string;
  location: string;
  languages: string[];
  guardianName: string;
  guardianContact: string;
  guardianConsent?: string | boolean;
  eyeColor?: string;
  hair?: string;
  mainImage: string;
  badge?: string;
  about: string;
  skills: string[];
  experienceCredits: ExperienceCredit[];
  photos: string[];
  videos: VideoItem[];
  instagram?: InstagramItem[];
  print?: PrintItem[];
}

export interface CategoryMeta {
  slug: ChildArtistCategorySlug;
  title: string;
  headline: string;
  description: string;
  heroDescription: string;
  ctaText: string;
  countLabel: string;
  image: string;
  route: string;
}

export const CHILD_ARTIST_CATEGORIES: CategoryMeta[] = [
  {
    slug: "boys",
    title: "Child Boys",
    headline: "Young Male Performers & Models",
    description: "Energetic and charismatic young boys suitable for family commercials, feature film kids roles, and kids apparel shoots.",
    heroDescription: "Explore talented child boys with natural camera confidence for advertisements, serials, and cinema productions.",
    ctaText: "Explore Child Boys",
    countLabel: "15+ Young Boys",
    image: "/images/talents/child-artists/reyansh-verma-main.jpg",
    route: "/child-artists/boys/",
  },
  {
    slug: "girls",
    title: "Child Girls",
    headline: "Young Female Performers & Models",
    description: "Expressive and endearing young girls for FMCG brand TVCs, emotional drama series, and children's fashion catalogues.",
    heroDescription: "Discover charismatic young girls bringing warmth, natural talent, and professional discipline to commercial shoots.",
    ctaText: "Explore Child Girls",
    countLabel: "18+ Young Girls",
    image: "/images/talents/child-artists/ananya-joshi-main.jpg",
    route: "/child-artists/girls/",
  },
  {
    slug: "fresh-faces",
    title: "Fresh Child Talent",
    headline: "New & Emerging Child Performers",
    description: "Promising child actors and new entries looking for debut opportunities in television commercials and web series.",
    heroDescription: "Browse emerging child talent with natural enthusiasm and quick dialogue retention for kids auditions.",
    ctaText: "Explore Fresh Child Talent",
    countLabel: "10+ New Kids",
    image: "/images/talents/child-artists/reyansh-verma-main.jpg",
    route: "/child-artists/fresh-faces/",
  },
];

export const CHILD_ARTISTS_DATA: ChildArtist[] = [
  {
    id: "reyansh-verma",
    name: "Reyansh Verma",
    category: "boys",
    categoryLabel: "Child Artist (Boy)",
    role: "TVC & Feature Film Kid",
    age: 8,
    height: "4'2\"",
    experience: "2 Years",
    location: "New Delhi",
    languages: ["Hindi", "English"],
    guardianName: "Sunita Verma (Mother)",
    guardianContact: "+91 9811X XXXXX",
    mainImage: "/images/talents/child-artists/reyansh-verma-main.jpg",
    badge: "Featured Child Artist",
    about: "Reyansh Verma is a cheerful 8-year-old actor who has featured in multiple national milk brand TVCs and educational brand campaigns.",
    skills: ["Natural Dialogue", "Expressive Facial Acting", "Quick Prompt Retention"],
    experienceCredits: [
      { project: "Amul Health Drink TVC", role: "Main Child Protagonist", type: "TV Commercial", year: "2024" },
    ],
    photos: [
      "/images/talents/child-artists/reyansh-verma/01.jpg",
      "/images/talents/child-artists/reyansh-verma/02.jpg",
      "/images/talents/child-artists/reyansh-verma/03.jpg"
],
    videos: [],
  },
  {
    id: "ananya-joshi",
    name: "Ananya Joshi",
    category: "girls",
    categoryLabel: "Child Artist (Girl)",
    role: "Commercial & Drama Kid",
    age: 7,
    height: "3'11\"",
    experience: "2 Years",
    location: "New Delhi / NCR",
    languages: ["Hindi", "English"],
    guardianName: "Rajesh Joshi (Father)",
    guardianContact: "+91 9810X XXXXX",
    mainImage: "/images/talents/child-artists/ananya-joshi-main.jpg",
    badge: "Verified Child Artist",
    about: "Ananya Joshi is an adorable 7-year-old child actor with natural screen charm, featured in prominent apparel lookbooks and festive commercials.",
    skills: ["Smile Expression", "Apparel Posing", "Director Guidelines Following"],
    experienceCredits: [
      { project: "FirstCry Festive Edit", role: "Lead Kid Model", type: "Print Campaign", year: "2024" },
    ],
    photos: [
      "/images/talents/child-artists/ananya-joshi/01.jpg",
      "/images/talents/child-artists/ananya-joshi/02.jpg",
      "/images/talents/child-artists/ananya-joshi/03.jpg"
    ],
    videos: [],
  },
  {
    id: "aarav-verma-kid",
    name: "Aarav Verma",
    category: "boys",
    categoryLabel: "Boy Child Artist",
    role: "TVC & Print Kid Lead",
    age: 9,
    height: "4'2\"",
    experience: "3 Years",
    location: "New Delhi",
    languages: ["Hindi", "English"],
    guardianName: "Sunil Verma (Father)",
    guardianContact: "+91 9811X XXXXX",
    mainImage: "/images/actors/child artist boys.jpg",
    badge: "Verified Child Artist",
    about: "Aarav is an expressive 9-year-old child actor with major brand commercial experience and movie appearance.",
    skills: ["Dialogue Memory", "Natural Acting", "Commercial Posing"],
    experienceCredits: [
      { project: "Bournvita Campaign", role: "Lead Kid", type: "TV Commercial", year: "2024" }
    ],
    photos: ["/images/actors/child artist boys.jpg"],
    videos: []
  },
  {
    id: "myra-sharma",
    name: "Myra Sharma",
    category: "girls",
    categoryLabel: "Girl Child Artist",
    role: "Commercial & Drama Kid",
    age: 8,
    height: "4'0\"",
    experience: "2 Years",
    location: "Gurugram / Delhi",
    languages: ["Hindi", "English"],
    guardianName: "Kavita Sharma (Mother)",
    guardianContact: "+91 9812X XXXXX",
    mainImage: "/images/actors/child artist female.jpg",
    badge: "Verified Child Artist",
    about: "Myra Sharma is a charming 8-year-old female child artist who loves acting and camera work.",
    skills: ["Expressive Face", "Prompt Following", "Catalogue Posing"],
    experienceCredits: [
      { project: "Kinder Joy Ad", role: "Featured Girl", type: "TV Commercial", year: "2025" }
    ],
    photos: ["/images/actors/child artist female.jpg"],
    videos: []
  },
  {
    id: "vihaan-kapoor-kid",
    name: "Vihaan Kapoor",
    category: "fresh-faces",
    categoryLabel: "Fresh Face Child Artist",
    role: "Fresh Face & Model",
    age: 6,
    height: "3'8\"",
    experience: "1 Year",
    location: "New Delhi",
    languages: ["Hindi", "English"],
    guardianName: "Amit Kapoor (Father)",
    guardianContact: "+91 9813X XXXXX",
    mainImage: "/images/actors/fresh child artist.webp",
    badge: "Emerging Kid Talent",
    about: "Vihaan is a photogenic 6-year-old child artist featuring in fashion lookbooks and print ads.",
    skills: ["Natural Smile", "Camera Friendly", "Quick Learner"],
    experienceCredits: [
      { project: "Max Kids Apparel", role: "Lookbook Model", type: "Print Campaign", year: "2024" }
    ],
    photos: ["/images/actors/fresh child artist.webp"],
    videos: []
  },
  {
    id: "kavya-singh-kid",
    name: "Kavya Singh",
    category: "girls",
    categoryLabel: "Girl Child Artist",
    role: "Drama & Movie Kid Lead",
    age: 10,
    height: "4'4\"",
    experience: "4 Years",
    location: "Noida / Delhi",
    languages: ["Hindi", "English"],
    guardianName: "Meenakshi Singh (Mother)",
    guardianContact: "+91 9814X XXXXX",
    mainImage: "/images/actors/child artist horizontal.png",
    badge: "Verified Child Artist",
    about: "Kavya is a talented 10-year-old child actress who played emotional young roles in feature films and OTT shows.",
    skills: ["Emotional Acting", "Dialogue Diction", "Voice Over"],
    experienceCredits: [
      { project: "Chhoti Si Asha (Feature Film)", role: "Young Asha", type: "Feature Film", year: "2024" }
    ],
    photos: ["/images/actors/child artist horizontal.png"],
    videos: []
  },
  {
    id: "kabir-gupta-kid",
    name: "Kabir Gupta",
    category: "boys",
    categoryLabel: "Boy Child Artist",
    role: "Commercial & Print Kid",
    age: 8,
    height: "3'11\"",
    experience: "2 Years",
    location: "New Delhi",
    languages: ["Hindi", "English"],
    guardianName: "Rohit Gupta (Father)",
    guardianContact: "+91 9815X XXXXX",
    mainImage: "/media/dca/models/dca-model-catalogue-01.jpg",
    badge: "Verified Child Artist",
    about: "Kabir is an active 8-year-old commercial kid model featuring in toy brand commercials and print catalogs.",
    skills: ["Playful Expression", "High Energy", "Action Posing"],
    experienceCredits: [
      { project: "HotWheels India TVC", role: "Lead Kid", type: "TV Commercial", year: "2025" }
    ],
    photos: ["/media/dca/models/dca-model-catalogue-01.jpg"],
    videos: []
  },
  {
    id: "tara-mehta-kid",
    name: "Tara Mehta",
    category: "fresh-faces",
    categoryLabel: "Fresh Face Child Artist",
    role: "Fresh Face Kid",
    age: 5,
    height: "3'5\"",
    experience: "1 Year",
    location: "Gurugram",
    languages: ["Hindi", "English"],
    guardianName: "Neha Mehta (Mother)",
    guardianContact: "+91 9816X XXXXX",
    mainImage: "/images/actors/editorial_grid_1.png",
    badge: "Emerging Kid Talent",
    about: "Tara is a cute 5-year-old kid model with natural innocence and sweet camera presence.",
    skills: ["Cute Smile", "Charming Demeanor"],
    experienceCredits: [
      { project: "Pampers Baby Edit", role: "Baby Model", type: "TV Commercial", year: "2024" }
    ],
    photos: ["/images/actors/editorial_grid_1.png"],
    videos: []
  },
  {
    id: "arjun-sharma-kid",
    name: "Arjun Sharma",
    category: "boys",
    categoryLabel: "Boy Child Artist",
    role: "TV Serial & Web Kid",
    age: 11,
    height: "4'6\"",
    experience: "4 Years",
    location: "Delhi NCR",
    languages: ["Hindi", "English"],
    guardianName: "Sanjay Sharma (Father)",
    guardianContact: "+91 9817X XXXXX",
    mainImage: "/images/actors/editorial_grid_4.png",
    badge: "Verified Child Artist",
    about: "Arjun is a sharp 11-year-old child actor with experience in Hindi prime time TV serials and web series.",
    skills: ["Complex Dialogue", "Scene Focus", "Director Direction"],
    experienceCredits: [
      { project: "Balika Vadha 2", role: "Young Hero", type: "TV Commercial", year: "2024" }
    ],
    photos: ["/images/actors/editorial_grid_4.png"],
    videos: []
  }
];

export function getAllChildArtists(): ChildArtist[] {
  return CHILD_ARTISTS_DATA;
}

export function getChildArtistById(id: string): ChildArtist | undefined {
  return CHILD_ARTISTS_DATA.find((ca) => ca.id === id);
}

export function getChildArtistsByCategory(category: ChildArtistCategorySlug): ChildArtist[] {
  if (category === "boys") {
    return CHILD_ARTISTS_DATA.filter(
      (ca) => ca.category === "boys" || ca.categoryLabel.toLowerCase().includes("boy")
    );
  }
  if (category === "girls") {
    return CHILD_ARTISTS_DATA.filter(
      (ca) => ca.category === "girls" || ca.categoryLabel.toLowerCase().includes("girl")
    );
  }
  if (category === "fresh-faces") {
    return CHILD_ARTISTS_DATA.filter(
      (ca) => ca.category === "fresh-faces" || ca.badge?.toLowerCase().includes("emerging") || ca.experience.includes("1") || ca.experience.includes("2")
    );
  }
  return CHILD_ARTISTS_DATA.filter((ca) => ca.category === category);
}

export function getRelatedChildArtists(currentId: string, category: ChildArtistCategorySlug, limit: number = 8): ChildArtist[] {
  const sameCategory = CHILD_ARTISTS_DATA.filter((ca) => ca.id !== currentId && ca.category === category);
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const otherArtists = CHILD_ARTISTS_DATA.filter((ca) => ca.id !== currentId && ca.category !== category);
  return [...sameCategory, ...otherArtists].slice(0, limit);
}

export function getChildArtistCategoryBySlug(slug: ChildArtistCategorySlug): CategoryMeta | undefined {
  return CHILD_ARTIST_CATEGORIES.find((c) => c.slug === slug);
}

export const getChildCategoryBySlug = getChildArtistCategoryBySlug;

