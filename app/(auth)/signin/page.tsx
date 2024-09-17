import SignInForm from '../_components/SignInForm';
import { routes } from '~/lib/routes';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getServerSession } from '~/lib/auth';
import { unstable_setRequestLocale } from 'next-intl/server';
import Surface from '~/components/layout/Surface';
import Heading from '~/components/typography/Heading';
import Paragraph from '~/components/typography/Paragraph';
import Divider from '~/components/layout/Divider';

// This should not be needed, because we are using `unstable_setRequestLocale`.
// Possibly a bug?
export const dynamic = 'force-dynamic';

export default async function Page() {
  unstable_setRequestLocale('en');
  const t = await getTranslations('Auth.SignIn');

  const { session } = await getServerSession();

  if (session) {
    // If the user is already signed in, redirect to the home page
    redirect(routes.home());
  }

  return (
    <Surface
      as="main"
      aria-labelledby="signin-heading"
      aria-describedby="signin-description"
      className="max-w-lg rounded"
      level={1}
    >
      <Heading variant="h2" id="signin-heading">
        {t('Title')}
      </Heading>
      <Paragraph id="signin-description">
        {t('Description')} <Link href={routes.signUp()}>{t('LinkText')}</Link>
      </Paragraph>
      <Divider />
      <SignInForm />
    </Surface>
  );
}
