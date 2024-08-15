import { type AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { type ReactNode } from 'react';
import RadixDirectionProvider from './RadixDirectionProvider';
import { TooltipProvider } from '~/components/ui/Tooltip';
import { customErrorLogger } from '~/lib/localisation/utils';
import { type Locale } from '~/lib/localisation/locales';
import IntlProvider from './IntlProvider';

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
    <IntlProvider
      messages={messages}
      locale={locale}
      now={now}
      timeZone={timeZone}
    >
      <RadixDirectionProvider dir={dir}>
        <TooltipProvider>{children}</TooltipProvider>
      </RadixDirectionProvider>
    </IntlProvider>
  );
}
