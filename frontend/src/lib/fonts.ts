import { Dancing_Script, Playfair_Display, Great_Vibes, Satisfy } from "next/font/google";

export const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const satisfy = Satisfy({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const playfairItalic = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["italic"],
  display: "swap",
});
