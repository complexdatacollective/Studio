import { getTranslations } from 'next-intl/server';

export default async function StudyPage() {
  const t = await getTranslations('StudyPage');

  return (
    <div className="flex flex-col p-12">
      <h1 className="pb-4 text-4xl">{t('title')}</h1>
    </div>
  );
}
