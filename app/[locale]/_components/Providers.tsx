import { type AbstractIntlMessages } from 'next-intl';
import { type ReactNode } from 'react';
import RadixDirectionProvider from './RadixDirectionProvider';
import { TooltipProvider } from '~/components/ui/Tooltip';
import { type Locale } from '~/lib/localisation/locales';
import IntlProvider from './IntlProvider';
import { ThemeProvider } from 'next-themes';
import { WizardProvider } from '~/lib/onboardWizard/Provider';

export default function Providers({
  intlParams: { dir, messages, locale, now, timeZone },
  children,
}: {
  intlParams: {
    dir: 'ltr' | 'rtl';
    messages: AbstractIntlMessages;
    locale: Locale;
    now: Date;
    timeZone: string;
  };
  children: ReactNode;
}) {
  return (
    <ThemeProvider>
      <IntlProvider
        messages={messages}
        locale={locale}
        now={now}
        timeZone={timeZone}
      >
        <RadixDirectionProvider dir={dir}>
          <TooltipProvider>
            <WizardProvider>{children}</WizardProvider>
          </TooltipProvider>
        </RadixDirectionProvider>
      </IntlProvider>
    </ThemeProvider>
  );
}
