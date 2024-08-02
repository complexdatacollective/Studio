import ResponsiveContainer from '~/components/layout/ResponsiveContainer';
import MainNavigation from '../_components/MainNavigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ResponsiveContainer>
      <MainNavigation />
      {children}
    </ResponsiveContainer>
  );
}
