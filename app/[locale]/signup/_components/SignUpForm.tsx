'use client';

import { useFormState } from 'react-dom';
import { signup } from '~/server/actions/auth';
import { Button } from '~/components/ui/Button';
import { Input } from '~/components/ui/form/Input';
import { useTranslations } from 'next-intl';

const SignUpForm = () => {
  const initialState = { error: null, success: false };
  const [formState, formAction] = useFormState(signup, initialState);
  const t = useTranslations('AuthForm');

  return (
    <form action={formAction}>
      {formState.error && (
        <div className="text-center text-sm text-red-500">
          {formState.error}
        </div>
      )}

      <div className="flex flex-col gap-3 p-2">
        <Input
          label={t('usernameInput')}
          name="username"
          id="username"
          placeholder={t('usernameInput').toLowerCase()}
        />
      </div>
      <br />
      <div className="flex flex-col gap-3 p-2">
        <Input
          label={t('passwordInput')}
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

export default SignUpForm;
