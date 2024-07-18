'use server';
import type { Preview } from '@storybook/react';
import '../app/globals.scss';
import React, { Suspense } from 'react';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

const withIntl = (Story, context) => {
  const messages = getMessages(context.globals.locale);

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
