import { getProjects } from '~/server/queries/projects';
import CreateProjectForm from '~/app/[locale]/[org]/_components/CreateProjectForm';
import ProjectCard from './_components/ProjectCard';
import { routes } from '~/lib/routes';
import { getTranslations } from 'next-intl/server';

type OrgPageProps = {
  // ✅ Never assume the types of your params before validation
  params?: unknown;
};

export default async function OrgPage({ params }: OrgPageProps) {
  const { org } = routes.orgDashboard.$parseParams(params);
  const allProjects = await getProjects(org);
  const t = await getTranslations('OrgPage');

  return (
    <div className="flex flex-col p-12">
      <h1 className="pb-4 text-4xl">{t('title')}</h1>
      <div className="grid grid-cols-4 space-x-4">
        {allProjects
          ? allProjects.map((project) => (
              <ProjectCard
                key={project.public_id}
                project={project}
                href={routes.orgProject({ org, project: project.slug })}
              />
            ))
          : t('noProjectFoundMessage')}
      </div>
      <CreateProjectForm orgSlug={org} />
    </div>
  );
}
