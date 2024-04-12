'use client';
import { Typography } from './Typography';
import { SignInButton, UserButton } from '@clerk/nextjs';
import { Navigation } from './Navigation';
import { useConvexAuth } from 'convex/react';

export function Header() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  return (
    <div className='flex flex-row items-center justify-between bg-slate-200 p-2'>
      <div className='flex flex-row items-center space-x-2'>
        <div className='flex flex-col'>
          <Typography variant='h4'>Studio MVP</Typography>
          <Typography variant='h4'>Convex + Clerk</Typography>
        </div>
        {isAuthenticated && <Navigation />}
      </div>
      <div className='p-2'>
        {isAuthenticated ? (
          <div className='flex flex-row space-x-4'>
            <UserButton />
          </div>
        ) : (
          <SignInButton />
        )}
      </div>
    </div>
  );
}
