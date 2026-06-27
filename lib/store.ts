import "server-only";
import { promises as fs } from "fs";
import path from "path";
import {
  news as seedNews,
  type NewsItem,
  type NewsCategory,
} from "@/lib/data";

/**
 * Oddiy JSON fayl asosidagi ma'lumotlar ombori.
 * (Simple JSON file-based data store.)
 *
 * MUHIM: Vercel serverless muhitida fayl tizimi faqat o'qish uchun.
 * Bu ombor lokal ishlash va oddiy Node/VPS serverda ishlaydi.
 * Vercel production uchun keyinroq ma'lumotlar bazasiga (Postgres + Blob)
 * o'tkazish kerak bo'ladi.
 */

const DATA_DIR = path.join(process.cwd(), "data");
const NEWS_FILE = path.join(DATA_DIR, "news.json");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");
const SCHEDULES_FILE = path.join(DATA_DIR, "schedules.json");

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(file, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(file: string, data: unknown) {
  await ensureDir();
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
}

/* ------------------------------- Yangiliklar ------------------------------- */

export type AdminNews = NewsItem & { id: string; createdAt: string };

let newsSeeded = false;

async function ensureNewsSeed(): Promise<AdminNews[]> {
  const existing = await readJson<AdminNews[] | null>(NEWS_FILE, null);
  if (existing && Array.isArray(existing)) return existing;

  // Birinchi ishga tushganda mavjud namuna yangiliklar bilan to'ldiramiz
  const seeded: AdminNews[] = seedNews.map((item) => ({
    ...item,
    id: item.slug,
    createdAt: new Date(item.date).toISOString(),
  }));
  if (!newsSeeded) {
    newsSeeded = true;
    // Yozib bo'lmasa ham (faqat o'qiladigan FS) — namuna ma'lumot qaytadi
    try {
      await writeJson(NEWS_FILE, seeded);
    } catch {
      /* read-only muhitda e'tiborsiz qoldiriladi */
    }
  }
  return seeded;
}

export async function getAllNews(): Promise<AdminNews[]> {
  const items = await ensureNewsSeed();
  return [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getNewsBySlug(slug: string): Promise<AdminNews | null> {
  const items = await ensureNewsSeed();
  return items.find((n) => n.slug === slug) ?? null;
}

export interface NewsInput {
  title: string;
  excerpt: string;
  content: string[];
  category: NewsCategory;
  image: string;
  author?: string;
  date: string;
}

export async function createNews(input: NewsInput): Promise<AdminNews> {
  const items = await ensureNewsSeed();
  const slug = uniqueSlug(input.title, items.map((n) => n.slug));
  const item: AdminNews = {
    ...input,
    slug,
    id: slug,
    createdAt: new Date().toISOString(),
  };
  items.push(item);
  await writeJson(NEWS_FILE, items);
  return item;
}

export async function updateNews(
  slug: string,
  input: NewsInput,
): Promise<AdminNews | null> {
  const items = await ensureNewsSeed();
  const idx = items.findIndex((n) => n.slug === slug);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...input, slug, id: slug };
  await writeJson(NEWS_FILE, items);
  return items[idx];
}

export async function deleteNews(slug: string): Promise<void> {
  const items = await ensureNewsSeed();
  const next = items.filter((n) => n.slug !== slug);
  await writeJson(NEWS_FILE, next);
}

/* ------------------------------- Murojaatlar ------------------------------- */

export interface Message {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export async function getMessages(): Promise<Message[]> {
  const items = await readJson<Message[]>(MESSAGES_FILE, []);
  return [...items].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function addMessage(
  input: Omit<Message, "id" | "createdAt" | "read">,
): Promise<Message> {
  const items = await readJson<Message[]>(MESSAGES_FILE, []);
  const item: Message = {
    ...input,
    id: cryptoId(),
    createdAt: new Date().toISOString(),
    read: false,
  };
  items.push(item);
  await writeJson(MESSAGES_FILE, items);
  return item;
}

export async function markMessageRead(id: string, read: boolean): Promise<void> {
  const items = await readJson<Message[]>(MESSAGES_FILE, []);
  const idx = items.findIndex((m) => m.id === id);
  if (idx !== -1) {
    items[idx].read = read;
    await writeJson(MESSAGES_FILE, items);
  }
}

export async function deleteMessage(id: string): Promise<void> {
  const items = await readJson<Message[]>(MESSAGES_FILE, []);
  await writeJson(
    MESSAGES_FILE,
    items.filter((m) => m.id !== id),
  );
}

export async function getUnreadCount(): Promise<number> {
  const items = await readJson<Message[]>(MESSAGES_FILE, []);
  return items.filter((m) => !m.read).length;
}

/* ------------------------------- Dars jadvali ------------------------------- */

export type ScheduleType = "excel" | "pdf" | "image";

export interface ScheduleDoc {
  id: string;
  title: string;
  type: ScheduleType;
  /** Excel uchun: ustun/qator ko'rinishidagi jadval */
  grid?: string[][];
  /** PDF/rasm uchun: /uploads/... yo'li */
  file?: string;
  updatedAt: string;
}

export async function getSchedules(): Promise<ScheduleDoc[]> {
  const items = await readJson<ScheduleDoc[]>(SCHEDULES_FILE, []);
  return [...items].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export async function addSchedule(
  input: Omit<ScheduleDoc, "id" | "updatedAt">,
): Promise<ScheduleDoc> {
  const items = await readJson<ScheduleDoc[]>(SCHEDULES_FILE, []);
  const item: ScheduleDoc = {
    ...input,
    id: cryptoId(),
    updatedAt: new Date().toISOString(),
  };
  items.push(item);
  await writeJson(SCHEDULES_FILE, items);
  return item;
}

export async function deleteSchedule(id: string): Promise<void> {
  const items = await readJson<ScheduleDoc[]>(SCHEDULES_FILE, []);
  await writeJson(
    SCHEDULES_FILE,
    items.filter((s) => s.id !== id),
  );
}

/* ------------------------------- Yordamchilar ------------------------------- */

const translitMap: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "j", з: "z",
  и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", у: "u", ф: "f", х: "x", ц: "ts", ч: "ch", ш: "sh", щ: "sh",
  ъ: "", ы: "i", ь: "", э: "e", ю: "yu", я: "ya",
};

export function slugify(text: string): string {
  const lower = text.toLowerCase().trim();
  let out = "";
  for (const ch of lower) {
    out += translitMap[ch] ?? ch;
  }
  return (
    out
      .replace(/['’`]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80) || "yangilik"
  );
}

function uniqueSlug(title: string, existing: string[]): string {
  const base = slugify(title);
  let slug = base;
  let i = 2;
  while (existing.includes(slug)) {
    slug = `${base}-${i}`;
    i += 1;
  }
  return slug;
}

function cryptoId(): string {
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
  );
}
