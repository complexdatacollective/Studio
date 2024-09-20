import SignUpForm from '../_components/SignUpForm';
import { getServerSession } from '~/lib/auth';
import Link from '~/components/Link';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Surface from '~/components/layout/Surface';
import Heading from '~/components/typography/Heading';
import Paragraph from '~/components/typography/Paragraph';
import Divider from '~/components/layout/Divider';

export default async function Page() {
  const { session, user } = await getServerSession();
  const t = await getTranslations('Auth.SignUp');

  if (session && user) {
    // If the user is already signed in, redirect to the home page
    redirect('/');
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
        {t('Description')} <Link href="/signin">{t('LinkText')}</Link>
      </Paragraph>
      <Divider />
      <SignUpForm />
    </Surface>
  );
}
