"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { teachers, subjects } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function TeachersGrid() {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all"
      ? teachers
      : teachers.filter((teacher) => teacher.subjectKey === active);

  return (
    <div>
      {/* Fanlar bo'yicha filtr */}
      <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 pb-2 sm:flex-wrap sm:justify-center">
        {subjects.map((subject) => (
          <button
            key={subject.key}
            type="button"
            onClick={() => setActive(subject.key)}
            className={cn(
              "whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200",
              active === subject.key
                ? "bg-primary-600 text-white shadow-soft"
                : "border border-slate-200 bg-white text-slate-600 hover:border-primary-200 hover:text-primary-700",
            )}
          >
            {subject.label}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((teacher, i) => (
            <motion.div
              key={teacher.name}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: (i % 4) * 0.05 }}
            >
              <Card className="group h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-hover">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={teacher.image}
                    alt={teacher.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-900/80 to-transparent p-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-primary-700">
                      <GraduationCap className="h-3.5 w-3.5" />
                      {teacher.subject}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-base font-bold text-slate-900">
                    {teacher.name}
                  </h3>
                  <div className="mt-3 flex flex-col gap-1.5 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5 text-gold" />
                      {teacher.degree}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <GraduationCap className="h-3.5 w-3.5 text-emerald-600" />
                      {teacher.experience}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-slate-500">
          Bu fan bo'yicha o'qituvchi topilmadi.
        </p>
      )}
    </div>
  );
}
