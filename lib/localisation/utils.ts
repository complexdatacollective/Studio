/* eslint-disable no-console */
import { type IntlError, IntlErrorCode } from 'next-intl';
import { type LocalisedRecord } from '~/schemas/shared';
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
 * localised string for that locale, or the fallback.
 *
 * Primarily for use in interview contexts where we have user supplied localised
 * strings.
 */
export function getLocalisedString(
  localisedRecord: LocalisedRecord,
  userLocales: string[],
): string {
  const bestMatch = match(
    userLocales,
    Object.keys(localisedRecord),
    'NOT_FOUND',
  );

  if (bestMatch !== 'NOT_FOUND') {
    return localisedRecord[bestMatch]!;
  }

  // Fallback
  return localisedRecord.DEFAULT;
}

export function getBestMatch(
  protocolLanguages: string[],
  userLocales: string[],
): string {
  const bestMatch = match(userLocales, protocolLanguages, 'NOT_FOUND');
  if (bestMatch !== 'NOT_FOUND') {
    return bestMatch;
  }

  // Fallback
  return 'DEFAULT';
}
