import { getTranslations } from 'next-intl/server';
import PageHeader from '~/components/typography/PageHeader';
import { getServerPath } from '~/lib/serverUtils';

export default async function StudyPage() {
  const t = await getTranslations('StudyPage');
  const serverPath = getServerPath();

  return (
    <div className="flex flex-col p-12">
      <PageHeader headerText={t('title')} subHeaderText={serverPath} />
    </div>
  );
}
