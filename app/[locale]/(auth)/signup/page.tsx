import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/Card';
import SignUpForm from '../_components/SignUpForm';
import { getServerSession } from '~/lib/auth';
import { routes } from '~/lib/routes';
import { Link, redirect } from '~/lib/localisation/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import type { Locale } from '~/lib/localisation/locales';

export default async function Page({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);
  const { session, user } = await getServerSession();
  const t = await getTranslations('Auth.SignUp');

  if (session && user) {
    // If the user is already signed in, redirect to the home page
    redirect(routes.home());
  }

  return (
    <Card className="w-[28rem]">
      <CardHeader>
        <CardTitle>{t('CardTitle')}</CardTitle>
        <CardDescription>
          {t('CardDescription')}{' '}
          <Link href={routes.signIn()}>{t('LinkText')}</Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
    </Card>
  );
}
