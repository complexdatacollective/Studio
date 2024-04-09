import { useSetSessionId } from '~/providers/SessionProvider';
import { Button } from '../ui/button';

export function SignOutButton() {
  const setSessionId = useSetSessionId();
  return <Button onClick={() => setSessionId(null)}>Sign Out</Button>;
}
