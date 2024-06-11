import { getTranslations } from 'next-intl/server';
import { Link } from '~/lib/localisation/navigation';
import { routes } from '~/lib/routes';

type OrganizationLayoutProps = {
  children: React.ReactNode;
  // ✅ Never assume the types of your params before validation
  params?: unknown;
};

const OrganizationLayout = async ({
  children,
  params,
}: OrganizationLayoutProps) => {
  const { org } = routes.orgDashboard.$parseParams(params);
  const t = await getTranslations('TopNavigation');

  return (
    <main>
      <div className="flex flex-row space-x-2 px-4 pt-4 text-lg">
        <div>
          <Link href={`/`}>{t('studioLink')}</Link> &#x2794;
        </div>
        <div>
          <Link href={routes.orgDashboard({ org })}>
            {t('orgDashboardLink')}
          </Link>{' '}
          &#x2794;
        </div>
        <Link href={routes.orgSettings({ org })}>{t('orgSettingsLink')}</Link>
      </div>
      {children}
    </main>
  );
};

export default OrganizationLayout;
