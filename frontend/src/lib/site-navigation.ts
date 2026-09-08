export type NavItem = {
  label: string;
  href: string;
  image?: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  href: string;
  defaultImage?: string;
  defaultDescription?: string;
  items?: NavItem[];
};

export const NAV_GROUPS: NavGroup[] = [
  { label: "Home", href: "/" },
  {
    label: "Talents",
    href: "/talents/",
    defaultImage: "/media/dca/actors/dca-actors-hero-banner.jpg",
    defaultDescription: "Explore India's premier database of actors, models, dancers & creative performers.",
    items: [
      {
        label: "All Talents",
        href: "/talents/",
        image: "/media/dca/actors/dca-actors-hero-banner.jpg",
        description: "Explore India's premier database of actors, models, dancers & creative performers.",
      },
      {
        label: "Actors",
        href: "/actors/",
        image: "/media/dca/actors/dca-actor-female-01.jpg",
        description: "Versatile lead & supporting actors for Bollywood films, TV serials & OTT series.",
      },
      {
        label: "Models",
        href: "/models/",
        image: "/media/dca/models/dca-model-fashion-01.jpg",
        description: "Fashion, commercial, runway & print models for leading global brands.",
      },
      {
        label: "Child Artists",
        href: "/child-artists/",
        image: "/media/dca/child-artists/dca-child-artist-01.jpg",
        description: "Talented young actors & child models for ads, films & television serials.",
      },
      {
        label: "Influencers",
        href: "/influencers/",
        image: "/media/dca/influencers/dca-influencer-instagram-01.jpg",
        description: "Content creators & social media influencers for brand campaigns & promotions.",
      },
      {
        label: "Dancers",
        href: "/dancers/",
        image: "/media/dca/dancers/dca-dancer-performance-01.jpg",
        description: "Classical, contemporary, Bollywood & hip-hop dance performers for stage & screen.",
      },
      {
        label: "Voice Artists",
        href: "/voice-artists/",
        image: "/media/dca/voice-artists/dca-voice-studio-01.jpg",
        description: "Dubbing artists, voiceover talent & radio presenters for film & audio productions.",
      },
    ],
  },
  { label: "How It Works", href: "/how-it-works/" },
  {
    label: "Casting Calls",
    href: "/casting-calls/",
    defaultImage: "/media/dca/casting-calls/dca-casting-call-01.jpg",
    defaultDescription: "Browse live verified audition briefs for films, web series & ad shoots.",
    items: [
      {
        label: "All Casting Calls",
        href: "/casting-calls/",
        image: "/media/dca/casting-calls/dca-casting-call-01.jpg",
        description: "Browse live verified audition briefs for films, web series & ad shoots.",
      },
      {
        label: "Bollywood Films",
        href: "/casting-calls/bollywood-films/",
        image: "/media/dca/casting-calls/dca-casting-film-01.jpg",
        description: "Feature film auditions & role requirements from Mumbai production houses.",
      },
      {
        label: "TV Serials",
        href: "/casting-calls/tv-serials/",
        image: "/media/dca/casting-calls/dca-casting-tv-01.jpg",
        description: "Daily soap & television drama casting calls across major entertainment channels.",
      },
      {
        label: "OTT / Web Series",
        href: "/casting-calls/ott-web-series/",
        image: "/media/dca/casting-calls/dca-casting-ott-01.webp",
        description: "Web series casting for leading streaming platforms & digital originals.",
      },
      {
        label: "Music Videos",
        href: "/casting-calls/music-videos/",
        image: "/images/actors/Music Videos.jpg",
        description: "Lead roles & background dancers for music video projects.",
      },
      {
        label: "Print Ads",
        href: "/casting-calls/print-ads/",
        image: "/media/dca/models/dca-model-commercial-01.jpg",
        description: "Print campaigns, magazine covers & catalogue modeling assignments.",
      },
      {
        label: "TV Commercials",
        href: "/casting-calls/tv-commercials/",
        image: "/media/dca/casting-calls/dca-casting-commercial-01.jpg",
        description: "National TV commercial & digital brand advertisement casting briefs.",
      },
      {
        label: "Fashion Shows",
        href: "/casting-calls/fashion-shows/",
        image: "/images/actors/Fashion Shows.webp",
        description: "Runway shows, designer showcases & fashion week casting calls.",
      },
    ],
  },
  { label: "About", href: "/about-us/" },
  {
    label: "Blog",
    href: "/blog/",
    defaultImage: "/media/dca/about/dca-about-studio-01.jpg",
    defaultDescription: "Industry insights, audition preparation guides & casting advice.",
    items: [
      {
        label: "Blog Home",
        href: "/blog/",
        image: "/media/dca/about/dca-about-studio-01.jpg",
        description: "Industry insights, audition preparation guides & casting advice.",
      },
      {
        label: "Actors",
        href: "/blog/category/actors/",
        image: "/media/dca/actors/dca-actor-experienced-01.jpg",
        description: "Audition tips, script preparation & acting career advice.",
      },
      {
        label: "Models",
        href: "/blog/category/models/",
        image: "/media/dca/models/dca-model-catalogue-01.jpg",
        description: "Portfolio guides, runway etiquette & fashion industry insights.",
      },
      {
        label: "Industry News",
        href: "/blog/category/industry-news/",
        image: "/media/dca/about/dca-about-hero-01.jpg",
        description: "Latest news, production updates & casting announcements.",
      },
    ],
  },
  { label: "Membership", href: "/membership/" },
  { label: "Contact", href: "/contact-us/" },
];

export const FOOTER_GROUPS = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us/" },
      { label: "How It Works", href: "/how-it-works/" },
      { label: "Membership", href: "/membership/" },
      { label: "Success Stories", href: "/success-stories/" },
      { label: "FAQ", href: "/faq/" },
      { label: "Contact Us", href: "/contact-us/" },
    ],
  },
  {
    title: "Talents",
    links: [
      { label: "All Talents", href: "/talents/" },
      { label: "Actors", href: "/actors/" },
      { label: "Models", href: "/models/" },
      { label: "Child Artists", href: "/child-artists/" },
      { label: "Influencers", href: "/influencers/" },
      { label: "Dancers", href: "/dancers/" },
      { label: "Voice Artists", href: "/voice-artists/" },
    ],
  },
  {
    title: "Casting",
    links: [
      { label: "Casting Calls", href: "/casting-calls/" },
      { label: "Bollywood Films", href: "/casting-calls/bollywood-films/" },
      { label: "TV Serials", href: "/casting-calls/tv-serials/" },
      { label: "OTT / Web Series", href: "/casting-calls/ott-web-series/" },
      { label: "Music Videos", href: "/casting-calls/music-videos/" },
      { label: "TV Commercials", href: "/casting-calls/tv-commercials/" },
      { label: "Fashion Shows", href: "/casting-calls/fashion-shows/" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog/" },
      { label: "Actors", href: "/blog/category/actors/" },
      { label: "Models", href: "/blog/category/models/" },
      { label: "Industry News", href: "/blog/category/industry-news/" },
      { label: "Register", href: "/profile/setup" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy/" },
      { label: "Terms & Conditions", href: "/terms-and-conditions/" },
      { label: "Refund & Cancellation", href: "/refund-and-cancellation-policy/" },
      { label: "Disclaimer", href: "/disclaimer/" },
    ],
  },
];
