import type { Metadata } from "next";
import { FileText, CalendarCheck, ClipboardCheck } from "lucide-react";
import { admissionDocuments, admissionSteps } from "@/lib/data";
import { PageBanner } from "@/components/shared/page-banner";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";
import { AdmissionForm } from "@/components/forms/admission-form";

export const metadata: Metadata = {
  title: "Qabul",
  description:
    "1-sinfga qabul tartibi, kerakli hujjatlar ro'yxati, muddatlar va onlayn ariza shakli.",
};

const deadlines = [
  { label: "Hujjatlar qabuli", value: "1-iyun – 15-avgust" },
  { label: "Suhbat va ko'rik", value: "16-avgust – 25-avgust" },
  { label: "Natijalar e'loni", value: "28-avgust" },
  { label: "O'quv yili boshlanishi", value: "2-sentabr" },
];

export default function AdmissionPage() {
  return (
    <>
      <PageBanner
        title="Qabul"
        description="Farzandingizni maktabimizga topshirish bo'yicha barcha kerakli ma'lumotlar va onlayn ariza shakli."
        breadcrumbs={[{ label: "Qabul" }]}
      />

      {/* Qabul bosqichlari */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Qabul tartibi"
            title="Qanday qabul qilamiz"
            description="Qabul jarayoni 4 ta sodda bosqichdan iborat."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {admissionSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1}>
                <Card className="relative h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-hover">
                  <span className="font-heading text-4xl font-extrabold text-primary-100">
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 font-heading text-lg font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Hujjatlar va muddatlar */}
      <section className="bg-slate-50/70 py-16 lg:py-20">
        <div className="container grid gap-8 lg:grid-cols-2">
          {/* Hujjatlar */}
          <Reveal>
            <Card className="h-full p-7">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-50 text-primary-600">
                  <FileText className="h-5 w-5" />
                </span>
                <h3 className="font-heading text-xl font-bold text-slate-900">
                  Kerakli hujjatlar
                </h3>
              </div>
              <ul className="mt-6 space-y-3">
                {admissionDocuments.map((doc, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <span className="text-sm text-slate-700">{doc}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>

          {/* Muddatlar */}
          <Reveal delay={0.1}>
            <Card className="h-full p-7">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-600/10 text-emerald-700">
                  <CalendarCheck className="h-5 w-5" />
                </span>
                <h3 className="font-heading text-xl font-bold text-slate-900">
                  Qabul muddatlari
                </h3>
              </div>
              <ul className="mt-6 space-y-3">
                {deadlines.map((deadline) => (
                  <li
                    key={deadline.label}
                    className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-4 py-3"
                  >
                    <span className="text-sm font-medium text-slate-600">
                      {deadline.label}
                    </span>
                    <span className="text-sm font-bold text-primary-700">
                      {deadline.value}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* Onlayn ariza */}
      <section className="py-16 lg:py-20">
        <div className="container max-w-3xl">
          <SectionHeading
            eyebrow="Onlayn ariza"
            title="Ariza topshirish"
            description="Quyidagi shaklni to'ldiring, ma'muriyatimiz tez orada siz bilan bog'lanadi."
          />
          <Reveal delay={0.1} className="mt-10">
            <Card className="p-7 sm:p-9">
              <AdmissionForm />
            </Card>
          </Reveal>
        </div>
      </section>
    </>
  );
}
