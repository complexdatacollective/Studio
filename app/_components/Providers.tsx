import { type AbstractIntlMessages } from 'next-intl';
import { type ReactNode } from 'react';
import RadixDirectionProvider from './RadixDirectionProvider';
import { TooltipProvider } from '~/components/ui/Tooltip';
import { type Locale } from '~/lib/localisation/config';
import IntlProvider from './IntlProvider';
import { ThemeProvider } from 'next-themes';
import { WizardProvider } from '~/lib/onboarding-wizard/Provider';
import { MotionConfig } from 'framer-motion';
import DialogProvider from '~/lib/dialogs/DialogProvider';

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
        <MotionConfig reducedMotion="user">
          <RadixDirectionProvider dir={dir}>
            <DialogProvider>
              <WizardProvider>
                <TooltipProvider>{children}</TooltipProvider>
              </WizardProvider>
            </DialogProvider>
          </RadixDirectionProvider>
        </MotionConfig>
      </IntlProvider>
    </ThemeProvider>
  );
}
