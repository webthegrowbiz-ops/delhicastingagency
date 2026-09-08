import crypto from "node:crypto";

// ============================================================
// PAYU CONFIGURATION HELPERS
// ============================================================

export function getPayuKey(): string {
  return process.env.PAYU_MERCHANT_KEY || "";
}

export function getPayuSalt(): string {
  return process.env.PAYU_MERCHANT_SALT || "";
}

export function getPayuMode(): "test" | "production" {
  const mode = (process.env.PAYU_MODE || "test").toLowerCase();
  return mode === "production" ? "production" : "test";
}

export function getPayuActionUrl(): string {
  return getPayuMode() === "production"
    ? "https://secure.payu.in/_payment"
    : "https://test.payu.in/_payment";
}

// ============================================================
// CONSTANT-TIME COMPARISON
// ============================================================

export function timingSafeCompare(a: string, b: string): boolean {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const bufA = Buffer.from(a.trim().toLowerCase(), "utf-8");
  const bufB = Buffer.from(b.trim().toLowerCase(), "utf-8");
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

// ============================================================
// INTERFACES FOR PAYU HASH PARAMS
// ============================================================

export interface PayuRequestHashParams {
  key?: string;
  txnid: string;
  amount: number | string;
  productinfo: string;
  firstname: string;
  email: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
  salt?: string;
}

export interface PayuResponseHashParams {
  key?: string;
  txnid: string;
  amount: number | string;
  productinfo: string;
  firstname: string;
  email: string;
  status: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
  hash: string;
  salt?: string;
  additionalCharges?: string;
}

// ============================================================
// PAYU REQUEST HASH GENERATOR (SHA-512)
// Official Format:
// sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT)
// Note: exactly SIX pipe characters between udf5 and SALT: udf5||||||SALT
// (corresponding to empty udf6, udf7, udf8, udf9, udf10)
// ============================================================

export function generatePayuRequestHash(params: PayuRequestHashParams): string {
  const key = (params.key || getPayuKey()).trim();
  const salt = (params.salt || getPayuSalt()).trim();

  if (!key) throw new Error("PayU Merchant Key is missing");
  if (!salt) throw new Error("PayU Merchant Salt is missing");
  if (!params.txnid || !params.txnid.trim()) throw new Error("PayU txnid is missing");
  if (params.amount === undefined || params.amount === null || params.amount === "") {
    throw new Error("PayU amount is missing");
  }
  if (!params.productinfo || !params.productinfo.trim()) throw new Error("PayU productinfo is missing");
  if (!params.firstname || !params.firstname.trim()) throw new Error("PayU firstname is missing");
  if (!params.email || !params.email.trim()) throw new Error("PayU email is missing");

  // Format amount strictly to 2 decimal places e.g. "1999.00" as required by PayU Hosted Checkout
  const numericAmount = typeof params.amount === "number" ? params.amount : parseFloat(String(params.amount));
  const formattedAmount = isNaN(numericAmount) ? String(params.amount).trim() : numericAmount.toFixed(2);

  const udf1 = (params.udf1 || "").trim();
  const udf2 = (params.udf2 || "").trim();
  const udf3 = (params.udf3 || "").trim();
  const udf4 = (params.udf4 || "").trim();
  const udf5 = (params.udf5 || "").trim();

  // Exactly 16 fields before SALT joined by pipes:
  // key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT
  const hashFields = [
    key,
    params.txnid.trim(),
    formattedAmount,
    params.productinfo.trim(),
    params.firstname.trim(),
    params.email.trim(),
    udf1,
    udf2,
    udf3,
    udf4,
    udf5,
    "", // udf6
    "", // udf7
    "", // udf8
    "", // udf9
    "", // udf10
  ];

  const hashSequence = `${hashFields.join("|")}|${salt}`;
  const hash = crypto.createHash("sha512").update(hashSequence, "utf-8").digest("hex");

  // Safe local development diagnostic (NEVER logs salt or credentials)
  if (process.env.NODE_ENV !== "production") {
    const delimiterCount = (hashSequence.match(/\|/g) || []).length;
    console.log(
      `[PayU Diagnostic] txnid: ${params.txnid.trim()}, amount: ${formattedAmount}, productinfo: ${params.productinfo.trim()}, firstname: ${params.firstname.trim()}, email: ${params.email.trim()}, udf1: ${udf1}, udf2..udf5: empty, delimiters: ${delimiterCount}, hashLength: ${hash.length}`
    );
  }

  return hash;
}

// ============================================================
// PAYU REVERSE RESPONSE HASH VERIFIER (SHA-512)
// Official Format:
// sha512(SALT|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
// Or with additional charges:
// sha512(additionalCharges|SALT|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
// ============================================================

export function verifyPayuResponseHash(params: PayuResponseHashParams): boolean {
  const key = (params.key || getPayuKey()).trim();
  const salt = (params.salt || getPayuSalt()).trim();

  if (!key || !salt || !params.hash || !params.txnid || !params.status) {
    return false;
  }

  const numericAmount = typeof params.amount === "number" ? params.amount : parseFloat(String(params.amount || 0));
  const formattedAmount = isNaN(numericAmount) ? String(params.amount || "").trim() : numericAmount.toFixed(2);

  const udf1 = (params.udf1 || "").trim();
  const udf2 = (params.udf2 || "").trim();
  const udf3 = (params.udf3 || "").trim();
  const udf4 = (params.udf4 || "").trim();
  const udf5 = (params.udf5 || "").trim();

  // Reverse sequence with 6 pipes between status and udf5 (empty udf10..udf6)
  const reverseHashSequence6 = `${salt}|${params.status.trim()}||||||${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${params.email.trim()}|${params.firstname.trim()}|${params.productinfo.trim()}|${formattedAmount}|${params.txnid.trim()}|${key}`;

  // Reverse sequence with 5 pipes (legacy fallback)
  const reverseHashSequence5 = `${salt}|${params.status.trim()}|||||${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${params.email.trim()}|${params.firstname.trim()}|${params.productinfo.trim()}|${formattedAmount}|${params.txnid.trim()}|${key}`;

  const expectedHash6 = crypto.createHash("sha512").update(reverseHashSequence6, "utf-8").digest("hex");
  const expectedHash5 = crypto.createHash("sha512").update(reverseHashSequence5, "utf-8").digest("hex");

  if (timingSafeCompare(expectedHash6, params.hash) || timingSafeCompare(expectedHash5, params.hash)) {
    return true;
  }

  // Check with additionalCharges if present
  if (params.additionalCharges) {
    const addSequence6 = `${params.additionalCharges.trim()}|${reverseHashSequence6}`;
    const addSequence5 = `${params.additionalCharges.trim()}|${reverseHashSequence5}`;
    const addHash6 = crypto.createHash("sha512").update(addSequence6, "utf-8").digest("hex");
    const addHash5 = crypto.createHash("sha512").update(addSequence5, "utf-8").digest("hex");
    if (timingSafeCompare(addHash6, params.hash) || timingSafeCompare(addHash5, params.hash)) {
      return true;
    }
  }

  return false;
}
