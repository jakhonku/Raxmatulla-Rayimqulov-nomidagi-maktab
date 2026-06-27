"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Trash2, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

function SubmitConfirm() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-60"
    >
      <Check className="h-3.5 w-3.5" />
      {pending ? "..." : "Ha"}
    </button>
  );
}

interface DeleteButtonProps {
  /** Server action */
  action: (formData: FormData) => void;
  /** Hidden field name + value identifying the record */
  name: string;
  value: string;
  label?: string;
  className?: string;
}

/**
 * Tasdiqlash bilan o'chirish tugmasi. (Delete button with inline confirm.)
 */
export function DeleteButton({
  action,
  name,
  value,
  label = "O'chirish",
  className,
}: DeleteButtonProps) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-slate-500">Ishonchingiz komilmi?</span>
        <form action={action}>
          <input type="hidden" name={name} value={value} />
          <SubmitConfirm />
        </form>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-200"
        >
          <X className="h-3.5 w-3.5" />
          Yo'q
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50",
        className,
      )}
    >
      <Trash2 className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
