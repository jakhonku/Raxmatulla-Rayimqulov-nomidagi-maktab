"use client";

import { useActionState } from "react";
import { CheckCircle2, Send, AlertCircle } from "lucide-react";
import { submitContactMessage } from "@/app/aloqa/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

/**
 * Aloqa formasi — murojaatni serverga saqlaydi (admin ko'radi).
 * (Contact form — submits to the server action, stored for the admin.)
 */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactMessage, null);

  if (state?.success) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-600 text-white">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h3 className="font-heading text-xl font-bold text-slate-900">
          Xabaringiz yuborildi!
        </h3>
        <p className="max-w-sm text-sm text-slate-600">
          Murojaatingiz uchun rahmat. Tez orada javob beramiz.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-semibold text-slate-700">
            Ismingiz <span className="text-red-500">*</span>
          </label>
          <Input id="name" name="name" placeholder="F.I.Sh." required />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cphone" className="text-sm font-semibold text-slate-700">
            Telefon <span className="text-red-500">*</span>
          </label>
          <Input
            id="cphone"
            name="phone"
            type="tel"
            placeholder="+998 90 123 45 67"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cemail" className="text-sm font-semibold text-slate-700">
          Email
        </label>
        <Input id="cemail" name="email" type="email" placeholder="email@example.com" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cmessage" className="text-sm font-semibold text-slate-700">
          Xabar <span className="text-red-500">*</span>
        </label>
        <Textarea
          id="cmessage"
          name="message"
          placeholder="Savol yoki murojaatingizni yozing..."
          required
        />
      </div>

      {state?.error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {state.error}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={pending}>
        <Send className="h-4 w-4" />
        {pending ? "Yuborilmoqda..." : "Xabarni yuborish"}
      </Button>
    </form>
  );
}
