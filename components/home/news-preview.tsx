"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type NewsItem } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { NewsCard } from "@/components/shared/news-card";
import { Reveal } from "@/components/shared/reveal";
import { useLanguage } from "@/lib/i18n/language-provider";

export function NewsPreview({ items }: { items: NewsItem[] }) {
  const { t } = useLanguage();
  const latest = items.slice(0, 3);

  return (
    <section className="bg-slate-50/70 py-16 lg:py-20">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow={t.nav.news}
            title="So'nggi yangiliklar"
            description="Maktab hayotidagi muhim voqealar, tadbirlar va e'lonlardan xabardor bo'ling."
          />
          <Link href="/yangiliklar" className="hidden shrink-0 sm:block">
            <Button variant="outline">
              {t.common.allNews}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((item, i) => (
            <Reveal key={item.slug} delay={i * 0.1}>
              <NewsCard item={item} />
            </Reveal>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/yangiliklar">
            <Button variant="outline" className="w-full">
              {t.common.allNews}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
