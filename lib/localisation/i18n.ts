/* eslint-disable no-console */
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { SUPPORTED_LOCALES } from './locales';
import {
  type IntlError,
  IntlErrorCode,
  type AbstractIntlMessages,
} from 'next-intl';
import { customErrorLogger, isInterviewRoute } from './utils';
import { headers } from 'next/headers';

export default getRequestConfig(async ({ locale }) => {
  const currentPath = headers().get('x-current-path') ?? '';

  // Validate that the incoming `locale` parameter is valid
  // TODO: validate interview route locale parameter against the new list of all locales
  if (!SUPPORTED_LOCALES.includes(locale) && !isInterviewRoute(currentPath))
    notFound();

  // Load the UI messages for the current locale
  // Includes fallback to English if the locale is not supported.
  // This is for Interview route groups using languages not supported by the UI translations
  const messages = (
    (await import(
      `./messages/${SUPPORTED_LOCALES.includes(locale) ? locale : 'en'}.json`
    )) as { default: AbstractIntlMessages }
  ).default;

  // if we're in the interview route group, we need to fetch the messages from the protocol and merge them with the main messages
  if (isInterviewRoute(currentPath)) {
    const interviewMessages = await fetchInterviewMessages();
    const localizedInterviewMessages = interviewMessages?.[locale] as {
      default: AbstractIntlMessages;
    };
    return {
      messages: { ...messages, ...localizedInterviewMessages },
      onError: customErrorLogger,
      getMessageFallback,
    };
  }

  // If we're in the main app (researcher backend), just pass the messages directly.
  return {
    messages: messages,
    onError: customErrorLogger,
    getMessageFallback,
  };
});

const getMessageFallback = ({
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

async function fetchInterviewMessages(): Promise<
  Record<string, AbstractIntlMessages> | undefined
> {
  try {
    const response = await fetch(`http://localhost:3000/api`);
    if (!response.ok) {
      console.error('Failed to fetch messages:', response.statusText);
      return;
    }
    const data = await response.json();

    if (!data.messages) {
      console.log('No protocol messages provided');
      return;
    }
    return data.messages;
  } catch (error) {
    console.error('Error fetching protocol messages:', error);
    return;
  }
}
