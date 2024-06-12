import { getTranslations } from 'next-intl/server';
import { Link } from '~/lib/localisation/navigation';
import { routes } from '~/lib/routes';

type ProjectLayoutProps = {
  children: React.ReactNode;
  // ✅ Never assume the types of your params before validation
  params?: unknown;
};

const ProjectLayout = async ({ children, params }: ProjectLayoutProps) => {
  const { org, project } = routes.orgProject.$parseParams(params);
  const t = await getTranslations('SecondaryNavigation');

  return (
    <>
      <div className="flex flex-row space-x-4 border-b p-4 text-lg text-slate-600">
        <div>
          <Link href={routes.orgProjectParticipants({ org, project })}>
            {t('projectParticipantsLink')}
          </Link>{' '}
          &#x2794;
        </div>
        <div>
          <Link href={routes.orgProjectInterviews({ org, project })}>
            {t('projectInterviewsLink')}
          </Link>{' '}
          &#x2794;
        </div>
        <div>
          <Link href={routes.orgProjectProtocols({ org, project })}>
            {t('projectProtocolsLink')}
          </Link>{' '}
          &#x2794;
        </div>
        <div>
          <Link href={routes.orgProjectSettings({ org, project })}>
            {t('projectSettingsLink')}
          </Link>{' '}
          &#x2794;
        </div>
      </div>
      {children}
    </>
  );
};

export default ProjectLayout;
