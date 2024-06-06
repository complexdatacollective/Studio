import { getProjectBySlug } from '~/actions/projects';

export default async function ParticipantsPage({
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
    <main className="flex flex-col items-center p-24">
      <div className="text-2xl">{project.name} Participants </div>
      <div>slug: {projectSlug}</div>
    </main>
  );
}
