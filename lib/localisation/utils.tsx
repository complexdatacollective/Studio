/* eslint-disable no-console */
import { type IntlError, IntlErrorCode } from 'next-intl';
import type { LocalisedRecord, LocalisedString } from '../../schemas/shared';
import { match } from '@formatjs/intl-localematcher';

export const customErrorLogger = (error: IntlError) => {
  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    // Missing translations are expected and should only log an error
    console.log(error.message);
  } else {
    // Other errors indicate a bug in the app and should be reported
    // reportToErrorTracking(error);
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

export function getBestMatch(
  protocolLocales: string[],
  userLocales: string[],
): string {
  const bestMatch = match(userLocales, protocolLocales, 'NOT_FOUND');
  if (bestMatch !== 'NOT_FOUND') {
    return bestMatch;
  }

  // Fallback
  return 'DEFAULT';
}

export function isInterviewRoute(currentPath: string): boolean {
  return currentPath.startsWith('/interview');
}
