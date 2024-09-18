import { getRequestConfig } from 'next-intl/server';
import { getUserLocale } from './locale';
import { type AbstractIntlMessages } from 'next-intl';
import { headers } from 'next/headers';

async function getLocaleMessages(locale: string) {
  const messages = (await import(`./messages/${locale}.json`)) as {
    default: AbstractIntlMessages;
  };

  return messages.default;
}

export default getRequestConfig(async () => {
  const currentPath = headers().get('x-current-path') ?? '';

  console.log('currentPath:', currentPath);

  const locale = await getUserLocale();

  const messages = await getLocaleMessages(locale);

  return {
    locale,
    messages,
  };
});

// export default getRequestConfig(async () => {
//   const currentPath = headers().get('x-current-path') ?? '';

//   const locale = cookies().get('locale')?.value ?? 'en';

//   // Validate that the incoming `locale` parameter is valid
//   if (!SUPPORTED_LOCALES.includes(locale)) {
//     console.error(`Invalid locale: ${locale}`);
//     notFound();
//   }

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

//   // If we're in the main app (researcher backend), just pass the messages directly.
//   return {
//     locale,
//     messages: messages,
//     onError: customErrorLogger,
//     getMessageFallback,
//   };
// });
