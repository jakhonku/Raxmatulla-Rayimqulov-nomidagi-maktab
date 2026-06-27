"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { navItems, contactInfo } from "@/lib/data";
import { useLanguage } from "@/lib/i18n/language-provider";
import { Logo } from "@/components/shared/logo";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sahifa o'zgarganda mobil menyuni yopish
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Mobil menyu ochiq bo'lsa, scrollni bloklash
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Yuqori ma'lumot paneli */}
      <div className="hidden bg-primary-800 text-white/90 lg:block">
        <div className="container flex h-9 items-center justify-between text-xs">
          <span>{t.common.schoolType} • raimqulovmaktabi.uz</span>
          <a
            href={`tel:${contactInfo.phone.replace(/\s|\(|\)|-/g, "")}`}
            className="flex items-center gap-1.5 font-medium transition-colors hover:text-white"
          >
            <Phone className="h-3.5 w-3.5" />
            {contactInfo.phone}
          </a>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          scrolled
            ? "border-b border-slate-100 bg-white/90 shadow-soft backdrop-blur-md"
            : "bg-white",
        )}
      >
        <div className="container flex h-16 items-center justify-between gap-4 lg:h-18">
          <Logo />

          {/* Desktop navigatsiya */}
          <nav className="hidden items-center gap-1 xl:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-semibold transition-colors",
                  isActive(item.href)
                    ? "text-primary-700"
                    : "text-slate-600 hover:text-primary-700",
                )}
              >
                {t.nav[item.key as keyof typeof t.nav]}
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-emerald-600"
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Link href="/qabul" className="hidden sm:block">
              <Button size="sm">{t.common.apply}</Button>
            </Link>

            {/* Mobil menyu tugmasi */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label={t.common.menu}
              className="grid h-10 w-10 place-items-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100 xl:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobil menyu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm xl:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 flex w-[85%] max-w-sm flex-col bg-white shadow-2xl xl:hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-100 p-5">
                <Logo />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Yopish"
                  className="grid h-10 w-10 place-items-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-xl px-4 py-3 text-base font-semibold transition-colors",
                        isActive(item.href)
                          ? "bg-primary-50 text-primary-700"
                          : "text-slate-700 hover:bg-slate-50",
                      )}
                    >
                      {t.nav[item.key as keyof typeof t.nav]}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="border-t border-slate-100 p-4">
                <Link href="/qabul">
                  <Button className="w-full" size="lg">
                    {t.common.apply}
                  </Button>
                </Link>
                <a
                  href={`tel:${contactInfo.phone.replace(/\s|\(|\)|-/g, "")}`}
                  className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-slate-600"
                >
                  <Phone className="h-4 w-4" />
                  {contactInfo.phone}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
