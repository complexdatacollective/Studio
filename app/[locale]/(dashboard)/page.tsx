import { getUserStudies } from '~/server/queries/studies';
import { routes } from '~/lib/routes';
import { getTranslations } from 'next-intl/server';
import { Link } from '~/lib/localisation/navigation';
import UnorderedList from '~/components/typography/UnorderedList';
import Section from '~/components/layout/Section';
import PageHeader from '~/components/typography/PageHeader';
import ResponsiveContainer from '~/components/layout/ResponsiveContainer';
import { getInterviews } from '~/server/queries/interviews';
import CreateStudyForm from './_components/CreateStudyForm';
import { requirePageAuth } from '~/lib/auth';
import { Button } from '~/components/ui/Button';
import Paragraph from '~/components/typography/Paragraph';

export default async function Dashboard() {
  await requirePageAuth();

  const t = await getTranslations('Home');
  const studies = await getUserStudies();
  const interviews = await getInterviews();

  return (
    <>
      <PageHeader
        headerText={t('title')}
        subHeaderText={'The dashboard page is a place for things'}
      />
      <CreateStudyForm />
      <Section
        title={t('allStudiesHeading')}
        footer={
          <div className="flex gap-2">
            <Button>Default</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="destructive">Delete</Button>
            <Button variant="outline">Outline button</Button>
            <Button variant="link">Link Button</Button>
          </div>
        }
      >
        <UnorderedList>
          {studies.map((study) => (
            <li key={study.id}>
              <Link href={routes.studyDashboard({ study: study.slug })}>
                {study.name}
              </Link>
            </li>
          ))}
        </UnorderedList>
        <Section level={2} title="Nested Section">
          <Paragraph>This is a nested section.</Paragraph>
        </Section>
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
    </>
  );
}
