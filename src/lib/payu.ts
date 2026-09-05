/**
 * PayU Client-Safe Checkout Helper
 *
 * IMPORTANT SECURITY RULES:
 * 1. MUST NEVER CONTAIN PAYU_MERCHANT_SALT or any server credentials.
 * 2. Form fields & cryptographic SHA-512 hashes are generated exclusively by the backend (POST /api/payments/payu/initiate).
 * 3. Frontend submits the backend-provided form payload via HTML form POST.
 */

export interface PayuFormPayload {
  key: string;
  txnid: string;
  amount: number | string;
  currency?: string;
  plan?: string;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
  hash: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
  [key: string]: string | number | undefined;
}

const PAYU_STANDARD_FIELDS = new Set([
  "key",
  "txnid",
  "amount",
  "productinfo",
  "firstname",
  "email",
  "phone",
  "surl",
  "furl",
  "hash",
  "udf1",
  "udf2",
  "udf3",
  "udf4",
  "udf5",
  "service_provider",
]);

/**
 * Dynamically constructs and submits an HTML POST form to the PayU hosted checkout action URL.
 */
export function submitPayuForm(actionUrl: string, payload: PayuFormPayload): void {
  if (typeof window === "undefined" || !actionUrl) return;

  const form = document.createElement("form");
  form.method = "POST";
  form.action = actionUrl;
  form.style.display = "none";

  Object.entries(payload).forEach(([name, val]) => {
    if (PAYU_STANDARD_FIELDS.has(name) && val !== undefined && val !== null) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = String(val);
      form.appendChild(input);
    }
  });

  document.body.appendChild(form);
  form.submit();
}
