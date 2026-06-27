# Raxmatulla Rayimqulov nomidagi umumiy o'rta ta'lim maktabi

`raimqulovmaktabi.uz` — Raxmatulla Rayimqulov nomidagi umumiy o'rta ta'lim
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
2. Parolni kiriting (standart: `admin123`)

### Parolni sozlash

Loyiha ildizida `.env.local` fayl yarating (`.env.example` dan nusxalang):

```bash
ADMIN_PASSWORD=siz-tanlagan-kuchli-parol
ADMIN_SESSION_SECRET=uzun-tasodifiy-maxfiy-satr
```

> ⚠️ **Muhim:** Ishlab chiqarishga (production) chiqarishdan oldin albatta
> `ADMIN_PASSWORD` va `ADMIN_SESSION_SECRET` ni o'zgartiring.

### Ma'lumotlar qayerda saqlanadi?

Admin kiritgan ma'lumotlar `data/` papkasidagi JSON fayllarda, yuklangan fayllar
`public/uploads/` da saqlanadi. Bu yondashuv **lokal kompyuterda va oddiy Node/VPS
serverda** mukammal ishlaydi.

> ⚠️ **Vercel haqida eslatma:** Vercel serverless muhitida fayl tizimi faqat
> o'qish uchun mo'ljallangan, shu sababli u yerda admin yozuvlari saqlanmaydi.
> Agar Vercel'ga joylashtirmoqchi bo'lsangiz, ma'lumotlar bazasiga (masalan,
> Postgres) va fayl ombori (Vercel Blob) ga o'tkazish kerak. Bu ishni keyinroq
> qo'shish mumkin — joriy struktura buni osonlashtiradi.

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
3. Vercel Next.js'ni avtomatik aniqlaydi — qo'shimcha sozlash shart emas
4. **Deploy** tugmasini bosing

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

© 2026 Raxmatulla Rayimqulov nomidagi maktab. Barcha huquqlar himoyalangan.
