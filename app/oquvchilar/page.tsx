import type { Metadata } from "next";
import { CalendarRange, ExternalLink, Plane, GraduationCap } from "lucide-react";
import { eResources, holidays } from "@/lib/data";
import { getSchedules } from "@/lib/store";
import { PageBanner } from "@/components/shared/page-banner";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";
import { ScheduleTable } from "@/components/students/schedule-table";
import { UploadedSchedules } from "@/components/students/uploaded-schedules";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "O'quvchilarga",
  description:
    "Dars jadvali, imtihon jadvali, elektron resurslar va ta'til kunlari haqida ma'lumot.",
};

const exams = [
  { subject: "Matematika", date: "20-may", time: "09:00", grade: "9-sinflar" },
  { subject: "Ona tili", date: "23-may", time: "09:00", grade: "9-sinflar" },
  { subject: "Ingliz tili", date: "26-may", time: "10:00", grade: "11-sinflar" },
  { subject: "Tarix", date: "29-may", time: "09:00", grade: "11-sinflar" },
];

export default async function StudentsPage() {
  const schedules = await getSchedules();

  return (
    <>
      <PageBanner
        title="O'quvchilarga"
        description="Dars jadvali, imtihon muddatlari, foydali elektron resurslar va ta'til kunlari bir joyda."
        breadcrumbs={[{ label: "O'quvchilarga" }]}
      />

      {/* Dars jadvali */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <SectionHeading
            align="left"
            eyebrow="Dars jadvali"
            title="Haftalik dars jadvali"
            description={
              schedules.length > 0
                ? "Maktab ma'muriyati tomonidan yuklangan rasmiy dars jadvali."
                : "Sinfingizni tanlang va haftalik dars jadvali bilan tanishing."
            }
          />
          <div className="mt-10">
            {schedules.length > 0 ? (
              <UploadedSchedules schedules={schedules} />
            ) : (
              <ScheduleTable />
            )}
          </div>
        </div>
      </section>

      {/* Imtihon jadvali */}
      <section className="bg-slate-50/70 py-16 lg:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Imtihonlar"
            title="Imtihon jadvali"
            description="Yakuniy nazorat va imtihonlar muddatlari."
          />
          <Reveal delay={0.1} className="mt-10">
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse text-sm">
                  <thead>
                    <tr className="bg-primary-700 text-white">
                      <th className="px-5 py-3.5 text-left font-semibold">Fan</th>
                      <th className="px-5 py-3.5 text-left font-semibold">Sana</th>
                      <th className="px-5 py-3.5 text-left font-semibold">Vaqt</th>
                      <th className="px-5 py-3.5 text-left font-semibold">Sinflar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exams.map((exam, i) => (
                      <tr
                        key={exam.subject}
                        className={i % 2 === 1 ? "bg-slate-50/60" : ""}
                      >
                        <td className="px-5 py-3.5 font-semibold text-slate-800">
                          {exam.subject}
                        </td>
                        <td className="px-5 py-3.5 text-primary-700">{exam.date}</td>
                        <td className="px-5 py-3.5 text-slate-600">{exam.time}</td>
                        <td className="px-5 py-3.5 text-slate-600">{exam.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* E-resurslar */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="E-resurslar"
            title="Foydali elektron resurslar"
            description="O'qish va rivojlanish uchun tavsiya etilgan platformalar."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {eResources.map((resource, i) => (
              <Reveal key={resource.title} delay={i * 0.08}>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full items-start gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-hover"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary-50 to-emerald-50 text-primary-600">
                    <GraduationCap className="h-6 w-6" />
                  </span>
                  <div className="flex-1">
                    <h3 className="flex items-center gap-1.5 font-heading text-base font-bold text-slate-900 group-hover:text-primary-700">
                      {resource.title}
                      <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">{resource.description}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ta'til kunlari */}
      <section className="bg-slate-50/70 py-16 lg:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Ta'til"
            title="Bayram va ta'til kunlari"
            description="O'quv yili davomidagi ta'til muddatlari."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {holidays.map((holiday, i) => (
              <Reveal key={holiday.name} delay={i * 0.08}>
                <Card className="h-full p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-hover">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-gold/10 text-gold">
                    <Plane className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-bold text-slate-900">
                    {holiday.name}
                  </h3>
                  <p className="mt-1.5 flex items-center justify-center gap-1.5 text-sm font-medium text-slate-500">
                    <CalendarRange className="h-4 w-4" />
                    {holiday.period}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
