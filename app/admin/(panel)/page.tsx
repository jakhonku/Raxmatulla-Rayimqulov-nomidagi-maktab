import Link from "next/link";
import {
  Newspaper,
  CalendarClock,
  MessageSquare,
  Plus,
  ArrowRight,
  Inbox,
} from "lucide-react";
import { getAllNews, getMessages, getSchedules } from "@/lib/store";
import { formatDateUz } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [news, messages, schedules] = await Promise.all([
    getAllNews(),
    getMessages(),
    getSchedules(),
  ]);
  const unread = messages.filter((m) => !m.read).length;

  const stats = [
    {
      label: "Yangiliklar",
      value: news.length,
      icon: Newspaper,
      href: "/admin/yangiliklar",
      color: "from-primary-500 to-primary-700",
    },
    {
      label: "Dars jadvallari",
      value: schedules.length,
      icon: CalendarClock,
      href: "/admin/jadval",
      color: "from-emerald-500 to-emerald-700",
    },
    {
      label: "Murojaatlar",
      value: messages.length,
      sub: unread > 0 ? `${unread} ta o'qilmagan` : "Hammasi o'qilgan",
      icon: MessageSquare,
      href: "/admin/murojaatlar",
      color: "from-gold to-[#b8860b]",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
          Boshqaruv paneli
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Xush kelibsiz! Bu yerdan sayt kontentini boshqarasiz.
        </p>
      </div>

      {/* Statistik kartalar */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-hover"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${stat.color} text-white`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <ArrowRight className="h-4 w-4 text-slate-300 transition-colors group-hover:text-primary-600" />
              </div>
              <p className="mt-4 font-heading text-3xl font-extrabold text-slate-900">
                {stat.value}
              </p>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              {stat.sub && (
                <p className="mt-1 text-xs font-semibold text-emerald-700">
                  {stat.sub}
                </p>
              )}
            </Link>
          );
        })}
      </div>

      {/* Tezkor amallar */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/yangiliklar/yangi"
          className="flex items-center gap-3 rounded-2xl border border-dashed border-primary-200 bg-primary-50/50 p-5 text-primary-700 transition-colors hover:bg-primary-50"
        >
          <Plus className="h-5 w-5" />
          <span className="font-semibold">Yangi yangilik qo'shish</span>
        </Link>
        <Link
          href="/admin/jadval"
          className="flex items-center gap-3 rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/50 p-5 text-emerald-700 transition-colors hover:bg-emerald-50"
        >
          <CalendarClock className="h-5 w-5" />
          <span className="font-semibold">Dars jadvali yuklash</span>
        </Link>
      </div>

      {/* So'nggi murojaatlar */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-slate-900">
            So'nggi murojaatlar
          </h2>
          <Link
            href="/admin/murojaatlar"
            className="text-sm font-semibold text-primary-600 hover:underline"
          >
            Barchasi
          </Link>
        </div>
        {messages.length === 0 ? (
          <div className="mt-6 flex flex-col items-center gap-2 py-8 text-center text-slate-400">
            <Inbox className="h-10 w-10" />
            <p className="text-sm">Hozircha murojaatlar yo'q.</p>
          </div>
        ) : (
          <ul className="mt-4 divide-y divide-slate-100">
            {messages.slice(0, 5).map((m) => (
              <li key={m.id} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    {!m.read && (
                      <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" />
                    )}
                    {m.name}
                  </p>
                  <p className="truncate text-xs text-slate-500">{m.message}</p>
                </div>
                <span className="shrink-0 text-xs text-slate-400">
                  {formatDateUz(m.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
