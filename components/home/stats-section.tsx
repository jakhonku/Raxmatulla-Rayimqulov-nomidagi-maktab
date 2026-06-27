"use client";

import { Users, GraduationCap, Award, Trophy } from "lucide-react";
import { stats } from "@/lib/data";
import { Counter } from "@/components/shared/counter";
import { Reveal } from "@/components/shared/reveal";

const icons = [Users, GraduationCap, Trophy, Award];

export function StatsSection() {
  return (
    <section className="relative -mt-2 py-14">
      <div className="container">
        <div className="grid grid-cols-2 gap-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-card sm:p-8 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div className="flex flex-col items-center gap-2 text-center lg:flex-row lg:gap-4 lg:text-left">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary-50 to-emerald-50 text-primary-600">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="font-heading text-3xl font-extrabold tracking-tight text-slate-900 lg:text-4xl">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
