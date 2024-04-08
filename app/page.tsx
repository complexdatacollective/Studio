'use client';

import { Typography } from '~/components/Typography';
import { AuthForm } from '~/components/auth/AuthForm';
import { api } from '~/convex/_generated/api';
import { useQueryWithAuth } from '@convex-dev/convex-lucia-auth/react';
import { SignOutButton } from '~/components/auth/SignOutButton';

export default function Home() {
  const user = useQueryWithAuth(api.users.get, {});

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='flex flex-col'>
        <Typography variant='h1'>Studio MVP</Typography>
        <Typography variant='h3'>Convex and Lucia</Typography>
        {user ? (
          <div className='flex flex-col'>
            <Typography variant='h2'>Welcome, {user.email}</Typography>
            <SignOutButton />
          </div>
        ) : (
          <AuthForm />
        )}
      </div>
    </div>
  );
}
