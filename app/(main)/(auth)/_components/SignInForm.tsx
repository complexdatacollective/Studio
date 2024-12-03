import { getTranslations } from 'next-intl/server';
import Form from '~/components/form/Form';
import { Input } from '~/components/form/Input';
import { SubmitButton } from '~/components/form/SubmitButton';
import Link from '~/components/Link';
import { login } from '~/server/actions/auth';

export default async function SignInForm() {
  const t = await getTranslations('Auth');

  return (
    <Form action={login}>
      <Input
        name="username"
        label={t('Form.UsernameLabel')}
        autoComplete="username"
      />
      <Input
        name="password"
        type="password"
        label={t('Form.PasswordLabel')}
        autoComplete="current-password"
      />
      <Form.Footer
        primaryAction={<SubmitButton>{t('SignIn.ButtonText')}</SubmitButton>}
        secondaryAction={
          <Link href="/" className="text-sm">
            {t('Form.ForgotPassword')}
          </Link>
        }
      />
    </Form>
  );
}
