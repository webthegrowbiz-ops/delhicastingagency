import type { Metadata } from "next";
import { Manrope, Playfair_Display, Great_Vibes } from "next/font/google";

import "./globals.css";

import { Analytics } from "@/components/analytics";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollNavigation } from "@/components/layout/scroll-navigation";
import { OFFICIAL_DCA_INSTAGRAM_URL } from "@/data/media";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-cursive",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://delhicastingagency.com"),
  title: {
    default: "Delhi Casting Agency | Actors, Models & Casting Calls",
    template: "%s | Delhi Casting Agency",
  },
  description:
    "Explore verified casting calls for actors, models, child artists, influencers, dancers, and voice artists across India with Delhi Casting Agency.",
  keywords: [
    "Delhi Casting Agency",
    "Way to Bollywood",
    "Casting Calls India",
    "Bollywood Auditions",
    "Actor Portfolio",
    "Model Auditions",
    "Casting Agency Delhi",
    "Child Artists Auditions",
  ],
  authors: [{ name: "Delhi Casting Agency" }],
  creator: "Delhi Casting Agency",
  publisher: "Delhi Casting Agency",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Delhi Casting Agency | Actors, Models & Casting Calls",
    description:
      "Become a verified member of Delhi Casting Agency and get access to real, verified casting calls across Bollywood, OTT, TV, fashion and brand campaigns.",
    url: "https://delhicastingagency.com",
    siteName: "Delhi Casting Agency",
    images: [
      {
        url: "/media/dca/about/dca-about-hero-01.jpg",
        width: 1200,
        height: 630,
        alt: "Delhi Casting Agency Talent Hub",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Delhi Casting Agency",
    description:
      "Verified casting opportunities for actors, models, dancers, influencers, and voice artists across India.",
    images: ["/media/dca/about/dca-about-hero-01.jpg"],
  },
  alternates: {
    canonical: "https://delhicastingagency.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Delhi Casting Agency",
  "alternateName": "Way to Bollywood",
  "url": "https://delhicastingagency.com",
  "logo": "https://delhicastingagency.com/images/logos/logo.png",
  "sameAs": [OFFICIAL_DCA_INSTAGRAM_URL],
  "description":
    "Delhi Casting Agency is an online-first casting platform serving artists and performers across India.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN",
    "addressRegion": "Delhi / Online India"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${playfair.variable} ${greatVibes.variable} font-sans`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white text-[#111111]">
        <SmoothScrollProvider>
          {/* Global Navbar */}
          <Navbar />

          {/* Page Content */}
          <main className="min-h-screen">{children}</main>

          {/* Global Footer */}
          <Footer />

          <Analytics />
          <ScrollNavigation />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}