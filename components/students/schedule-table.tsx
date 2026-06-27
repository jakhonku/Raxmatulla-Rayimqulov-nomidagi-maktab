"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { lessonTimes, weekDays, sampleSchedule } from "@/lib/data";
import { cn } from "@/lib/utils";

const classes = ["9-A", "9-B", "10-A", "11-A"];

/**
 * Sinf bo'yicha haftalik dars jadvali (namuna).
 * (Weekly lesson schedule with class selector — sample data.)
 */
export function ScheduleTable() {
  const [activeClass, setActiveClass] = useState(classes[0]);

  return (
    <div>
      {/* Sinf tanlash */}
      <div className="flex flex-wrap gap-2">
        {classes.map((cls) => (
          <button
            key={cls}
            type="button"
            onClick={() => setActiveClass(cls)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200",
              activeClass === cls
                ? "bg-primary-600 text-white shadow-soft"
                : "border border-slate-200 bg-white text-slate-600 hover:border-primary-200 hover:text-primary-700",
            )}
          >
            {cls} sinf
          </button>
        ))}
      </div>

      <motion.div
        key={activeClass}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-6 overflow-hidden rounded-2xl border border-slate-100 shadow-card"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-sm">
            <thead>
              <tr className="bg-primary-700 text-white">
                <th className="px-4 py-3.5 text-left font-semibold">Vaqt</th>
                {weekDays.map((day) => (
                  <th key={day} className="px-4 py-3.5 text-left font-semibold">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lessonTimes.map((time, rowIdx) => (
                <tr
                  key={time}
                  className={cn(
                    "border-t border-slate-100",
                    rowIdx % 2 === 1 && "bg-slate-50/60",
                  )}
                >
                  <td className="whitespace-nowrap px-4 py-3 font-semibold text-primary-700">
                    {time}
                  </td>
                  {weekDays.map((day) => (
                    <td key={day} className="px-4 py-3 text-slate-700">
                      {sampleSchedule[day]?.[rowIdx] ?? "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
      <p className="mt-3 text-xs text-slate-400">
        * Jadval namuna sifatida keltirilgan. Aniq jadval sinf rahbaridan olinadi.
      </p>
    </div>
  );
}
