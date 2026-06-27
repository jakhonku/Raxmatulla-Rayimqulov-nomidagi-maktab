import type { MetadataRoute } from "next";
import { news } from "@/lib/data";

const base = "https://raimqulovmaktabi.uz";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/maktab-haqida",
    "/oqituvchilar",
    "/yangiliklar",
    "/qabul",
    "/oquvchilar",
    "/galereya",
    "/aloqa",
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const newsRoutes = news.map((item) => ({
    url: `${base}/yangiliklar/${item.slug}`,
    lastModified: new Date(item.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...newsRoutes];
}
