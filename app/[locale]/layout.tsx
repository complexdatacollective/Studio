import { NextIntlClientProvider } from 'next-intl';
import { Inter } from 'next/font/google';
import { getMessages } from 'next-intl/server';
import { type Metadata } from 'next';
import '~/app/globals.scss';
import { SUPPORTED_LOCALES, type Locale } from '~/lib/localisation/locales';
import { Analytics } from '@vercel/analytics/react';
import { getLangDir } from 'rtl-detect';
import { TooltipProvider } from '~/components/ui/Tooltip';
import RadixDirectionProvider from './_components/RadixDirectionProvider';

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

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
    <html lang={locale} dir={dir}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <RadixDirectionProvider dir={dir}>
            <TooltipProvider>{children}</TooltipProvider>
          </RadixDirectionProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
