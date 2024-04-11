import './globals.css';
import { Quicksand } from 'next/font/google';
import ConvexClientProvider from '../providers/ConvexClientProvider';
import { Header } from '~/components/Header';

const quicksand = Quicksand({ subsets: ['latin'] });

export const metadata = {
  title: 'Studio MVP',
  description: 'Studio MVP Using Convex and Lucia',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={quicksand.className}>
        <ConvexClientProvider>
          <Header />
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
