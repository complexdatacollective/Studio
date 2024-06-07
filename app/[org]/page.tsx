import { getProjects } from '~/queries/projects';
import CreateProjectForm from '~/app/[org]/_components/CreateProjectForm';
import ProjectCard from './_components/ProjectCard';

export default async function OrgPage({ params }: { params: { org: string } }) {
  const { org } = params;
  const allProjects = await getProjects(org);
  return (
    <div className="flex flex-col p-12">
      <h1 className="pb-4 text-4xl">Organization Page</h1>
      <div className="grid grid-cols-4 space-x-4">
        {allProjects
          ? allProjects.map((project) => (
              <ProjectCard
                key={project.public_id}
                project={project}
                href={`/${org}/${project.slug}`}
              />
            ))
          : 'No projects found'}
      </div>
      <CreateProjectForm orgSlug={org} />
    </div>
  );
}
