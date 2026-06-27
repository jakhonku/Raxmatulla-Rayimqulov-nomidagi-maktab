import type { Metadata } from "next";
import { PageBanner } from "@/components/shared/page-banner";
import { NewsList } from "@/components/news/news-list";
import { getAllNews } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Yangiliklar",
  description:
    "Maktab hayotidagi so'nggi yangiliklar, tadbirlar, yutuqlar va e'lonlar.",
};

export default async function NewsPage() {
  const news = await getAllNews();

  return (
    <>
      <PageBanner
        title="Yangiliklar va e'lonlar"
        description="Maktabimiz hayotidagi muhim voqealar, tadbirlar va yutuqlardan doimo xabardor bo'ling."
        breadcrumbs={[{ label: "Yangiliklar" }]}
      />
      <section className="py-16 lg:py-20">
        <div className="container">
          <NewsList items={news} />
        </div>
      </section>
    </>
  );
}
