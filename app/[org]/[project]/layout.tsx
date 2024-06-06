import Link from 'next/link';

type ProjectLayoutProps = {
  children: React.ReactNode;
  params: { org: string; project: string };
};

const ProjectLayout = ({ children, params }: ProjectLayoutProps) => {
  const { org: orgSlug, project: projectSlug } = params;
  return (
    <>
      <div className="flex flex-row space-x-4 border-b p-4 text-lg text-slate-600">
        <Link href={`/${orgSlug}/${projectSlug}/participants`}>
          Participants
        </Link>
        <Link href={`/${orgSlug}/${projectSlug}/interviews`}>Interviews</Link>
        <Link href={`/${orgSlug}/${projectSlug}/protocols`}>Protocols</Link>
        <Link href={`/${orgSlug}/${projectSlug}/settings`}>Settings</Link>
      </div>
      {children}
    </>
  );
};

export default ProjectLayout;
