"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Globe, ChevronDown } from "lucide-react";
import { locales, localeNames, localeShort } from "@/lib/i18n/config";
import { useLanguage } from "@/lib/i18n/language-provider";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  variant?: "light" | "dark";
}

/**
 * Til almashtirgich (UZ / RU / EN). (Locale switcher dropdown.)
 */
export function LanguageSwitcher({ variant = "dark" }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isLight = variant === "light";

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Tilni o'zgartirish"
        aria-expanded={open}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
          isLight
            ? "text-white/90 hover:bg-white/10"
            : "text-slate-700 hover:bg-slate-100",
        )}
      >
        <Globe className="h-4 w-4" />
        <span>{localeShort[locale]}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-slate-100 bg-white p-1.5 shadow-hover">
          {locales.map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => {
                setLocale(loc);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                locale === loc
                  ? "bg-primary-50 text-primary-700"
                  : "text-slate-600 hover:bg-slate-50",
              )}
            >
              {localeNames[loc]}
              {locale === loc && <Check className="h-4 w-4 text-emerald-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
