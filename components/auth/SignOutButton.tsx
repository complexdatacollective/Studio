import { useSignOut } from '@convex-dev/convex-lucia-auth/react';
import { Button } from '../ui/button';

export function SignOutButton() {
  return <Button onClick={useSignOut()}>Logout</Button>;
}
