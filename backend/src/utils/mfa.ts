import crypto from "crypto";
import bcrypt from "bcrypt";

// ==========================================
// 1. AES-256-GCM SECRET ENCRYPTION HELPERS
// ==========================================

function getMfaEncryptionKey(): Buffer {
  const envKey = process.env.MFA_ENCRYPTION_KEY;
  if (envKey && envKey.length >= 32) {
    return crypto.createHash("sha256").update(envKey).digest();
  }
  const fallbackSecret = process.env.JWT_SECRET || "dca_fallback_mfa_encryption_secret_2026";
  return crypto.createHash("sha256").update(`${fallbackSecret}:mfa_salt_v1`).digest();
}

/**
 * Encrypts MFA TOTP secret using AES-256-GCM
 */
export function encryptMfaSecret(plainSecret: string): string {
  const key = getMfaEncryptionKey();
  const iv = crypto.randomBytes(12); // 96-bit IV
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  
  const encrypted = Buffer.concat([cipher.update(plainSecret, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted.toString("hex")}`;
}

/**
 * Decrypts AES-256-GCM encrypted MFA TOTP secret
 */
export function decryptMfaSecret(encryptedData: string): string {
  const parts = encryptedData.split(":");
  if (parts.length !== 3 || !parts[0] || !parts[1] || !parts[2]) {
    throw new Error("Invalid encrypted MFA secret format");
  }

  const [ivHex, authTagHex, encryptedHex] = parts;
  const key = getMfaEncryptionKey();
  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");

  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString("utf8");
}

// ==========================================
// 2. BASE32 ENCODING / DECODING HELPERS
// ==========================================

const BASE32_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

export function generateBase32Secret(length = 20): string {
  const randomBytes = crypto.randomBytes(length);
  let result = "";
  let bits = 0;
  let value = 0;

  for (let i = 0; i < randomBytes.length; i++) {
    const byteVal = randomBytes[i] ?? 0;
    value = (value << 8) | byteVal;
    bits += 8;
    while (bits >= 5) {
      const charIndex = (value >>> (bits - 5)) & 31;
      result += BASE32_CHARS[charIndex] ?? "A";
      bits -= 5;
    }
  }

  if (bits > 0) {
    const charIndex = (value << (5 - bits)) & 31;
    result += BASE32_CHARS[charIndex] ?? "A";
  }

  return result;
}

function base32Decode(base32Str: string): Buffer {
  const cleaned = base32Str.toUpperCase().replace(/=/g, "").replace(/[^A-Z2-7]/g, "");
  let bits = 0;
  let value = 0;
  const bytes: number[] = [];

  for (let i = 0; i < cleaned.length; i++) {
    const char = cleaned[i] || "";
    const idx = BASE32_CHARS.indexOf(char);
    if (idx === -1) continue;
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      bytes.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }

  return Buffer.from(bytes);
}

// ==========================================
// 3. RFC 6238 TOTP GENERATION & VERIFICATION
// ==========================================

/**
 * Generates 6-digit TOTP for a given Base32 secret and time counter
 */
export function generateTotp(secretBase32: string, timeStep = Math.floor(Date.now() / 1000 / 30)): string {
  const key = base32Decode(secretBase32);

  // 8-byte big-endian time buffer
  const timeBuffer = Buffer.alloc(8);
  timeBuffer.writeBigInt64BE(BigInt(timeStep), 0);

  const hmac = crypto.createHmac("sha1", key).update(timeBuffer).digest();
  const lastByte = hmac[hmac.length - 1] ?? 0;
  const offset = lastByte & 0x0f;

  const byte0 = hmac[offset] ?? 0;
  const byte1 = hmac[offset + 1] ?? 0;
  const byte2 = hmac[offset + 2] ?? 0;
  const byte3 = hmac[offset + 3] ?? 0;

  const binary =
    ((byte0 & 0x7f) << 24) |
    ((byte1 & 0xff) << 16) |
    ((byte2 & 0xff) << 8) |
    (byte3 & 0xff);

  const otp = (binary % 1000000).toString().padStart(6, "0");
  return otp;
}

/**
 * Verifies 6-digit TOTP with ±1 time-step (±30 seconds) clock drift tolerance
 */
export function verifyTotp(secretBase32: string, userCode: string): boolean {
  const normalizedCode = userCode.trim();
  if (!/^\d{6}$/.test(normalizedCode)) {
    return false;
  }

  const currentStep = Math.floor(Date.now() / 1000 / 30);

  // Test current step, -1 step, +1 step (30s tolerance)
  for (let delta = -1; delta <= 1; delta++) {
    const expected = generateTotp(secretBase32, currentStep + delta);
    if (crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(normalizedCode))) {
      return true;
    }
  }

  return false;
}

// ==========================================
// 4. BACKUP CODE GENERATION & VERIFICATION
// ==========================================

/**
 * Generates 8 random 8-character hex backup codes
 */
export function generateBackupCodes(count = 8): string[] {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    const code = crypto.randomBytes(4).toString("hex").toLowerCase();
    codes.push(code);
  }
  return codes;
}

/**
 * Hashes a backup code with bcrypt
 */
export async function hashBackupCode(code: string): Promise<string> {
  return bcrypt.hash(code.trim().toLowerCase(), 10);
}

/**
 * Verifies a backup code against a bcrypt hash
 */
export async function compareBackupCode(plainCode: string, codeHash: string): Promise<boolean> {
  return bcrypt.compare(plainCode.trim().toLowerCase(), codeHash);
}
