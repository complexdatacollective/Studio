/* eslint-disable no-console */
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { SUPPORTED_LOCALES } from './locales';
import {
  type IntlError,
  IntlErrorCode,
  type AbstractIntlMessages,
} from 'next-intl';

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

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!SUPPORTED_LOCALES.includes(locale)) notFound();

  const messages = (
    (await import(`./messages/${locale}.json`)) as {
      default: AbstractIntlMessages | undefined;
    }
  ).default;

  return {
    messages,
    onError: customErrorLogger,
    getMessageFallback({ namespace, key, error }) {
      const path = [namespace, key].filter((part) => part != null).join('.');

      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        return `⚠️ ${path}`;
      } else {
        return 'Dear developer, please fix this message: ' + path;
      }
    },
  };
});
