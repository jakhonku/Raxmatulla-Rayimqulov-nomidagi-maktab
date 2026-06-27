import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { GraduationCap, ArrowLeft } from "lucide-react";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin — Kirish",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-grid bg-slate-50 px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 text-white shadow-soft">
            <GraduationCap className="h-7 w-7" />
          </span>
          <h1 className="mt-4 font-heading text-2xl font-bold text-slate-900">
            Admin panel
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            R. Rayimqulov nomidagi maktab boshqaruv tizimi
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-7 shadow-card sm:p-8">
          <Suspense fallback={<div className="h-40" />}>
            <LoginForm />
          </Suspense>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-primary-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Saytga qaytish
          </Link>
        </div>
      </div>
    </div>
  );
}
