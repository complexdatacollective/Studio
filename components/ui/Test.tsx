import { useTranslations } from 'next-intl';

export default function Test() {
  const t = useTranslations('Test');

  return <div className="h-48 w-48 bg-sea-green p-4">{t('hello')}</div>;
}
