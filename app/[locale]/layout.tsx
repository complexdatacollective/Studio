import { getMessages, getNow, getTimeZone } from 'next-intl/server';
import { Lexend } from 'next/font/google';
import { type Metadata } from 'next';
import '~/styles/global.css';
import { type Locale } from '~/lib/localisation/locales';
import { Analytics } from '@vercel/analytics/react';
import { getLangDir } from 'rtl-detect';
import Providers from './_components/Providers';
import { cn } from '~/lib/utils';

const lexend = Lexend({
  weight: 'variable',
  subsets: ['latin', 'latin-ext', 'vietnamese'],
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
  const dir = getLangDir(locale);
  const now = await getNow();
  const timeZone = await getTimeZone();

  return (
    <html
      lang={locale}
      dir={dir}
      className={cn('min-h-full', lexend)}
      suppressHydrationWarning
    >
      <body className="text-background-foreground font-body min-h-full bg-background text-foreground">
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
