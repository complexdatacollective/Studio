import { NextIntlClientProvider } from 'next-intl';
import { Inter } from 'next/font/google';
import { getMessages } from 'next-intl/server';
import '~/app/globals.scss';
import { OnbordaProvider, Onborda } from 'onborda';
import { steps } from '~/app/[locale]/(interview)/interview/_onborda/steps';
import card from './interview/_onborda/card';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Interview',
  description: 'Network Canvas Interview',
};

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
        <OnbordaProvider>
          <Onborda steps={steps} cardComponent={card}>
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </Onborda>
        </OnbordaProvider>
      </body>
    </html>
  );
}
