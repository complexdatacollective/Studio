import Link from '~/components/Link';
import { route } from 'nextjs-routes';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    study: string;
  }>;
}) {
  const { study } = await params;
  return (
    <>
      <div className="block border-t border-opacity-20 py-5">
        <div className="grid grid-cols-3 items-center gap-8">
          <div className="col-span-2">
            <nav className="flex space-x-4">
              <Link
                href={route({
                  pathname: '/',
                })}
              >
                Overview
              </Link>
              <Link
                href={route({
                  pathname: '/[study]',
                  query: { study },
                })}
              >
                Dashboard
              </Link>
              <Link
                href={route({
                  pathname: '/[study]/settings',
                  query: { study },
                })}
              >
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
