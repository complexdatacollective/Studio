import { NextIntlClientProvider } from 'next-intl';
import { Inter } from 'next/font/google';
import { getMessages } from 'next-intl/server';
import { type Metadata } from 'next';
import ResponsiveContainer from '~/components/layout/ResponsiveContainer';
import '../globals.scss';
import LanguageSwitcher from '../_components/LanguageSwitcher';
import { type Locale } from '~/lib/localisation/locales';
import { Analytics } from '@vercel/analytics/react';
import DialogManager from '~/lib/dialogs/DialogManager';
import { getLangDir } from 'rtl-detect';

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
  params: { locale: Locale };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} dir={getLangDir(locale)}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <div className="m-2">
            <LanguageSwitcher />
          </div>
          <ResponsiveContainer>
            {children} 
            <DialogManager />
          </ResponsiveContainer>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
