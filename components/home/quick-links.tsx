"use client";

import Link from "next/link";
import { CalendarClock, BookOpen, ClipboardList, Phone, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

const links = [
  {
    title: "Dars jadvali",
    description: "Sinflar bo'yicha haftalik dars jadvali",
    href: "/oquvchilar",
    icon: CalendarClock,
    color: "from-primary-500 to-primary-700",
  },
  {
    title: "E-resurslar",
    description: "Elektron darslik va foydali havolalar",
    href: "/oquvchilar",
    icon: BookOpen,
    color: "from-emerald-500 to-emerald-700",
  },
  {
    title: "Qabul",
    description: "1-sinfga qabul tartibi va hujjatlar",
    href: "/qabul",
    icon: ClipboardList,
    color: "from-gold to-[#b8860b]",
  },
  {
    title: "Aloqa",
    description: "Manzil, telefon va murojaat shakli",
    href: "/aloqa",
    icon: Phone,
    color: "from-slate-600 to-slate-800",
  },
];

export function QuickLinks() {
  return (
    <section className="py-16 lg:py-20">
      <div className="container">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((link, i) => {
            const Icon = link.icon;
            return (
              <Reveal key={link.title} delay={i * 0.08}>
                <Link
                  href={link.href}
                  className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-hover"
                >
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${link.color} text-white shadow-soft`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-slate-900">
                      {link.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">{link.description}</p>
                  </div>
                  <ArrowUpRight className="absolute right-5 top-5 h-5 w-5 text-slate-300 transition-all group-hover:text-primary-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
