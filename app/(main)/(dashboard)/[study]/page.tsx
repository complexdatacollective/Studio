import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import PageHeader from '~/components/typography/PageHeader';
import { routes } from '~/lib/routes';
import { getCurrentPath } from '~/lib/serverUtils';
import { getStudyData } from '~/server/queries/studies';

export default async function StudyPage({ params }: { params?: unknown }) {
  const t = await getTranslations('Pages.Study');
  const serverPath = getCurrentPath();
  const { study } = routes.studyDashboard.$parseParams(params);
  const studyData = await getStudyData(study);

  if (!studyData) {
    notFound();
  }

  return (
    <>
      <PageHeader headerText={t('Title')} subHeaderText={serverPath} />
      <p></p>
      <pre>
        <code>{JSON.stringify(studyData, null, 2)}</code>
      </pre>
    </>
  );
}
