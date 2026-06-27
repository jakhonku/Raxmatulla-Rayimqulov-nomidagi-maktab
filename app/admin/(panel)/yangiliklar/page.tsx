import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Newspaper, Eye } from "lucide-react";
import { getAllNews } from "@/lib/store";
import { newsCategories } from "@/lib/data";
import { formatDateUz } from "@/lib/utils";
import { deleteNewsAction } from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

export default async function AdminNewsPage() {
  const news = await getAllNews();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
            Yangiliklar
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Jami {news.length} ta yangilik
          </p>
        </div>
        <Link
          href="/admin/yangiliklar/yangi"
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-primary-700"
        >
          <Plus className="h-4 w-4" />
          Yangi qo'shish
        </Link>
      </div>

      {news.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center text-slate-400">
          <Newspaper className="h-12 w-12" />
          <p>Hozircha yangiliklar yo'q.</p>
          <Link
            href="/admin/yangiliklar/yangi"
            className="text-sm font-semibold text-primary-600 hover:underline"
          >
            Birinchi yangilikni qo'shing
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card">
          <ul className="divide-y divide-slate-100">
            {news.map((item) => {
              const category = newsCategories.find((c) => c.key === item.category);
              return (
                <li
                  key={item.slug}
                  className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
                >
                  <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-semibold text-primary-700">
                        {category?.label}
                      </span>
                      <span className="text-xs text-slate-400">
                        {formatDateUz(item.date)}
                      </span>
                    </div>
                    <h3 className="mt-1 truncate font-semibold text-slate-800">
                      {item.title}
                    </h3>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <Link
                      href={`/yangiliklar/${item.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-500 transition-colors hover:bg-slate-100"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      Ko'rish
                    </Link>
                    <Link
                      href={`/admin/yangiliklar/${item.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-primary-600 transition-colors hover:bg-primary-50"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Tahrirlash
                    </Link>
                    <DeleteButton
                      action={deleteNewsAction}
                      name="slug"
                      value={item.slug}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
