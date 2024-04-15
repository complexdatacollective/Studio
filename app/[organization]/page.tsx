import { pageAuthorization } from '~/lib/pageAuthorization';
import OrganizationDashboard from './_components/OrganizationDashboard';

export default async function OrganizationPage({
  params,
}: {
  params: { organization: string };
}) {
  // await pageAuthorization({
  //   paramsOrganizationSlug: params.organization,
  // });
  return <OrganizationDashboard />;
}
