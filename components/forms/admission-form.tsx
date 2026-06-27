"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

/**
 * Onlayn qabul arizasi shakli.
 * (Online admission application form — client-side demo submission.)
 * Eslatma: backend integratsiyasi keyinroq ulanadi (masalan, server action yoki API).
 */
export function AdmissionForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: bu yerga haqiqiy yuborish logikasi qo'shiladi (API / server action)
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-10 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-600 text-white">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h3 className="font-heading text-xl font-bold text-slate-900">
          Arizangiz qabul qilindi!
        </h3>
        <p className="max-w-md text-sm text-slate-600">
          Tez orada maktab ma'muriyati siz bilan bog'lanadi. Bizga ishonch
          bildirganingiz uchun rahmat.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Yangi ariza yuborish
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="childName" className="text-sm font-semibold text-slate-700">
            Bolaning F.I.Sh. <span className="text-red-500">*</span>
          </label>
          <Input id="childName" name="childName" placeholder="Masalan: Ali Valiyev" required />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="parentName" className="text-sm font-semibold text-slate-700">
            Ota-ona F.I.Sh. <span className="text-red-500">*</span>
          </label>
          <Input id="parentName" name="parentName" placeholder="Masalan: Valijon Aliyev" required />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-sm font-semibold text-slate-700">
            Telefon raqami <span className="text-red-500">*</span>
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+998 90 123 45 67"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="grade" className="text-sm font-semibold text-slate-700">
            Sinf <span className="text-red-500">*</span>
          </label>
          <Select id="grade" name="grade" required defaultValue="">
            <option value="" disabled>
              Sinfni tanlang
            </option>
            {Array.from({ length: 11 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}-sinf
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-semibold text-slate-700">
          Qo'shimcha izoh
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Savol yoki qo'shimcha ma'lumotlaringizni yozing..."
        />
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        <Send className="h-4 w-4" />
        Arizani yuborish
      </Button>
      <p className="text-xs text-slate-400">
        Arizani yuborish orqali siz shaxsiy ma'lumotlaringizni qayta ishlashga rozilik
        bildirasiz.
      </p>
    </form>
  );
}
