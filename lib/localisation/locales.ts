export const SUPPORTED_LOCALES = ['en', 'es', 'ar'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const getDirection = (locale: Locale) => {
  const rtlLocales = ['ar'];
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr';
};
