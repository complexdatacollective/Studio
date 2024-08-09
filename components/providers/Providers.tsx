import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '~/app/globals.scss';
import { type Locale } from '~/lib/localisation/locales';
import { getLangDir } from 'rtl-detect';
import { TooltipProvider } from '~/components/ui/Tooltip';
import RadixDirectionProvider from '~/app/[locale]/_components/RadixDirectionProvider';
import { OnboardWizardProvider } from '~/components/OnboardWizard/OnboardWizardContext';

export default async function Providers({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const messages = await getMessages();
  const dir = getLangDir(locale);

  return (
    <NextIntlClientProvider messages={messages}>
      <RadixDirectionProvider dir={dir}>
        <TooltipProvider>
          <OnboardWizardProvider>{children}</OnboardWizardProvider>
        </TooltipProvider>
      </RadixDirectionProvider>
    </NextIntlClientProvider>
  );
}
