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

export default async function Page({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('SignIn');

  const { session } = await getServerSession();

  if (session) {
    // If the user is already signed in, redirect to the home page
    redirect(routes.home());
  }

  return (
    <Card className="w-[28rem]">
      <CardHeader>
        <CardTitle>{t('cardTitle')}</CardTitle>
        <CardDescription>
          {t('cardDescription')}{' '}
          <Link href={routes.signUp()}>{t('linkText')}</Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  );
}
