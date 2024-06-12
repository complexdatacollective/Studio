import { getTranslations } from 'next-intl/server';
import { type PublicProject } from '~/lib/db/schema';
import { Link } from '~/lib/localisation/navigation';

export default async function ProjectCard({
  project,
  href,
}: {
  project: PublicProject;
  href: string;
}) {
  const t = await getTranslations('ProjectCard');

  return (
    <Link
      href={href}
      className="max-w-sm rounded-lg border border-slate-200 p-6 hover:bg-slate-200"
    >
      <h4 className="mb-2 text-2xl font-bold">{project.name}</h4>
      <p className="text-slate-600">{t('subText')}</p>
    </Link>
  );
}
