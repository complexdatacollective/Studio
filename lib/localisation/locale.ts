'use server';

import { cookies, headers } from 'next/headers';
import {
  type Locale,
  LOCALE_COOKIES,
  LocaleCookieName,
  MAIN_LOCALES,
} from './config';
import { getBestMatch, isInterviewRoute } from './utils';
import Negotiator from 'negotiator';
import { AbstractIntlMessages } from 'next-intl';
import { fetchInterviewMessages } from './i18n';

export async function getProtocolLocales(
  interviewId: string,
): Promise<string[]> {
  try {
    const response = await fetch(
      `http://localhost:3000/api/interview/${interviewId}/languages`,
    );
    if (!response.ok) {
      throw new Error('Failed to fetch interview locales');
    }
    const data = (await response.json()) as { locales: string[] } | null;

    if (!data?.locales) {
      throw new Error('No locales found in interview data');
    }

    return data.locales;
  } catch (error) {
    throw new Error('Error fetching protocol locales');
  }
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function getLocaleContext() {
  const path = headers().get('x-current-path') ?? '';
  console.log('Path:', path);
  return isInterviewRoute(path) ? 'INTERVIEW' : 'MAIN';
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function getUserLocale(context: LocaleCookieName) {
  return cookies().get(LOCALE_COOKIES[context])?.value;
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function getAvilableLocales(context: LocaleCookieName) {
  if (context === 'MAIN') {
    return MAIN_LOCALES;
  }

  // Fetch the available locales from the protocol

  const interviewId =
    headers().get('x-current-path')?.split('/interview/')[1] ?? null;

  if (!interviewId) {
    throw new Error('Interview route without interview ID');
  }

  const protocolLocales = await getProtocolLocales(interviewId);

  return protocolLocales;
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function getBestLocale(locales: string[]) {
  const userLanguages = new Negotiator({
    headers: {
      'accept-language': headers().get('accept-language') ?? undefined,
    },
  }).languages();

  const bestMatch = getBestMatch(locales, userLanguages);

  return bestMatch;
}

export async function getLocaleMessages(
  context: LocaleCookieName,
  locale: Locale,
) {
  if (context === 'MAIN') {
    const messages = (await import(`./messages/${locale}.json`)) as {
      default: AbstractIntlMessages;
    };
    return messages.default;
  }

  // For protocol contexts we have to get the messages from the protocol
  const interviewId =
    headers().get('x-current-path')?.split('/interview/')[1] ?? '';

  console.log('Fetching interview messages', interviewId);

  const messages = await fetchInterviewMessages(locale, interviewId);
  return messages;
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function setUserLocale(locale: Locale) {
  cookies().set(LOCALE_COOKIES.MAIN, locale);
}
