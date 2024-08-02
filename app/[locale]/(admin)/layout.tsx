import ResponsiveContainer from '~/components/layout/ResponsiveContainer';
import LanguageSwitcher from '../_components/LanguageSwitcher';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ResponsiveContainer>
      <LanguageSwitcher />
      {children}
    </ResponsiveContainer>
  );
}
