// ! Remember to modify the middleware.ts file as you add or remove locales here
export const SUPPORTED_LOCALES = ['en', 'es', 'ar'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const getDirection = (locale: Locale) => {
  const rtlLocales = ['ar'];
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr';
};
