import { getProjectBySlug } from '~/server/queries/projects';
import { routes } from '~/lib/routes';

type InterviewsPageProps = {
  // ✅ Never assume the types of your params before validation
  params?: unknown;
};

export default async function InterviewsPage({ params }: InterviewsPageProps) {
  const { project: projectSlug } =
    routes.orgProjectProtocols.$parseParams(params);

  const project = await getProjectBySlug(projectSlug);
  if (!project) {
    return <div>Project not found</div>;
    // todo: redirect to 404 page
  }

  return (
    <div className="flex flex-col p-12">
      <div className="text-4xl">{project.name} Interviews </div>
      <div>slug: {projectSlug}</div>
    </div>
  );
}
