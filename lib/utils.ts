import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind klasslarni xavfsiz birlashtirish uchun yordamchi funksiya.
 * (Combine and de-duplicate Tailwind classes.)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sanani o'zbekcha formatga o'tkazish. (Format a date in Uzbek.)
 */
const UZ_MONTHS = [
  "yanvar",
  "fevral",
  "mart",
  "aprel",
  "may",
  "iyun",
  "iyul",
  "avgust",
  "sentabr",
  "oktabr",
  "noyabr",
  "dekabr",
];

export function formatDateUz(input: string | Date): string {
  const date = typeof input === "string" ? new Date(input) : input;
  return `${date.getDate()}-${UZ_MONTHS[date.getMonth()]}, ${date.getFullYear()}`;
}
