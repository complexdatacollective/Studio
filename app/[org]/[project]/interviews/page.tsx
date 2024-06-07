import { getProjectBySlug } from '~/queries/projects';

export default async function InterviewsPage({
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
      <div className="text-4xl">{project.name} Interviews </div>
      <div>slug: {projectSlug}</div>
    </div>
  );
}
