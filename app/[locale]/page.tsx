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
    <main className="flex flex-col gap-4">
      <Heading variant="h1">{t('title')}</Heading>
      <CreateStudyForm />
      <section className="rounded-lg border p-4">
        <Heading variant="h2">{t('allStudiesHeading')}</Heading>
        <UnorderedList>
          {studies.map((study) => (
            <li key={study.id}>
              <Link href={routes.studyDashboard({ study: study.slug })}>
                {study.name}
              </Link>
            </li>
          ))}
        </UnorderedList>
      </section>
      <SignOutBtn />
    </main>
  );
}
