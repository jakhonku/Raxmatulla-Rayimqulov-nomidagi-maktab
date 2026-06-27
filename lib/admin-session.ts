import "server-only";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

/** Joriy so'rovda admin sessiyasi haqiqiyligini tekshiradi. */
export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

/** Admin emas bo'lsa xatolik tashlaydi (server action'larni himoyalash uchun). */
export async function assertAdmin(): Promise<void> {
  if (!(await isAuthed())) {
    throw new Error("Ruxsat yo'q. Iltimos, tizimga kiring.");
  }
}
