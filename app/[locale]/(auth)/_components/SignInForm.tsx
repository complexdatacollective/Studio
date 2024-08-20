import { login } from '~/server/actions/auth';
import { Input } from '~/components/ui/form/Input';
import { SubmitButton } from '~/components/ui/form/SubmitButton';

export default function SignInForm() {
  return (
    <form action={login} className="flex w-full flex-col">
      <div className="mb-6 flex flex-wrap">
        <Input
          name="username"
          label="Username"
          autoComplete="username"
          className="w-full"
        />
      </div>
      <div className="mb-6 flex flex-wrap">
        <Input
          name="password"
          type="password"
          label="Password"
          autoComplete="current-password"
          className="w-full"
        />
      </div>
      <div className="flex flex-wrap">
        <SubmitButton>Sign In</SubmitButton>
      </div>
    </form>
  );
}
