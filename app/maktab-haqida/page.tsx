import type { Metadata } from "next";
import Image from "next/image";
import {
  Target,
  Eye,
  Heart,
  BookOpen,
  Building2,
  Microscope,
  Dumbbell,
  Cpu,
  Trophy,
} from "lucide-react";
import { leadership } from "@/lib/data";
import { PageBanner } from "@/components/shared/page-banner";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Maktab haqida",
  description:
    "Raxmatulla Rayimqulov nomidagi maktab tarixi, missiyasi, infratuzilmasi va rahbariyati haqida ma'lumot.",
};

const missionCards = [
  {
    icon: Target,
    title: "Maqsad",
    text: "Har bir o'quvchini zamonaviy bilim va yuksak ma'naviyat egasi qilib voyaga yetkazish.",
  },
  {
    icon: Eye,
    title: "Vizyon",
    text: "Mintaqada yetakchi, innovatsion ta'lim muassasasi sifatida tan olinish.",
  },
  {
    icon: Heart,
    title: "Qadriyatlar",
    text: "Halollik, mas'uliyat, o'zaro hurmat va uzluksiz rivojlanishga intilish.",
  },
];

const infrastructure = [
  { icon: Building2, label: "32 ta zamonaviy o'quv xonasi" },
  { icon: Microscope, label: "Fizika, kimyo va biologiya laboratoriyalari" },
  { icon: Cpu, label: "2 ta kompyuter va IT sinfi" },
  { icon: BookOpen, label: "Boy fondga ega kutubxona" },
  { icon: Dumbbell, label: "Sport zali va ochiq maydonchalar" },
  { icon: Trophy, label: "Aktovaya zal va to'garaklar markazi" },
];

export default function AboutPage() {
  return (
    <>
      <PageBanner
        title="Maktab haqida"
        description="Bilim maskanimizning tarixi, qadriyatlari va kelajakka qaratilgan maqsadlari bilan tanishing."
        breadcrumbs={[{ label: "Maktab haqida" }]}
      />

      {/* Tarix */}
      <section className="py-16 lg:py-20">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-hover">
              <Image
                src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80"
                alt="Maktab binosi"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="order-1 flex flex-col gap-5 lg:order-2">
            <SectionHeading
              align="left"
              eyebrow="Bizning tariximiz"
              title="1936-yildan buyon bilim ulashib kelmoqdamiz"
            />
            <Reveal delay={0.1}>
              <div className="space-y-4 text-base leading-relaxed text-slate-600">
                <p>
                  Maktabimiz 1936-yilda tashkil etilgan bo'lib, deyarli bir asrlik boy
                  tarixga ega. Shu kungacha o'n minglab bitiruvchilarni hayot yo'liga
                  uzatgan. Avlodlar almashsa-da, bilim va tarbiya an'analari davom etib
                  kelmoqda.
                </p>
                <p>
                  Bugungi kunda maktabimiz zamonaviy o'quv xonalari, laboratoriyalar va
                  malakali pedagoglar jamoasi bilan mintaqaning nufuzli ta'lim
                  muassasalaridan biriga aylangan. Bitiruvchilarimiz mamlakatimizning
                  yetakchi oliy o'quv yurtlarida tahsil olishmoqda.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Raxmatulla Rayimqulov haqida */}
      <section className="bg-primary-900 py-16 text-white lg:py-20">
        <div className="container">
          <div className="grid items-center gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
            <Reveal className="mx-auto w-full max-w-[300px]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl ring-4 ring-white/10">
                {/* Raxmatulla Rayimqulov surati */}
                <Image
                  src="/images/raimqulov.png"
                  alt="Raxmatulla Rayimqulov"
                  fill
                  sizes="300px"
                  className="object-cover object-top"
                />
              </div>
            </Reveal>

            <div className="flex flex-col gap-5">
              <Reveal>
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  Maktabimiz nomi
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                  Raxmatulla Rayimqulov
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="space-y-4 text-base leading-relaxed text-slate-200">
                  <p>
                    Maktabimiz xalqimizning munosib farzandi, ta'lim va ma'rifat
                    fidoyisi Raxmatulla Rayimqulov nomi bilan faxrlanadi. U butun umrini
                    yosh avlod ta'lim-tarbiyasiga bag'ishlagan ulug' inson edi.
                  </p>
                  <p>
                    Uning bilimga, halollikka va vatanga sadoqat tamoyillari bugungi
                    kunda ham maktabimiz faoliyatining asosini tashkil etadi. Biz uning
                    ezgu merosini avlodlarga yetkazishni o'zimizning sharafli burchimiz
                    deb bilamiz.
                  </p>
                  <p className="border-l-2 border-gold pl-4 italic text-emerald-100">
                    «Bilim — bu kelajak kaliti, uni avlodlarga ulashish esa eng oliy
                    ezgulikdir.»
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Missiya va qadriyatlar */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Missiya"
            title="Biz nimaga intilamiz"
            description="Faoliyatimizning asosini tashkil etuvchi maqsad, vizyon va qadriyatlar."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {missionCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.title} delay={i * 0.1}>
                  <Card className="h-full p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-hover">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary-50 to-emerald-50 text-primary-600">
                      <Icon className="h-7 w-7" />
                    </span>
                    <h3 className="mt-5 font-heading text-xl font-bold text-slate-900">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {card.text}
                    </p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Infratuzilma */}
      <section className="bg-slate-50/70 py-16 lg:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Infratuzilma"
            title="Zamonaviy o'quv muhiti"
            description="O'quvchilarimiz uchun barcha shart-sharoitlar yaratilgan."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {infrastructure.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.label} delay={i * 0.07}>
                  <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-card">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-600">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="text-sm font-semibold text-slate-700">
                      {item.label}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Rahbariyat */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Rahbariyat"
            title="Maktab rahbariyati"
            description="Tajribali va fidoyi rahbarlar jamoasi maktabimiz rivojiga mas'ul."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((leader, i) => (
              <Reveal key={leader.name} delay={i * 0.08}>
                <Card className="group h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-hover">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="font-heading text-base font-bold text-slate-900">
                      {leader.name}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-emerald-700">
                      {leader.position}
                    </p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
