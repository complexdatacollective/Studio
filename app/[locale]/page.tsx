import { getOrganizations } from '~/server/queries/organizations';
import CreateOrgForm from '~/app/[locale]/[org]/_components/CreateOrgForm';
import { requirePageAuth } from '~/lib/auth';
import SignOutBtn from '../_components/SignOutBtn';
import { routes } from '~/lib/routes';
import { getTranslations } from 'next-intl/server';
import { Link } from '~/lib/localisation/navigation';
import CreateDialog from '../_components/CreateDialog';

export default async function Home() {
  await requirePageAuth();
  const t = await getTranslations('Home');

  const allOrgs = await getOrganizations();
  return (
    <main className="flex flex-col p-12">
      <h1 className="pb-4 text-4xl">{t('title')}</h1>
      <CreateOrgForm />
      <h2 className="pb-4 text-2xl">{t('allOrganizationsHeading')}</h2>
      <div className="text-blue-700 flex flex-col underline">
        {allOrgs.map((org) => (
          <Link
            key={org.public_id}
            href={routes.orgDashboard({ org: org.slug })}
          >
            {org.name}
          </Link>
        ))}
      </div>

      <SignOutBtn />
      <CreateDialog />
    </main>
  );
}
