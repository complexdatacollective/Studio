import { User } from 'lucia';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function authHelper({ user }: { user: User | null }) {
  const pathname = usePathname();
  const router = useRouter();
  // check if user is authenticated
  // everywhere except the login page
  if (!user && pathname !== '/login') {
    router.push('/login');
  }

  if (!user) {
    return;
  }

  if (user && pathname === '/login') {
    router.push('/');
  }

  // From here on, we know the user is authenticated.
  return;
}
