'use client';

import { UserButton } from '@clerk/nextjs';
import { useConvexAuth } from 'convex/react';

export default function App() {
  const { isLoading, isAuthenticated } = useConvexAuth();

  return (
    <div className='flex h-screen items-center justify-center'>
      {isAuthenticated ? <UserButton /> : 'Logged out or still loading'}
    </div>
  );
}
