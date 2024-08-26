/* eslint-disable no-console */
import { type IntlError, IntlErrorCode } from 'next-intl';
import { type LocalisedRecord } from '~/lib/schemas/shared';
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
 * Calculate the fallbacl using the algorithm from the
 * `@formatjs/intl-localematcher` package, which is the same one `next-intl`
 * uses.
 *
 * Primarily for use in interview contexts where we have user supplied localised
 * strings.
 */
export function getLocalisedValue(
  localisedRecord: LocalisedRecord,
  userLocales: string[],
) {
  console.log('user', userLocales);
  console.log('record', Object.keys(localisedRecord));

  const bestMatch = match(userLocales, Object.keys(localisedRecord), 'en');

  if (bestMatch !== 'NOT_FOUND') {
    return localisedRecord[bestMatch]!;
  }

  // Fallback
  return localisedRecord.en;
}
