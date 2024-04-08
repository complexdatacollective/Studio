'use client';
import {
  SignOutButton,
  useQueryWithAuth,
} from '@convex-dev/convex-lucia-auth/react';
import { api } from '~/convex/_generated/api';

export default function Dashboard() {
  const user = useQueryWithAuth(api.users.get, {});

  return (
    <div className='flex h-screen items-center justify-center'>
      {user ? <SignOutButton /> : 'Logged out'}
    </div>
  );
}
