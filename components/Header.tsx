'use client';
import { useQueryWithAuth } from '~/hooks/useAuth';
import { api } from '~/convex/_generated/api';
import { Typography } from './Typography';
import { SignOutButton } from './auth/SignOutButton';
import { SignInButton } from './auth/SignInButton';
import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import Link from 'next/link';
import { Navigation } from './Navigation';

export function Header() {
  const user = useQueryWithAuth(api.users.get, {});
  return (
    <div className='flex flex-row items-center justify-between bg-slate-200 p-2'>
      <div className='flex flex-row items-center space-x-2'>
        <Link href='/'>
          <div className='flex flex-col'>
            <Typography variant='h4'>Studio MVP</Typography>
            <Typography variant='h4'>Convex + Lucia</Typography>
          </div>
        </Link>
        {user && <Navigation />}
      </div>
      <div className='p-2'>
        {user ? (
          <div className='flex flex-row space-x-4'>
            <Avatar>
              <AvatarFallback>{user?.email[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <SignOutButton />
          </div>
        ) : (
          <SignInButton />
        )}
      </div>
    </div>
  );
}
