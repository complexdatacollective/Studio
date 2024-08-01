import LanguageSwitcher from '~/app/_components/LanguageSwitcher';
import ResponsiveContainer from '~/components/layout/ResponsiveContainer';

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
