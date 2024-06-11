import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { validateRequest } from '~/lib/auth';
import SignInForm from './_components/SignInForm';
import { routes } from '~/lib/routes';
import { Link, redirect } from '~/lib/localisation/navigation';
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const { session, user } = await validateRequest();
  const t = await getTranslations('SignIn');

  if (session && user) {
    // If the user is already signed in, redirect to the home page
    redirect(routes.home());
  }

  return (
    <div className="grid h-[100vh] w-full items-center justify-center gap-1.5">
      <Card className="m-3 w-[28rem]">
        <CardHeader>
          <CardTitle>{t('cardTitle')}</CardTitle>
          <CardDescription>
            {t('cardDescription')}{' '}
            <Link className="text-blue-400 underline" href={routes.signUp()}>
              {t('linkText')}
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  );
}
