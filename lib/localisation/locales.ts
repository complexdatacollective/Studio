export const LOCALES_DICT = [
  ['en', 'English'],
  ['es', 'Español'],
  ['ar', 'عربي'],
] as const;

export const SUPPORTED_LOCALES = LOCALES_DICT.map(([code]) => code);

export type Locale = (typeof SUPPORTED_LOCALES)[number];
