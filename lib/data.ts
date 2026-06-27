/**
 * Sayt kontenti uchun markaziy ma'lumotlar fayli.
 * (Central data file — placeholder content, easy to replace later.)
 *
 * Eslatma: rasmlar uchun /public/images papkasidagi joylar belgilangan.
 * Hozircha tashqi placeholder rasmlardan foydalaniladi.
 */

export interface NavItem {
  key: string;
  href: string;
}

export const navItems: NavItem[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/maktab-haqida" },
  { key: "teachers", href: "/oqituvchilar" },
  { key: "news", href: "/yangiliklar" },
  { key: "admission", href: "/qabul" },
  { key: "students", href: "/oquvchilar" },
  { key: "gallery", href: "/galereya" },
  { key: "contact", href: "/aloqa" },
];

/* ----------------------------- Aloqa ma'lumotlari ----------------------------- */
export const contactInfo = {
  address: "Toshkent viloyati, Bo'stonliq tumani, Maktab ko'chasi, 1-uy",
  phone: "+998 (71) 200-00-00",
  phoneSecondary: "+998 (90) 123-45-67",
  email: "info@raimqulovmaktabi.uz",
  workingHours: "Dushanba – Shanba, 08:00 – 18:00",
  mapEmbed:
    "https://www.google.com/maps?q=Tashkent&output=embed",
  social: {
    telegram: "https://t.me/raimqulovmaktabi",
    instagram: "https://instagram.com/raimqulovmaktabi",
    facebook: "https://facebook.com/raimqulovmaktabi",
  },
};

/* ----------------------------- Statistika ----------------------------- */
export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 1240, label: "O'quvchilar" },
  { value: 86, label: "O'qituvchilar" },
  { value: 4200, suffix: "+", label: "Bitiruvchilar" },
  { value: 150, suffix: "+", label: "Yutuq va mukofotlar" },
];

/* ----------------------------- Yangiliklar ----------------------------- */
export type NewsCategory = "tadbirlar" | "yutuqlar" | "elonlar";

export const newsCategories: { key: NewsCategory; label: string }[] = [
  { key: "tadbirlar", label: "Tadbirlar" },
  { key: "yutuqlar", label: "Yutuqlar" },
  { key: "elonlar", label: "E'lonlar" },
];

export interface NewsItem {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  category: NewsCategory;
  image: string;
  author?: string;
}

export const news: NewsItem[] = [
  {
    slug: "bilimlar-kuni-2025",
    title: "Bilimlar kuni — yangi o'quv yili tantanali ochildi",
    excerpt:
      "1-sentabr Bilimlar kuni munosabati bilan maktabimizda tantanali tadbir bo'lib o'tdi. Birinchi sinf o'quvchilari ilk bor maktab ostonasidan qadam qo'ydi.",
    content: [
      "1-sentabr — Bilimlar kuni munosabati bilan maktabimizda an'anaviy tantanali marosim bo'lib o'tdi. Tadbirda o'quvchilar, ota-onalar, o'qituvchilar va faxriy mehmonlar ishtirok etdi.",
      "Marosimda maktab direktori barchani yangi o'quv yili bilan tabrikladi va o'quvchilarga bilim olishda omad tiladi. Birinchi sinf o'quvchilari uchun maxsus dastur tayyorlandi.",
      "An'anaviy ilk qo'ng'iroq yangragach, o'quvchilar o'z sinflariga tarqaldilar. Yangi o'quv yili barchaga barakali va sermahsul bo'lsin!",
    ],
    date: "2025-09-01",
    category: "tadbirlar",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    author: "Matbuot xizmati",
  },
  {
    slug: "matematika-olimpiadasi-galaba",
    title: "O'quvchimiz respublika matematika olimpiadasida g'olib bo'ldi",
    excerpt:
      "11-sinf o'quvchisi respublika fan olimpiadasining matematika yo'nalishida birinchi o'rinni egalladi. Bu — maktabimiz uchun katta yutuq.",
    content: [
      "Respublika fan olimpiadasining yakuniy bosqichida maktabimiz 11-sinf o'quvchisi matematika yo'nalishi bo'yicha birinchi o'rinni qo'lga kiritdi.",
      "Bu g'alaba o'quvchining tinimsiz mehnati va o'qituvchilarning fidoyiligi natijasidir. Maktab jamoasi g'olibni samimiy tabriklaydi.",
      "Kelgusida ham bunday yutuqlar ko'paib boraverishiga ishonamiz. Iqtidorli o'quvchilarni qo'llab-quvvatlash maktabimizning ustuvor vazifasidir.",
    ],
    date: "2025-04-18",
    category: "yutuqlar",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    author: "O'quv bo'limi",
  },
  {
    slug: "ota-onalar-yigilishi-elon",
    title: "Umummaktab ota-onalar yig'ilishi o'tkaziladi",
    excerpt:
      "Hurmatli ota-onalar! Navbatdagi umummaktab yig'ilishi shu oyning oxirgi shanbasida bo'lib o'tadi. Ishtirokingiz muhim.",
    content: [
      "Hurmatli ota-onalar! Navbatdagi umummaktab ota-onalar yig'ilishi shu oyning oxirgi shanba kuni soat 10:00 da maktab yig'ilishlar zalida o'tkaziladi.",
      "Kun tartibida o'quv jarayoni natijalari, xavfsizlik masalalari va kelgusi rejalar muhokama qilinadi.",
      "Farzandingiz ta'limi bilan bog'liq muhim masalalar ko'rib chiqilishi sababli, ishtirokingizni so'raymiz.",
    ],
    date: "2025-05-12",
    category: "elonlar",
    image:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
    author: "Ma'muriyat",
  },
  {
    slug: "navruz-bayrami-tadbiri",
    title: "Navro'z bayrami keng nishonlandi",
    excerpt:
      "Maktabimizda Navro'z umumxalq bayrami munosabati bilan rang-barang konsert dasturi va milliy taomlar ko'rgazmasi tashkil etildi.",
    content: [
      "Bahor va yangilanish bayrami — Navro'z maktabimizda katta ko'tarinki ruhda nishonlandi. O'quvchilar milliy liboslarda chiqishlar tayyorladi.",
      "Tadbir davomida milliy o'yinlar, sumalak marosimi va folklor guruhlari chiqishlari bo'lib o'tdi.",
      "Navro'z — birdamlik, ezgulik va yangilanish ramzi. Bayram barchaga xush kayfiyat ulashdi.",
    ],
    date: "2025-03-21",
    category: "tadbirlar",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    author: "Ma'naviyat bo'limi",
  },
  {
    slug: "yangi-laboratoriya-ochildi",
    title: "Zamonaviy kimyo-fizika laboratoriyasi ishga tushirildi",
    excerpt:
      "Maktabimizda zamonaviy jihozlar bilan ta'minlangan yangi laboratoriya o'quvchilar xizmatiga topshirildi.",
    content: [
      "Maktabimizda o'quvchilarning amaliy ko'nikmalarini oshirish maqsadida zamonaviy kimyo-fizika laboratoriyasi tashkil etildi.",
      "Laboratoriya raqamli o'lchov asboblari, xavfsizlik vositalari va interaktiv jihozlar bilan ta'minlangan.",
      "Endi o'quvchilar nazariy bilimlarni amaliyotda mustahkamlash imkoniyatiga ega bo'ladilar.",
    ],
    date: "2025-02-05",
    category: "yutuqlar",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80",
    author: "Texnik bo'lim",
  },
  {
    slug: "qishki-tatil-elon",
    title: "Qishki ta'til muddatlari e'lon qilindi",
    excerpt:
      "Hurmatli o'quvchilar va ota-onalar! Qishki ta'til sanalari bilan tanishing va ta'til kunlarini rejalashtiring.",
    content: [
      "O'quv yili jadvaliga muvofiq qishki ta'til belgilangan muddatda boshlanadi va yakunlanadi.",
      "Ta'til davrida o'quvchilarga mustaqil o'qish uchun tavsiyalar va loyiha topshiriqlari beriladi.",
      "Barcha o'quvchilarga mazmunli va sog'lom dam olishni tilaymiz!",
    ],
    date: "2024-12-20",
    category: "elonlar",
    image:
      "https://images.unsplash.com/photo-1418985991508-e47386d96a71?auto=format&fit=crop&w=1200&q=80",
    author: "O'quv bo'limi",
  },
];

/* ----------------------------- Rahbariyat ----------------------------- */
export interface Leader {
  name: string;
  position: string;
  image: string;
}

export const leadership: Leader[] = [
  {
    name: "Akmal Karimov",
    position: "Maktab direktori",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Nodira Yusupova",
    position: "O'quv ishlari bo'yicha direktor o'rinbosari",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Bobur To'xtayev",
    position: "Ma'naviyat ishlari bo'yicha direktor o'rinbosari",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Gulnoza Rahimova",
    position: "Axborot texnologiyalari bo'yicha direktor o'rinbosari",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
  },
];

/* ----------------------------- O'qituvchilar ----------------------------- */
export interface Teacher {
  name: string;
  subject: string;
  subjectKey: string;
  degree: string;
  experience: string;
  image: string;
}

export const subjects = [
  { key: "all", label: "Barchasi" },
  { key: "matematika", label: "Matematika" },
  { key: "ona-tili", label: "Ona tili va adabiyot" },
  { key: "ingliz-tili", label: "Ingliz tili" },
  { key: "fizika", label: "Fizika" },
  { key: "kimyo", label: "Kimyo" },
  { key: "biologiya", label: "Biologiya" },
  { key: "tarix", label: "Tarix" },
  { key: "informatika", label: "Informatika" },
];

export const teachers: Teacher[] = [
  {
    name: "Nodira Yusupova",
    subject: "Matematika",
    subjectKey: "matematika",
    degree: "Oliy toifa",
    experience: "22 yil tajriba",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Dilshod Ergashev",
    subject: "Fizika",
    subjectKey: "fizika",
    degree: "Oliy toifa",
    experience: "18 yil tajriba",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Sevara Tosheva",
    subject: "Ona tili va adabiyot",
    subjectKey: "ona-tili",
    degree: "Birinchi toifa",
    experience: "15 yil tajriba",
    image:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Jamshid Aliyev",
    subject: "Ingliz tili",
    subjectKey: "ingliz-tili",
    degree: "Oliy toifa",
    experience: "12 yil tajriba",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Malika Saidova",
    subject: "Kimyo",
    subjectKey: "kimyo",
    degree: "Birinchi toifa",
    experience: "16 yil tajriba",
    image:
      "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Sardor Qodirov",
    subject: "Biologiya",
    subjectKey: "biologiya",
    degree: "Oliy toifa",
    experience: "20 yil tajriba",
    image:
      "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Zilola Mirzayeva",
    subject: "Tarix",
    subjectKey: "tarix",
    degree: "Birinchi toifa",
    experience: "14 yil tajriba",
    image:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Aziz Rashidov",
    subject: "Informatika",
    subjectKey: "informatika",
    degree: "Oliy toifa",
    experience: "10 yil tajriba",
    image:
      "https://images.unsplash.com/photo-1566753323558-f4e0952af115?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Kamola Ibrohimova",
    subject: "Matematika",
    subjectKey: "matematika",
    degree: "Birinchi toifa",
    experience: "11 yil tajriba",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Rustam Niyozov",
    subject: "Ingliz tili",
    subjectKey: "ingliz-tili",
    degree: "Birinchi toifa",
    experience: "9 yil tajriba",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Feruza Xolmatova",
    subject: "Fizika",
    subjectKey: "fizika",
    degree: "Birinchi toifa",
    experience: "13 yil tajriba",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Otabek Yo'ldoshev",
    subject: "Tarix",
    subjectKey: "tarix",
    degree: "Oliy toifa",
    experience: "17 yil tajriba",
    image:
      "https://images.unsplash.com/photo-1542190891-2093d38760f2?auto=format&fit=crop&w=600&q=80",
  },
];

/* ----------------------------- Galereya ----------------------------- */
export interface GalleryAlbum {
  key: string;
  label: string;
}

export const galleryAlbums: GalleryAlbum[] = [
  { key: "all", label: "Barchasi" },
  { key: "tadbirlar", label: "Tadbirlar" },
  { key: "maktab-hayoti", label: "Maktab hayoti" },
  { key: "bitiruv", label: "Bitiruv" },
];

export interface GalleryImage {
  src: string;
  album: string;
  caption: string;
}

export const galleryImages: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1000&q=80",
    album: "maktab-hayoti",
    caption: "Dars jarayoni",
  },
  {
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=80",
    album: "tadbirlar",
    caption: "Bilimlar kuni",
  },
  {
    src: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1000&q=80",
    album: "bitiruv",
    caption: "Bitiruvchilar kechasi",
  },
  {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80",
    album: "maktab-hayoti",
    caption: "Kutubxonada",
  },
  {
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80",
    album: "tadbirlar",
    caption: "Navro'z bayrami",
  },
  {
    src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80",
    album: "maktab-hayoti",
    caption: "Sinf mashg'uloti",
  },
  {
    src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1000&q=80",
    album: "bitiruv",
    caption: "Tantanali marosim",
  },
  {
    src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1000&q=80",
    album: "maktab-hayoti",
    caption: "Sport mashg'uloti",
  },
  {
    src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80",
    album: "maktab-hayoti",
    caption: "Laboratoriyada",
  },
  {
    src: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1000&q=80",
    album: "tadbirlar",
    caption: "Konsert dasturi",
  },
  {
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80",
    album: "bitiruv",
    caption: "Bitiruvchilar 2025",
  },
  {
    src: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1000&q=80",
    album: "tadbirlar",
    caption: "Sport musobaqasi",
  },
];

/* ----------------------------- Dars jadvali ----------------------------- */
export const lessonTimes = [
  "08:30 – 09:15",
  "09:25 – 10:10",
  "10:20 – 11:05",
  "11:25 – 12:10",
  "12:20 – 13:05",
  "13:15 – 14:00",
];

export const weekDays = ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma"];

// Namuna dars jadvali (9-A sinf) — har kun uchun fanlar
export const sampleSchedule: Record<string, string[]> = {
  Dushanba: ["Matematika", "Ona tili", "Fizika", "Ingliz tili", "Tarix", "Jismoniy tarbiya"],
  Seshanba: ["Kimyo", "Matematika", "Biologiya", "Adabiyot", "Informatika", "Geografiya"],
  Chorshanba: ["Ingliz tili", "Fizika", "Matematika", "Ona tili", "Tarix", "Chizmachilik"],
  Payshanba: ["Biologiya", "Kimyo", "Adabiyot", "Matematika", "Informatika", "Jismoniy tarbiya"],
  Juma: ["Tarix", "Ingliz tili", "Fizika", "Ona tili", "Geografiya", "Tarbiyaviy soat"],
};

/* ----------------------------- E-resurslar ----------------------------- */
export interface Resource {
  title: string;
  description: string;
  url: string;
}

export const eResources: Resource[] = [
  {
    title: "Elektron darsliklar",
    description: "Barcha sinflar uchun rasmiy elektron darsliklar to'plami.",
    url: "https://eduportal.uz",
  },
  {
    title: "Onlayn maktab",
    description: "Masofaviy ta'lim va video darslar platformasi.",
    url: "https://onlinemaktab.uz",
  },
  {
    title: "Ziyonet ta'lim portali",
    description: "Ta'limiy resurslar va elektron kutubxona.",
    url: "https://ziyonet.uz",
  },
  {
    title: "Kundalik.com",
    description: "Elektron kunlik va baholar tizimi.",
    url: "https://kundalik.com",
  },
];

/* ----------------------------- Ta'til kunlari ----------------------------- */
export const holidays: { name: string; period: string }[] = [
  { name: "Kuzgi ta'til", period: "30 oktabr – 5 noyabr" },
  { name: "Qishki ta'til", period: "30 dekabr – 10 yanvar" },
  { name: "Bahorgi ta'til", period: "20 mart – 26 mart" },
  { name: "Yozgi ta'til", period: "1 iyun – 31 avgust" },
];

/* ----------------------------- Qabul hujjatlari ----------------------------- */
export const admissionDocuments: string[] = [
  "Ota-ona (vasiy)ning arizasi",
  "Bolaning tug'ilganlik haqidagi guvohnomasi nusxasi",
  "Bola va ota-onaning manzil ma'lumotnomasi",
  "Tibbiy ma'lumotnoma (forma 063)",
  "3x4 o'lchamli 4 dona rangli fotosurat",
  "Sog'liq holati to'g'risidagi tibbiy xulosa",
];

export const admissionSteps: { title: string; description: string }[] = [
  {
    title: "Ariza topshirish",
    description:
      "Onlayn yoki maktab qabulxonasiga kelib, belgilangan shaklda ariza topshiriladi.",
  },
  {
    title: "Hujjatlarni taqdim etish",
    description: "Kerakli hujjatlar to'plami maktab ma'muriyatiga taqdim etiladi.",
  },
  {
    title: "Suhbat va ko'rik",
    description:
      "Bola bilan tanishuv suhbati va tibbiy ko'rikdan o'tkaziladi.",
  },
  {
    title: "Ro'yxatga olish",
    description: "Hujjatlar to'liq bo'lsa, bola sinfga rasman qabul qilinadi.",
  },
];
