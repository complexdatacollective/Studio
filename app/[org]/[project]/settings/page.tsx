import { getProjectBySlug } from '~/server/queries/projects';

export default async function ProjectSettingsPage({
  params,
}: {
  params: { org: string; project: string };
}) {
  const { project: projectSlug } = params;

  const project = await getProjectBySlug(projectSlug);
  if (!project) {
    return <div>Project not found</div>;
    // todo: redirect to 404 page
  }

  return (
    <div className="flex flex-col p-12">
      <div className="text-4xl">{project.name} Settings </div>
      <div>slug: {projectSlug}</div>
    </div>
  );
}
