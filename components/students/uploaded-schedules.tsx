import { FileText, Download } from "lucide-react";
import type { ScheduleDoc } from "@/lib/store";
import { cn } from "@/lib/utils";

/**
 * Admin yuklagan dars jadvallarini ko'rsatadi (Excel → jadval, PDF/rasm → ko'rinish).
 */
export function UploadedSchedules({ schedules }: { schedules: ScheduleDoc[] }) {
  return (
    <div className="space-y-10">
      {schedules.map((s) => (
        <div key={s.id}>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="font-heading text-lg font-bold text-slate-900">
              {s.title}
            </h3>
            {s.file && (
              <a
                href={s.file}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-primary-200 hover:text-primary-700"
              >
                <Download className="h-3.5 w-3.5" />
                Yuklab olish
              </a>
            )}
          </div>

          {/* Excel → jadval */}
          {s.type === "excel" && s.grid && s.grid.length > 0 && (
            <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-card">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-primary-700 text-white">
                      {s.grid[0].map((cell, i) => (
                        <th key={i} className="px-4 py-3.5 text-left font-semibold">
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {s.grid.slice(1).map((row, ri) => (
                      <tr
                        key={ri}
                        className={cn(
                          "border-t border-slate-100",
                          ri % 2 === 1 && "bg-slate-50/60",
                        )}
                      >
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className={cn(
                              "px-4 py-3 text-slate-700",
                              ci === 0 && "font-semibold text-primary-700",
                            )}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PDF → embed */}
          {s.type === "pdf" && s.file && (
            <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-card">
              <object
                data={s.file}
                type="application/pdf"
                className="h-[600px] w-full"
              >
                <div className="flex flex-col items-center gap-3 p-10 text-center text-slate-500">
                  <FileText className="h-10 w-10" />
                  <p className="text-sm">
                    PDF ko'rsatib bo'lmadi.{" "}
                    <a
                      href={s.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-primary-600 hover:underline"
                    >
                      Yuklab olish uchun bosing
                    </a>
                  </p>
                </div>
              </object>
            </div>
          )}

          {/* Rasm → img */}
          {s.type === "image" && s.file && (
            <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.file} alt={s.title} className="w-full" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
