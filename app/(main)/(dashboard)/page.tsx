import { getTranslations } from 'next-intl/server';
import { route } from 'nextjs-routes';
import { Button } from '~/components/Button';
import Section from '~/components/layout/Section';
import Link from '~/components/Link';
import PageHeader from '~/components/typography/PageHeader';
import Paragraph from '~/components/typography/Paragraph';
import UnorderedList from '~/components/typography/UnorderedList';
import { requirePageAuth } from '~/lib/auth';
import { getInterviews } from '~/server/queries/interviews';
import { getUserStudies } from '~/server/queries/studies';
import CreateStudyForm from './_components/CreateStudyForm';

export default async function Dashboard() {
  await requirePageAuth();

  const t = await getTranslations('Pages.Home');
  const studies = await getUserStudies();
  const interviews = await getInterviews();

  return (
    <>
      <PageHeader
        headerText={t('Title')}
        subHeaderText={'The dashboard page is a place for things'}
      />
      <CreateStudyForm />
      <Section
        title={t('AllStudiesHeading')}
        footer={
          <div className="flex gap-2">
            <Button>Default</Button>
            <Button color="primary">Primary</Button>
            <Button color="accent">Accent</Button>
            <Button color="destructive">Delete</Button>
            <Button variant="outline">Outline button</Button>
            <Button variant="text">Link Button</Button>
          </div>
        }
      >
        <UnorderedList>
          {studies.map((study) => (
            <li key={study.id}>
              <Link
                href={route({
                  pathname: '/[study]',
                  query: { study: study.slug },
                })}
              >
                {study.name}
              </Link>
            </li>
          ))}
        </UnorderedList>
        <Section level={2} title="Nested Section">
          <Paragraph>This is a nested section.</Paragraph>
          <div className="flex gap-2">
            <Button>Default</Button>
            <Button color="primary">Primary</Button>
            <Button color="accent">Accent</Button>
            <Button color="destructive">Delete</Button>
            <Button variant="outline">Outline button</Button>
            <Button variant="text">Link Button</Button>
          </div>
        </Section>
      </Section>
      <Section title={t('InterviewsHeading')}>
        <UnorderedList>
          {interviews.map((interview) => (
            <li key={interview.id}>
              <Link
                href={route({
                  pathname: '/interview/[interviewId]',
                  query: { interviewId: interview.publicId },
                })}
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
