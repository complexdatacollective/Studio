'use client';
import { ReactNode } from 'react';
import { ConvexReactClient, ConvexProvider } from 'convex/react';
import { SessionProvider } from '~/providers/SessionProvider';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SessionProvider>
      <ConvexProvider client={convex}>{children}</ConvexProvider>
    </SessionProvider>
  );
}
