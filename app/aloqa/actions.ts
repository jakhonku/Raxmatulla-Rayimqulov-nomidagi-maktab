"use server";

import { revalidatePath } from "next/cache";
import { addMessage } from "@/lib/store";

/**
 * Ommaviy aloqa formasi — murojaatni saqlaydi (admin ko'rishi uchun).
 * (Public contact form — stores the message for the admin to review.)
 */
export async function submitContactMessage(_prev: unknown, formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !phone || !message) {
    return { error: "Ism, telefon va xabar to'ldirilishi shart." };
  }

  await addMessage({ name, phone, email: email || undefined, message });
  revalidatePath("/admin/murojaatlar");
  revalidatePath("/admin");
  return { success: true };
}
