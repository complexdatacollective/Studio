'use server';

import { cookies } from 'next/headers';
import type { Locale } from '~/lib/localisation/locales';

// server action to set the locale cookie, as in the language switcher
const COOKIE_NAME = 'locale';

export async function setUserLocale(locale: Locale) {
  console.log('Setting locale:', locale);
  cookies().set(COOKIE_NAME, locale);
}
