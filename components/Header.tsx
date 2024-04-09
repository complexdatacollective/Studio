'use client';
import { useQueryWithAuth } from '~/hooks/useAuth';
import { api } from '~/convex/_generated/api';
import { Typography } from './Typography';
import { SignOutButton } from './auth/SignOutButton';
import { SignInButton } from './auth/SignInButton';
import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import { OrganizationSwitcher } from './OrganizationSwitcher';
import { useRouter } from 'next/navigation';

export function Header() {
  const user = useQueryWithAuth(api.users.get, {});
  const router = useRouter();
  return (
    <div className='flex flex-row items-center justify-between bg-slate-200 p-2'>
      <div className='flex flex-col' onClick={() => router.push('/')}>
        <Typography variant='h2'>Studio MVP</Typography>
        <Typography variant='h4'>Convex and Lucia</Typography>
      </div>
      <div className='p-2'>
        {user ? (
          <div className='flex flex-row space-x-4'>
            <OrganizationSwitcher />
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
