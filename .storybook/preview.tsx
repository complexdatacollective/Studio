import type { Preview } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import { type AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { LOCALES_DICT, type Locale } from '~/lib/localisation/locales';
import { getLangDir } from 'rtl-detect';
import { TooltipProvider } from '~/components/ui/Tooltip';
import { DirectionProvider } from '@radix-ui/react-direction';
import InjectThemeVariables from '~/lib/theme/InjectThemeVariables';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '~/styles/global.css';
import { OnboardWizardProvider } from '~/components/OnboardWizard/OnboardWizardContext';

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
    visualTheme: {
      name: 'Visual Theme',
      description: 'Global theme for components',
      defaultValue: 'default',
      toolbar: {
        icon: 'paintbrush',
        showName: true,
        dynamicTitle: true,
        items: [
          { value: 'default', title: 'Default' },
          { value: 'interview', title: 'Interview' },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const [messages, setMessages] = useState<AbstractIntlMessages>();
      const [langDir, setLangDir] =
        useState<ReturnType<typeof getLangDir>>('ltr');

      useEffect(() => {
        const fetchMessages = async () => {
          const locale = context.globals.locale as Locale;
          const loadedMessages = await loadMessages(locale);
          setMessages(loadedMessages);
          setLangDir(getLangDir(locale));
        };

        void fetchMessages();
      }, [context.globals.locale]);

      useEffect(() => {
        document.documentElement.dir = langDir;
      }, [langDir]);

      const theme =
        (context.parameters.forceTheme as string) ??
        (context.globals.visualTheme as string);

      return (
        <TooltipProvider>
          <InjectThemeVariables theme={theme} />
          <DirectionProvider dir={langDir}>
            <NextIntlClientProvider
              messages={messages}
              locale={context.globals.locale as Locale}
            >
            <OnboardWizardProvider>
                {Story()}
              </OnboardWizardProvider>
          </NextIntlClientProvider>
          </DirectionProvider>
        </TooltipProvider>
      );
    },
    // For some reason, we need this empty decorator here, or the theme switcher
    // throws an error. This seems to be a bug in the addon.
    // see: https://stackoverflow.com/questions/71993857/using-usestate-along-with-global-decorators-throws-error-storybook-preview-hooks/77859321#77859321
    // and: https://github.com/storybookjs/storybook/issues/22132
    (Story) => {
      return <Story />;
    },
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
  ],
};

export default preview;
