'use client';

import { type AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { type Locale } from '~/lib/localisation/locales';
import { customErrorLogger } from '~/lib/localisation/utils';

export default function IntlProvider({
  locale,
  now,
  timeZone,
  messages,
  children,
}: {
  locale: Locale;
  now: Date;
  timeZone: string;
  messages: AbstractIntlMessages;
  children: React.ReactNode;
}) {
  return (
    <NextIntlClientProvider
      onError={customErrorLogger}
      locale={locale}
      now={now}
      timeZone={timeZone}
      // Provide as necessary
      messages={messages}
    >
      {children}
    </NextIntlClientProvider>
  );
}
