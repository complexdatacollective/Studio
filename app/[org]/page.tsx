import { getProjects } from '~/actions/projects';
import CreateProjectForm from '~/components/CreateProjectForm';

export default async function OrgPage({ params }: { params: { org: string } }) {
  const { org } = params;
  const allProjects = await getProjects(org);
  return (
    <main className="flex flex-col items-center p-24">
      <div className="text-2xl">Organization Page</div>
      <div>slug: {org}</div>

      <div>All Projects</div>
      <div className="flex flex-col">
        {allProjects
          ? allProjects.map((project) => (
              <a key={project.id} href={`/${org}/${project.slug}`}>
                {project.name}
              </a>
            ))
          : 'No projects found'}
      </div>

      <CreateProjectForm orgSlug={org} />
    </main>
  );
}
