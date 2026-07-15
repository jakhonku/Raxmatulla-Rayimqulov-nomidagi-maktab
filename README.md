# Rahmetolla Rayimqulov nomidagi umumiy o'rta ta'lim maktabi

`raimqulovmaktabi.uz` — Rahmetolla Rayimqulov nomidagi umumiy o'rta ta'lim
maktabining rasmiy veb-sayti. Zamonaviy, rasmiy va to'liq moslashuvchan (responsive)
dizayndagi sayt.

![Next.js](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8)

---

## ✨ Imkoniyatlar

- **8 ta to'liq sahifa**: Bosh sahifa, Maktab haqida, O'qituvchilar, Yangiliklar
  (+ alohida yangilik sahifalari), Qabul, O'quvchilarga, Galereya, Aloqa
- **Ko'p tillilik (i18n)**: O'zbek / Русский / English (til almashtirgich tayyor,
  kontent o'zbek tilida)
- **Mobile-first responsive** dizayn — telefon, planshet va kompyuterda mukammal
- **Nozik animatsiyalar** (Framer Motion) — fade-in, scroll-reveal, hover effektlar
- **SEO** — meta teglar, Open Graph, `sitemap.xml`, `robots.txt`, semantik HTML
- **Interaktiv elementlar** — galereya lightbox, dars jadvali, filtrlar, onlayn arizalar
- **Tezkor** — Next.js Image optimizatsiyasi va statik generatsiya (SSG)

---

## 🛠 Texnologiyalar

| Sohasi      | Texnologiya                          |
| ----------- | ------------------------------------ |
| Framework   | Next.js 15 (App Router)              |
| Til         | TypeScript                           |
| Styling     | Tailwind CSS                         |
| UI          | shadcn/ui uslubidagi komponentlar    |
| Ikonlar     | lucide-react                         |
| Animatsiya  | Framer Motion                        |
| Shriftlar   | Inter / Manrope (Google Fonts)       |
| Deploy      | Vercel                               |

---

## 🚀 O'rnatish va ishga tushirish

Talab: **Node.js 18.18+** (tavsiya: Node.js 20+).

```bash
# 1. Bog'liqliklarni o'rnatish
npm install

# 2. Ishlab chiqish serverini ishga tushirish
npm run dev
```

Brauzerda oching: [http://localhost:3000](http://localhost:3000)

### Boshqa buyruqlar

```bash
npm run build   # Production uchun build
npm run start   # Production serverni ishga tushirish (build'dan keyin)
npm run lint    # Kodni tekshirish (ESLint)
```

---

## 📁 Loyiha tuzilishi

```
.
├── app/                      # Next.js App Router sahifalari
│   ├── layout.tsx            # Asosiy layout (Header + Footer + i18n)
│   ├── page.tsx              # Bosh sahifa
│   ├── maktab-haqida/        # Maktab haqida
│   ├── oqituvchilar/         # O'qituvchilar
│   ├── yangiliklar/          # Yangiliklar + [slug] dinamik sahifalar
│   ├── qabul/                # Qabul + onlayn ariza
│   ├── oquvchilar/           # Dars jadvali, e-resurslar
│   ├── galereya/             # Foto galereya (lightbox)
│   ├── aloqa/                # Aloqa + forma + xarita
│   ├── sitemap.ts            # SEO sitemap
│   └── robots.ts             # SEO robots
├── components/
│   ├── layout/               # Header, Footer
│   ├── home/                 # Bosh sahifa bo'limlari
│   ├── shared/               # Qayta ishlatiladigan (Logo, Reveal, Counter, ...)
│   ├── ui/                   # shadcn uslubidagi UI primitivlari
│   ├── forms/                # Qabul va aloqa formalari
│   ├── teachers/ news/ ...   # Sahifaga oid komponentlar
├── lib/
│   ├── data.ts               # ⭐ Barcha kontent (matn, ro'yxatlar)
│   ├── utils.ts              # Yordamchi funksiyalar
│   └── i18n/                 # Til konfiguratsiyasi va lug'atlar
└── public/                   # Statik fayllar (rasmlar uchun)
```

---

## ✏️ Kontentni tahrirlash

Saytdagi deyarli barcha matn va ma'lumotlar bitta joyda — **`lib/data.ts`** faylida
saqlanadi. Yangilik qo'shish, o'qituvchini tahrirlash, aloqa ma'lumotlarini o'zgartirish
uchun shu faylni tahrirlash kifoya.

### Rasmlarni almashtirish

Hozircha namuna (placeholder) rasmlar tashqi manbadan (Unsplash) yuklanadi.
Haqiqiy rasmlarni qo'yish uchun:

1. Rasmlarni `public/images/` papkasiga joylang
2. `lib/data.ts` dagi `image` qiymatlarini `/images/fayl-nomi.jpg` ko'rinishida almashtiring
3. Kodda `RASM JOYI` izohi bilan belgilangan joylar (Hero, Direktor, R. Rayimqulov surati)
   alohida e'tibor talab qiladi

> Eslatma: tashqi rasm domenlari `next.config.mjs` faylida sozlangan. Mahalliy
> rasmlardan foydalansangiz, qo'shimcha sozlash shart emas.

### Til tarjimalari

UI tarjimalari `lib/i18n/dictionaries.ts` faylida (uz/ru/en). Yangi matn qo'shganda
shu yerga tarjimasini ham qo'shing.

---

## 🔐 Admin panel

Sayt `/admin` manzilida boshqaruv paneliga ega. U orqali:

- **Yangiliklar** — qo'shish, tahrirlash, o'chirish (rasm yuklash yoki URL bilan)
- **Dars jadvali** — Excel (.xlsx), PDF yoki rasm yuklash. Excel avtomatik jadvalga
  aylantiriladi va «O'quvchilarga» sahifasida chiroyli ko'rinishda chiqadi
- **Murojaatlar** — Aloqa formasi orqali kelgan xabarlarni ko'rish, o'qilgan deb
  belgilash va o'chirish

### Kirish

1. `/admin` manziliga o'ting
2. **Login** va **parol** ni kiriting

Login va parol faqat `.env.local` (yoki Vercel env) da saqlanadi — kod ichida
hech qanday parol yoki standart qiymat yo'q.

### Login/parolni sozlash

Loyiha ildizida `.env.local` fayl yarating (`.env.example` dan nusxalang) va
qiymatlarni to'ldiring:

```bash
ADMIN_USERNAME=siz-tanlagan-login
ADMIN_PASSWORD=siz-tanlagan-kuchli-parol
ADMIN_SESSION_SECRET=uzun-tasodifiy-maxfiy-satr
```

> ⚠️ **Muhim:** Bu uch qiymat o'rnatilmasa, admin panelga kirib bo'lmaydi
> (kodda standart parol yo'q). Production'da (Vercel) ularni ham albatta
> Environment Variables sifatida qo'shing.

### Ma'lumotlar qayerda saqlanadi?

Barcha admin ma'lumotlari (yangiliklar, murojaatlar, dars jadvallari) **Supabase
(Postgres)** bazasida, yuklangan rasm/fayllar esa **Supabase Storage** (`uploads`
bucket) da saqlanadi. Shu sababli sayt Vercel serverless muhitida ham to'liq ishlaydi.

#### Supabase sozlash (bir marta)

1. [supabase.com](https://supabase.com) da loyiha oching.
2. **SQL Editor** ga o'ting va `supabase/schema.sql` faylini to'liq nusxalab
   joylashtiring, so'ng **Run** bosing (jadvallar + `uploads` bucket yaratiladi).
3. **Project Settings → API** dan `Project URL` va `service_role` kalitini oling.
4. `.env.local` ga yozing (`.env.example` dan nusxalang):

   ```bash
   SUPABASE_URL=https://xxxxxxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJ...   # service_role (MAXFIY!)
   ```

5. Namuna yangiliklarni bazaga yuklash (ixtiyoriy):

   ```bash
   node scripts/seed.mjs
   ```

> ⚠️ `service_role` kaliti to'liq huquqli va maxfiy — faqat serverda ishlatiladi,
> hech qachon frontendga chiqmaydi va `.env.local` git'ga yuklanmaydi.

---

## 📝 Formalar (Aloqa / Qabul)

- **Aloqa formasi** to'liq ishlaydi — yuborilgan murojaatlar saqlanadi va admin
  panelning «Murojaatlar» bo'limida ko'rinadi.
- **Qabul arizasi** hozircha demo rejimida (yuborilganda muvaffaqiyat xabari
  ko'rsatiladi). Uni ham «Murojaatlar» ga ulash oson — `components/forms/`
  ichidagi shaklni Aloqa formasi kabi server action'ga bog'lash kifoya.

Murojaatni email yoki Telegram botga ham yuborish kerak bo'lsa,
`app/aloqa/actions.ts` faylidagi `submitContactMessage` ichiga qo'shing.

---

## ☁️ Vercel-ga deploy qilish

1. Loyihani GitHub repozitoriyasiga yuklang
2. [vercel.com](https://vercel.com) da yangi loyiha yarating va repozitoriyani ulang
3. **Settings → Environment Variables** ga quyidagilarni qo'shing (barcha muhitlar uchun):
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `ADMIN_SESSION_SECRET`
4. Vercel Next.js'ni avtomatik aniqlaydi — **Deploy** tugmasini bosing

> ⚠️ Env o'zgaruvchilarni qo'shmasangiz, sayt Supabase'ga ulanolmay xatolik
> beradi. `SUPABASE_SERVICE_ROLE_KEY` ni `NEXT_PUBLIC_` prefiksisiz qo'shing.

Yoki Vercel CLI orqali:

```bash
npm i -g vercel
vercel
```

### Domen ulash

Vercel loyiha sozlamalaridan **Domains** bo'limiga `raimqulovmaktabi.uz` domenini
qo'shing va DNS yozuvlarini ko'rsatilgan tarzda sozlang.

---

## 📄 Litsenziya

© 2026 Rahmetolla Rayimqulov nomidagi maktab. Barcha huquqlar himoyalangan.
