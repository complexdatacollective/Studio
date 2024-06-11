import { Link } from '~/lib/localisation/navigation';
import { routes } from '~/lib/routes';

type ProjectLayoutProps = {
  children: React.ReactNode;
  // ✅ Never assume the types of your params before validation
  params?: unknown;
};

const ProjectLayout = ({ children, params }: ProjectLayoutProps) => {
  const { org, project } = routes.orgProject.$parseParams(params);

  return (
    <>
      <div className="flex flex-row space-x-4 border-b p-4 text-lg text-slate-600">
        <div>
          <Link href={routes.orgProjectParticipants({ org, project })}>
            Participants
          </Link>{' '}
          &#x2794;
        </div>
        <div>
          <Link href={routes.orgProjectInterviews({ org, project })}>
            Interviews
          </Link>{' '}
          &#x2794;
        </div>
        <div>
          <Link href={routes.orgProjectProtocols({ org, project })}>
            Protocols
          </Link>{' '}
          &#x2794;
        </div>
        <div>
          <Link href={routes.orgProjectSettings({ org, project })}>
            Settings
          </Link>{' '}
          &#x2794;
        </div>
      </div>
      {children}
    </>
  );
};

export default ProjectLayout;
