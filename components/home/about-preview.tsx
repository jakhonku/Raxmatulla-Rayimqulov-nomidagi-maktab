"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { useLanguage } from "@/lib/i18n/language-provider";

const highlights = [
  "Malakali va tajribali pedagoglar jamoasi",
  "Zamonaviy laboratoriya va kompyuter sinflari",
  "Iqtidorli o'quvchilarni qo'llab-quvvatlash dasturi",
  "Xavfsiz va qulay o'quv muhiti",
];

export function AboutPreview() {
  const { t } = useLanguage();

  return (
    <section className="py-16 lg:py-20">
      <div className="container grid items-center gap-12 lg:grid-cols-2">
        {/* Rasmlar */}
        <Reveal className="relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-card">
              <Image
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80"
                alt="Maktab hayoti"
                fill
                sizes="25vw"
                className="object-cover"
              />
            </div>
            <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-2xl shadow-card">
              <Image
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80"
                alt="Kutubxonada o'quvchilar"
                fill
                sizes="25vw"
                className="object-cover"
              />
            </div>
          </div>
          {/* Yutuq nishonchasi */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-2xl border border-slate-100 bg-white px-6 py-3 text-center shadow-hover">
            <p className="font-heading text-xl font-bold text-primary-700">1936</p>
            <p className="text-xs font-medium text-slate-500">yildan beri faoliyatda</p>
          </div>
        </Reveal>

        {/* Matn */}
        <div className="flex flex-col gap-5">
          <Reveal>
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              {t.nav.about}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Bilim va tarbiya uyg'unligidagi zamonaviy maktab
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-slate-600">
              Maktabimiz yangi avlodni har tomonlama yetuk, vatanparvar va bilimli
              shaxslar etib tarbiyalashni o'z oldiga maqsad qilib qo'ygan. Biz har bir
              o'quvchiga individual yondashamiz va ularning iste'dodini namoyon etishiga
              sharoit yaratamiz.
            </p>
          </Reveal>

          <ul className="grid gap-3 sm:grid-cols-2">
            {highlights.map((item, i) => (
              <Reveal as="li" key={item} delay={0.12 + i * 0.06}>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span className="text-sm font-medium text-slate-700">{item}</span>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.4}>
            <Link href="/maktab-haqida">
              <Button className="mt-2">
                {t.common.readMore}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
