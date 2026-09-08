import Script from "next/script";
import { TRACKING } from "@/lib/constants";

/**
 * Loads GA4, GTM and Meta Pixel only when their IDs are set in env vars.
 * Add these to .env.local (see .env.local.example):
 *   NEXT_PUBLIC_GA4_ID, NEXT_PUBLIC_GTM_ID,
 *   NEXT_PUBLIC_META_PIXEL_ID, NEXT_PUBLIC_GOOGLE_ADS_ID
 */
export function Analytics() {
  const { ga4Id, gtmId, metaPixelId, googleAdsId } = TRACKING;

  return (
    <>
      {gtmId && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      )}

      {(ga4Id || googleAdsId) && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id || googleAdsId}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              ${ga4Id ? `gtag('config', '${ga4Id}');` : ""}
              ${googleAdsId ? `gtag('config', '${googleAdsId}');` : ""}
              window.gtag = gtag;`}
          </Script>
        </>
      )}

      {metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');`}
        </Script>
      )}
    </>
  );
}

/** Fire this from the client after a successful PayU payment. */
export function trackPurchase(amount: number) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  };
  w.gtag?.("event", "conversion", {
    send_to: TRACKING.googleAdsId
      ? `${TRACKING.googleAdsId}/${TRACKING.googleAdsConversionLabel}`
      : undefined,
    value: amount,
    currency: "INR",
  });
  w.gtag?.("event", "purchase", { value: amount, currency: "INR" });
  w.fbq?.("track", "Purchase", { value: amount, currency: "INR" });
}
