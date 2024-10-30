import { type Locale } from '~/schemas/protocol/i18n';

export const FALLBACK_LOCALE = 'en' as const;

// Locales we provide for our backend. For now, english, spanish, and arabic
// for testing RTL support.
export const BACKEND_LOCALES: Locale[] = ['en', 'es', 'ar'] as const;

// Changing these values will reset all localisation preferences.
export const LOCALE_COOKIES = {
  MAIN: 'studio-backend-locale',
  INTERVIEW: 'studio-interview-locale',
} as const;

export type LocaleCookieName = keyof typeof LOCALE_COOKIES;
