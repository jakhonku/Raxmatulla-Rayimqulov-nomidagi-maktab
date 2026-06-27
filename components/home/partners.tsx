"use client";

import { Landmark, BookMarked, ShieldCheck, GraduationCap, Globe2 } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

// Hamkor tashkilotlar (logotiplar uchun joy — hozircha ikon bilan)
const partners = [
  { name: "Maktab ta'limi vazirligi", icon: Landmark },
  { name: "Ziyonet ta'lim portali", icon: Globe2 },
  { name: "Respublika ta'lim markazi", icon: BookMarked },
  { name: "Xalq ta'limi boshqarmasi", icon: ShieldCheck },
  { name: "Pedagogika instituti", icon: GraduationCap },
];

export function Partners() {
  return (
    <section className="border-t border-slate-100 bg-slate-50/70 py-16">
      <div className="container">
        <SectionHeading
          eyebrow="Hamkorlar"
          title="Rasmiy hamkor tashkilotlar"
          description="Ta'lim sifatini oshirish yo'lida nufuzli tashkilotlar bilan hamkorlik qilamiz."
        />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {partners.map((partner, i) => {
            const Icon = partner.icon;
            return (
              <Reveal key={partner.name} delay={i * 0.06}>
                <div className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-card">
                  <Icon className="h-9 w-9 text-primary-600" />
                  <span className="text-xs font-semibold leading-tight text-slate-600">
                    {partner.name}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
