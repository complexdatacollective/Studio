import { getRequestConfig } from 'next-intl/server';
import {
  getAvailableLocales,
  getBestLocale,
  getLocaleContext,
  getLocaleMessages,
  getUserLocale,
} from './locale';

export default getRequestConfig(async () => {
  const localeContext = await getLocaleContext();
  const availableLocales = await getAvailableLocales(localeContext);
  let userLocale = await getUserLocale(localeContext);

  // If there's no user locale, or the user locale is not supported, set the
  // user locale to the best available match.
  if (!userLocale || !availableLocales.includes(userLocale)) {
    userLocale = await getBestLocale(availableLocales);
    console.log('Setting user locale');

    // Note: we can't set cookies here - we have to do it in middleware.
    // await setUserLocale(localeContext, userLocale);
  }

  const messages = await getLocaleMessages(localeContext, userLocale);

  console.log('Request config:', {
    localeContext,
    userLocale,
    availableLocales,
    messages,
  });

  return {
    locale: userLocale,
    messages,
  };
});
