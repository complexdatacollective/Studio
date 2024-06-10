import { routes } from '~/lib/routes';

type OrgSettingPageProps = {
  // ✅ Never assume the types of your params before validation
  params?: unknown;
};

export default function OrgSettingPage({ params }: OrgSettingPageProps) {
  const { org } = routes.orgSettings.$parseParams(params);

  return (
    <div className="flex flex-col p-12">
      <div className="text-4xl">Organization Settings Page</div>
      <div>slug: {org}</div>
    </div>
  );
}
