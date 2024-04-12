import { pageAuthorization } from '~/lib/pageAuthorization';
import ProjectDashboard from '../_components/ProjectDashboard';

export default async function ProjectPage({
  params,
}: {
  params: { organization: string; project: string };
}) {
  await pageAuthorization({
    paramsOrganizationSlug: params.organization,
    paramsProjectSlug: params.project,
  });
  return <ProjectDashboard />;
}
