import { Link } from '~/lib/localisation/navigation';
import { routes } from '~/lib/routes';

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    locale: string;
    study: string;
  };
}) {
  return (
    <>
      <div className="block border-t border-opacity-20 py-5">
        <div className="grid grid-cols-3 items-center gap-8">
          <div className="col-span-2">
            <nav className="flex space-x-4">
              <Link href={routes.studyDashboard({ study: params.study })}>
                Home
              </Link>
              <Link href={routes.studySettings({ study: params.study })}>
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <section className="overflow-hidden p-6 shadow">{children}</section>
    </>
  );
}
