import { getTranslations } from 'next-intl/server';
import ResponsiveContainer from '~/components/layout/ResponsiveContainer';
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
    <div className="flex flex-col">
      <nav className="flex flex-row space-x-2 bg-cyber-grape px-4 pt-4 text-lg text-white">
        <div>
          <Link href={`/`}>{t('home')}</Link> &#x2794;
        </div>
        <div>
          <Link href={routes.studyDashboard({ study })}>{t('dashboard')}</Link>{' '}
          &#x2794;
        </div>
        <Link href={routes.studySettings({ study })}>{t('settings')}</Link>
      </nav>
      <ResponsiveContainer>{children}</ResponsiveContainer>
    </div>
  );
};

export default Layout;
