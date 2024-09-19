import { getRequestConfig } from 'next-intl/server';
import {
  getAvailableLocales,
  getBestLocale,
  getLocaleMessages,
  getUserLocale,
} from './locale';
import { getLocaleContext, getMessageFallback } from './utils';
import { getCurrentPath, getInterviewId } from '../serverUtils';

export default getRequestConfig(async () => {
  const currentPath = getCurrentPath();
  const localeContext = getLocaleContext(currentPath);

  const interviewId = getInterviewId(currentPath);

  const availableLocales = await getAvailableLocales(
    localeContext,
    interviewId,
  );
  let userLocale = await getUserLocale(localeContext);

  // If there's no user locale, or the user locale is not supported, set the
  // locale to the best available match. This same logic will be run in the
  // middleware, but we also need to run it here to get the locale messages.
  if (!userLocale || !availableLocales.includes(userLocale)) {
    userLocale = await getBestLocale(availableLocales);
  }

  const messages = await getLocaleMessages(localeContext, userLocale);

  return {
    locale: userLocale,
    messages,
    getMessageFallback,
  };
});
