import { login } from '~/server/actions/auth';
import { Input } from '~/components/ui/form/Input';
import { SubmitButton } from '~/components/ui/form/SubmitButton';
import Form from '~/components/ui/form/Form';
import { getTranslations } from 'next-intl/server';
import { Link } from '~/lib/localisation/navigation';

export default async function SignInForm() {
  const t = await getTranslations('Auth.AuthForm');

  return (
    <Form action={login}>
      <Input
        name="username"
        label={t('UsernameLabel')}
        autoComplete="username"
      />
      <Input
        name="password"
        type="password"
        label={t('PasswordLabel')}
        autoComplete="current-password"
      />
      <Form.Footer
        primaryAction={<SubmitButton>{t('ButtonText')}</SubmitButton>}
        secondaryAction={
          <Link href="/forgot-password" className="text-sm">
            {t('ForgotPassword')}
          </Link>
        }
      />
    </Form>
  );
}
