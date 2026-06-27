import type { Locale } from "./config";

/**
 * UI matnlari lug'ati. (UI strings dictionary.)
 * Navigatsiya, tugmalar va umumiy elementlar uchun uch tilda tarjima.
 * Sahifa kontenti asosan o'zbek tilida (lib/data.ts) saqlanadi.
 */
export const dictionary = {
  uz: {
    nav: {
      home: "Bosh sahifa",
      about: "Maktab haqida",
      teachers: "O'qituvchilar",
      news: "Yangiliklar",
      admission: "Qabul",
      students: "O'quvchilarga",
      gallery: "Galereya",
      contact: "Aloqa",
    },
    common: {
      readMore: "Batafsil",
      allNews: "Barcha yangiliklar",
      learnMore: "Batafsil ma'lumot",
      apply: "Ariza topshirish",
      send: "Yuborish",
      backHome: "Bosh sahifaga qaytish",
      schoolName: "Raxmatulla Rayimqulov nomidagi maktab",
      schoolNameShort: "R. Rayimqulov maktabi",
      schoolType: "Umumiy o'rta ta'lim maktabi",
      quickLinks: "Tezkor havolalar",
      menu: "Menyu",
    },
    footer: {
      about:
        "Raxmatulla Rayimqulov nomidagi umumiy o'rta ta'lim maktabi — bilim, tarbiya va kelajak uchun ishonchli maskan.",
      contactTitle: "Bog'lanish",
      rights: "Barcha huquqlar himoyalangan.",
      ministry: "O'zbekiston Respublikasi Maktabgacha va maktab ta'limi vazirligi",
    },
  },
  ru: {
    nav: {
      home: "Главная",
      about: "О школе",
      teachers: "Учителя",
      news: "Новости",
      admission: "Приём",
      students: "Ученикам",
      gallery: "Галерея",
      contact: "Контакты",
    },
    common: {
      readMore: "Подробнее",
      allNews: "Все новости",
      learnMore: "Узнать больше",
      apply: "Подать заявку",
      send: "Отправить",
      backHome: "На главную",
      schoolName: "Школа имени Рахматуллы Раимкулова",
      schoolNameShort: "Школа Р. Раимкулова",
      schoolType: "Общеобразовательная средняя школа",
      quickLinks: "Быстрые ссылки",
      menu: "Меню",
    },
    footer: {
      about:
        "Общеобразовательная средняя школа имени Рахматуллы Раимкулова — надёжный дом знаний, воспитания и будущего.",
      contactTitle: "Связаться",
      rights: "Все права защищены.",
      ministry: "Министерство дошкольного и школьного образования Республики Узбекистан",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      teachers: "Teachers",
      news: "News",
      admission: "Admission",
      students: "Students",
      gallery: "Gallery",
      contact: "Contact",
    },
    common: {
      readMore: "Read more",
      allNews: "All news",
      learnMore: "Learn more",
      apply: "Apply now",
      send: "Send",
      backHome: "Back to home",
      schoolName: "Raxmatulla Rayimqulov School",
      schoolNameShort: "R. Rayimqulov School",
      schoolType: "General Secondary School",
      quickLinks: "Quick links",
      menu: "Menu",
    },
    footer: {
      about:
        "Raxmatulla Rayimqulov General Secondary School — a trusted home of knowledge, character and the future.",
      contactTitle: "Get in touch",
      rights: "All rights reserved.",
      ministry: "Ministry of Preschool and School Education of the Republic of Uzbekistan",
    },
  },
} as const;

export type Dictionary = (typeof dictionary)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionary[locale];
}
