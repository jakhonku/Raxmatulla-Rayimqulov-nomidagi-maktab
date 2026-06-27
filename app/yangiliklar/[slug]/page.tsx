import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, User, ArrowLeft } from "lucide-react";
import { newsCategories } from "@/lib/data";
import { getAllNews, getNewsBySlug } from "@/lib/store";
import { formatDateUz } from "@/lib/utils";
import { PageBanner } from "@/components/shared/page-banner";
import { NewsCard } from "@/components/shared/news-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) return { title: "Yangilik topilmadi" };
  return {
    title: item.title,
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
      images: [item.image],
      type: "article",
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) notFound();

  const categoryLabel =
    newsCategories.find((c) => c.key === item.category)?.label ?? item.category;
  const all = await getAllNews();
  const related = all.filter((n) => n.slug !== item.slug).slice(0, 3);

  return (
    <>
      <PageBanner
        title={item.title}
        breadcrumbs={[
          { label: "Yangiliklar", href: "/yangiliklar" },
          { label: categoryLabel },
        ]}
      />

      <article className="py-12 lg:py-16">
        <div className="container max-w-3xl">
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <Badge variant="default">{categoryLabel}</Badge>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              {formatDateUz(item.date)}
            </span>
            {item.author && (
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {item.author}
              </span>
            )}
          </div>

          <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-3xl shadow-card">
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>

          <div className="prose prose-slate mt-8 max-w-none">
            {item.content.map((paragraph, i) => (
              <p key={i} className="mb-4 text-lg leading-relaxed text-slate-700">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 border-t border-slate-100 pt-6">
            <Link href="/yangiliklar">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4" />
                Barcha yangiliklar
              </Button>
            </Link>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-slate-50/70 py-16">
          <div className="container">
            <h2 className="font-heading text-2xl font-bold text-slate-900">
              Boshqa yangiliklar
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((rel) => (
                <NewsCard key={rel.slug} item={rel} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
