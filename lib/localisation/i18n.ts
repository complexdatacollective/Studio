/* eslint-disable no-console */
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { SUPPORTED_LOCALES } from './locales';
import { IntlErrorCode, type AbstractIntlMessages } from 'next-intl';
import { customErrorLogger } from './utils';
import { headers } from 'next/headers';

export default getRequestConfig(async ({ locale }) => {
  const currentPath = headers().get('x-current-path') ?? '';

  // Validate that the incoming `locale` parameter is valid
  // TODO: validate against the new list of all locales

  if (
    !SUPPORTED_LOCALES.includes(locale) &&
    !currentPath.includes('/interview')
  )
    notFound();

  // If we're in the main app (researcher backend), just import the messages directly

  let messages;

  if (SUPPORTED_LOCALES.includes(locale)) {
    messages = (
      (await import(`./messages/${locale}.json`)) as {
        default: AbstractIntlMessages | undefined;
      }
    ).default;
  } else {
    // load default messages (en). this is for when a protocol supported locale is not in our UI locales
    messages = (
      (await import(`./messages/en.json`)) as {
        default: AbstractIntlMessages | undefined;
      }
    ).default;
  }

  // if we're in the interview route group, we need to fetch the messages from the protocol and merge them with the main messages

  if (currentPath.includes('/interview')) {
    const interviewMessages = await fetchInterviewMessages();
    const localizedInterviewMessages = interviewMessages?.[locale] as {
      default: AbstractIntlMessages | undefined;
    };
    const mergedMessages = { ...messages, ...localizedInterviewMessages };
    return {
      messages: mergedMessages,
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
  }

  return {
    messages: messages,
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
