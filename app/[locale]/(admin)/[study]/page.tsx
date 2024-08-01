import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import PageHeader from '~/components/typography/PageHeader';
import { Link } from '~/lib/localisation/navigation';
import { routes } from '~/lib/routes';
import { getServerPath } from '~/lib/serverUtils';
import { getStudyData } from '~/server/queries/studies';

export default async function StudyPage({ params }: { params?: unknown }) {
  const t = await getTranslations('StudyPage');
  const serverPath = getServerPath();
  const { study } = routes.studyDashboard.$parseParams(params);
  const studyData = await getStudyData(study);

  if (!studyData) {
    notFound();
  }

  return (
    <div className="flex flex-col p-12">
      <PageHeader headerText={t('title')} subHeaderText={serverPath} />
      <p>
        Visit the <Link href="/authed-actions">authed actions test page</Link>.
      </p>
      <pre>
        <code>{JSON.stringify(studyData, null, 2)}</code>
      </pre>
    </div>
  );
}
