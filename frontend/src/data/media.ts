/**
 * Delhi Casting Agency (DCA) Centralized Media Manifest & Asset Mapping
 * Official Instagram: https://www.instagram.com/delhicastingagency/
 *
 * Source directory: /media/dca/
 */

export const OFFICIAL_DCA_INSTAGRAM_URL = "https://www.instagram.com/delhicastingagency/";
export const OFFICIAL_DCA_LINKEDIN_URL = "https://www.linkedin.com/company/delhi-casting-agency/?originalSubdomain=in";

export interface MediaAsset {
  id: string;
  src: string;
  alt: string;
  title?: string;
  type: "image" | "video" | "poster";
  category:
    | "hero"
    | "actors"
    | "models"
    | "child-artists"
    | "influencers"
    | "dancers"
    | "voice-artists"
    | "casting-calls"
    | "about"
    | "contact"
    | "how-it-works"
    | "membership"
    | "general";
  isPriority?: boolean;
}

export const MEDIA_MANIFEST: Record<string, MediaAsset> = {
  // Hero Banners
  talentsHeroBanner: {
    id: "talents-hero-banner",
    src: "/media/dca/about/dca-about-hero-01.jpg",
    alt: "Delhi Casting Agency Talent Roster Hero Banner",
    title: "Delhi Casting Agency Talent Hub",
    type: "image",
    category: "hero",
    isPriority: true,
  },
  actorsHeroBanner: {
    id: "actors-hero-banner",
    src: "/media/dca/actors/dca-actors-hero-banner.jpg",
    alt: "Delhi Casting Agency Actors Division Banner",
    title: "Delhi Casting Agency Actors Division",
    type: "image",
    category: "actors",
    isPriority: true,
  },

  // Actor Categories
  maleActors: {
    id: "male-actors-thumb",
    src: "/media/dca/actors/dca-actor-male-01.jpg",
    alt: "Delhi Casting Agency Male Actors Portfolio",
    title: "Male Actors Category",
    type: "image",
    category: "actors",
  },
  femaleActors: {
    id: "female-actors-thumb",
    src: "/media/dca/actors/dca-actor-female-01.jpg",
    alt: "Delhi Casting Agency Female Actors Portfolio",
    title: "Female Actors Category",
    type: "image",
    category: "actors",
  },
  experiencedActors: {
    id: "experienced-actors-thumb",
    src: "/media/dca/actors/dca-actor-experienced-01.jpg",
    alt: "Delhi Casting Agency Experienced Actors Studio Session",
    title: "Experienced Actors",
    type: "image",
    category: "actors",
  },
  freshFaces: {
    id: "fresh-faces-thumb",
    src: "/media/dca/actors/dca-actor-fresh-faces-01.jpg",
    alt: "Delhi Casting Agency Fresh Faces Talent Portfolio",
    title: "Fresh Faces",
    type: "image",
    category: "actors",
  },
  popularActors: {
    id: "popular-actors-thumb",
    src: "/media/dca/actors/dca-actor-popular-01.jpg",
    alt: "Delhi Casting Agency Popular Actors Feature",
    title: "Popular Actors",
    type: "image",
    category: "actors",
  },
  childArtists: {
    id: "child-artists-thumb",
    src: "/media/dca/child-artists/dca-child-artist-01.jpg",
    alt: "Delhi Casting Agency Child Artists Portfolio",
    title: "Child Artists Category",
    type: "image",
    category: "child-artists",
  },

  // Models & Talent Categories
  fashionShows: {
    id: "fashion-shows-thumb",
    src: "/media/dca/models/dca-model-fashion-01.jpg",
    alt: "Delhi Casting Agency Fashion Shows & Runway Portfolio",
    title: "Fashion Shows Category",
    type: "image",
    category: "models",
  },
  catalogueShoots: {
    id: "catalogue-shoots-thumb",
    src: "/media/dca/models/dca-model-catalogue-01.jpg",
    alt: "Delhi Casting Agency Print & Catalogue Shoot Portfolio",
    title: "Catalogue Shoots",
    type: "image",
    category: "models",
  },
  printModels: {
    id: "print-models-thumb",
    src: "/media/dca/models/dca-model-print-01.png",
    alt: "Delhi Casting Agency Print & Editorial Model Shoot",
    title: "Print Models Category",
    type: "image",
    category: "models",
  },

  // Influencers & Dancers & Voice
  communityIndustry: {
    id: "community-industry-thumb",
    src: "/media/dca/influencers/dca-influencer-community-01.jpg",
    alt: "Delhi Casting Agency Influencers & Creator Network",
    title: "Influencers & Creators",
    type: "image",
    category: "influencers",
  },
  dancersPerformance: {
    id: "dancers-performance-thumb",
    src: "/media/dca/dancers/dca-dancer-performance-01.jpg",
    alt: "Delhi Casting Agency Dance & Choreography Performance",
    title: "Dancers Category",
    type: "image",
    category: "dancers",
  },
  voiceStudio: {
    id: "voice-studio-thumb",
    src: "/media/dca/voice-artists/dca-voice-studio-01.jpg",
    alt: "Delhi Casting Agency Voice Over & Dubbing Studio Session",
    title: "Voice Artists Studio",
    type: "image",
    category: "voice-artists",
  },

  // Casting Calls
  castingCall: {
    id: "casting-call-thumb",
    src: "/media/dca/casting-calls/dca-casting-call-01.jpg",
    alt: "Delhi Casting Agency Audition Brief & Casting Call",
    title: "Casting Calls Brief",
    type: "image",
    category: "casting-calls",
  },
  castingFilm: {
    id: "casting-film-thumb",
    src: "/media/dca/casting-calls/dca-casting-film-01.jpg",
    alt: "Delhi Casting Agency Feature Film Auditions",
    title: "Bollywood Films Casting Brief",
    type: "image",
    category: "casting-calls",
  },
  castingCommercial: {
    id: "casting-commercial-thumb",
    src: "/media/dca/casting-calls/dca-casting-commercial-01.jpg",
    alt: "Delhi Casting Agency Commercial Brand Campaign",
    title: "Brand Commercials Casting Brief",
    type: "image",
    category: "casting-calls",
  },

  // Page Specific Banners
  aboutHeroBanner: {
    id: "about-hero-banner",
    src: "/media/dca/about/dca-about-hero-01.jpg",
    alt: "Delhi Casting Agency About Us Banner",
    title: "About Delhi Casting Agency",
    type: "image",
    category: "about",
  },
  aboutStudioPhoto: {
    id: "about-studio-photo",
    src: "/media/dca/about/dca-about-studio-01.jpg",
    alt: "Delhi Casting Agency Studio Session",
    title: "DCA Studio Workspace",
    type: "image",
    category: "about",
  },
  contactHeroBanner: {
    id: "contact-hero-banner",
    src: "/media/dca/contact/dca-contact-hero-01.jpg",
    alt: "Delhi Casting Agency Contact Us Banner",
    title: "Contact Delhi Casting Agency",
    type: "image",
    category: "contact",
  },
  contactDeskPhoto: {
    id: "contact-desk-photo",
    src: "/media/dca/contact/dca-contact-desk-01.jpg",
    alt: "Delhi Casting Agency Support Desk",
    title: "DCA Casting Support Desk",
    type: "image",
    category: "contact",
  },

  // How It Works Steps
  howItWorksBanner: {
    id: "how-it-works-banner",
    src: "/media/dca/how-it-works/dca-how-it-works-banner.jpg",
    alt: "Delhi Casting Agency Process Overview",
    title: "How It Works Process",
    type: "image",
    category: "how-it-works",
  },
  stepRegistration: {
    id: "step-registration",
    src: "/media/dca/how-it-works/dca-registration-step.jpg",
    alt: "Delhi Casting Agency Artist Registration",
    title: "Step 01 Registration",
    type: "image",
    category: "how-it-works",
  },
  stepVerification: {
    id: "step-verification",
    src: "/media/dca/how-it-works/dca-verification-step.jpg",
    alt: "Delhi Casting Agency Profile Verification",
    title: "Step 02 Verification",
    type: "image",
    category: "how-it-works",
  },
  stepPortfolio: {
    id: "step-portfolio",
    src: "/media/dca/how-it-works/dca-portfolio-step.jpg",
    alt: "Delhi Casting Agency Portfolio Preparation",
    title: "Step 03 Portfolio",
    type: "image",
    category: "how-it-works",
  },
  stepCasting: {
    id: "step-casting",
    src: "/media/dca/how-it-works/dca-casting-step.jpg",
    alt: "Delhi Casting Agency Auditions & Casting Calls",
    title: "Step 04 Casting Calls",
    type: "image",
    category: "how-it-works",
  },

  // Membership
  membershipBanner: {
    id: "membership-banner",
    src: "/media/dca/membership/dca-membership-banner.jpg",
    alt: "Delhi Casting Agency Membership Banner",
    title: "DCA Membership Overview",
    type: "image",
    category: "membership",
  },

  // Video Showreels
  heroVideo: {
    id: "hero-video-mp4",
    src: "/media/dca/videos/dca-hero-showreel.mp4",
    alt: "Delhi Casting Agency Promotional Showreel Video",
    title: "DCA Showcase Video",
    type: "video",
    category: "general",
  },
  actorShowreelDemo: {
    id: "actor-showreel-demo",
    src: "/media/dca/videos/dca-actor-showreel.mp4",
    alt: "Delhi Casting Agency Actor Showreel Demo Video",
    title: "Actor Showreel Demo",
    type: "video",
    category: "actors",
  },
};
