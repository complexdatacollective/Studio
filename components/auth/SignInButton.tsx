import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '~/components/ui/dialog';
import { AuthForm } from './AuthForm';

export function SignInButton() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button> Sign In</Button>
      </DialogTrigger>
      <DialogContent>
        <AuthForm />
      </DialogContent>
    </Dialog>
  );
}
