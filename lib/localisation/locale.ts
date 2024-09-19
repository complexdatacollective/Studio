/* eslint-disable @typescript-eslint/require-await */
'use server';

import { cookies, headers } from 'next/headers';
import {
  type Locale,
  LOCALE_COOKIES,
  type LocaleCookieName,
  BACKEND_LOCALES,
  FALLBACK_LOCALE,
} from './config';
import {
  fetchProtocolMessages,
  getLocaleContext,
  isInterviewRoute,
} from './utils';
import Negotiator from 'negotiator';
import { type AbstractIntlMessages } from 'next-intl';
import { match } from '@formatjs/intl-localematcher';
import { getCurrentPath, getInterviewId } from '../serverUtils';

export async function getProtocolLocales(
  interviewId: string,
): Promise<Locale[]> {
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

    return data.locales as Locale[];
  } catch (error) {
    throw new Error('Error fetching protocol locales');
  }
}

/**
 * Get the user's locale from the cookie. This is either the locale cookie set
 * by the main app, or the locale cookie set by the protocol for the current
 * interview.
 */
export async function getUserLocale(context: LocaleCookieName) {
  return (cookies().get(LOCALE_COOKIES[context])?.value as Locale) ?? undefined;
}

/**
 * Get the list of available locales for the current request context. This is
 * either the list of locales supported by the main app, or the list of locales
 * supported by the protocol for the current interview.
 */
export async function getAvailableLocales(
  context: LocaleCookieName,
  interviewId?: string,
) {
  if (context === 'MAIN') {
    return BACKEND_LOCALES;
  }

  if (!interviewId) {
    throw new Error('No interview ID provided for protocol locales');
  }

  const protocolLocales = await getProtocolLocales(interviewId);

  return protocolLocales;
}

export async function getBestLocale(availableLocales: Locale[]) {
  const userAcceptedLocales = new Negotiator({
    headers: {
      'accept-language': headers().get('accept-language') ?? undefined,
    },
  }).languages();

  return match(
    userAcceptedLocales,
    availableLocales,
    FALLBACK_LOCALE,
  ) as Locale;
}

/**
 * Get the locale messages for the current request context and user locale.
 *
 * If the context is "MAIN", directly import our JSON messages.
 *
 * If the context is "INTERVIEW", fetch the messages from the protocol, and
 * merge with the main messages for the locale (if available) or the best match
 * of the main locale translations if not.
 */
export async function getLocaleMessages(
  context: LocaleCookieName,
  locale: Locale, // Locale is valid for the context, but not necessarily for both main and interview messages
) {
  if (context === 'MAIN') {
    // It is safe to assume that the locale exists for the main context,
    // because it was selected from the list of available locales.
    const messages = (await import(`./messages/${locale}.json`)) as {
      default: AbstractIntlMessages;
    };
    return messages.default;
  }

  // For protocol contexts we have to get the messages from the protocol, and
  // merge with the main messages for the locale (if available) or the best
  // match of the main locale translations if not.
  const currentPath = getCurrentPath();
  const interviewId = getInterviewId(currentPath);

  const protocolMessages = await fetchProtocolMessages(locale, interviewId);

  const mainMessageLocale = BACKEND_LOCALES.includes(locale)
    ? locale
    : await getBestLocale(BACKEND_LOCALES);

  const mainMessages = (await import(
    `./messages/${mainMessageLocale}.json`
  )) as {
    default: AbstractIntlMessages;
  };

  return {
    ...mainMessages.default,
    ...protocolMessages,
  };
}

export async function setUserLocale(locale: Locale) {
  const currentPath = getCurrentPath();
  const context = getLocaleContext(currentPath);
  cookies().set(LOCALE_COOKIES[context], locale);
}
