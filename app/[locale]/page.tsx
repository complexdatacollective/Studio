import { getStudies } from '~/server/queries/studies';
import CreateStudyForm from './_components/CreateStudyForm';
import { requirePageAuth } from '~/lib/auth';
import SignOutBtn from '../_components/SignOutBtn';
import { routes } from '~/lib/routes';
import { getTranslations } from 'next-intl/server';
import { Link } from '~/lib/localisation/navigation';
import Heading from '~/components/typography/Heading';
import UnorderedList from '~/components/typography/UnorderedList';

export default async function Home() {
  await requirePageAuth();
  const t = await getTranslations('Home');

  const studies = await getStudies();
  return (
    <main className="flex flex-col p-12">
      <Heading variant="h1">{t('title')}</Heading>
      <CreateStudyForm />
      <Heading variant="h2">{t('allStudiesHeading')}</Heading>
      <div className="text-blue-700 flex flex-col underline">
        {studies.map((study) => (
          <Link
            key={study.id}
            href={routes.studyDashboard({ study: study.slug })}
          >
            {study.name}
          </Link>
        ))}
      </div>
      <Heading variant="h2">Test Pages</Heading>
      <UnorderedList>
        <li>
          <Link href={routes.authedActions()}>Authed Actions</Link>
        </li>
      </UnorderedList>
      <SignOutBtn />
    </main>
  );
}
