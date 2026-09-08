/**
 * Phone normalization and validation utility
 * Delhi Casting Agency (DCA)
 */

export function normalizeIndianPhone(rawPhone?: string | null | undefined): string | null {
  if (!rawPhone || typeof rawPhone !== "string") return null;
  const trimmed = rawPhone.trim();
  if (!trimmed) return null;

  // Extract digits only
  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return null;

  // 12 digits starting with 91 (e.g. +91 9876543210 -> 9876543210)
  if (digits.length === 12 && digits.startsWith("91")) {
    return digits.slice(2);
  }

  // 11 digits starting with 0 (e.g. 09876543210 -> 9876543210)
  if (digits.length === 11 && digits.startsWith("0")) {
    return digits.slice(1);
  }

  // 10-digit Indian phone
  if (digits.length === 10) {
    return digits;
  }

  // Fallback to extracted digits
  return digits;
}

export function isValidIndianPhone(rawPhone?: string | null | undefined): boolean {
  const normalized = normalizeIndianPhone(rawPhone);
  return Boolean(normalized && normalized.length === 10 && /^[6-9]\d{9}$/.test(normalized));
}
