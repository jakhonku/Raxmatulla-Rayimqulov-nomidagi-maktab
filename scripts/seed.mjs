/**
 * Namuna yangiliklarni Supabase'ga yozadi (bir marta ishga tushiriladi).
 * (Seeds the sample news into Supabase — run once.)
 *
 * Ishlatish (env o'rnatilgan bo'lsin — .env.local yoki qo'lda):
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed.mjs
 *
 * Windows PowerShell:
 *   $env:SUPABASE_URL="..."; $env:SUPABASE_SERVICE_ROLE_KEY="..."; node scripts/seed.mjs
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

// .env.local ni oddiy tarzda o'qish (agar env hali o'rnatilmagan bo'lsa)
try {
  const envRaw = readFileSync(path.join(root, ".env.local"), "utf-8");
  for (const line of envRaw.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
} catch {
  /* .env.local yo'q bo'lsa e'tiborsiz */
}

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    "❌ SUPABASE_URL va SUPABASE_SERVICE_ROLE_KEY o'rnatilmagan. .env.local ga qo'shing.",
  );
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false },
});

const news = JSON.parse(readFileSync(path.join(root, "data", "news.json"), "utf-8"));

const rows = news.map((n) => ({
  slug: n.slug,
  title: n.title,
  excerpt: n.excerpt,
  content: n.content,
  date: n.date,
  category: n.category,
  image: n.image,
  author: n.author ?? null,
}));

const { error } = await supabase.from("news").upsert(rows, { onConflict: "slug" });

if (error) {
  console.error("❌ Seed xatolik:", error.message);
  process.exit(1);
}

console.log(`✅ ${rows.length} ta namuna yangilik Supabase'ga yozildi.`);
