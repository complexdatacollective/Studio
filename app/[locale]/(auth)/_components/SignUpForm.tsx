'use client';

import { useFormState } from 'react-dom';
import { signup } from '~/server/actions/auth';
import { Input } from '~/components/ui/form/Input';
import { Label } from '~/components/ui/form/Label';
import { useTranslations } from 'next-intl';
import { SubmitButton } from '~/components/ui/form/SubmitButton';

export default function SignUpForm() {
  const [formState, formAction] = useFormState(signup, {
    error: null,
  });
  const t = useTranslations('Auth.AuthForm');

  return (
    <form action={formAction}>
      {formState.error && (
        <div className="text-red-500 text-center text-sm">
          {formState.error}
        </div>
      )}

      <div className="flex flex-col gap-3 p-2">
        <Label htmlFor="username">{t('UsernameInput')}</Label>
        <Input
          name="username"
          id="username"
          placeholder={t('UsernameInput').toLowerCase()}
        />
      </div>
      <br />
      <div className="flex flex-col gap-3 p-2">
        <Label htmlFor="password">{t('PasswordInput')}</Label>
        <Input
          type="password"
          name="password"
          id="password"
          autoComplete="new-password"
          placeholder={t('PasswordInput').toLowerCase()}
        />
      </div>
      <br />
      <SubmitButton>{t('FormButton')}</SubmitButton>
    </form>
  );
}
