export const SITE = {
  name: "Way to Bollywood",
  agency: "Delhi Casting Agency",
  tagline: "Verified casting calls across India, delivered to artists who are ready.",
  price: 1999,
  currency: "INR",
  whatsappUrl: "https://wa.me/910000000000",
};

export const STATS = [
  { label: "Artists Registered", target: 5000 },
  { label: "Casting Calls Shared", target: 2000 },
  { label: "Successful Placements", target: 500 },
];

// Fill these in from your ad accounts. Leave blank to disable a script.
export const TRACKING = {
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? "",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "",
  googleAdsConversionLabel: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL ?? "",
};
