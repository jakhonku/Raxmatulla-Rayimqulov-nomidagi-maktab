/**
 * Oddiy parol asosidagi admin autentifikatsiyasi.
 * (Simple password-based admin auth with a signed session cookie.)
 *
 * Web Crypto ishlatiladi — ham Edge (middleware), ham Node muhitida ishlaydi.
 */

export const SESSION_COOKIE = "admin_session";
const SESSION_DAYS = 7;

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET o'rnatilmagan. .env.local (yoki Vercel env) ga qo'shing.",
    );
  }
  return secret;
}

export function getAdminUsername(): string {
  const username = process.env.ADMIN_USERNAME;
  if (!username) {
    throw new Error(
      "ADMIN_USERNAME o'rnatilmagan. .env.local (yoki Vercel env) ga qo'shing.",
    );
  }
  return username;
}

export function getAdminPassword(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error(
      "ADMIN_PASSWORD o'rnatilmagan. .env.local (yoki Vercel env) ga qo'shing.",
    );
  }
  return password;
}

async function hmac(message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Yangi sessiya tokenini yaratish (login muvaffaqiyatli bo'lganda). */
export async function createSessionToken(): Promise<string> {
  const exp = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const payload = String(exp);
  const sig = await hmac(payload);
  return `${payload}.${sig}`;
}

/** Tokenni tekshirish — imzo to'g'ri va muddati o'tmagan bo'lishi kerak. */
export async function verifySessionToken(
  token: string | undefined,
): Promise<boolean> {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = await hmac(payload);
  if (sig !== expected) return false;
  const exp = Number(payload);
  return Number.isFinite(exp) && exp > Date.now();
}

export const SESSION_MAX_AGE = SESSION_DAYS * 24 * 60 * 60;
