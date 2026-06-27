import Link from "next/link";
import Image from "next/image";
import { CalendarDays, ArrowUpRight } from "lucide-react";
import { type NewsItem, newsCategories } from "@/lib/data";
import { formatDateUz } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const categoryVariant: Record<string, "default" | "secondary" | "gold"> = {
  tadbirlar: "default",
  yutuqlar: "gold",
  elonlar: "secondary",
};

export function NewsCard({ item }: { item: NewsItem }) {
  const categoryLabel =
    newsCategories.find((c) => c.key === item.category)?.label ?? item.category;

  return (
    <Link
      href={`/yangiliklar/${item.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-hover"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <Badge variant={categoryVariant[item.category]}>{categoryLabel}</Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
          <CalendarDays className="h-3.5 w-3.5" />
          {formatDateUz(item.date)}
        </div>
        <h3 className="mt-2 font-heading text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-primary-700">
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
          {item.excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-600">
          Batafsil
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
