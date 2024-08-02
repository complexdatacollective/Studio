import { NextIntlClientProvider } from 'next-intl';
import { Inter } from 'next/font/google';
import { getMessages } from 'next-intl/server';
import '~/app/globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Interview',
  description: 'Network Canvas Interview',
};

export const dynamic = 'force-dynamic';

export default async function InterviewLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${inter.className} flex h-screen bg-navy-taupe text-white`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
