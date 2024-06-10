import { getOrganizations } from '~/server/queries/organizations';
import CreateOrgForm from '~/app/[org]/_components/CreateOrgForm';
<<<<<<< HEAD
import { requirePageAuth } from '~/lib/auth';
import SignOutBtn from './_components/SignOutBtn';
=======
import { requirePageAuth } from '~/utils/auth';
import SignOutBtn from './_components/SignOutBtn';
import Link from 'next/link';
import { routes } from '~/lib/routes';
>>>>>>> aaafd9b (Implement type safe routing with next-safe-navigation and adjust the code for most of the pages)

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
<<<<<<< HEAD
          <a key={org.public_id} href={`/${org.slug}`}>
=======
          <Link key={org.id} href={routes.orgDashboard({ org: org.slug })}>
>>>>>>> aaafd9b (Implement type safe routing with next-safe-navigation and adjust the code for most of the pages)
            {org.name}
          </Link>
        ))}
      </div>

      <SignOutBtn />
    </main>
  );
}
