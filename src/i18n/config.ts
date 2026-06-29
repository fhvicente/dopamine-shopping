export const locales = ["pt", "en"] as const;
export const defaultLocale = "pt" as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  pt: "Português",
  en: "English",
};

export const localeFlags: Record<Locale, string> = {
  pt: "🇵🇹",
  en: "🇬🇧",
};
