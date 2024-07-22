import { getTranslations } from 'next-intl/server';
import { getServerPath } from '~/lib/serverUtils';

export default async function StudyPage() {
  const t = await getTranslations('StudyPage');
  const serverPath = getServerPath();

  return (
    <div className="flex flex-col p-12">
      <h1 className="pb-4 text-4xl">{t('title')}</h1>
      <p>{serverPath}</p>
    </div>
  );
}
