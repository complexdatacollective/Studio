import type { Preview } from '@storybook/react';
import '~/app/globals.scss';
import React, { useEffect, useState } from 'react';
import { type AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { LOCALES_DICT, type Locale } from '~/lib/localisation/locales';
import { getLangDir } from 'rtl-detect';
import { TooltipProvider } from '~/components/ui/Tooltip';
import { DirectionProvider } from '@radix-ui/react-direction';

const loadMessages = async (
  locale: Locale,
): Promise<AbstractIntlMessages | undefined> => {
  try {
    const { default: messages } = (await import(
      `../lib/localisation/messages/${locale}.json`
    )) as { default: AbstractIntlMessages };
    return messages;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Could not load messages for locale ${locale}`, error);
    return undefined;
  }
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
          ...LOCALES_DICT.map(([locale, name]) => ({
            value: locale,
            title: name,
          })),
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const [messages, setMessages] = useState<AbstractIntlMessages>();
      const [langDir, setLandDir] =
        useState<ReturnType<typeof getLangDir>>('ltr');

      useEffect(() => {
        const fetchMessages = async () => {
          const locale = context.globals.locale as Locale;
          const loadedMessages = await loadMessages(locale);
          setMessages(loadedMessages);
          setLandDir(getLangDir(locale));
        };

        void fetchMessages();
      }, [context.globals.locale]);

      useEffect(() => {
        document.documentElement.dir = langDir;
      }, [langDir]);

      return (
        <DirectionProvider dir={langDir}>
          <NextIntlClientProvider
            messages={messages}
            locale={context.globals.locale as Locale}
          >
            <Story />
          </NextIntlClientProvider>
        </DirectionProvider>
      );
    },
    (Story) => {
      return (
        <TooltipProvider>
          <div className="h-screen">
            <Story />
          </div>
        </TooltipProvider>
      );
    },
  ],
};

export default preview;
