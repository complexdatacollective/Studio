import { type AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { type ReactNode } from 'react';
import RadixDirectionProvider from './RadixDirectionProvider';
import { TooltipProvider } from '~/components/ui/Tooltip';
import { customErrorLogger } from '~/lib/localisation/i18n';

export default function Providers({
  dir,
  messages,
  children,
}: {
  dir: 'ltr' | 'rtl';
  messages: AbstractIntlMessages;
  children: ReactNode;
}) {
  return (
    <NextIntlClientProvider messages={messages} onError={customErrorLogger}>
      <RadixDirectionProvider dir={dir}>
        <TooltipProvider>{children}</TooltipProvider>
      </RadixDirectionProvider>
    </NextIntlClientProvider>
  );
}
