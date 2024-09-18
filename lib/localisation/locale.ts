'use server';

import { cookies } from 'next/headers';
import { defaultLocale, type Locale, LOCALE_COOKIES } from './config';

// eslint-disable-next-line @typescript-eslint/require-await
export async function getUserLocale() {
  return cookies().get(LOCALE_COOKIES.MAIN)?.value ?? defaultLocale;
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function setUserLocale(locale: Locale) {
  cookies().set(LOCALE_COOKIES.MAIN, locale);
}
