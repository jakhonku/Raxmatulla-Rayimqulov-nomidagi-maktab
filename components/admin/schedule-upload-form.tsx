"use client";

import { useActionState, useRef } from "react";
import { AlertCircle, CheckCircle2, Upload, FileUp } from "lucide-react";
import { uploadScheduleAction } from "@/app/admin/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ScheduleUploadForm() {
  const [state, formAction, pending] = useActionState(uploadScheduleAction, null);
  const formRef = useRef<HTMLFormElement>(null);

  // Muvaffaqiyatdan keyin formani tozalash
  if (state?.success && formRef.current) {
    formRef.current.reset();
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-600/10 text-emerald-700">
          <FileUp className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-heading text-lg font-bold text-slate-900">
            Yangi jadval yuklash
          </h2>
          <p className="text-xs text-slate-500">
            Excel (.xlsx), PDF yoki rasm formatida
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">
            Nomi <span className="text-red-500">*</span>
          </label>
          <Input
            name="title"
            placeholder="Masalan: 5-9 sinflar dars jadvali"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">
            Fayl <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name="file"
            accept=".xlsx,.xls,.csv,.pdf,image/*"
            required
            className="block w-full rounded-lg border border-slate-200 text-sm text-slate-600 file:mr-3 file:border-0 file:bg-primary-50 file:px-3 file:py-2.5 file:text-sm file:font-semibold file:text-primary-700 hover:file:bg-primary-100"
          />
        </div>
      </div>

      <div className="mt-3 rounded-lg bg-slate-50 px-4 py-3 text-xs text-slate-500">
        <strong className="text-slate-700">Eslatma:</strong> Excel yuklasangiz,
        jadval avtomatik saytda chiroyli ko'rinishda chiqadi. PDF yoki rasm bo'lsa,
        u o'zicha joylanadi.
      </div>

      {state?.error && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {state.error}
        </div>
      )}
      {state?.success && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          Jadval muvaffaqiyatli yuklandi!
        </div>
      )}

      <Button type="submit" size="lg" variant="secondary" className="mt-5" disabled={pending}>
        <Upload className="h-4 w-4" />
        {pending ? "Yuklanmoqda..." : "Yuklash"}
      </Button>
    </form>
  );
}
