"use server";

import { promises as fs } from "fs";
import path from "path";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as XLSX from "xlsx";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
  getAdminPassword,
} from "@/lib/auth";
import { assertAdmin } from "@/lib/admin-session";
import {
  createNews,
  updateNews,
  deleteNews,
  addSchedule,
  deleteSchedule,
  markMessageRead,
  deleteMessage,
  slugify,
} from "@/lib/store";
import type { NewsCategory } from "@/lib/data";

/* --------------------------------- Auth --------------------------------- */

export async function loginAction(_prev: unknown, formData: FormData) {
  const password = String(formData.get("password") || "");
  const from = String(formData.get("from") || "/admin");

  if (password !== getAdminPassword()) {
    return { error: "Parol noto'g'ri. Qaytadan urinib ko'ring." };
  }

  const token = await createSessionToken();
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  redirect(from.startsWith("/admin") ? from : "/admin");
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

/* ------------------------------ Fayl yuklash ------------------------------ */

async function saveUpload(file: File): Promise<string> {
  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name).toLowerCase();
  const base = slugify(path.basename(file.name, ext)) || "fayl";
  const name = `${Date.now()}-${base}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, name), bytes);
  return `/uploads/${name}`;
}

/* ------------------------------- Yangiliklar ------------------------------- */

function parseContent(raw: string): string[] {
  return raw
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

async function newsInputFromForm(formData: FormData, currentImage?: string) {
  const title = String(formData.get("title") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = parseContent(String(formData.get("content") || ""));
  const category = String(formData.get("category") || "tadbirlar") as NewsCategory;
  const author = String(formData.get("author") || "").trim();
  const date =
    String(formData.get("date") || "").trim() ||
    new Date().toISOString().slice(0, 10);
  const imageUrl = String(formData.get("imageUrl") || "").trim();

  let image = currentImage || "";
  const imageFile = formData.get("imageFile") as File | null;
  if (imageFile && imageFile.size > 0) {
    image = await saveUpload(imageFile);
  } else if (imageUrl) {
    image = imageUrl;
  }
  if (!image) {
    image =
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1200&q=80";
  }

  return { title, excerpt, content, category, author, date, image };
}

export async function createNewsAction(_prev: unknown, formData: FormData) {
  await assertAdmin();
  const input = await newsInputFromForm(formData);
  if (!input.title || !input.excerpt || input.content.length === 0) {
    return { error: "Sarlavha, qisqacha matn va asosiy matn to'ldirilishi shart." };
  }
  await createNews(input);
  revalidatePath("/yangiliklar");
  revalidatePath("/");
  revalidatePath("/admin/yangiliklar");
  redirect("/admin/yangiliklar");
}

export async function updateNewsAction(_prev: unknown, formData: FormData) {
  await assertAdmin();
  const slug = String(formData.get("slug") || "");
  const currentImage = String(formData.get("currentImage") || "");
  const input = await newsInputFromForm(formData, currentImage);
  if (!input.title || !input.excerpt || input.content.length === 0) {
    return { error: "Sarlavha, qisqacha matn va asosiy matn to'ldirilishi shart." };
  }
  await updateNews(slug, input);
  revalidatePath("/yangiliklar");
  revalidatePath(`/yangiliklar/${slug}`);
  revalidatePath("/");
  revalidatePath("/admin/yangiliklar");
  redirect("/admin/yangiliklar");
}

export async function deleteNewsAction(formData: FormData) {
  await assertAdmin();
  const slug = String(formData.get("slug") || "");
  await deleteNews(slug);
  revalidatePath("/yangiliklar");
  revalidatePath("/");
  revalidatePath("/admin/yangiliklar");
}

/* ------------------------------- Dars jadvali ------------------------------- */

export async function uploadScheduleAction(_prev: unknown, formData: FormData) {
  await assertAdmin();
  const title = String(formData.get("title") || "").trim() || "Dars jadvali";
  const file = formData.get("file") as File | null;

  if (!file || file.size === 0) {
    return { error: "Iltimos, fayl tanlang (Excel, PDF yoki rasm)." };
  }

  const ext = path.extname(file.name).toLowerCase();

  try {
    if (ext === ".xlsx" || ext === ".xls" || ext === ".csv") {
      const buffer = Buffer.from(await file.arrayBuffer());
      const wb = XLSX.read(buffer, { type: "buffer" });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<string[]>(sheet, {
        header: 1,
        blankrows: false,
        defval: "",
      });
      const grid = rows.map((row) =>
        (Array.isArray(row) ? row : []).map((cell) => String(cell ?? "")),
      );
      if (grid.length === 0) {
        return { error: "Excel fayli bo'sh yoki o'qib bo'lmadi." };
      }
      await addSchedule({ title, type: "excel", grid });
    } else if (ext === ".pdf") {
      const filePath = await saveUpload(file);
      await addSchedule({ title, type: "pdf", file: filePath });
    } else if ([".png", ".jpg", ".jpeg", ".webp", ".gif"].includes(ext)) {
      const filePath = await saveUpload(file);
      await addSchedule({ title, type: "image", file: filePath });
    } else {
      return {
        error: "Qo'llab-quvvatlanmaydigan format. Excel, PDF yoki rasm yuklang.",
      };
    }
  } catch {
    return { error: "Faylni qayta ishlashda xatolik yuz berdi." };
  }

  revalidatePath("/oquvchilar");
  revalidatePath("/admin/jadval");
  return { success: true };
}

export async function deleteScheduleAction(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") || "");
  await deleteSchedule(id);
  revalidatePath("/oquvchilar");
  revalidatePath("/admin/jadval");
}

/* ------------------------------- Murojaatlar ------------------------------- */

export async function toggleMessageReadAction(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") || "");
  const read = String(formData.get("read") || "") === "true";
  await markMessageRead(id, read);
  revalidatePath("/admin/murojaatlar");
  revalidatePath("/admin");
}

export async function deleteMessageAction(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") || "");
  await deleteMessage(id);
  revalidatePath("/admin/murojaatlar");
  revalidatePath("/admin");
}
