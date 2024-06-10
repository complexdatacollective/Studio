import Link from 'next/link';
import { routes } from '~/lib/routes';

type OrganizationLayoutProps = {
  children: React.ReactNode;
  // ✅ Never assume the types of your params before validation
  params?: unknown;
};

const OrganizationLayout = ({ children, params }: OrganizationLayoutProps) => {
  const { org } = routes.orgDashboard.$parseParams(params);

  return (
    <main>
      <div className="flex flex-row space-x-2 px-4 pt-4 text-lg">
        <div>
          <Link href={`/`}>Studio</Link> &#x2794;
        </div>
        <div>
          <Link href={routes.orgDashboard({ org })}>Org Dashboard</Link>{' '}
          &#x2794;
        </div>
        <Link href={routes.orgSettings({ org })}>Org Settings</Link>
      </div>
      {children}
    </main>
  );
};

export default OrganizationLayout;
