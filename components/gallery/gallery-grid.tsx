"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { galleryImages, galleryAlbums } from "@/lib/data";
import { cn } from "@/lib/utils";

export function GalleryGrid() {
  const [album, setAlbum] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered =
    album === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.album === album);

  const close = useCallback(() => setLightbox(null), []);
  const next = useCallback(
    () => setLightbox((i) => (i === null ? i : (i + 1) % filtered.length)),
    [filtered.length],
  );
  const prev = useCallback(
    () =>
      setLightbox((i) =>
        i === null ? i : (i - 1 + filtered.length) % filtered.length,
      ),
    [filtered.length],
  );

  // Klaviatura navigatsiyasi
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, next, prev]);

  return (
    <div>
      {/* Albom filtri */}
      <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 pb-2 sm:flex-wrap sm:justify-center">
        {galleryAlbums.map((alb) => (
          <button
            key={alb.key}
            type="button"
            onClick={() => setAlbum(alb.key)}
            className={cn(
              "whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200",
              album === alb.key
                ? "bg-primary-600 text-white shadow-soft"
                : "border border-slate-200 bg-white text-slate-600 hover:border-primary-200 hover:text-primary-700",
            )}
          >
            {alb.label}
          </button>
        ))}
      </div>

      {/* To'r */}
      <motion.div
        layout
        className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((img, i) => (
            <motion.button
              key={img.src}
              layout
              type="button"
              onClick={() => setLightbox(i)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: (i % 4) * 0.04 }}
              className={cn(
                "group relative overflow-hidden rounded-2xl shadow-card",
                i % 5 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square",
              )}
            >
              <Image
                src={img.src}
                alt={img.caption}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-primary-900/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex w-full items-center justify-between p-4 text-sm font-semibold text-white">
                  {img.caption}
                  <ZoomIn className="h-4 w-4" />
                </span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Yopish"
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Oldingi"
              className="absolute left-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-8"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative max-h-[80vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl">
                <Image
                  src={filtered[lightbox].src}
                  alt={filtered[lightbox].caption}
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-contain"
                />
              </div>
              <p className="mt-3 text-center text-sm font-medium text-white/80">
                {filtered[lightbox].caption} · {lightbox + 1} / {filtered.length}
              </p>
            </motion.div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Keyingi"
              className="absolute right-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-8"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
