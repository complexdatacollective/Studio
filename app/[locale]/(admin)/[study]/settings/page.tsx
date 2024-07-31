import { getTranslations } from 'next-intl/server';

export default async function StudySettingsPage() {
  const t = await getTranslations('StudySettingsPage');

  return (
    <div className="flex flex-col p-12">
      <div className="text-4xl">{t('title')}</div>
      <div>{t('description')}</div>
    </div>
  );
}
