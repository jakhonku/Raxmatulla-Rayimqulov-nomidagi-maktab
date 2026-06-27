"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  CalendarClock,
  MessageSquare,
  LogOut,
  GraduationCap,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { logoutAction } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Boshqaruv paneli", icon: LayoutDashboard, exact: true },
  { href: "/admin/yangiliklar", label: "Yangiliklar", icon: Newspaper },
  { href: "/admin/jadval", label: "Dars jadvali", icon: CalendarClock },
  { href: "/admin/murojaatlar", label: "Murojaatlar", icon: MessageSquare },
];

export function AdminSidebar({ unread = 0 }: { unread?: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const nav = (
    <nav className="flex flex-1 flex-col gap-1">
      {items.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href, item.exact);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
              active
                ? "bg-primary-600 text-white shadow-soft"
                : "text-slate-600 hover:bg-slate-100",
            )}
          >
            <span className="flex items-center gap-3">
              <Icon className="h-5 w-5" />
              {item.label}
            </span>
            {item.href === "/admin/murojaatlar" && unread > 0 && (
              <span
                className={cn(
                  "grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-xs font-bold",
                  active ? "bg-white text-primary-700" : "bg-red-500 text-white",
                )}
              >
                {unread}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );

  const footer = (
    <div className="flex flex-col gap-1 border-t border-slate-100 pt-3">
      <Link
        href="/"
        target="_blank"
        className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100"
      >
        <ExternalLink className="h-5 w-5" />
        Saytni ko'rish
      </Link>
      <form action={logoutAction}>
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" />
          Chiqish
        </button>
      </form>
    </div>
  );

  const brand = (
    <Link href="/admin" className="flex items-center gap-3 px-2 py-1">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <GraduationCap className="h-5 w-5" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-heading text-sm font-extrabold text-slate-900">
          Admin panel
        </span>
        <span className="text-[11px] text-slate-500">R. Rayimqulov maktabi</span>
      </span>
    </Link>
  );

  return (
    <>
      {/* Mobil yuqori panel */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-100 bg-white px-4 py-3 lg:hidden">
        {brand}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Menyu"
          className="grid h-10 w-10 place-items-center rounded-lg text-slate-700 hover:bg-slate-100"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col gap-4 border-r border-slate-100 bg-white p-4 lg:flex">
        {brand}
        {nav}
        {footer}
      </aside>

      {/* Mobil sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col gap-4 bg-white p-4 shadow-2xl">
            <div className="flex items-center justify-between">
              {brand}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Yopish"
                className="grid h-10 w-10 place-items-center rounded-lg text-slate-700 hover:bg-slate-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            {nav}
            {footer}
          </div>
        </div>
      )}
    </>
  );
}
