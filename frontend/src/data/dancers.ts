export type DancerCategorySlug =
  | "lead-dancers"
  | "background-dancers"
  | "contemporary-dancers"
  | "hip-hop-dancers";

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
  type: "Bollywood Music Video" | "Live Concert Tour" | "Award Show Performance" | "Feature Film Song" | "Theatre Dance Production";
  year: string;
  directorOrClient?: string;
}

export interface Dancer {
  id: string;
  name: string;
  category: DancerCategorySlug;
  categoryLabel: string;
  role: string;
  age: number;
  height: string;
  experience: string;
  location: string;
  languages: string[];
  danceStyles: string[];
  trainingAcademy: string;
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
  slug: DancerCategorySlug;
  title: string;
  headline: string;
  description: string;
  heroDescription: string;
  ctaText: string;
  countLabel: string;
  image: string;
  route: string;
}

export const DANCER_CATEGORIES: CategoryMeta[] = [
  {
    slug: "lead-dancers",
    title: "Lead Dancers",
    headline: "Principal Dancers, Soloists & Choreography Leads",
    description: "Exceptional principal dancers and solo performers for Bollywood title songs, cinematic music videos, and high-energy stage concerts.",
    heroDescription: "Explore verified lead dancers and soloists featuring elite choreography training, expressive storytelling, and commanding stage magnetism.",
    ctaText: "Explore Lead Dancers",
    countLabel: "14+ Lead Dancers",
    image: "/images/talents/dancers/kabir-verma-main.jpg",
    route: "/dancers/lead-dancers/",
  },
  {
    slug: "background-dancers",
    title: "Background Dancers",
    headline: "Ensemble & Troupe Dancers for Stage & Screen",
    description: "Synchronized dance troupes and ensemble artists for major film songs, grand wedding performances, and televised award shows.",
    heroDescription: "Browse synchronized ensemble dancers and troupe performers skilled in rapid choreography learning and immaculate stage coordination.",
    ctaText: "Explore Background Dancers",
    countLabel: "24+ Troupe Artists",
    image: "/images/talents/dancers/priya-nair-main.jpg",
    route: "/dancers/background-dancers/",
  },
  {
    slug: "contemporary-dancers",
    title: "Contemporary Dancers",
    headline: "Modern, Lyrical & Classical Fusion Dancers",
    description: "Trained contemporary and lyrical artists blending modern techniques, fluid partnering, and expressive emotional narratives.",
    heroDescription: "Discover contemporary and neoclassical dancers bringing breathtaking flexibility, aerial poise, and artistic innovation to the stage.",
    ctaText: "Explore Contemporary Dancers",
    countLabel: "12+ Contemporary Artists",
    image: "/images/talents/dancers/anika-rao-main.jpg",
    route: "/dancers/contemporary-dancers/",
  },
  {
    slug: "hip-hop-dancers",
    title: "Hip-Hop Dancers",
    headline: "Urban, Street, Popping & Commercial Dancers",
    description: "Energetic street and urban dancers proficient in breaking, popping, locking, krumping, and high-octane commercial choreography.",
    heroDescription: "Explore dynamic hip-hop and street dancers bringing raw energy, urban flair, and rhythmic precision to music videos and live sets.",
    ctaText: "Explore Hip-Hop Dancers",
    countLabel: "16+ Urban Dancers",
    image: "/images/talents/dancers/vikram-thapa-main.jpg",
    route: "/dancers/hip-hop-dancers/",
  },
];

export const DANCERS_DATA: Dancer[] = [
  {
    id: "kabir-verma",
    name: "Kabir Verma",
    category: "lead-dancers",
    categoryLabel: "Lead Dancer",
    role: "Bollywood & Commercial Soloist",
    age: 25,
    height: "5'11\"",
    experience: "7 Years",
    location: "New Delhi / Mumbai",
    languages: ["Hindi", "English"],
    danceStyles: ["Bollywood Commercial", "Semi-Classical", "Urban Hip-Hop", "Lyrical"],
    trainingAcademy: "Terence Lewis Dance Academy / DCA Fellow",
    mainImage: "/images/talents/dancers/kabir-verma-main.jpg",
    badge: "Verified Lead Artist",
    about: "Kabir Verma is a powerhouse lead dancer and assistant choreographer who has performed alongside Bollywood A-listers in major feature film songs and global stadium tours.",
    skills: ["High-Energy Bollywood", "Stage Acrobatics", "Choreography Direction", "Partner Lifting"],
    experienceCredits: [
      { project: "IIFA Awards Main Stage Finale", role: "Principal Troupe Lead", type: "Award Show Performance", year: "2025" },
      { project: "T-Series Chartbuster Music Video", role: "Featured Solo Dancer", type: "Bollywood Music Video", year: "2024" },
    ],
    photos: [
      "/images/talents/dancers/kabir-verma/01.jpg",
      "/images/talents/dancers/kabir-verma/02.png",
      "/images/talents/dancers/kabir-verma/03.jpg",
      "/images/talents/dancers/kabir-verma/04.jpg",
      "/images/talents/dancers/kabir-verma/05.jpg"
],
    videos: [],
    instagram: [],
    print: [],
  },
  {
    id: "anika-rao",
    name: "Anika Rao",
    category: "contemporary-dancers",
    categoryLabel: "Contemporary Dancer",
    role: "Lyrical & Neoclassical Artist",
    age: 23,
    height: "5'7\"",
    experience: "6 Years",
    location: "New Delhi / Bengaluru",
    languages: ["English", "Hindi", "Kannada"],
    danceStyles: ["Contemporary", "Kathak Fusion", "Modern Ballet", "Floorwork"],
    trainingAcademy: "Attakkalari Centre for Movement Arts",
    mainImage: "/images/talents/dancers/anika-rao-main.jpg",
    badge: "Verified DCA Artist",
    about: "Anika Rao is a celebrated contemporary movement artist known for poetic musicality, incredible flexibility, and evocative emotional storytelling in dance films and theatrical productions.",
    skills: ["Fluid Floorwork", "Kathak Footwork", "Flexibility & Extensions", "Dance Theatre"],
    experienceCredits: [
      { project: "Serendipity Arts Festival Showcase", role: "Solo Performer", type: "Theatre Dance Production", year: "2025" },
    ],
    photos: [
      "/images/talents/dancers/anika-rao/01.jpg",
      "/images/talents/dancers/anika-rao/02.png",
      "/images/talents/dancers/anika-rao/03.jpg",
      "/images/talents/dancers/anika-rao/04.jpg",
      "/images/talents/dancers/anika-rao/05.jpg"
],
    videos: [],
    instagram: [],
    print: [],
  },
  {
    id: "vikram-thapa",
    name: "Vikram Thapa",
    category: "hip-hop-dancers",
    categoryLabel: "Hip-Hop Dancer",
    role: "Urban & Street Crew Leader",
    age: 24,
    height: "5'9\"",
    experience: "5 Years",
    location: "New Delhi",
    languages: ["Hindi", "English", "Nepali"],
    danceStyles: ["Popping & Locking", "Breaking (B-Boying)", "Urban Choreo", "Krump"],
    trainingAcademy: "Delhi Street Dance Collective",
    mainImage: "/images/talents/dancers/vikram-thapa-main.jpg",
    badge: "Street Pro",
    about: "Vikram Thapa is an explosive urban dancer and battle champion who brings razor-sharp isolations and acrobatic power moves to commercial video shoots and live events.",
    skills: ["Power Moves", "Isolations", "Freestyle Battles", "Sync Choreo"],
    experienceCredits: [
      { project: "Red Bull Dance Your Style India", role: "Finalist & Performer", type: "Live Concert Tour", year: "2025" },
    ],
    photos: [
      "/images/talents/dancers/vikram-thapa/01.jpg",
      "/images/talents/dancers/vikram-thapa/02.jpg",
      "/images/talents/dancers/vikram-thapa/03.jpg",
      "/images/talents/dancers/vikram-thapa/04.jpeg"
],
    videos: [],
    instagram: [],
    print: [],
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    category: "background-dancers",
    categoryLabel: "Background Dancer",
    role: "Ensemble & Stage Specialist",
    age: 22,
    height: "5'6\"",
    experience: "3 Years",
    location: "New Delhi / Mumbai",
    languages: ["Hindi", "English", "Malayalam"],
    danceStyles: ["Bollywood Troupe", "Folk Fusion", "Commercial Jazz"],
    trainingAcademy: "Shiamak Davar Institute of Performing Arts",
    mainImage: "/images/talents/dancers/priya-nair-main.jpg",
    badge: "Ensemble Pro",
    about: "Priya Nair is a disciplined ensemble dancer with exceptional spatial awareness, swift formation adaptation, and vibrant expressions for high-energy music videos and award shows.",
    skills: ["Sync Formations", "Bollywood Pacing", "Prop Choreography", "Costume Handling"],
    experienceCredits: [
      { project: "Filmfare Awards Opening Act", role: "Troupe Dancer", type: "Award Show Performance", year: "2025" },
    ],
    photos: [
      "/images/talents/dancers/priya-nair/01.jpg",
      "/images/talents/dancers/priya-nair/02.jpg",
      "/images/talents/dancers/priya-nair/03.jpg",
      "/images/talents/dancers/priya-nair/04.jpg"
    ],
    videos: [],
    instagram: [],
    print: [],
  },
  {
    id: "rohit-sharma-dancer",
    name: "Rohit Sharma",
    category: "lead-dancers",
    categoryLabel: "Lead Dancer",
    role: "Bollywood & Urban Lead",
    age: 26,
    height: "5'10\"",
    experience: "6 Years",
    location: "New Delhi",
    languages: ["Hindi", "English"],
    danceStyles: ["Bollywood", "Urban Choreo", "Hip-Hop"],
    trainingAcademy: "Kingdom of Dreams Choreography Wing",
    mainImage: "/images/actors/lead dancers.jpg",
    badge: "Verified Lead Artist",
    about: "Rohit Sharma is a dynamic lead dancer featuring high-octane Bollywood choreography and urban video performances.",
    skills: ["Bollywood Solo", "Rhythmic Sync", "Stage Chemistry"],
    experienceCredits: [
      { project: "Bollywood Dhamaka Tour", role: "Lead Dancer", type: "Bollywood Music Video", year: "2024" }
    ],
    photos: ["/images/actors/lead dancers.jpg"],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "megha-sen",
    name: "Megha Sen",
    category: "contemporary-dancers",
    categoryLabel: "Contemporary Dancer",
    role: "Modern & Neoclassical Performer",
    age: 24,
    height: "5'6\"",
    experience: "5 Years",
    location: "Gurugram / Delhi",
    languages: ["Hindi", "English"],
    danceStyles: ["Contemporary", "Lyrical Jazz", "Modern Ballet"],
    trainingAcademy: "Delhi Dance Academy",
    mainImage: "/images/actors/Contemporary Dancers.avif",
    badge: "Verified DCA Artist",
    about: "Megha Sen is a graceful contemporary dancer specializing in fluid lyrical storytelling and stage fusion.",
    skills: ["Lyrical Expression", "Partnering", "Modern Jazz"],
    experienceCredits: [
      { project: "Delhi Contemporary Fest", role: "Soloist", type: "Theatre Dance Production", year: "2025" }
    ],
    photos: ["/images/actors/Contemporary Dancers.avif"],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "rahul-kapoor-hiphop",
    name: "Rahul Kapoor",
    category: "hip-hop-dancers",
    categoryLabel: "Hip-Hop Dancer",
    role: "Street & Popping Specialist",
    age: 23,
    height: "5'9.5\"",
    experience: "4 Years",
    location: "New Delhi",
    languages: ["Hindi", "English"],
    danceStyles: ["Popping", "Locking", "Urban Choreography"],
    trainingAcademy: "Urban Dance Project",
    mainImage: "/images/actors/Hip-Hop Dancers.avif",
    badge: "Street Specialist",
    about: "Rahul Kapoor brings sharp urban isolations and popping choreography to music videos and commercial brand sets.",
    skills: ["Popping & Locking", "Freestyle", "Video Sync"],
    experienceCredits: [
      { project: "Street Battle Delhi", role: "Winner", type: "Live Concert Tour", year: "2024" }
    ],
    photos: ["/images/actors/Hip-Hop Dancers.avif"],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "neha-verma-dancer",
    name: "Neha Verma",
    category: "background-dancers",
    categoryLabel: "Background Dancer",
    role: "Ensemble Troupe Performer",
    age: 22,
    height: "5'5\"",
    experience: "3 Years",
    location: "Noida / Delhi",
    languages: ["Hindi", "English"],
    danceStyles: ["Bollywood Troupe", "Folk Fusion"],
    trainingAcademy: "Shiamak Davar Alumni",
    mainImage: "/images/actors/Background Dancers.webp",
    badge: "Ensemble Pro",
    about: "Neha Verma is an energetic troupe dancer experienced in grand TV show performances and film songs.",
    skills: ["Troupe Formations", "Rapid Learning", "Stage Energy"],
    experienceCredits: [
      { project: "Star Screen Awards", role: "Troupe Performer", type: "Award Show Performance", year: "2024" }
    ],
    photos: ["/images/actors/Background Dancers.webp"],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "siddharth-roy-dancer",
    name: "Siddharth Roy",
    category: "lead-dancers",
    categoryLabel: "Lead Dancer",
    role: "Commercial & Stage Soloist",
    age: 27,
    height: "6'0\"",
    experience: "7 Years",
    location: "Delhi NCR",
    languages: ["Hindi", "English"],
    danceStyles: ["Bollywood", "Contemporary", "Hip-Hop"],
    trainingAcademy: "TIPA Choreography Wing",
    mainImage: "/images/actors/dancers horizontal.jpg",
    badge: "Verified Lead Artist",
    about: "Siddharth Roy is a versatile soloist and lead performer featured in high-budget music videos and live shows.",
    skills: ["Lead Performance", "Stage Presence", "Acrobatic Stunts"],
    experienceCredits: [
      { project: "T-Series Remix Night", role: "Featured Lead", type: "Bollywood Music Video", year: "2025" }
    ],
    photos: ["/images/actors/dancers horizontal.jpg"],
    videos: [],
    instagram: [],
    print: []
  },
  {
    id: "pooja-chhabra",
    name: "Pooja Chhabra",
    category: "contemporary-dancers",
    categoryLabel: "Contemporary Dancer",
    role: "Kathak & Lyrical Fusion",
    age: 24,
    height: "5'7\"",
    experience: "5 Years",
    location: "New Delhi",
    languages: ["Hindi", "English"],
    danceStyles: ["Kathak", "Contemporary", "Fusion"],
    trainingAcademy: "Gandharva Mahavidyalaya",
    mainImage: "/images/actors/editorial_grid_1.png",
    badge: "Verified DCA Artist",
    about: "Pooja Chhabra is a trained classical Kathak dancer who seamlessly integrates modern lyrical movement into dance films.",
    skills: ["Kathak Spin", "Fluidity", "Expression"],
    experienceCredits: [
      { project: "Classical Fusion Night", role: "Solo Dancer", type: "Theatre Dance Production", year: "2024" }
    ],
    photos: ["/images/actors/editorial_grid_1.png"],
    videos: [],
    instagram: [],
    print: []
  }
];

export function getAllDancers(): Dancer[] {
  return DANCERS_DATA;
}

export function getDancerById(id: string): Dancer | undefined {
  return DANCERS_DATA.find((d) => d.id === id);
}

export function getDancersByCategory(category: DancerCategorySlug): Dancer[] {
  return DANCERS_DATA.filter((d) => d.category === category);
}

export function getRelatedDancers(currentId: string, category: DancerCategorySlug, limit: number = 8): Dancer[] {
  const sameCategory = DANCERS_DATA.filter((d) => d.id !== currentId && d.category === category);
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const otherDancers = DANCERS_DATA.filter((d) => d.id !== currentId && d.category !== category);
  return [...sameCategory, ...otherDancers].slice(0, limit);
}

export function getDancerCategoryBySlug(slug: DancerCategorySlug): CategoryMeta | undefined {
  return DANCER_CATEGORIES.find((c) => c.slug === slug);
}
