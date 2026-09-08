import { CHILD_ARTISTS_DATA } from "./child-artists";

export type ActorCategorySlug =
  | "male"
  | "female"
  | "fresh-faces"
  | "experienced"
  | "popular"
  | "child-actors";

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
  type: "Feature Film" | "OTT / Web Series" | "TV Commercial" | "Television" | "Theatre" | "Short Film";
  year: string;
  directorOrClient?: string;
}

export interface Actor {
  id: string;
  name: string;
  category: ActorCategorySlug;
  categoryLabel: string;
  role: string;
  age: number;
  height: string;
  experience: string;
  location: string;
  languages: string[];
  eyeColor: string;
  hair: string;
  mainImage: string;
  badge?: string;
  about: string;
  skills: string[];
  experienceCredits: ExperienceCredit[];
  digitals: string[];
  videos: VideoItem[];
  instagram: InstagramItem[];
  print: PrintItem[];
  categories?: ActorCategorySlug[];
}

export interface CategoryMeta {
  slug: ActorCategorySlug;
  title: string;
  headline: string;
  description: string;
  heroDescription: string;
  ctaText: string;
  route: string;
  image: string;
  countLabel: string;
}

export const ACTOR_CATEGORIES: CategoryMeta[] = [
  {
    slug: "male",
    title: "Male Actors",
    headline: "Male Actors",
    description: "Explore the dedicated male actor category for casting and registration opportunities.",
    heroDescription: "Discover talented male actors available for leading, supporting and character roles across film, television and OTT productions.",
    ctaText: "Explore Male Actors",
    route: "/actors/male",
    image: "/images/talents/actors/male/rahul-mehra-main.png",
    countLabel: "8 Featured Actors",
  },
  {
    slug: "female",
    title: "Female Actors",
    headline: "Female Actors",
    description: "Explore talented female actors available for casting and entertainment opportunities.",
    heroDescription: "Discover versatile female actors available for film, television, OTT series, drama productions and commercial assignments.",
    ctaText: "Explore Female Actors",
    route: "/actors/female",
    image: "/images/talents/actors/female/ananya-deshmukh-main.png",
    countLabel: "8 Featured Actors",
  },
  {
    slug: "fresh-faces",
    title: "Fresh Faces",
    headline: "Fresh Faces",
    description: "Discover emerging actors and new talent looking for their first professional opportunities.",
    heroDescription: "Explore high-potential new talent, theatre graduates and promising newcomers ready for auditions and debut opportunities.",
    ctaText: "Explore Fresh Faces",
    route: "/actors/fresh-faces",
    image: "/images/talents/actors/female/natasha-roy-main.jpg",
    countLabel: "6 Emerging Talents",
  },
  {
    slug: "experienced",
    title: "Experienced Actors",
    headline: "Experienced Actors",
    description: "Explore experienced actors with professional backgrounds across different casting requirements.",
    heroDescription: "Browse seasoned screen and theatre performers with proven track records across feature films, television serials and OTT platforms.",
    ctaText: "Explore Experienced Actors",
    route: "/actors/experienced",
    image: "/images/talents/actors/male/arjun-verma-main.jpg",
    countLabel: "6 Senior Performers",
  },
  {
    slug: "popular",
    title: "Popular Actors",
    headline: "Popular Actors",
    description: "Discover featured and popular talent available for selected casting and entertainment opportunities.",
    heroDescription: "Explore recognized performers and high-demand talent with strong screen presence and audience engagement.",
    ctaText: "Explore Popular Actors",
    route: "/actors/popular",
    image: "/images/talents/actors/female/priya-kapoor-main.jpg",
    countLabel: "6 Top Talents",
  },
  {
    slug: "child-actors",
    title: "Child Actors",
    headline: "Child Actors",
    description: "Discover young talent suitable for age-appropriate film, television, advertising and entertainment opportunities.",
    heroDescription: "Explore charismatic young performers and child talent with natural screen presence for commercials, films and family drama productions.",
    ctaText: "Explore Child Actors",
    route: "/actors/child-actors",
    image: "/images/talents/child-artists/reyansh-verma-main.jpg",
    countLabel: "6 Child Talents",
  },
];

export const ACTORS_DATA: Actor[] = [
  /* 1. MALE ACTORS */
  {
    id: "rahul-mehra",
    name: "Rahul Mehra",
    category: "male",
    categories: ["male", "popular", "experienced"],
    categoryLabel: "Male Actor",
    role: "Lead & Character Actor",
    age: 27,
    height: "182 cm (6'0\")",
    experience: "5 Years",
    location: "Delhi / NCR",
    languages: ["Hindi", "English", "Punjabi"],
    eyeColor: "Dark Brown",
    hair: "Black",
    badge: "Verified DCA Artist",
    mainImage: "/images/talents/actors/male/rahul-mehra-main.png",
    about: "Trained at National School of Drama workshops and experienced in contemporary theatre, web-series and national TV commercials. Known for strong dramatic presence and natural screen acting.",
    skills: ["Method Acting", "Dialogue Delivery", "Theatre Performance", "Voice Modulation"],
    experienceCredits: [
      { project: "Dilli Junction (Web Series)", role: "Devrat (Parallel Lead)", type: "OTT / Web Series", year: "2024" },
      { project: "Royal Stag Campaign", role: "Lead Protagonist", type: "TV Commercial", year: "2023" }
    ],
    digitals: [
      "/images/talents/actors/male/rahul-mehra/01.png",
      "/images/talents/actors/male/rahul-mehra/02.jpg",
      "/images/talents/actors/male/rahul-mehra/03.jpg",
      "/images/talents/actors/male/rahul-mehra/04.jpg"
],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "arjun-verma",
    name: "Arjun Verma",
    category: "male",
    categories: ["male", "experienced", "popular"],
    categoryLabel: "Male Actor",
    role: "Action & Drama Lead",
    age: 29,
    height: "185 cm (6'1\")",
    experience: "6 Years",
    location: "Mumbai / Delhi",
    languages: ["Hindi", "English"],
    eyeColor: "Hazel",
    hair: "Dark Brown",
    badge: "Verified DCA Artist",
    mainImage: "/images/talents/actors/male/arjun-verma-main.jpg",
    about: "Physically agile and screen-commanding actor with martial arts training and extensive work in action dramas and cop thrillers.",
    skills: ["Screen Combat", "Method Acting", "Dubbing"],
    experienceCredits: [
      { project: "Vigilante (Feature Film)", role: "Inspector Samar", type: "Feature Film", year: "2024" }
    ],
    digitals: [
      "/images/talents/actors/male/arjun-verma/01.jpg",
      "/images/talents/actors/male/arjun-verma/02.jpg",
      "/images/talents/actors/male/arjun-verma/03.jpg",
      "/images/talents/actors/male/arjun-verma/04.jpg",
      "/images/talents/actors/male/arjun-verma/05.jpg"
],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "kabir-sharma",
    name: "Kabir Sharma",
    category: "male",
    categories: ["male", "fresh-faces", "popular"],
    categoryLabel: "Male Actor",
    role: "Romantic & Commercial Lead",
    age: 26,
    height: "179 cm (5'10\")",
    experience: "4 Years",
    location: "Delhi",
    languages: ["Hindi", "English"],
    eyeColor: "Black",
    hair: "Black",
    badge: "Verified DCA Artist",
    mainImage: "/images/talents/actors/male/kabir-sharma-main.jpg",
    about: "Charming actor specializing in romantic comedy, urban lifestyle characters, and emotional family dramas.",
    skills: ["Romantic Comedy", "Camera Acting", "Improvisation"],
    experienceCredits: [
      { project: "Love in South Extension", role: "Aman (Lead)", type: "OTT / Web Series", year: "2024" }
    ],
    digitals: [
      "/images/talents/actors/male/kabir-sharma/01.jpg",
      "/images/talents/actors/male/kabir-sharma/02.jpg",
      "/images/talents/actors/male/kabir-sharma/03.jpg",
      "/images/talents/actors/male/kabir-sharma/04.jpg",
      "/images/talents/actors/male/kabir-sharma/05.jpg"
],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "rohan-kapoor-actor",
    name: "Rohan Kapoor",
    category: "male",
    categories: ["male", "experienced"],
    categoryLabel: "Male Actor",
    role: "Character & Antagonist",
    age: 31,
    height: "180 cm (5'11\")",
    experience: "7 Years",
    location: "Delhi",
    languages: ["Hindi", "English"],
    eyeColor: "Dark Brown",
    hair: "Black",
    badge: "Verified DCA Artist",
    mainImage: "/images/talents/actors/male/rohan-kapoor-main.jpg",
    about: "Versatile character actor with a strong theatre pedigree. Capable of intense antagonistic roles and layered grey characters.",
    skills: ["Urdu Diction", "Method Acting", "Voice Over"],
    experienceCredits: [
      { project: "The Syndicate", role: "Farooq", type: "OTT / Web Series", year: "2024" }
    ],
    digitals: [
      "/images/talents/actors/male/rohan-kapoor/01.jpg",
      "/images/talents/actors/male/rohan-kapoor/02.jpg",
      "/images/talents/actors/male/rohan-kapoor/04.png"
],
    videos: [],
    instagram: [],
    print: []
  },

  /* 2. FEMALE ACTORS */
  {
    id: "ananya-deshmukh",
    name: "Ananya Deshmukh",
    category: "female",
    categories: ["female", "popular", "experienced"],
    categoryLabel: "Female Actor",
    role: "Lead Dramatic & OTT Actor",
    age: 26,
    height: "172 cm (5'8\")",
    experience: "5 Years",
    location: "Delhi / Mumbai",
    languages: ["Hindi", "English", "Marathi"],
    eyeColor: "Hazel Brown",
    hair: "Dark Brown",
    badge: "Verified DCA Artist",
    mainImage: "/images/talents/actors/female/ananya-deshmukh-main.png",
    about: "Accomplished screen performer with leading roles in critically acclaimed OTT thrillers, feature films and national brand campaigns. Classically trained in Kathak.",
    skills: ["Method Acting", "Kathak Dance", "Voice Modulation", "Hindi Diction"],
    experienceCredits: [
      { project: "Shadows Over Yamuna", role: "Roshni (Lead)", type: "OTT / Web Series", year: "2024" },
      { project: "Tanishq Festive Collection", role: "Lead Bride", type: "TV Commercial", year: "2023" }
    ],
    digitals: [
      "/images/talents/actors/female/ananya-deshmukh/01.png",
      "/images/talents/actors/female/ananya-deshmukh/02.jpg",
      "/images/talents/actors/female/ananya-deshmukh/03.jpg",
      "/images/talents/actors/female/ananya-deshmukh/04.jpg",
      "/images/talents/actors/female/ananya-deshmukh/05.png"
],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "priya-kapoor",
    name: "Priya Kapoor",
    category: "female",
    categories: ["female", "popular", "fresh-faces"],
    categoryLabel: "Female Actor",
    role: "Commercial & Romantic Lead",
    age: 24,
    height: "168 cm (5'6\")",
    experience: "4 Years",
    location: "Delhi",
    languages: ["Hindi", "English"],
    eyeColor: "Black",
    hair: "Dark Brown",
    badge: "Verified DCA Artist",
    mainImage: "/images/talents/actors/female/priya-kapoor-main.jpg",
    about: "Vibrant and charismatic actor with an enviable roster of 20+ TV commercials, youth web shows and romantic comedy pilots.",
    skills: ["Comedic Timing", "Contemporary Dance", "Voice Modulation"],
    experienceCredits: [
      { project: "Lenskart Ad", role: "Main Lead", type: "TV Commercial", year: "2024" }
    ],
    digitals: [
      "/images/talents/actors/female/priya-kapoor/01.jpg",
      "/images/talents/actors/female/priya-kapoor/02.jpg",
      "/images/talents/actors/female/priya-kapoor/03.jpg",
      "/images/talents/actors/female/priya-kapoor/04.jpg",
      "/images/talents/actors/female/priya-kapoor/05.jpg"
],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "natasha-roy",
    name: "Natasha Roy",
    category: "female",
    categories: ["female", "fresh-faces", "experienced"],
    categoryLabel: "Female Actor",
    role: "Drama & Art Cinema Performer",
    age: 28,
    height: "170 cm (5'7\")",
    experience: "6 Years",
    location: "Kolkata / Delhi",
    languages: ["Hindi", "English", "Bengali"],
    eyeColor: "Dark Brown",
    hair: "Black",
    badge: "Verified DCA Artist",
    mainImage: "/images/talents/actors/female/natasha-roy-main.jpg",
    about: "Trained theatre actor with extensive work in parallel cinema, experimental theatre and psychological character roles.",
    skills: ["Classical Theatre", "Bengali & Hindi Diction", "Method Acting"],
    experienceCredits: [
      { project: "Monsoon Letters", role: "Sharmila (Lead)", type: "Feature Film", year: "2023" }
    ],
    digitals: [
      "/images/talents/actors/female/natasha-roy/01.jpg",
      "/images/talents/actors/female/natasha-roy/02.jpg",
      "/images/talents/actors/female/natasha-roy/03.jpg",
      "/images/talents/actors/female/natasha-roy/04.jpg",
      "/images/talents/actors/female/natasha-roy/05.jpg"
],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "kriti-sen",
    name: "Kriti Sen",
    category: "female",
    categories: ["female", "fresh-faces"],
    categoryLabel: "Female Actor",
    role: "Urban Professional & Character Lead",
    age: 27,
    height: "174 cm (5'8.5\")",
    experience: "5 Years",
    location: "Delhi",
    languages: ["Hindi", "English"],
    eyeColor: "Brown",
    hair: "Dark Brown",
    badge: "Verified DCA Artist",
    mainImage: "/images/talents/actors/female/kriti-sen-main.jpg",
    about: "Modern screen presence with a sharp, articulate delivery ideal for corporate thrillers, legal dramas, urban crime shows and lifestyle brands.",
    skills: ["Urban Accents", "Dialogue Precision", "Corporate Styling"],
    experienceCredits: [
      { project: "The Corner Office", role: "Tarini", type: "OTT / Web Series", year: "2024" }
    ],
    digitals: [
      "/images/talents/actors/female/kriti-sen/01.jpg",
      "/images/talents/actors/female/kriti-sen/02.jpg",
      "/images/talents/actors/female/kriti-sen/03.jpg",
      "/images/talents/actors/female/kriti-sen/04.png",
      "/images/talents/actors/female/kriti-sen/05.png"
    ],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "aditya-roy",
    name: "Aditya Roy",
    category: "male",
    categories: ["male", "experienced"],
    categoryLabel: "Male Actor",
    role: "Action & Drama Lead",
    age: 28,
    height: "183 cm (6'0\")",
    experience: "5 Years",
    location: "New Delhi",
    languages: ["Hindi", "English"],
    eyeColor: "Dark Brown",
    hair: "Black",
    badge: "Verified DCA Artist",
    mainImage: "/images/actors/model male 1.png",
    about: "Dynamic screen presence with extensive background in theatre, action choreography, and OTT thriller series.",
    skills: ["Action Choreography", "Voice Modulation", "Theatre Acting"],
    experienceCredits: [
      { project: "Delhi Crime Files", role: "Inspector Vikram", type: "OTT / Web Series", year: "2024" }
    ],
    digitals: ["/images/actors/model male 1.png"],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "sid-malhotra-actor",
    name: "Siddharth Malhotra",
    category: "male",
    categories: ["male", "fresh-faces"],
    categoryLabel: "Male Actor",
    role: "Romantic Lead",
    age: 26,
    height: "180 cm (5'11\")",
    experience: "4 Years",
    location: "Gurugram / Delhi",
    languages: ["Hindi", "English", "Punjabi"],
    eyeColor: "Hazel",
    hair: "Dark Brown",
    badge: "Verified DCA Artist",
    mainImage: "/images/actors/editorial_grid_4.png",
    about: "Versatile romantic lead with strong camera appeal and commercial campaign experience for national brands.",
    skills: ["Romantic Comedy", "Screen Acting", "Commercial Posing"],
    experienceCredits: [
      { project: "Love in Delhi", role: "Kabir", type: "Feature Film", year: "2024" }
    ],
    digitals: ["/images/actors/editorial_grid_4.png"],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "vikram-rathore",
    name: "Vikram Rathore",
    category: "male",
    categories: ["male", "experienced"],
    categoryLabel: "Male Actor",
    role: "Character Actor",
    age: 32,
    height: "181 cm (5'11.5\")",
    experience: "8 Years",
    location: "Noida / Delhi",
    languages: ["Hindi", "English"],
    eyeColor: "Black",
    hair: "Black",
    badge: "Senior Performer",
    mainImage: "/images/actors/editorial_grid_5.png",
    about: "Intense dramatic actor specializing in grey roles, corporate thrillers, and period dramas.",
    skills: ["Method Acting", "Character Study", "Dialogue Precision"],
    experienceCredits: [
      { project: "The Bureau", role: "Officer Rathore", type: "OTT / Web Series", year: "2024" }
    ],
    digitals: ["/images/actors/editorial_grid_5.png"],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "karan-singh",
    name: "Karan Singh",
    category: "male",
    categories: ["male", "popular", "experienced"],
    categoryLabel: "Male Actor",
    role: "Lead Drama Actor",
    age: 29,
    height: "184 cm (6'0.5\")",
    experience: "6 Years",
    location: "Delhi NCR",
    languages: ["Hindi", "English"],
    eyeColor: "Brown",
    hair: "Dark Brown",
    badge: "Verified DCA Artist",
    mainImage: "/images/actors/editorial_grid_6.png",
    about: "Screen-commanding lead actor with classical theatre training and extensive TV commercial portfolio.",
    skills: ["Theatre", "Dialogue Delivery", "Voice Modulation"],
    experienceCredits: [
      { project: "Capital Chronicles", role: "Ranveer", type: "OTT / Web Series", year: "2025" }
    ],
    digitals: ["/images/actors/editorial_grid_6.png"],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "riya-malhotra-actress",
    name: "Riya Malhotra",
    category: "female",
    categories: ["female", "popular", "fresh-faces"],
    categoryLabel: "Female Actor",
    role: "Commercial & OTT Lead",
    age: 25,
    height: "173 cm (5'8\")",
    experience: "4 Years",
    location: "New Delhi",
    languages: ["Hindi", "English"],
    eyeColor: "Dark Brown",
    hair: "Black",
    badge: "Verified DCA Artist",
    mainImage: "/images/actors/model femal 1.png",
    about: "Expressive screen actor with strong improvisational skills and prominent appearances in web series and commercials.",
    skills: ["Camera Acting", "Improvisation", "Contemporary Posing"],
    experienceCredits: [
      { project: "Urban Stories", role: "Meera", type: "OTT / Web Series", year: "2024" }
    ],
    digitals: ["/images/actors/model femal 1.png"],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "meera-kapoor",
    name: "Meera Kapoor",
    category: "female",
    categories: ["female", "fresh-faces"],
    categoryLabel: "Female Actor",
    role: "Theatre & Screen Performer",
    age: 27,
    height: "171 cm (5'7.5\")",
    experience: "5 Years",
    location: "Delhi",
    languages: ["Hindi", "English"],
    eyeColor: "Brown",
    hair: "Dark Brown",
    badge: "Verified DCA Artist",
    mainImage: "/images/actors/editorial_grid_1.png",
    about: "Passionate dramatic actor trained in classical theatre and contemporary screen performance.",
    skills: ["Classical Theatre", "Emotion Delivery", "Diction"],
    experienceCredits: [
      { project: "Raza Theatre Festival", role: "Leading Lady", type: "Theatre", year: "2024" }
    ],
    digitals: ["/images/actors/editorial_grid_1.png"],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "tara-sharma",
    name: "Tara Sharma",
    category: "female",
    categories: ["female", "fresh-faces"],
    categoryLabel: "Female Actor",
    role: "Lead Drama Actor",
    age: 26,
    height: "170 cm (5'7\")",
    experience: "4 Years",
    location: "Delhi / Gurugram",
    languages: ["Hindi", "English"],
    eyeColor: "Black",
    hair: "Black",
    badge: "Verified DCA Artist",
    mainImage: "/images/actors/editorial_grid_2.png",
    about: "Charismatic actress with versatile emotional range for feature films and commercial brand shoots.",
    skills: ["Dramatic Acting", "Voice Modulation", "Camera Expressions"],
    experienceCredits: [
      { project: "Rising Stars", role: "Simran", type: "Feature Film", year: "2025" }
    ],
    digitals: ["/images/actors/editorial_grid_2.png"],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "pooja-verma-actress",
    name: "Pooja Verma",
    category: "female",
    categories: ["female", "popular", "experienced"],
    categoryLabel: "Female Actor",
    role: "TV & Film Actor",
    age: 28,
    height: "172 cm (5'7.5\")",
    experience: "6 Years",
    location: "Delhi NCR",
    languages: ["Hindi", "English", "Punjabi"],
    eyeColor: "Brown",
    hair: "Dark Brown",
    badge: "Verified DCA Artist",
    mainImage: "/images/actors/editorial_grid_3.png",
    about: "Seasoned television and OTT actress with extensive portfolio across prime time dramas and digital series.",
    skills: ["Television Acting", "Screen Presence", "Voice Over"],
    experienceCredits: [
      { project: "Bandhan", role: "Anjali (Parallel Lead)", type: "Television", year: "2024" }
    ],
    digitals: ["/images/actors/editorial_grid_3.png"],
    videos: [],
    instagram: [],
    print: []
  }
];

export const CHILD_ACTORS_DATA: Actor[] = CHILD_ARTISTS_DATA.map((ca) => ({
  id: ca.id,
  name: ca.name,
  category: "child-actors",
  categoryLabel: ca.categoryLabel || "Child Actor",
  role: ca.role,
  age: ca.age,
  height: ca.height,
  experience: ca.experience,
  location: ca.location,
  languages: ca.languages,
  eyeColor: ca.eyeColor || "Dark Brown",
  hair: ca.hair || "Black",
  badge: ca.badge || "Verified Child Artist",
  mainImage: ca.mainImage,
  about: ca.about,
  skills: ca.skills,
  experienceCredits: (ca.experienceCredits || []).map((c) => ({
    project: c.project,
    role: c.role,
    type: (c.type === "TV Commercial" ? "TV Commercial" : "Feature Film") as any,
    year: c.year,
    directorOrClient: c.directorOrClient,
  })),
  digitals: ca.photos && ca.photos.length > 0 ? ca.photos : [ca.mainImage],
  videos: ca.videos || [],
  instagram: ca.instagram || [],
  print: ca.print || [],
  categories: ["child-actors"],
}));

export function getAllActors(): Actor[] {
  return [...ACTORS_DATA, ...CHILD_ACTORS_DATA];
}

export function getActorById(id: string): Actor | undefined {
  return (
    ACTORS_DATA.find((a) => a.id === id) ||
    CHILD_ACTORS_DATA.find((ca) => ca.id === id)
  );
}

export function getActorsByCategory(category: ActorCategorySlug): Actor[] {
  if (category === "child-actors") {
    return CHILD_ACTORS_DATA;
  }
  return ACTORS_DATA.filter(
    (a) => a.category === category || a.categories?.includes(category)
  );
}

export function getRelatedActors(currentId: string, category: ActorCategorySlug, limit: number = 8): Actor[] {
  const all = getAllActors();
  const sameCategory = all.filter(
    (a) => a.id !== currentId && (a.category === category || a.categories?.includes(category))
  );
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const otherActors = all.filter(
    (a) => a.id !== currentId && a.category !== category && !a.categories?.includes(category)
  );
  return [...sameCategory, ...otherActors].slice(0, limit);
}

export function getCategoryBySlug(slug: ActorCategorySlug): CategoryMeta | undefined {
  return ACTOR_CATEGORIES.find((c) => c.slug === slug);
}
