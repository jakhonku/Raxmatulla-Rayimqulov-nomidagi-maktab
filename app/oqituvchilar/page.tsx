import type { Metadata } from "next";
import { PageBanner } from "@/components/shared/page-banner";
import { TeachersGrid } from "@/components/teachers/teachers-grid";

export const metadata: Metadata = {
  title: "O'qituvchilar",
  description:
    "Rahmetolla Rayimqulov nomidagi maktabning malakali va tajribali o'qituvchilar jamoasi.",
};

export default function TeachersPage() {
  return (
    <>
      <PageBanner
        title="O'qituvchilar jamoasi"
        description="Maktabimizning malakali, tajribali va fidoyi pedagoglari bilan tanishing. Har bir o'qituvchi o'z fanining mohir ustasi."
        breadcrumbs={[{ label: "O'qituvchilar" }]}
      />
      <section className="py-16 lg:py-20">
        <div className="container">
          <TeachersGrid />
        </div>
      </section>
    </>
  );
}
