import { RAZORPAY_KEY_ID, SITE } from "./constants";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
  }
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id?: string;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  handler: (response: RazorpayResponse) => void;
  modal?: { ondismiss?: () => void };
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

interface LaunchArgs {
  name: string;
  email: string;
  contact: string;
  amount?: number;
  order_id?: string;
  description?: string;
  onSuccess: (response: RazorpayResponse) => void;
  onDismiss?: () => void;
}

/**
 * Opens Razorpay Checkout for the membership fee.
 */
export async function launchRazorpayCheckout({
  name,
  email,
  contact,
  amount = SITE.price,
  order_id,
  description = "3-Month Premium Membership",
  onSuccess,
  onDismiss,
}: LaunchArgs) {
  const isProduction = process.env.NODE_ENV === "production";

  // Production Protection: Never simulate checkout or use demo keys in production mode
  if (!RAZORPAY_KEY_ID) {
    if (isProduction) {
      console.error("CRITICAL SECURITY ERROR: Razorpay Key ID is not configured in production environment.");
      onDismiss?.();
      return;
    }

    console.warn("Razorpay key not configured in development environment. Simulating UI checkout.");
    setTimeout(() => {
      onSuccess({
        razorpay_payment_id: `pay_demo_${Date.now()}`,
        razorpay_order_id: order_id || `order_demo_${Date.now()}`,
        razorpay_signature: `sig_demo_${Date.now()}`,
      });
    }, 600);
    return;
  }

  const loaded = await loadRazorpayScript();
  if (!loaded) {
    if (isProduction) {
      console.error("Could not load Razorpay SDK script from CDN.");
      onDismiss?.();
      return;
    }
    console.warn("Could not load Razorpay script. Simulating fallback checkout.");
    onSuccess({
      razorpay_payment_id: `pay_demo_${Date.now()}`,
      razorpay_order_id: order_id || `order_demo_${Date.now()}`,
      razorpay_signature: `sig_demo_${Date.now()}`,
    });
    return;
  }

  try {
    const rzp = new window.Razorpay({
      key: RAZORPAY_KEY_ID,
      amount: amount * 100, // paise
      currency: "INR",
      name: SITE.name,
      description,
      order_id,
      prefill: { name, email, contact },
      theme: { color: "#d4af37" },
      handler: (response) => onSuccess(response),
      modal: { ondismiss: onDismiss },
    });

    rzp.open();
  } catch (err) {
    console.error("Razorpay launch error:", err);
    if (!isProduction) {
      onSuccess({
        razorpay_payment_id: `pay_demo_${Date.now()}`,
        razorpay_order_id: order_id || `order_demo_${Date.now()}`,
        razorpay_signature: `sig_demo_${Date.now()}`,
      });
    } else {
      onDismiss?.();
    }
  }
}
