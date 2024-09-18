import { getRequestConfig } from 'next-intl/server';
import {
  getAvilableLocales,
  getBestLocale,
  getLocaleContext,
  getLocaleMessages,
  getUserLocale,
} from './locale';

export default getRequestConfig(async () => {
  const localeContext = await getLocaleContext();
  const availableLocales = await getAvilableLocales(localeContext);
  let userLocale = await getUserLocale(localeContext);

  // If there's no user locale, or the user locale is not supported, get the best match
  if (!userLocale || !availableLocales.includes(userLocale)) {
    userLocale = await getBestLocale(availableLocales);
    console.log('Setting user locale');
  }

  const messages = await getLocaleMessages(localeContext, userLocale);

  console.log('Locale context:', {
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

// export default getRequestConfig(async () => {
//   const currentPath = headers().get('x-current-path') ?? '';

//   // const locale = cookies().get('locale')?.value ?? 'en';

//   // TODO: validate interview route locale parameter against the new list of all locales

//   // Load the UI messages for the current locale
//   // Includes fallback to English if the locale is not supported.
//   // This is for Interview route groups using languages not supported by the UI translations
//   const messages = (
//     (await import(
//       `./messages/${MAIN_LOCALES.includes(locale) ? locale : 'en'}.json`
//     )) as { default: AbstractIntlMessages }
//   ).default;

//   // if we're in the interview route group, we need to fetch the messages from the protocol and merge them with the main messages
//   if (isInterviewRoute(currentPath)) {
//     console.log('Fetching interview messages');
//     const interviewMessages = await fetchInterviewMessages(
//       locale as Locale,
//       currentPath.split('/interview/')[1] ?? '',
//     );

//     return {
//       locale,
//       messages: { ...messages, ...interviewMessages },
//       onError: customErrorLogger,
//       getMessageFallback,
//     };
//   }

//   console.log('Using main messages');
//   // If we're in the main app (researcher backend), just pass the messages directly.
//   return {
//     locale,
//     messages: messages,
//     onError: customErrorLogger,
//     getMessageFallback,
//   };
// });
