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
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const { session, user } = await getServerSession();
  const t = await getTranslations('SignUp');

  if (session && user) {
    // If the user is already signed in, redirect to the home page
    redirect(routes.home());
  }

  return (
    <Card className="w-[28rem]">
      <CardHeader>
        <CardTitle>{t('cardTitle')}</CardTitle>
        <CardDescription>
          {t('cardDescription')}{' '}
          <Link href={routes.signIn()}>{t('linkText')}</Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
    </Card>
  );
}
