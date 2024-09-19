import { AbstractIntlMessages, type IntlError, IntlErrorCode } from 'next-intl';
import type { LocalisedRecord, LocalisedString } from '../../schemas/shared';
import { Locale, SUPPORTED_LOCALE_OBJECTS } from './config';

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
  currentLocale: string,
): T[keyof T] {
  return localisedRecord[currentLocale] as T[keyof T];
}

/**
 * Determine if the current path is an interview route.
 */
export function isInterviewRoute(currentPath: string): boolean {
  return currentPath.startsWith('/interview');
}

/**
 * Given Locale[], return the corresponding Locale records from the
 * SUPPORTED_LOCALE_OBJECTS array.
 */
export function getLocaleRecordsFromCodes(codes: Locale[]) {
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
      return [];
    }
    const data = await response.json();

    return data.messages;
  } catch (error) {
    console.error('Error fetching protocol messages:', error);
    return [];
  }
}
