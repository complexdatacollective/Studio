'use client';

import { useFormState } from 'react-dom';
import { signin } from '~/server/actions/auth';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { useTranslations } from 'next-intl';

const SignInForm = () => {
  const initialState = { error: null, success: false };
  const [formState, formAction] = useFormState(signin, initialState);
  const t = useTranslations('AuthForm');

  return (
    <form action={formAction}>
      {formState.error && (
        <div className="text-center text-sm text-red-500">
          {formState.error}
        </div>
      )}

      <div className="flex flex-col gap-3 p-2">
        <Label htmlFor="username">{t('usernameInput')}</Label>
        <Input
          name="username"
          id="username"
          placeholder={t('usernameInput').toLowerCase()}
        />
      </div>
      <br />
      <div className="flex flex-col gap-3 p-2">
        <Label htmlFor="password">{t('passwordInput')}</Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder={t('passwordInput').toLowerCase()}
        />
      </div>
      <br />
      <Button>{t('formButton')}</Button>
    </form>
  );
};

export default SignInForm;
