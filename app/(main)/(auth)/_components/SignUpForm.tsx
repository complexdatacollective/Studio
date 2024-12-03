'use client';

import { useTranslations } from 'next-intl';
import { useFormState } from 'react-dom';
import Form from '~/components/form/Form';
import { Input } from '~/components/form/Input';
import { SubmitButton } from '~/components/form/SubmitButton';
import { signup } from '~/server/actions/auth';

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
        label={t('Form.UsernameLabel')}
        hint={t('Form.UsernameHint')}
        name="username"
        id="username"
      />
      <Input
        type="password"
        label={t('Form.PasswordLabel')}
        hint={t('Form.PasswordHint')}
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
