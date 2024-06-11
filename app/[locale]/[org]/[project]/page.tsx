import { getProjectBySlug } from '~/server/queries/projects';
import { routes } from '~/lib/routes';
import { getTranslations } from 'next-intl/server';

type ProjectPageProps = {
  // ✅ Never assume the types of your params before validation
  params?: unknown;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { project: projectSlug } = routes.orgProject.$parseParams(params);
  const t = await getTranslations('ProjectPage');

  const project = await getProjectBySlug(projectSlug);
  if (!project) {
    return <div>{t('noProjectFoundMessage')}</div>;
    // todo: redirect to 404 page
  }

  return (
    <div className="flex flex-col p-12">
      <div className="pb-4 text-4xl">
        {project.name} {t('title')}
      </div>
      <div>
        {t('description')} {projectSlug}
      </div>
    </div>
  );
}
