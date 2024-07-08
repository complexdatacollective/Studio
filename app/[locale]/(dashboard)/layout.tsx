import ResponsiveContainer from '~/components/layout/ResponsiveContainer';

import LanguageSwitcher from '../../_components/LanguageSwitcher';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="m-2">
        <LanguageSwitcher />
      </div>
      <ResponsiveContainer>{children}</ResponsiveContainer>
    </div>
  );
}
