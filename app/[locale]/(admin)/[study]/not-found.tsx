import { useTranslations } from 'next-intl';
import { Link } from '~/lib/localisation/navigation';
import { routes } from '~/lib/routes';

export default function NotFound() {
  const t = useTranslations('StudyNotFound');
  return (
    <div>
      <h2>{t('title')}</h2>
      <p>{t('description')}</p>
      <Link href={routes.home()}>{t('homeText')}</Link>
    </div>
  );
}
