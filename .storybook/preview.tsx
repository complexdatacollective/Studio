import type { Preview } from '@storybook/react';
import '../app/globals.scss';
import React, { Suspense, useState, useEffect } from 'react';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { type Locale, getDirection } from '../lib/localisation/locales';

const loadMessages = async (
  locale: Locale,
): Promise<AbstractIntlMessages | undefined> => {
  try {
    const messages = (
      await import(`../lib/localisation/messages/${locale}.json`)
    ).default;
    return messages;
  } catch (error) {
    console.error(`Could not load messages for locale ${locale}`, error);
    return undefined;
  }
};

const withIntl = (Story, context) => {
  const [messages, setMessages] = useState<AbstractIntlMessages>();

  useEffect(() => {
    const fetchMessages = async () => {
      const locale = context.globals.locale;
      const loadedMessages = await loadMessages(locale);
      setMessages(loadedMessages);
      document.dir = getDirection(locale);
    };

    fetchMessages();
  }, [context.globals.locale]);

  return (
    <Suspense fallback={<div>Loading Translations...</div>}>
      <NextIntlClientProvider
        messages={messages}
        locale={context.globals.locale}
      >
        <Story />
      </NextIntlClientProvider>
    </Suspense>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Internationalization',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'es', title: 'Español' },
          { value: 'ar', title: 'عربي' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  decorators: [withIntl],
};

export default preview;
