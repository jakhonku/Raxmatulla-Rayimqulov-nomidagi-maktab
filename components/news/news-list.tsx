"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { newsCategories, type NewsItem } from "@/lib/data";
import { NewsCard } from "@/components/shared/news-card";
import { cn } from "@/lib/utils";

const filters = [{ key: "all", label: "Barchasi" }, ...newsCategories];

export function NewsList({ items }: { items: NewsItem[] }) {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all" ? items : items.filter((item) => item.category === active);

  return (
    <div>
      <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 pb-2 sm:flex-wrap sm:justify-center">
        {filters.map((filter) => (
          <button
            key={filter.key}
            type="button"
            onClick={() => setActive(filter.key)}
            className={cn(
              "whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200",
              active === filter.key
                ? "bg-primary-600 text-white shadow-soft"
                : "border border-slate-200 bg-white text-slate-600 hover:border-primary-200 hover:text-primary-700",
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <motion.div
              key={item.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: (i % 3) * 0.06 }}
            >
              <NewsCard item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
