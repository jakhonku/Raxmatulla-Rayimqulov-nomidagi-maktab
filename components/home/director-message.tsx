"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

export function DirectorMessage() {
  return (
    <section className="py-16 lg:py-20">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-primary-900 text-white">
            {/* Fon naqshi */}
            <div className="pointer-events-none absolute inset-0 opacity-10">
              <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white blur-3xl" />
              <div className="absolute -bottom-10 left-1/3 h-64 w-64 rounded-full bg-emerald-400 blur-3xl" />
            </div>

            <div className="relative grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-[260px_1fr] lg:gap-12">
              {/* Direktor rasmi */}
              <div className="mx-auto w-full max-w-[240px]">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl ring-4 ring-white/10">
                  {/* RASM JOYI: direktor surati */}
                  <Image
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
                    alt="Maktab direktori"
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Murojaat matni */}
              <div className="flex flex-col gap-5">
                <Quote className="h-10 w-10 text-emerald-400" />
                <p className="text-lg leading-relaxed text-slate-100 sm:text-xl">
                  Hurmatli ota-onalar va aziz o'quvchilar! Maktabimizning rasmiy
                  saytiga xush kelibsiz. Bizning asosiy maqsadimiz — har bir
                  o'quvchini bilimli, e'tiqodli va vatanga sodiq inson etib
                  tarbiyalashdir. Sizni hamkorlikka va birgalikda kelajakni qurishga
                  taklif etamiz.
                </p>
                <div className="mt-2">
                  <p className="font-heading text-xl font-bold">Akmal Karimov</p>
                  <p className="text-sm text-emerald-300">Maktab direktori</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
