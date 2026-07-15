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
      schoolName: "Rahmetolla Rayimqulov nomidagi umumiy o'rta ta'lim maktabi",
      schoolNameShort: "R. Rayimqulov maktabi",
      schoolType: "Umumiy o'rta ta'lim maktabi",
      quickLinks: "Tezkor havolalar",
      menu: "Menyu",
    },
    footer: {
      about:
        "Rahmetolla Rayimqulov nomidagi umumiy o'rta ta'lim maktabi — bilim, tarbiya va kelajak uchun ishonchli maskan.",
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
      schoolName: "Общеобразовательная средняя школа имени Рахметоллы Раимкулова",
      schoolNameShort: "Школа Р. Раимкулова",
      schoolType: "Общеобразовательная средняя школа",
      quickLinks: "Быстрые ссылки",
      menu: "Меню",
    },
    footer: {
      about:
        "Общеобразовательная средняя школа имени Рахметоллы Раимкулова — надёжный дом знаний, воспитания и будущего.",
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
      schoolName: "Rahmetolla Rayimqulov General Secondary School",
      schoolNameShort: "R. Rayimqulov School",
      schoolType: "General Secondary School",
      quickLinks: "Quick links",
      menu: "Menu",
    },
    footer: {
      about:
        "Rahmetolla Rayimqulov General Secondary School — a trusted home of knowledge, character and the future.",
      contactTitle: "Get in touch",
      rights: "All rights reserved.",
      ministry: "Ministry of Preschool and School Education of the Republic of Uzbekistan",
    },
  },
  kk: {
    nav: {
      home: "Басты бет",
      about: "Мектеп туралы",
      teachers: "Мұғалімдер",
      news: "Жаңалықтар",
      admission: "Қабылдау",
      students: "Оқушыларға",
      gallery: "Галерея",
      contact: "Байланыс",
    },
    common: {
      readMore: "Толығырақ",
      allNews: "Барлық жаңалықтар",
      learnMore: "Толық ақпарат",
      apply: "Өтініш беру",
      send: "Жіберу",
      backHome: "Басты бетке оралу",
      schoolName: "Рахметолла Райымқұлов атындағы жалпы орта білім беретін мектеп",
      schoolNameShort: "Р. Райымқұлов мектебі",
      schoolType: "Жалпы орта білім беретін мектеп",
      quickLinks: "Жылдам сілтемелер",
      menu: "Мәзір",
    },
    footer: {
      about:
        "Рахметолла Райымқұлов атындағы жалпы орта білім беретін мектеп — білім, тәрбие және болашақ үшін сенімді мекен.",
      contactTitle: "Байланысу",
      rights: "Барлық құқықтар қорғалған.",
      ministry: "Өзбекстан Республикасы Мектепке дейінгі және мектеп білімі министрлігі",
    },
  },
} as const;

export type Dictionary = (typeof dictionary)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionary[locale];
}
