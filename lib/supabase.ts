import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client (service_role kaliti bilan).
 * (Server-only Supabase client using the service role key.)
 *
 * MUHIM: service_role kaliti to'liq huquqqa ega — u faqat serverda ishlatiladi,
 * hech qachon brauzerga (client component) chiqmasligi kerak. Shu sababli bu
 * fayl "server-only" bilan himoyalangan.
 */

export const UPLOADS_BUCKET = "uploads";

let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Supabase sozlanmagan. .env.local (yoki Vercel) da SUPABASE_URL va " +
        "SUPABASE_SERVICE_ROLE_KEY qiymatlarini kiriting.",
    );
  }

  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
