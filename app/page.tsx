import { Hero } from "@/components/home/hero";
import { StatsSection } from "@/components/home/stats-section";
import { AboutPreview } from "@/components/home/about-preview";
import { QuickLinks } from "@/components/home/quick-links";
import { NewsPreview } from "@/components/home/news-preview";
import { DirectorMessage } from "@/components/home/director-message";
import { Partners } from "@/components/home/partners";
import { getAllNews } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const news = await getAllNews();

  return (
    <>
      <Hero />
      <StatsSection />
      <AboutPreview />
      <QuickLinks />
      <NewsPreview items={news} />
      <DirectorMessage />
      <Partners />
    </>
  );
}
