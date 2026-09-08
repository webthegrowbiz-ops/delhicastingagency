export const colors = {
  paper: "#F5F2EA",       // Warm Ivory
  cream: "#EFECE4",       // Soft Cream
  white: "#FFFFFF",       // Pure White
  beige: "#F6F3ED",       // Light Beige
  ink: "#171717",         // Deep Ink Text
  charcoal: "#111111",    // Deep Charcoal
  muted: "#77736C",       // Muted Warm Gray
  mutedLight: "#A39E93",  // Light Muted Gray
  olive: "#6B6A50",       // Muted Olive Accent
  oxblood: "#6E2424",     // Restrained Oxblood Accent
  gold: "#C5A059",        // Editorial Gold
  goldLight: "#DFB76C",   // Soft Gold
  border: "#E2DDD3",      // Warm Border
} as const;

export const fonts = {
  display: "var(--font-manrope), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  sans: "var(--font-manrope), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
} as const;

export const transitions = {
  smooth: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  quick: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
} as const;
