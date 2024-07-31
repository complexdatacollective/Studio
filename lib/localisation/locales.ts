export const SUPPORTED_LOCALES = ['en', 'es', 'ar'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];
