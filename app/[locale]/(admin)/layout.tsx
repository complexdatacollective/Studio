import ResponsiveContainer from '~/components/layout/ResponsiveContainer';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ResponsiveContainer>{children}</ResponsiveContainer>;
}
