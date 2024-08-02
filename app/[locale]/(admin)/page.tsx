import { getUserStudies } from '~/server/queries/studies';
import CreateStudyForm from '../_components/CreateStudyForm';
import { requirePageAuth } from '~/lib/auth';
import { routes } from '~/lib/routes';
import { getTranslations } from 'next-intl/server';
import { Link } from '~/lib/localisation/navigation';
import UnorderedList from '~/components/typography/UnorderedList';
import Section from '~/components/layout/Section';
import PageHeader from '~/components/typography/PageHeader';

export default async function Home() {
  await requirePageAuth();

  const t = await getTranslations('Home');
  const studies = await getUserStudies();

  return (
    <>
      <PageHeader headerText={t('title')} subHeaderText={''} />
      <div className="flex flex-col gap-4">
        <CreateStudyForm />
        <Section title={t('allStudiesHeading')}>
          <UnorderedList>
            {studies.map((study) => (
              <li key={study.id}>
                <Link href={routes.studyDashboard({ study: study.slug })}>
                  {study.name}
                </Link>
              </li>
            ))}
          </UnorderedList>
        </Section>
      </div>
    </>
  );
}
