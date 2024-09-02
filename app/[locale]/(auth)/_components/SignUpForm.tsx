'use client';

import { useFormState } from 'react-dom';
import { signup } from '~/server/actions/auth';
import { Input } from '~/components/ui/form/Input';
import { useTranslations } from 'next-intl';
import { SubmitButton } from '~/components/ui/form/SubmitButton';
import Form from '~/components/ui/form/Form';

export default function SignUpForm() {
  const [formState, formAction] = useFormState(signup, {
    error: null,
  });
  const t = useTranslations('Auth');

  return (
    <Form action={formAction}>
      {formState.error && (
        <div className="text-red-500 text-center text-sm">
          {formState.error}
        </div>
      )}
      <Input
        label={t('AuthForm.UsernameLabel')}
        hint={t('AuthForm.UsernameHint')}
        name="username"
        id="username"
      />
      <Input
        type="password"
        label={t('AuthForm.PasswordLabel')}
        hint={t('AuthForm.PasswordHint')}
        name="password"
        id="password"
        autoComplete="new-password"
      />
      <Form.Footer
        primaryAction={<SubmitButton>{t('SignUp.ButtonText')}</SubmitButton>}
      />
    </Form>
  );
}
