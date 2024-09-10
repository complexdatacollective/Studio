import { getTranslations } from 'next-intl/server';

export default async function StudySettingsPage() {
  const t = await getTranslations('Pages.Study.SettingsPage');

  return (
    <div className="flex flex-col p-12">
      <div className="text-4xl">{t('Title')}</div>
      <div>{t('Description')}</div>
    </div>
  );
}
