import "server-only";
import { getSupabase } from "@/lib/supabase";
import type { NewsItem, NewsCategory } from "@/lib/data";

/**
 * O'qish (public) amallari uchun himoya: Supabase sozlanmagan yoki xato bersa,
 * butun sayt qulamasligi uchun bo'sh natija qaytaramiz va serverda ogohlantiramiz.
 * Yozish amallari (admin) esa aniq xato tashlaydi — pastda alohida.
 */
async function safeRead<T>(label: string, fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.error(`[store] ${label} — Supabase xatosi:`, (err as Error).message);
    return fallback;
  }
}

/**
 * Supabase (Postgres) asosidagi ma'lumotlar ombori.
 * (Supabase/Postgres-backed data store.)
 *
 * Jadvallar: news, messages, schedules. Fayllar Supabase Storage'da.
 * SQL sxema va sozlash: supabase/schema.sql fayliga qarang.
 */

/* ------------------------------- Yangiliklar ------------------------------- */

export type AdminNews = NewsItem & { id: string; createdAt: string };

interface NewsRow {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  category: NewsCategory;
  image: string;
  author: string | null;
  created_at: string;
}

function mapNews(row: NewsRow): AdminNews {
  return {
    id: row.slug,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content ?? [],
    date: row.date,
    category: row.category,
    image: row.image,
    author: row.author ?? undefined,
    createdAt: row.created_at,
  };
}

export async function getAllNews(): Promise<AdminNews[]> {
  return safeRead("getAllNews", async () => {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("date", { ascending: false });
    if (error) throw new Error(error.message);
    return (data as NewsRow[]).map(mapNews);
  }, []);
}

export async function getNewsBySlug(slug: string): Promise<AdminNews | null> {
  return safeRead("getNewsBySlug", async () => {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data ? mapNews(data as NewsRow) : null;
  }, null);
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
  const supabase = getSupabase();

  const { data: existing, error: listErr } = await supabase
    .from("news")
    .select("slug");
  if (listErr) throw new Error(`Slug tekshirishda xatolik: ${listErr.message}`);

  const slug = uniqueSlug(
    input.title,
    (existing as { slug: string }[]).map((n) => n.slug),
  );

  const { data, error } = await supabase
    .from("news")
    .insert({
      slug,
      title: input.title,
      excerpt: input.excerpt,
      content: input.content,
      category: input.category,
      image: input.image,
      author: input.author || null,
      date: input.date,
    })
    .select("*")
    .single();
  if (error) throw new Error(`Yangilik qo'shishda xatolik: ${error.message}`);
  return mapNews(data as NewsRow);
}

export async function updateNews(
  slug: string,
  input: NewsInput,
): Promise<AdminNews | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("news")
    .update({
      title: input.title,
      excerpt: input.excerpt,
      content: input.content,
      category: input.category,
      image: input.image,
      author: input.author || null,
      date: input.date,
    })
    .eq("slug", slug)
    .select("*")
    .maybeSingle();
  if (error) throw new Error(`Yangilikni yangilashda xatolik: ${error.message}`);
  return data ? mapNews(data as NewsRow) : null;
}

export async function deleteNews(slug: string): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase.from("news").delete().eq("slug", slug);
  if (error) throw new Error(`Yangilikni o'chirishda xatolik: ${error.message}`);
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

interface MessageRow {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string;
  read: boolean;
  created_at: string;
}

function mapMessage(row: MessageRow): Message {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email ?? undefined,
    message: row.message,
    read: row.read,
    createdAt: row.created_at,
  };
}

export async function getMessages(): Promise<Message[]> {
  return safeRead("getMessages", async () => {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data as MessageRow[]).map(mapMessage);
  }, []);
}

export async function addMessage(
  input: Omit<Message, "id" | "createdAt" | "read">,
): Promise<Message> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("messages")
    .insert({
      name: input.name,
      phone: input.phone,
      email: input.email || null,
      message: input.message,
      read: false,
    })
    .select("*")
    .single();
  if (error) throw new Error(`Murojaatni saqlashda xatolik: ${error.message}`);
  return mapMessage(data as MessageRow);
}

export async function markMessageRead(id: string, read: boolean): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase
    .from("messages")
    .update({ read })
    .eq("id", id);
  if (error) throw new Error(`Murojaatni belgilashda xatolik: ${error.message}`);
}

export async function deleteMessage(id: string): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase.from("messages").delete().eq("id", id);
  if (error) throw new Error(`Murojaatni o'chirishda xatolik: ${error.message}`);
}

export async function getUnreadCount(): Promise<number> {
  return safeRead("getUnreadCount", async () => {
    const supabase = getSupabase();
    const { count, error } = await supabase
      .from("messages")
      .select("*", { count: "exact", head: true })
      .eq("read", false);
    if (error) throw new Error(error.message);
    return count ?? 0;
  }, 0);
}

/* ------------------------------- Dars jadvali ------------------------------- */

export type ScheduleType = "excel" | "pdf" | "image";

export interface ScheduleDoc {
  id: string;
  title: string;
  type: ScheduleType;
  /** Excel uchun: ustun/qator ko'rinishidagi jadval */
  grid?: string[][];
  /** PDF/rasm uchun: yuklangan fayl (public) URL */
  file?: string;
  updatedAt: string;
}

interface ScheduleRow {
  id: string;
  title: string;
  type: ScheduleType;
  grid: string[][] | null;
  file: string | null;
  updated_at: string;
}

function mapSchedule(row: ScheduleRow): ScheduleDoc {
  return {
    id: row.id,
    title: row.title,
    type: row.type,
    grid: row.grid ?? undefined,
    file: row.file ?? undefined,
    updatedAt: row.updated_at,
  };
}

export async function getSchedules(): Promise<ScheduleDoc[]> {
  return safeRead("getSchedules", async () => {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("schedules")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data as ScheduleRow[]).map(mapSchedule);
  }, []);
}

export async function addSchedule(
  input: Omit<ScheduleDoc, "id" | "updatedAt">,
): Promise<ScheduleDoc> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("schedules")
    .insert({
      title: input.title,
      type: input.type,
      grid: input.grid ?? null,
      file: input.file ?? null,
    })
    .select("*")
    .single();
  if (error) throw new Error(`Jadval qo'shishda xatolik: ${error.message}`);
  return mapSchedule(data as ScheduleRow);
}

export async function deleteSchedule(id: string): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase.from("schedules").delete().eq("id", id);
  if (error) throw new Error(`Jadvalni o'chirishda xatolik: ${error.message}`);
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
