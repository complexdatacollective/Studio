import { getTranslations } from 'next-intl/server';
import Heading from '~/components/typography/Heading';
import Paragraph from '~/components/typography/Paragraph';

export default async function StudySettingsPage() {
  const t = await getTranslations('StudySettingsPage');

  return (
    <div className="flex flex-col p-12">
      <Heading variant="h1">{t('title')}</Heading>
      <Paragraph>{t('description')}</Paragraph>
    </div>
  );
}
