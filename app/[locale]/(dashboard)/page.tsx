import { getUserStudies } from '~/server/queries/studies';
import { requirePageAuth } from '~/lib/auth';
import { routes } from '~/lib/routes';
import { getTranslations } from 'next-intl/server';
import { Link } from '~/lib/localisation/navigation';
import UnorderedList from '~/components/typography/UnorderedList';
import Section from '~/components/layout/Section';
import PageHeader from '~/components/typography/PageHeader';
import ResponsiveContainer from '~/components/layout/ResponsiveContainer';
import { getInterviews } from '~/server/queries/interviews';
import CreateStudyForm from './_components/CreateStudyForm';

export default async function Home() {
  await requirePageAuth();

  const t = await getTranslations('Home');
  const studies = await getUserStudies();
  const interviews = await getInterviews();

  return (
    <ResponsiveContainer className="flex flex-col gap-4">
      <PageHeader headerText={t('title')} subHeaderText={''} />
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
      <Section title={t('interviewsHeading')}>
        <UnorderedList>
          {interviews.map((interview) => (
            <li key={interview.id}>
              <Link
                href={routes.interview({ interviewId: interview.publicId })}
              >
                {interview.id}
              </Link>
            </li>
          ))}
        </UnorderedList>
      </Section>
    </ResponsiveContainer>
  );
}
