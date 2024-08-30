import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/Card';
import SignInForm from '../_components/SignInForm';
import { routes } from '~/lib/routes';
import { Link, redirect } from '~/lib/localisation/navigation';
import { getTranslations } from 'next-intl/server';
import { getServerSession } from '~/lib/auth';
import type { Locale } from '~/lib/localisation/locales';
import { unstable_setRequestLocale } from 'next-intl/server';

// This should not be needed, because we are using `unstable_setRequestLocale`.
// Possibly a bug?
export const dynamic = 'force-dynamic';

export default async function Page({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('Auth.SignIn');

  const { session } = await getServerSession();

  if (session) {
    // If the user is already signed in, redirect to the home page
    redirect(routes.home());
  }

  return (
    <Card className="w-[28rem]">
      <CardHeader>
        <CardTitle>{t('CardTitle')}</CardTitle>
        <CardDescription>
          {t('CardDescription')}{' '}
          <Link href={routes.signUp()}>{t('LinkText')}</Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  );
}
