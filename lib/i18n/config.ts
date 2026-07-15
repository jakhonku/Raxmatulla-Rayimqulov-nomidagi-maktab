/**
 * Tillar konfiguratsiyasi. (Locale configuration.)
 * Asosiy til — o'zbek (lotin). Qo'shimcha: rus, ingliz va qozoq.
 */
export const locales = ["uz", "ru", "en", "kk"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "uz";

export const localeNames: Record<Locale, string> = {
  uz: "O'zbek",
  ru: "Русский",
  en: "English",
  kk: "Қазақша",
};

export const localeShort: Record<Locale, string> = {
  uz: "UZ",
  ru: "RU",
  en: "EN",
  kk: "KK",
};
