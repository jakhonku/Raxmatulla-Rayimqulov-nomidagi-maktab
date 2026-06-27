"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-provider";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-grid">
      {/* Fon gradientlari */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-primary-100/50 blur-3xl" />
        <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-emerald-100/40 blur-3xl" />
      </div>

      <div className="container grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        {/* Matn qismi */}
        <div className="flex flex-col gap-6">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-primary-100 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-700 shadow-sm backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            {t.common.schoolType}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 text-balance sm:text-5xl lg:text-6xl"
          >
            Raxmatulla Rayimqulov nomidagi{" "}
            <span className="bg-gradient-to-r from-primary-600 to-emerald-600 bg-clip-text text-transparent">
              maktab
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="max-w-xl text-lg leading-relaxed text-slate-600"
          >
            Bilim, tarbiya va kelajak uchun ishonchli maskan. Zamonaviy ta'lim
            muhitida har bir o'quvchining iqtidorini ro'yobga chiqaramiz.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Link href="/maktab-haqida">
              <Button size="lg">
                {t.nav.about}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/qabul">
              <Button size="lg" variant="outline">
                {t.nav.admission}
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Rasm qismi */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-hover ring-1 ring-slate-200/60">
            {/* RASM JOYI: maktab binosi yoki o'quvchilar surati */}
            <Image
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80"
              alt="Maktab binosi va o'quvchilar"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent" />
          </div>

          {/* Suzuvchi statistik kartochka */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white/95 p-4 shadow-hover backdrop-blur sm:-left-6"
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-600/10 text-emerald-700">
              <GraduationCap className="h-6 w-6" />
            </span>
            <div>
              <p className="font-heading text-2xl font-bold text-slate-900">1240+</p>
              <p className="text-xs font-medium text-slate-500">O'quvchilar</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
