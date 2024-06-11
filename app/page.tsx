import { getOrganizations } from '~/server/queries/organizations';
import CreateOrgForm from '~/app/[...locale]/[org]/_components/CreateOrgForm';
import { requirePageAuth } from '~/lib/auth';
import SignOutBtn from './_components/SignOutBtn';
import Link from 'next/link';
import { routes } from '~/lib/routes';

export default async function Home() {
  await requirePageAuth();

  const allOrgs = await getOrganizations();
  return (
    <main className="flex flex-col p-12">
      <h1 className="pb-4 text-4xl">Studio MVP</h1>
      <CreateOrgForm />
      <h2 className="pb-4 text-2xl">All Organizations</h2>
      <div className="flex flex-col text-blue-700 underline">
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
