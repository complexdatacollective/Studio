import { useTranslations } from 'next-intl';
import Link from '~/components/Link';

export const dynamic = 'force-dynamic';

export default function NotFound() {
  const t = useTranslations('Pages.Study.NotFound');
  return (
    <div>
      <h2>{t('Title')}</h2>
      <p>{t('Description')}</p>
      <Link href="/">{t('HomeText')}</Link>
    </div>
  );
}
