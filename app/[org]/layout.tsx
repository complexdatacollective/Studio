import Link from 'next/link';

type OrganizationLayoutProps = {
  children: React.ReactNode;
  params: { org: string };
};

const OrganizationLayout = ({ children, params }: OrganizationLayoutProps) => {
  const { org: orgSlug } = params;
  return (
    <>
      <div className="flex flex-row space-x-4 px-4 pt-4 text-lg">
        <Link href={`/`}>Studio</Link>
        <Link href={`/${orgSlug}`}>Org Dashboard</Link>
        <Link href={`/${orgSlug}/settings`}>Org Settings</Link>
      </div>
      {children}
    </>
  );
};

export default OrganizationLayout;
