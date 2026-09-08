import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/payment/success/", "/payment/failed/"],
    },
    sitemap: "https://delhicastingagency.com/sitemap.xml",
  };
}
