import {
  type AbstractIntlMessages,
  type IntlError,
  IntlErrorCode,
} from 'next-intl';
import type { LocalisedRecord, LocalisedString } from '../../schemas/shared';
import {
  FALLBACK_LOCALE,
  type Locale,
  type LocaleCookieName,
  type LocaleObject,
  SUPPORTED_LOCALE_OBJECTS,
} from './config';

export const customErrorLogger = (error: IntlError) => {
  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    // Missing translations are expected during dev and should only log an error
    /* eslint-disable no-console */
    console.log(error.message);
  } else {
    // Other errors indicate a bug in the app and should be reported
    // reportToErrorTracking(error);

    /* eslint-disable no-console */
    console.log('other', error.message);
  }
};

/**
 * take a LocalisedRecord, and the users locale, and return the best possible
 * localised value for that locale, or the fallback.
 *
 * Calculate the fallback using the algorithm from the
 * `@formatjs/intl-localematcher` package, which is the same one `next-intl`
 * uses.
 *
 * Primarily for use in interview contexts where we have user supplied localised
 * strings.
 */
export function getLocalisedValue<T extends LocalisedRecord | LocalisedString>(
  localisedRecord: T,
  currentLocales: string,
): T[keyof T] {
  const interviewLocale = currentLocales.split(',')[0] as Locale;
  const mainLocale = currentLocales.split(',')[1] as Locale;
  if (localisedRecord[interviewLocale]) {
    return localisedRecord[interviewLocale] as T[keyof T];
  }

  if (localisedRecord[mainLocale]) {
    // first check if the main locale is available
    return localisedRecord[mainLocale] as T[keyof T];
  }

  return localisedRecord[FALLBACK_LOCALE] as T[keyof T]; // Fallback to the default locale
}

/**
 * Determine if the current path is an interview route.
 */
function isInterviewRoute(currentPath: string): boolean {
  return currentPath.startsWith('/interview');
}

/**
 * Given Locale[], return the corresponding Locale records from the
 * SUPPORTED_LOCALE_OBJECTS array.
 */
export function getLocaleRecordsFromCodes(codes: Locale[]): LocaleObject[] {
  return codes.map((code) => {
    const record = SUPPORTED_LOCALE_OBJECTS.find(
      (record) => record.code === code,
    );
    if (!record) {
      throw new Error(`Locale record not found for code: ${code}`);
    }
    return record;
  });
}

/**
 * Calculate a fallback message for a missing message.
 */
export const getMessageFallback = ({
  namespace,
  key,
  error,
}: {
  namespace?: string;
  key?: string;
  error: IntlError;
}) => {
  const path = [namespace, key].filter((part) => part != null).join('.');

  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    return `⚠️ ${path}`;
  } else {
    return 'Dear developer, please fix this message: ' + path;
  }
};

/**
 * Fetch the protocol messages for the given interview ID and locale.
 */
export async function fetchProtocolMessages(
  locale: Locale,
  interviewId: string,
): Promise<AbstractIntlMessages> {
  try {
    const response = await fetch(
      `http://localhost:3000/api/interview/${interviewId}/messages?locale=${locale}`,
    );
    if (!response.ok) {
      console.error('Failed to fetch messages:', response.statusText);
      return {};
    }
    const data = (await response.json()) as {
      messages: AbstractIntlMessages;
    } | null;

    return data!.messages;
  } catch (error) {
    console.error('Error fetching protocol messages:', error);
    return {};
  }
}

/**
 * Get the locale context for the current request. We use this to determine if
 * we're in the main app or in an interview route, which in turn determines
 * where we fetch the locale messages from.
 *
 * The locale "context" is either "MAIN" or "INTERVIEW".
 */
export function getLocaleContext(currentPath: string): LocaleCookieName {
  return isInterviewRoute(currentPath) ? 'INTERVIEW' : 'MAIN';
}
