import { getProjectBySlug } from '~/server/queries/projects';
import { routes } from '~/lib/routes';
import { getTranslations } from 'next-intl/server';
import AllowAnonymousRecruitmentSwitch from './_components/AllowAnonymousRecruitmentSwitch';
import { Card, CardDescription, CardTitle } from '~/components/ui/Card';
import { getAnonymousRecruitmentStatus } from '~/server/queries/projects';

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

  const allowAnonymousRecruitment =
    await getAnonymousRecruitmentStatus(projectSlug);

  return (
    <div className="flex flex-col space-y-2 p-12">
      <div className="text-4xl">
        {project.name} {t('title')}{' '}
      </div>
      <div>
        {t('description')} {projectSlug}
      </div>
      <Card className="flex w-1/3 flex-row items-center justify-between p-6">
        <div className="flex flex-col">
          <CardTitle>{t('anonymousRecruitmentLabel')}</CardTitle>
          <CardDescription>
            {allowAnonymousRecruitment
              ? t('anonymousRecruitmentEnabled')
              : t('anonymousRecruitmentDisabled')}
          </CardDescription>
        </div>
        <AllowAnonymousRecruitmentSwitch projectSlug={projectSlug} />
      </Card>
    </div>
  );
}
