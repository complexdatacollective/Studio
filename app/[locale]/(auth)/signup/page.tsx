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
import Surface from '~/components/layout/Surface';
import Heading from '~/components/typography/Heading';
import Paragraph from '~/components/typography/Paragraph';
import Divider from '~/components/layout/Divider';

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
    <Surface
      as="main"
      aria-labelledby="signup-heading"
      aria-describedby="signup-description"
      className="max-w-lg rounded"
      level={1}
    >
      <Heading variant="h2" id="signup-heading">
        {t('Title')}
      </Heading>
      <Paragraph id="signup-description">
        {t('Description')} <Link href={routes.signIn()}>{t('LinkText')}</Link>
      </Paragraph>
      <Divider />
      <SignUpForm />
    </Surface>
  );
}
