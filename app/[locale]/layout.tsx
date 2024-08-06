import { NextIntlClientProvider } from 'next-intl';
import { Inter } from 'next/font/google';
import { getMessages } from 'next-intl/server';
import { type Metadata } from 'next';
import '~/app/globals.scss';
import { type Locale } from '~/lib/localisation/locales';
import { Analytics } from '@vercel/analytics/react';
import { getLangDir } from 'rtl-detect';
import { TooltipProvider } from '~/components/ui/Tooltip';
import RadixDirectionProvider from './_components/RadixDirectionProvider';
import { cn } from '~/lib/utils';
import { OnboardWizardProvider } from '~/components/interview/OnboardWizard/OnboardWizardContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Network Canvas Studio',
  description:
    'A platform for designing and building impactful personal networks research.',
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const messages = await getMessages();
  const dir = getLangDir(locale);

  return (
    <html lang={locale} dir={dir} className="h-full bg-platinum">
      <body className={cn(inter.className, 'h-full')}>
        <NextIntlClientProvider messages={messages}>
          <RadixDirectionProvider dir={dir}>
            <TooltipProvider>
              <OnboardWizardProvider>{children}</OnboardWizardProvider>
            </TooltipProvider>
          </RadixDirectionProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
