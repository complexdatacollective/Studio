'use client';

import { UserButton } from '@clerk/clerk-react';
import { useConvexAuth } from 'convex/react';
import { useUser } from '@clerk/clerk-react';

export default function App() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const user = useUser();

  return (
    <div className='flex h-screen items-center justify-center'>
      {isAuthenticated ? <UserButton /> : 'Logged out or still loading'}
    </div>
  );
}
