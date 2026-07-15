import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook } from "lucide-react";
import { contactInfo } from "@/lib/data";
import { PageBanner } from "@/components/shared/page-banner";
import { Reveal } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Aloqa",
  description:
    "Rahmetolla Rayimqulov nomidagi maktab bilan bog'laning. Manzil, telefon, email va murojaat shakli.",
};

const contactCards = [
  {
    icon: MapPin,
    title: "Manzil",
    lines: [contactInfo.address],
  },
  {
    icon: Phone,
    title: "Telefon",
    lines: [contactInfo.phone, contactInfo.phoneSecondary],
  },
  {
    icon: Mail,
    title: "Email",
    lines: [contactInfo.email],
  },
  {
    icon: Clock,
    title: "Ish vaqti",
    lines: [contactInfo.workingHours],
  },
];

const socials = [
  { icon: Send, label: "Telegram", href: contactInfo.social.telegram },
  { icon: Instagram, label: "Instagram", href: contactInfo.social.instagram },
  { icon: Facebook, label: "Facebook", href: contactInfo.social.facebook },
];

export default function ContactPage() {
  return (
    <>
      <PageBanner
        title="Biz bilan bog'laning"
        description="Savollaringiz bormi? Biz bilan bog'laning yoki tashrif buyuring. Sizga yordam berishdan mamnunmiz."
        breadcrumbs={[{ label: "Aloqa" }]}
      />

      {/* Aloqa kartochkalari */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {contactCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.title} delay={i * 0.08}>
                  <Card className="h-full p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-hover">
                    <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary-50 to-emerald-50 text-primary-600">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 font-heading text-base font-bold text-slate-900">
                      {card.title}
                    </h3>
                    {card.lines.map((line) => (
                      <p key={line} className="mt-1 text-sm text-slate-600">
                        {line}
                      </p>
                    ))}
                  </Card>
                </Reveal>
              );
            })}
          </div>

          {/* Forma + xarita */}
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <Reveal>
              <Card className="h-full p-7 sm:p-9">
                <h2 className="font-heading text-2xl font-bold text-slate-900">
                  Murojaat yuborish
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Quyidagi shaklni to'ldiring, tez orada javob beramiz.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>

                {/* Ijtimoiy tarmoqlar */}
                <div className="mt-8 border-t border-slate-100 pt-6">
                  <p className="text-sm font-semibold text-slate-700">
                    Ijtimoiy tarmoqlarda biz bilan
                  </p>
                  <div className="mt-3 flex gap-2.5">
                    {socials.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          className="grid h-10 w-10 place-items-center rounded-lg bg-primary-50 text-primary-600 transition-colors hover:bg-primary-600 hover:text-white"
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </Reveal>

            <Reveal delay={0.1}>
              <Card className="h-full overflow-hidden p-0">
                <div className="flex items-center gap-2 border-b border-slate-100 p-5">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                  <h2 className="font-heading text-lg font-bold text-slate-900">
                    Bizni xaritada toping
                  </h2>
                </div>
                {/* XARITA: haqiqiy joylashuv koordinatalari bilan almashtiriladi */}
                <div className="relative h-[420px] w-full bg-slate-100">
                  <iframe
                    src={contactInfo.mapEmbed}
                    title="Maktab joylashuvi"
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
