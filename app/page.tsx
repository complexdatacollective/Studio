import { getOrganizations } from '~/queries/organizations';
import CreateOrgForm from '~/app/[org]/_components/CreateOrgForm';
import { requirePageAuth } from '~/utils/auth';
import SignOutBtn from './_components/SignOutBtn';

export default async function Home() {
  await requirePageAuth();

  const allOrgs = await getOrganizations();
  return (
    <main className="flex flex-col p-12">
      <div className="pb-4 text-4xl">Studio MVP</div>
      <CreateOrgForm />
      <div>All Organizations</div>
      <div className="flex flex-col">
        {allOrgs.map((org) => (
          <a key={org.public_id} href={`/${org.slug}`}>
            {org.name}
          </a>
        ))}
      </div>

      <SignOutBtn />
    </main>
  );
}
