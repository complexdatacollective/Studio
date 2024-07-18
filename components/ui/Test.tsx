import { useTranslations } from 'next-intl';

export default function Test() {
  const t = useTranslations('Test');

  return <div className="h-20 w-48 bg-sea-green p-4">{t('hello')}</div>;
}
