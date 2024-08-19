/* eslint-disable no-console */
import { type IntlError, IntlErrorCode } from 'next-intl';

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
