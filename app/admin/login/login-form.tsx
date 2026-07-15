"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { LogIn, AlertCircle } from "lucide-react";
import { loginAction } from "@/app/admin/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const params = useSearchParams();
  const from = params.get("from") || "/admin";
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <form action={formAction} className="grid gap-5">
      <input type="hidden" name="from" value={from} />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="username" className="text-sm font-semibold text-slate-700">
          Login
        </label>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="Login (foydalanuvchi nomi)"
          autoComplete="username"
          autoFocus
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-semibold text-slate-700">
          Parol
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Admin parolini kiriting"
          autoComplete="current-password"
          required
        />
      </div>

      {state?.error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {state.error}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        <LogIn className="h-4 w-4" />
        {pending ? "Kirilmoqda..." : "Tizimga kirish"}
      </Button>
    </form>
  );
}
