'use client';

import { Typography } from '~/components/Typography';
import { SignInButton, UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='flex flex-col'>
        <Typography variant='h1'>Studio MVP</Typography>
        <Typography variant='h3'>Convex and Clerk</Typography>
        <SignInButton mode='modal' />
        <UserButton />
      </div>
    </div>
  );
}
