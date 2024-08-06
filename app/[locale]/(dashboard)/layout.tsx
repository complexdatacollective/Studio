import ResponsiveContainer from '~/components/layout/ResponsiveContainer';
import MainNavigation from '../_components/MainNavigation';
import { getServerSession } from '~/lib/auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = await getServerSession();

  return (
    <ResponsiveContainer>
      <MainNavigation showStudySwitcher={!!session} />
      {children}
    </ResponsiveContainer>
  );
}
