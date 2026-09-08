export type ModelCategorySlug =
  | "female-models"
  | "male-models"
  | "fashion-models"
  | "commercial-models"
  | "plus-size-models"
  | "fitness-models";

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  thumbnail: string;
  url?: string;
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
  type: "Fashion Runway" | "Brand Campaign" | "Catalogue Shoot" | "Commercial" | "Editorial" | "Lookbook";
  year: string;
  directorOrClient?: string;
}

export interface Model {
  id: string;
  name: string;
  category: ModelCategorySlug;
  categoryLabel: string;
  role: string;
  age: number;
  height: string;
  experience: string;
  location: string;
  languages: string[];
  eyeColor: string;
  hair: string;
  bustOrChest: string;
  waist: string;
  hips: string;
  shoeSize: string;
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
  slug: ModelCategorySlug;
  title: string;
  headline: string;
  description: string;
  heroDescription: string;
  ctaText: string;
  countLabel: string;
  image: string;
  route: string;
}

export const MODEL_CATEGORIES: CategoryMeta[] = [
  {
    slug: "female-models",
    title: "Female Models",
    headline: "High-Fashion, Editorial & Commercial Models",
    description: "Verified female models for runway fashion, designer lookbooks, e-commerce catalogues, and luxury brand endorsements.",
    heroDescription: "Explore verified female models available for runway showcases, print campaigns, designer editorials, and commercial brand assignments.",
    ctaText: "Explore Female Models",
    countLabel: "18+ Verified Models",
    image: "/images/talents/models/female/aarsha-mohan-main.jpg",
    route: "/models/female-models/",
  },
  {
    slug: "male-models",
    title: "Male Models",
    headline: "Runway, Lifestyle & Commercial Male Talent",
    description: "Versatile male models suited for sartorial menswear campaigns, fitness editorials, commercial advertisements, and runway shows.",
    heroDescription: "Browse dynamic male models offering strong screen presence, athletic physiques, and versatile styling for international and domestic campaigns.",
    ctaText: "Explore Male Models",
    countLabel: "16+ Verified Models",
    image: "/images/talents/models/male/aarav-kapoor-main.jpg",
    route: "/models/male-models/",
  },
  {
    slug: "fashion-models",
    title: "Fashion Models",
    headline: "Haute Couture & Runway Talent",
    description: "Editorial models trained for fashion week runways, high-fashion magazine covers, luxury couture catalogues, and designer lookbooks.",
    heroDescription: "Discover runway-trained fashion models with striking features and exceptional poise for fashion weeks, couture shoots, and designer showcases.",
    ctaText: "Explore Fashion Models",
    countLabel: "14+ Fashion Models",
    image: "/images/talents/models/female/meera-sharma-main.jpg",
    route: "/models/fashion-models/",
  },
  {
    slug: "commercial-models",
    title: "Commercial Models",
    headline: "Advertising, Brand & TV Commercial Models",
    description: "Relatable, expressive commercial models for FMCG brand commercials, print advertisements, lifestyle billboards, and digital ads.",
    heroDescription: "Connect with approachable and expressive commercial models ideal for national print campaigns, TVCs, FMCG brands, and digital storytelling.",
    ctaText: "Explore Commercial Models",
    countLabel: "15+ Commercial Models",
    image: "/images/talents/models/male/kabir-mehta-main.jpg",
    route: "/models/commercial-models/",
  },
  {
    slug: "plus-size-models",
    title: "Plus-Size Models",
    headline: "Body Positive & Inclusive Fashion Talent",
    description: "Confident plus-size models leading inclusive fashion campaigns, body-positive retail brands, and lifestyle brand collaborations.",
    heroDescription: "Browse empowering plus-size models celebrating diversity, authentic confidence, and inclusive representation across fashion and retail.",
    ctaText: "Explore Plus-Size Models",
    countLabel: "10+ Plus-Size Models",
    image: "/images/talents/models/female/riya-malhotra-main.jpg",
    route: "/models/plus-size-models/",
  },
  {
    slug: "fitness-models",
    title: "Fitness Models",
    headline: "Athletic, Sports & Wellness Models",
    description: "Athletes, calisthenics practitioners, and fitness models for activewear campaigns, sports nutrition brands, and wellness editorials.",
    heroDescription: "Explore conditioned fitness models with athletic physiques and high endurance for sportswear brands, fitness campaigns, and lifestyle shoots.",
    ctaText: "Explore Fitness Models",
    countLabel: "12+ Fitness Models",
    image: "/images/talents/models/male/kabir-singhania-main.jpeg",
    route: "/models/fitness-models/",
  },
];

export const MODELS_DATA: Model[] = [
  /* FEMALE MODELS */
  {
    id: "aarsha-mohan",
    name: "Aarsha Mohan",
    category: "female-models",
    categoryLabel: "Female Model",
    role: "High-Fashion & Editorial Model",
    age: 24,
    height: "5'10\"",
    experience: "5 Years",
    location: "Delhi / NCR",
    languages: ["English", "Hindi"],
    eyeColor: "Dark Brown",
    hair: "Black",
    bustOrChest: "33B",
    waist: "24 in",
    hips: "34 in",
    shoeSize: "7.5 UK",
    mainImage: "/images/talents/models/female/aarsha-mohan-main.jpg",
    badge: "Mainboard Model",
    about: "Aarsha Mohan is a high-fashion and editorial model based in Delhi. Recognized for striking bone structure, graceful posture, and high-fashion adaptability across luxury couture, runway shows, and global lookbooks.",
    skills: ["Haute Couture Posing", "Runway Walk", "Editorial Styling", "Commercial Campaigns"],
    experienceCredits: [
      { project: "Delhi Fashion Week Spring Edit", role: "Principal Runway Model", type: "Fashion Runway", year: "2025" },
      { project: "Vogue India Couture Spread", role: "Cover Model", type: "Editorial", year: "2025" }
    ],
    photos: [
      "/images/talents/models/female/aarsha-mohan/01.jpg",
      "/images/talents/models/female/aarsha-mohan/02.jpg",
      "/images/talents/models/female/aarsha-mohan/03.jpg",
      "/images/talents/models/female/aarsha-mohan/04.jpg",
      "/images/talents/models/female/aarsha-mohan/05.png"
],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "meera-sharma",
    name: "Meera Sharma",
    category: "female-models",
    categoryLabel: "Female Model",
    role: "Runway & Luxury Editorial Model",
    age: 23,
    height: "5'9\"",
    experience: "4 Years",
    location: "New Delhi / Mumbai",
    languages: ["English", "Hindi"],
    eyeColor: "Hazel",
    hair: "Dark Brown",
    bustOrChest: "34B",
    waist: "25 in",
    hips: "35 in",
    shoeSize: "7.5 UK",
    mainImage: "/images/talents/models/female/meera-sharma-main.jpg",
    badge: "Mainboard Model",
    about: "Meera Sharma is a high-fashion runway model walking for leading Indian couture weeks and international designer showcases. Known for versatile editorial adaptability.",
    skills: ["Runway Walk", "High-Fashion Editorial", "Couture Posing"],
    experienceCredits: [
      { project: "Lakmé Fashion Week Winter Showcase", role: "Principal Runway Model", type: "Fashion Runway", year: "2025" }
    ],
    photos: [
      "/images/talents/models/female/meera-sharma/01.jpg",
      "/images/talents/models/female/meera-sharma/02.jpg",
      "/images/talents/models/female/meera-sharma/03.jpg",
      "/images/talents/models/female/meera-sharma/04.jpg",
      "/images/talents/models/female/meera-sharma/05.jpg"
],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "riya-malhotra",
    name: "Riya Malhotra",
    category: "female-models",
    categoryLabel: "Female Model",
    role: "Couture & Runway Artist",
    age: 22,
    height: "5'10\"",
    experience: "3 Years",
    location: "Mumbai / Delhi",
    languages: ["English", "Hindi"],
    eyeColor: "Black",
    hair: "Black",
    bustOrChest: "32B",
    waist: "24 in",
    hips: "34 in",
    shoeSize: "7 UK",
    mainImage: "/images/talents/models/female/riya-malhotra-main.jpg",
    badge: "Runway Pro",
    about: "Riya Malhotra is an avant-garde fashion model with fluid editorial movement and strong runway pacing. Featured in top Indian fashion publications.",
    skills: ["Avant-Garde Posing", "Runway Pacing", "High Fashion Concept Shoots"],
    experienceCredits: [
      { project: "India Couture Week Opening Show", role: "Opening Model", type: "Fashion Runway", year: "2025" }
    ],
    photos: [
      "/images/talents/models/female/riya-malhotra/01.jpg",
      "/images/talents/models/female/riya-malhotra/02.jpg",
      "/images/talents/models/female/riya-malhotra/03.png",
      "/images/talents/models/female/riya-malhotra/04.jpg",
      "/images/talents/models/female/riya-malhotra/05.jpg"
],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "tanya-sen",
    name: "Tanya Sen",
    category: "female-models",
    categoryLabel: "Female Model",
    role: "Body-Positive Fashion Model",
    age: 25,
    height: "5'8\"",
    experience: "4 Years",
    location: "New Delhi / Kolkata",
    languages: ["English", "Hindi", "Bengali"],
    eyeColor: "Dark Brown",
    hair: "Dark Brown",
    bustOrChest: "38D",
    waist: "34 in",
    hips: "44 in",
    shoeSize: "8 UK",
    mainImage: "/images/talents/models/female/tanya-sen-main.jpg",
    badge: "Mainboard Model",
    about: "Tanya Sen is a pioneer in body-positive fashion modeling across India. Vibrant charisma and commanding presence.",
    skills: ["Curve Fashion", "Retail Catalogue", "Confidence Posing"],
    experienceCredits: [
      { project: "FabIndia Inclusive Silhouettes", role: "Lead Campaign Model", type: "Brand Campaign", year: "2025" }
    ],
    photos: [
      "/images/talents/models/female/tanya-sen/01.jpg",
      "/images/talents/models/female/tanya-sen/02.png",
      "/images/talents/models/female/tanya-sen/03.jpg",
      "/images/talents/models/female/tanya-sen/04.jpg",
      "/images/talents/models/female/tanya-sen/05.jpg"
],
    videos: [],
    instagram: [],
    print: []
  },

  /* MALE MODELS */
  {
    id: "aarav-kapoor",
    name: "Aarav Kapoor",
    category: "male-models",
    categoryLabel: "Male Model",
    role: "Editorial & Menswear Model",
    age: 26,
    height: "6'1\"",
    experience: "5 Years",
    location: "New Delhi / NCR",
    languages: ["English", "Hindi", "Punjabi"],
    eyeColor: "Dark Brown",
    hair: "Black",
    bustOrChest: "40 in",
    waist: "31 in",
    hips: "38 in",
    shoeSize: "10 UK",
    mainImage: "/images/talents/models/male/aarav-kapoor-main.jpg",
    badge: "Mainboard Model",
    about: "Aarav Kapoor is a seasoned menswear model recognized for strong jawline symmetry, athletic proportions, and editorial versatility across tailored suits and street fashion.",
    skills: ["Menswear Suiting", "Ramp Walk", "E-commerce Catalogue"],
    experienceCredits: [
      { project: "Raymond Luxury Suiting Campaign", role: "Lead Model", type: "Brand Campaign", year: "2025" }
    ],
    photos: [
      "/images/talents/models/male/aarav-kapoor/01.jpg",
      "/images/talents/models/male/aarav-kapoor/02.jpg",
      "/images/talents/models/male/aarav-kapoor/03.jpeg",
      "/images/talents/models/male/aarav-kapoor/04.jpg",
      "/images/talents/models/male/aarav-kapoor/05.jpeg"
],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "kabir-mehta",
    name: "Kabir Mehta",
    category: "male-models",
    categoryLabel: "Male Model",
    role: "Runway & Commercial Model",
    age: 25,
    height: "6'2\"",
    experience: "4 Years",
    location: "Delhi / Mumbai",
    languages: ["English", "Hindi"],
    eyeColor: "Brown",
    hair: "Black",
    bustOrChest: "41 in",
    waist: "32 in",
    hips: "39 in",
    shoeSize: "10.5 UK",
    mainImage: "/images/talents/models/male/kabir-mehta-main.jpg",
    badge: "Mainboard Model",
    about: "Kabir Mehta is a high-demand male runway and print campaign model with commanding stage presence and expertise in high-fashion menswear.",
    skills: ["Runway Pacing", "Editorial Suiting", "Brand Commercials"],
    experienceCredits: [
      { project: "Lakme Fashion Week Men's Edit", role: "Lead Ramp Model", type: "Fashion Runway", year: "2025" }
    ],
    photos: [
      "/images/talents/models/male/kabir-mehta/01.jpg",
      "/images/talents/models/male/kabir-mehta/02.jpg",
      "/images/talents/models/male/kabir-mehta/03.jpg",
      "/images/talents/models/male/kabir-mehta/04.jpg",
      "/images/talents/models/male/kabir-mehta/05.jpeg"
],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "kabir-singhania",
    name: "Kabir Singhania",
    category: "male-models",
    categoryLabel: "Male Model",
    role: "Lifestyle & TVC Model",
    age: 28,
    height: "6'0\"",
    experience: "6 Years",
    location: "New Delhi",
    languages: ["English", "Hindi", "Bengali"],
    eyeColor: "Brown",
    hair: "Dark Brown",
    bustOrChest: "41 in",
    waist: "32 in",
    hips: "39 in",
    shoeSize: "9.5 UK",
    mainImage: "/images/talents/models/male/kabir-singhania-main.jpeg",
    badge: "Mainboard Model",
    about: "Kabir Singhania is an established commercial face specializing in consumer brand storytelling, corporate campaigns, and television commercials.",
    skills: ["TVC Acting", "Brand Representation", "Lifestyle Print"],
    experienceCredits: [
      { project: "HDFC Bank Life Insurance TVC", role: "Lead Character Model", type: "Commercial", year: "2025" }
    ],
    photos: [
      "/images/talents/models/male/kabir-singhania/01.jpeg",
      "/images/talents/models/male/kabir-singhania/02.jpg",
      "/images/talents/models/male/kabir-singhania/03.jpeg",
      "/images/talents/models/male/kabir-singhania/04.jpg",
      "/images/talents/models/male/kabir-singhania/05.jpg"
],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "rohan-mehra",
    name: "Rohan Mehra",
    category: "male-models",
    categoryLabel: "Male Model",
    role: "Athletic & Sportswear Model",
    age: 27,
    height: "6'2\"",
    experience: "5 Years",
    location: "New Delhi / Gurugram",
    languages: ["English", "Hindi"],
    eyeColor: "Black",
    hair: "Black",
    bustOrChest: "44 in",
    waist: "31 in",
    hips: "39 in",
    shoeSize: "11 UK",
    mainImage: "/images/talents/models/male/rohan-mehra-main.jpg",
    badge: "Fitness Specialist",
    about: "Rohan Mehra is a certified functional athlete and fitness model with sculpted muscularity and extensive experience modeling for athletic apparel.",
    skills: ["Activewear Posing", "Dynamic Action Shoots", "Sports Brand Endorsements"],
    experienceCredits: [
      { project: "Puma India HyperSpeed Campaign", role: "Lead Athlete Model", type: "Brand Campaign", year: "2025" }
    ],
    photos: [
      "/images/talents/models/male/rohan-mehra/01.jpg",
      "/images/talents/models/male/rohan-mehra/02.jpeg",
      "/images/talents/models/male/rohan-mehra/03.jpg",
      "/images/talents/models/male/rohan-mehra/04.jpg",
      "/images/talents/models/male/rohan-mehra/05.jpg"
    ],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "zara-khan",
    name: "Zara Khan",
    category: "female-models",
    categoryLabel: "Female Model",
    role: "High Fashion & Runway Model",
    age: 23,
    height: "5'10\"",
    experience: "4 Years",
    location: "New Delhi",
    languages: ["English", "Hindi"],
    eyeColor: "Hazel",
    hair: "Black",
    bustOrChest: "33 in",
    waist: "24 in",
    hips: "35 in",
    shoeSize: "7.5 UK",
    mainImage: "/media/dca/models/dca-model-fashion-01.jpg",
    badge: "Runway Specialist",
    about: "Zara Khan is a high-fashion runway model with extensive experience walkings for top couture designers and fashion weeks.",
    skills: ["High Fashion Ramp Walk", "Editorial Lookbook", "Designer Couture"],
    experienceCredits: [
      { project: "India Couture Week", role: "Ramp Model", type: "Fashion Runway", year: "2025" }
    ],
    photos: ["/media/dca/models/dca-model-fashion-01.jpg"],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "simran-kaur",
    name: "Simran Kaur",
    category: "female-models",
    categoryLabel: "Female Model",
    role: "Commercial & Print Model",
    age: 24,
    height: "5'8\"",
    experience: "3 Years",
    location: "Delhi NCR",
    languages: ["English", "Hindi", "Punjabi"],
    eyeColor: "Dark Brown",
    hair: "Dark Brown",
    bustOrChest: "34 in",
    waist: "25 in",
    hips: "36 in",
    shoeSize: "7 UK",
    mainImage: "/images/actors/casting-calls-femael modeal.png",
    badge: "Commercial Model",
    about: "Simran Kaur is a versatile commercial face featured in e-commerce catalogs and print advertisements across India.",
    skills: ["Catalog Posing", "Brand Shoots", "Commercial Print"],
    experienceCredits: [
      { project: "Myntra Summer Lookbook", role: "Lead Model", type: "Brand Campaign", year: "2024" }
    ],
    photos: ["/images/actors/casting-calls-femael modeal.png"],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "tanvi-sharma",
    name: "Tanvi Sharma",
    category: "female-models",
    categoryLabel: "Female Model",
    role: "Lifestyle & Beauty Model",
    age: 22,
    height: "5'7.5\"",
    experience: "3 Years",
    location: "Gurugram",
    languages: ["English", "Hindi"],
    eyeColor: "Brown",
    hair: "Brown",
    bustOrChest: "32 in",
    waist: "24 in",
    hips: "35 in",
    shoeSize: "6.5 UK",
    mainImage: "/images/actors/female photography.png",
    badge: "Beauty Specialist",
    about: "Tanvi Sharma specializes in skincare, cosmetics, and lifestyle commercial print campaigns.",
    skills: ["Beauty Closeups", "Skincare Ads", "Expression Control"],
    experienceCredits: [
      { project: "Lakme Beauty Campaign", role: "Face Model", type: "Commercial", year: "2025" }
    ],
    photos: ["/images/actors/female photography.png"],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "arav-singh",
    name: "Arav Singh",
    category: "male-models",
    categoryLabel: "Male Model",
    role: "Commercial Menswear Lead",
    age: 26,
    height: "6'1\"",
    experience: "5 Years",
    location: "New Delhi",
    languages: ["English", "Hindi"],
    eyeColor: "Black",
    hair: "Black",
    bustOrChest: "40 in",
    waist: "31 in",
    hips: "38 in",
    shoeSize: "10 UK",
    mainImage: "/media/dca/models/dca-model-male-01.jpg",
    badge: "Mainboard Model",
    about: "Arav Singh is a commercial male model featured in suiting catalogs, ethnic wear collections, and TVCs.",
    skills: ["Suiting Posing", "Ethnic Wear Ramp", "Brand Campaign"],
    experienceCredits: [
      { project: "Raymond Fine Clothing Edit", role: "Lead Model", type: "Brand Campaign", year: "2024" }
    ],
    photos: ["/media/dca/models/dca-model-male-01.jpg"],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "dev-kapoor",
    name: "Dev Kapoor",
    category: "male-models",
    categoryLabel: "Male Model",
    role: "Fitness & Casual Wear Model",
    age: 25,
    height: "6'0\"",
    experience: "4 Years",
    location: "Noida / Delhi",
    languages: ["English", "Hindi"],
    eyeColor: "Brown",
    hair: "Dark Brown",
    bustOrChest: "42 in",
    waist: "30 in",
    hips: "37 in",
    shoeSize: "9.5 UK",
    mainImage: "/images/actors/model male 1.png",
    about: "Dev Kapoor is a fitness enthusiast and commercial menswear model with high athletic definition.",
    skills: ["Activewear", "Fitness Shoots", "Lifestyle Commercial"],
    experienceCredits: [
      { project: "Decathlon Active Campaign", role: "Lead Athlete", type: "Brand Campaign", year: "2025" }
    ],
    photos: ["/images/actors/model male 1.png"],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "harsh-vardhan",
    name: "Harsh Vardhan",
    category: "male-models",
    categoryLabel: "Male Model",
    role: "Runway & Editorial Model",
    age: 27,
    height: "6'2\"",
    experience: "5 Years",
    location: "Delhi NCR",
    languages: ["English", "Hindi"],
    eyeColor: "Dark Brown",
    hair: "Black",
    bustOrChest: "39 in",
    waist: "30 in",
    hips: "37 in",
    shoeSize: "10.5 UK",
    mainImage: "/images/actors/model male 2.png",
    badge: "Runway Pro",
    about: "Harsh Vardhan is a high-fashion male model with sharp features and a strong runway walk.",
    skills: ["Runway Pacing", "High Fashion Editorial", "Designer Campaigns"],
    experienceCredits: [
      { project: "Delhi Fashion Week", role: "Showstopper Model", type: "Fashion Runway", year: "2025" }
    ],
    photos: ["/images/actors/model male 2.png"],
    videos: [],
    instagram: [],
    print: []
  }
];

export function getAllModels(): Model[] {
  return MODELS_DATA;
}

export function getModelById(id: string): Model | undefined {
  return MODELS_DATA.find((m) => m.id === id);
}

export function getModelsByCategory(category: ModelCategorySlug): Model[] {
  if (category === "female-models") {
    return MODELS_DATA.filter((m) => m.category === "female-models");
  }
  if (category === "male-models") {
    return MODELS_DATA.filter((m) => m.category === "male-models");
  }
  if (category === "fashion-models") {
    const list = MODELS_DATA.filter((m) =>
      m.role.toLowerCase().includes("fashion") ||
      m.role.toLowerCase().includes("runway") ||
      m.role.toLowerCase().includes("editorial") ||
      m.skills.some((s) => s.toLowerCase().includes("runway") || s.toLowerCase().includes("fashion"))
    );
    return list.length > 0 ? list : MODELS_DATA.slice(0, 6);
  }
  if (category === "commercial-models") {
    const list = MODELS_DATA.filter((m) =>
      m.role.toLowerCase().includes("commercial") ||
      m.role.toLowerCase().includes("catalogue") ||
      m.role.toLowerCase().includes("print") ||
      m.skills.some((s) => s.toLowerCase().includes("commercial") || s.toLowerCase().includes("catalogue"))
    );
    return list.length > 0 ? list : MODELS_DATA.slice(0, 6);
  }
  if (category === "fitness-models") {
    const list = MODELS_DATA.filter((m) =>
      m.role.toLowerCase().includes("fitness") ||
      m.skills.some((s) => s.toLowerCase().includes("fitness") || s.toLowerCase().includes("swimwear") || s.toLowerCase().includes("physique")) ||
      ["kabir-bhatia", "dev-rathore", "harsh-vardhan", "rohan-mehra-model"].includes(m.id)
    );
    return list.length > 0 ? list : MODELS_DATA.slice(0, 6);
  }
  if (category === "plus-size-models") {
    const list = MODELS_DATA.filter((m) =>
      m.role.toLowerCase().includes("curve") ||
      m.skills.some((s) => s.toLowerCase().includes("curve") || s.toLowerCase().includes("plus")) ||
      ["ananya-sen", "alisha-khan", "meera-sharma"].includes(m.id)
    );
    return list.length > 0 ? list : MODELS_DATA.slice(0, 6);
  }
  return MODELS_DATA.filter((m) => m.category === category);
}

export function getRelatedModels(currentId: string, category: ModelCategorySlug, limit: number = 8): Model[] {
  const sameCategory = MODELS_DATA.filter((m) => m.id !== currentId && m.category === category);
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const otherModels = MODELS_DATA.filter((m) => m.id !== currentId && m.category !== category);
  return [...sameCategory, ...otherModels].slice(0, limit);
}

export function getModelCategoryBySlug(slug: ModelCategorySlug): CategoryMeta | undefined {
  return MODEL_CATEGORIES.find((c) => c.slug === slug);
}
