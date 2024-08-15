import { Inter } from 'next/font/google';
import { getMessages } from 'next-intl/server';
import { type Metadata } from 'next';
import '~/styles/global.css';
import { type Locale } from '~/lib/localisation/locales';
import { Analytics } from '@vercel/analytics/react';
import { getLangDir } from 'rtl-detect';
import { cn } from '~/lib/utils';
import Providers from './_components/Providers';
import { getThemeData, getThemeDataFromCookies } from '~/lib/theme/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Network Canvas Studio',
  description:
    'A platform for designing and building impactful personal networks research.',
};

const getStyles = () => {
  // Could come from local storage, cookie, or db.
  const { theme, forceDarkMode } = getThemeDataFromCookies();

  const styles = getThemeData(theme);

  return styles;
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
  const themeStyles = getStyles();

  return (
    <html
      lang={locale}
      dir={dir}
      className="h-full"
      suppressHydrationWarning
      style={themeStyles}
    >
      <body className={cn(inter.className, 'h-full')}>
        <Providers dir={dir} messages={messages}>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
