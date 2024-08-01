import { NextIntlClientProvider } from 'next-intl';
import { Inter } from 'next/font/google';
import { getMessages } from 'next-intl/server';
import { type Metadata } from 'next';
import '~/app/globals.scss';
import { type Locale } from '~/lib/localisation/locales';
import { Analytics } from '@vercel/analytics/react';
import { getLangDir } from 'rtl-detect';
import { TooltipProvider } from '~/components/ui/Tooltip';
import { DirectionProvider } from '@radix-ui/react-direction';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
          <DirectionProvider dir={dir}>
            <TooltipProvider>{children}</TooltipProvider>
          </DirectionProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
