"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook } from "lucide-react";
import { navItems, contactInfo } from "@/lib/data";
import { useLanguage } from "@/lib/i18n/language-provider";
import { Logo } from "@/components/shared/logo";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-primary-900 text-slate-300">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Maktab haqida */}
          <div className="lg:col-span-1">
            <Logo variant="light" />
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {t.footer.about}
            </p>
            <div className="mt-5 flex gap-2.5">
              <a
                href={contactInfo.social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-white transition-colors hover:bg-emerald-600"
              >
                <Send className="h-4 w-4" />
              </a>
              <a
                href={contactInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-white transition-colors hover:bg-emerald-600"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={contactInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-white transition-colors hover:bg-emerald-600"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Tezkor havolalar */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              {t.common.quickLinks}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {t.nav[item.key as keyof typeof t.nav]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Aloqa */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              {t.footer.contactTitle}
            </h3>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span className="text-slate-400">{contactInfo.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <a
                  href={`tel:${contactInfo.phone.replace(/\s|\(|\)|-/g, "")}`}
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span className="text-slate-400">{contactInfo.workingHours}</span>
              </li>
            </ul>
          </div>

          {/* Rasmiy havolalar */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Rasmiy
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="https://edu.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  {t.footer.ministry}
                </a>
              </li>
              <li>
                <a
                  href="https://gov.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  O'zbekiston Respublikasi hukumat portali
                </a>
              </li>
              <li>
                <a
                  href="https://my.gov.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Yagona interaktiv davlat xizmatlari portali
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row">
          <p>
            © {year} {t.common.schoolName}. {t.footer.rights}
          </p>
          <p className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-3 rounded-sm bg-gradient-to-b from-[#0099b5] via-white to-[#1eb53a]" />
            raimqulovmaktabi.uz
          </p>
        </div>
      </div>
    </footer>
  );
}
