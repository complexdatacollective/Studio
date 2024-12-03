import { MotionConfig } from 'framer-motion';
import { type AbstractIntlMessages } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import { type ReactNode } from 'react';
import { TooltipProvider } from '~/components/Tooltip';
import DialogProvider from '~/lib/dialogs/DialogProvider';
import { WizardProvider } from '~/lib/onboarding-wizard/Provider';
import { type Locale } from '~/schemas/protocol/i18n';
import IntlProvider from './IntlProvider';
import RadixDirectionProvider from './RadixDirectionProvider';

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
