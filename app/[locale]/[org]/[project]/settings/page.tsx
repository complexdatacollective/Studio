import { getProjectBySlug } from '~/server/queries/projects';
import { routes } from '~/lib/routes';
import { getTranslations } from 'next-intl/server';
import { getAnonymousRecruitmentStatus } from '~/server/queries/projects';
import AnonymousRecruitmentCard from './_components/AnonymousRecruitmentCard';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

type ProjectSettingsPageProps = {
  // ✅ Never assume the types of your params before validation
  params?: unknown;
};

export default async function ProjectSettingsPage({
  params,
}: ProjectSettingsPageProps) {
  const { project: projectSlug } =
    routes.orgProjectProtocols.$parseParams(params);

  const t = await getTranslations('ProjectSettingsPage');

  const project = await getProjectBySlug(projectSlug);
  if (!project) {
    return <div>Project not found</div>;
    // todo: redirect to 404 page
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['allowAnonymousRecruitment', projectSlug],
    queryFn: getAnonymousRecruitmentStatus.bind(null, projectSlug),
  });

  return (
    <div className="flex flex-col space-y-2 p-12">
      <div className="text-4xl">
        {project.name} {t('title')}{' '}
      </div>
      <div>
        {t('description')} {projectSlug}
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AnonymousRecruitmentCard projectSlug={projectSlug} />
      </HydrationBoundary>
    </div>
  );
}
