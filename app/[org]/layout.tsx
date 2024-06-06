import Link from 'next/link';

type OrganizationLayoutProps = {
  children: React.ReactNode;
  params: { org: string };
};

const OrganizationLayout = ({ children, params }: OrganizationLayoutProps) => {
  const { org: orgSlug } = params;
  return (
    <>
      <div className="flex flex-row space-x-2 text-slate-700">
        <Link href={`/${orgSlug}`}>Organization Dashboard</Link>
        <Link href={`/${orgSlug}/settings`}>Organization Settings</Link>
      </div>
      {children}
    </>
  );
};

export default OrganizationLayout;
