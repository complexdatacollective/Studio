import { login } from '~/server/actions/auth';
import { Input } from '~/components/ui/form/Input';
import { SubmitButton } from '~/components/ui/form/SubmitButton';
import Form from '~/components/ui/form/Form';
import { getTranslations } from 'next-intl/server';
import { Link } from '~/lib/localisation/navigation';
import { Button } from '~/components/ui/Button';

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
        primaryAction={
          <>
            <Button>Cancel</Button>
            <SubmitButton>{t('SignIn.ButtonText')}</SubmitButton>
          </>
        }
        secondaryAction={
          <Link href="/forgot-password" className="text-sm">
            {t('Form.ForgotPassword')}
          </Link>
        }
      />
    </Form>
  );
}
