import type { Preview } from '@storybook/react';
import '../app/globals.scss';
import React, { Suspense } from 'react';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';

const loadMessages = async (
  locale: string,
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

const withIntl = async (Story, context) => {
  const messages = await loadMessages(context.globals.locale);
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
