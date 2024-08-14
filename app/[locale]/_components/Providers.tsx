import { type AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { type ReactNode } from 'react';
import RadixDirectionProvider from './RadixDirectionProvider';
import { TooltipProvider } from '~/components/ui/Tooltip';
import { ThemeProvider } from 'next-themes';

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
    <NextIntlClientProvider messages={messages}>
      <RadixDirectionProvider dir={dir}>
        <TooltipProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </TooltipProvider>
      </RadixDirectionProvider>
    </NextIntlClientProvider>
  );
}
