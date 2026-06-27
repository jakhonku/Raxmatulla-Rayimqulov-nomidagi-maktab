import {
  FileSpreadsheet,
  FileText,
  ImageIcon,
  CalendarClock,
  ExternalLink,
} from "lucide-react";
import { getSchedules } from "@/lib/store";
import { formatDateUz } from "@/lib/utils";
import { deleteScheduleAction } from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/delete-button";
import { ScheduleUploadForm } from "@/components/admin/schedule-upload-form";

export const dynamic = "force-dynamic";

const typeMeta = {
  excel: { label: "Excel jadval", icon: FileSpreadsheet, color: "text-emerald-600" },
  pdf: { label: "PDF hujjat", icon: FileText, color: "text-red-600" },
  image: { label: "Rasm", icon: ImageIcon, color: "text-primary-600" },
};

export default async function AdminSchedulePage() {
  const schedules = await getSchedules();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
          Dars jadvali
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Dars jadvallarini yuklang — ular «O'quvchilarga» sahifasida ko'rinadi.
        </p>
      </div>

      <ScheduleUploadForm />

      <div>
        <h2 className="mb-3 font-heading text-lg font-bold text-slate-900">
          Yuklangan jadvallar ({schedules.length})
        </h2>

        {schedules.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center text-slate-400">
            <CalendarClock className="h-12 w-12" />
            <p>Hozircha yuklangan jadval yo'q.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card">
            <ul className="divide-y divide-slate-100">
              {schedules.map((s) => {
                const meta = typeMeta[s.type];
                const Icon = meta.icon;
                return (
                  <li
                    key={s.id}
                    className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-50">
                        <Icon className={`h-5 w-5 ${meta.color}`} />
                      </span>
                      <div>
                        <p className="font-semibold text-slate-800">{s.title}</p>
                        <p className="text-xs text-slate-400">
                          {meta.label} ·{" "}
                          {s.type === "excel"
                            ? `${s.grid?.length ?? 0} qator`
                            : "fayl"}{" "}
                          · {formatDateUz(s.updatedAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {s.file && (
                        <a
                          href={s.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-500 transition-colors hover:bg-slate-100"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Ochish
                        </a>
                      )}
                      <DeleteButton
                        action={deleteScheduleAction}
                        name="id"
                        value={s.id}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
