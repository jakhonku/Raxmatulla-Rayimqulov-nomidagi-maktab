"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AlertCircle, Save, ArrowLeft } from "lucide-react";
import { newsCategories, type NewsItem } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type Action = (
  prev: unknown,
  formData: FormData,
) => Promise<{ error?: string } | void>;

interface NewsFormProps {
  action: Action;
  initial?: NewsItem;
  submitLabel?: string;
}

/**
 * Yangilik qo'shish/tahrirlash formasi. (Create/edit news form.)
 */
export function NewsForm({ action, initial, submitLabel = "Saqlash" }: NewsFormProps) {
  const [state, formAction, pending] = useActionState(action, null);
  const [preview, setPreview] = useState<string | null>(initial?.image ?? null);

  return (
    <form action={formAction} className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/yangiliklar"
          className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-heading text-2xl font-bold text-slate-900">
          {initial ? "Yangilikni tahrirlash" : "Yangi yangilik"}
        </h1>
      </div>

      {initial && <input type="hidden" name="slug" value={initial.slug} />}
      {initial && (
        <input type="hidden" name="currentImage" value={initial.image} />
      )}

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-sm font-semibold text-slate-700">
              Sarlavha <span className="text-red-500">*</span>
            </label>
            <Input
              name="title"
              defaultValue={initial?.title}
              placeholder="Yangilik sarlavhasi"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">
              Kategoriya <span className="text-red-500">*</span>
            </label>
            <Select name="category" defaultValue={initial?.category || "tadbirlar"}>
              {newsCategories.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Sana</label>
            <Input
              name="date"
              type="date"
              defaultValue={initial?.date || new Date().toISOString().slice(0, 10)}
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-sm font-semibold text-slate-700">
              Qisqacha matn <span className="text-red-500">*</span>
            </label>
            <Textarea
              name="excerpt"
              defaultValue={initial?.excerpt}
              placeholder="Kartochkada ko'rinadigan qisqa tavsif (1-2 jumla)"
              className="min-h-[80px]"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-sm font-semibold text-slate-700">
              Asosiy matn <span className="text-red-500">*</span>
            </label>
            <Textarea
              name="content"
              defaultValue={initial?.content.join("\n\n")}
              placeholder="To'liq matn. Har bir xatboshini bo'sh qator bilan ajrating."
              className="min-h-[200px]"
              required
            />
            <p className="text-xs text-slate-400">
              Maslahat: xatboshilarni bo'sh qator bilan ajrating — har biri alohida
              paragraf bo'ladi.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Muallif</label>
            <Input
              name="author"
              defaultValue={initial?.author}
              placeholder="Masalan: Matbuot xizmati"
            />
          </div>
        </div>

        {/* Rasm */}
        <div className="border-t border-slate-100 pt-5">
          <label className="text-sm font-semibold text-slate-700">Rasm</label>
          <div className="mt-2 grid gap-4 sm:grid-cols-[160px_1fr]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
              {preview ? (
                <Image
                  src={preview}
                  alt="Oldindan ko'rish"
                  fill
                  sizes="160px"
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <span className="grid h-full place-items-center text-xs text-slate-400">
                  Rasm yo'q
                </span>
              )}
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Kompyuterdan rasm yuklang:
                </p>
                <input
                  type="file"
                  name="imageFile"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setPreview(URL.createObjectURL(file));
                  }}
                  className="mt-1 block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-primary-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-primary-700 hover:file:bg-primary-100"
                />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">
                  yoki rasm havolasini (URL) kiriting:
                </p>
                <Input
                  name="imageUrl"
                  defaultValue={
                    initial?.image && initial.image.startsWith("http")
                      ? initial.image
                      : ""
                  }
                  placeholder="https://..."
                  className="mt-1"
                  onChange={(e) => {
                    if (e.target.value) setPreview(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {state?.error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {state.error}
        </div>
      )}

      <div className="flex items-center gap-3">
        <Button type="submit" size="lg" disabled={pending}>
          <Save className="h-4 w-4" />
          {pending ? "Saqlanmoqda..." : submitLabel}
        </Button>
        <Link href="/admin/yangiliklar">
          <Button type="button" variant="outline" size="lg">
            Bekor qilish
          </Button>
        </Link>
      </div>
    </form>
  );
}
