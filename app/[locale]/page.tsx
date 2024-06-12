import { getOrganizations } from '~/server/queries/organizations';
import CreateOrgForm from '~/app/[locale]/[org]/_components/CreateOrgForm';
import { requirePageAuth } from '~/lib/auth';
import SignOutBtn from '../_components/SignOutBtn';
import { routes } from '~/lib/routes';
import { getTranslations } from 'next-intl/server';
import { Link } from '~/lib/localisation/navigation';
import Heading from '~/components/typography/Heading';

export default async function Home() {
  await requirePageAuth();
  const t = await getTranslations('Home');

  const allOrgs = await getOrganizations();
  return (
    <main className="flex flex-col p-12">
      <Heading variant="h1">{t('title')}</Heading>
      <CreateOrgForm />
      <Heading variant="h2">{t('allOrganizationsHeading')}</Heading>
      <div className="flex flex-col underline">
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
    </main>
  );
}
