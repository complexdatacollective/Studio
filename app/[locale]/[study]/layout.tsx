import { getTranslations } from 'next-intl/server';
import { Link } from '~/lib/localisation/navigation';
import { routes } from '~/lib/routes';

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: unknown;
}) => {
  const { study } = routes.studyDashboard.$parseParams(params);
  const t = await getTranslations('TopNavigation');

  return (
    <main>
      <div className="flex flex-row space-x-2 px-4 pt-4 text-lg">
        <div>
          <Link href={`/`}>{t('home')}</Link> &#x2794;
        </div>
        <div>
          <Link href={routes.studyDashboard({ study })}>{t('dashboard')}</Link>{' '}
          &#x2794;
        </div>
        <Link href={routes.studySettings({ study })}>{t('settings')}</Link>
      </div>
      {children}
    </main>
  );
};

export default Layout;
