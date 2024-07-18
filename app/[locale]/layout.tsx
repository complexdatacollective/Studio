import { NextIntlClientProvider } from 'next-intl';
import { Inter } from 'next/font/google';
import { getMessages } from 'next-intl/server';
import { type Metadata } from 'next';
import ResponsiveContainer from '~/components/layout/ResponsiveContainer';
import '../globals.scss';
import LanguageSwitcher from '../_components/LanguageSwitcher';
import { getDirection, type Locales } from '~/lib/localisation/locales';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locales };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} dir={getDirection(locale)}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <div className="m-2">
            <LanguageSwitcher />
          </div>
          <ResponsiveContainer>{children}</ResponsiveContainer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
