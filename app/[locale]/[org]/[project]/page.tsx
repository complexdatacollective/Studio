import { getProjectBySlug } from '~/server/queries/projects';
import { routes } from '~/lib/routes';

type ProjectPageProps = {
  // ✅ Never assume the types of your params before validation
  params?: unknown;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { project: projectSlug } = routes.orgProject.$parseParams(params);

  const project = await getProjectBySlug(projectSlug);
  if (!project) {
    return <div>Project not found</div>;
    // todo: redirect to 404 page
  }

  return (
    <div className="flex flex-col p-12">
      <div className="pb-4 text-4xl">{project.name} Project Page</div>
      <div>slug: {projectSlug}</div>
    </div>
  );
}
