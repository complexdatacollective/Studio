import { getMessages, getNow, getTimeZone } from 'next-intl/server';
import { Lexend, Roboto_Mono } from 'next/font/google';
import { type Metadata } from 'next';
import '~/styles/global.css';
import { type Locale } from '~/lib/localisation/locales';
import { Analytics } from '@vercel/analytics/react';
import { getLangDir } from 'rtl-detect';
import Providers from './_components/Providers';
import { cn } from '~/lib/utils';

const lexend = Lexend({
  weight: 'variable',
  display: 'swap',
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  variable: '--font-lexend',
});

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

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
  // add interview specific messages to the messages if we're in the interview route group

  const dir = getLangDir(locale);
  const now = await getNow();
  const timeZone = await getTimeZone();

  return (
    <html
      lang={locale}
      dir={dir}
      className={cn('min-h-full', `${lexend.variable} ${roboto_mono.variable}`)}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <Providers
          intlParams={{
            dir,
            messages,
            locale,
            now,
            timeZone,
          }}
        >
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
