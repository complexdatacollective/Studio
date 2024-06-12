import { getProjectBySlug } from '~/server/queries/projects';
import { routes } from '~/lib/routes';
import { getTranslations } from 'next-intl/server';

type ProtocolsPageProps = {
  // ✅ Never assume the types of your params before validation
  params?: unknown;
};

export default async function ProtocolsPage({ params }: ProtocolsPageProps) {
  const { project: projectSlug } =
    routes.orgProjectProtocols.$parseParams(params);

  const t = await getTranslations('ProjectProtocolsPage');

  const project = await getProjectBySlug(projectSlug);
  if (!project) {
    return <div>Project not found</div>;
    // todo: redirect to 404 page
  }

  return (
    <div className="flex flex-col p-12">
      <div className="text-4xl">
        {project.name} {t('title')}
      </div>
      <div>
        {t('description')} {projectSlug}
      </div>
    </div>
  );
}
