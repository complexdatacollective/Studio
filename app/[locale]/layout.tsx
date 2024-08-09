import { Inter } from 'next/font/google';
import { type Metadata } from 'next';
import '~/app/globals.scss';
import { type Locale } from '~/lib/localisation/locales';
import { Analytics } from '@vercel/analytics/react';
import { getLangDir } from 'rtl-detect';
import { cn } from '~/lib/utils';
import Providers from '~/components/providers/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Network Canvas Studio',
  description:
    'A platform for designing and building impactful personal networks research.',
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const dir = getLangDir(locale);

  return (
    <html lang={locale} dir={dir} className="h-full bg-platinum">
      <body className={cn(inter.className, 'h-full')}>
        <Providers locale={locale}>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
