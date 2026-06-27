import type { Metadata } from "next";
import { PageBanner } from "@/components/shared/page-banner";
import { GalleryGrid } from "@/components/gallery/gallery-grid";

export const metadata: Metadata = {
  title: "Galereya",
  description:
    "Maktab hayoti, tadbirlar va bitiruv marosimlaridan suratlar galereyasi.",
};

export default function GalleryPage() {
  return (
    <>
      <PageBanner
        title="Foto galereya"
        description="Maktabimiz hayotidagi eng yorqin lahzalar — tadbirlar, kundalik mashg'ulotlar va bitiruv marosimlari."
        breadcrumbs={[{ label: "Galereya" }]}
      />
      <section className="py-16 lg:py-20">
        <div className="container">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
