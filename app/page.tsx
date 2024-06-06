import { getOrganizations } from '~/actions/organizations';
import CreateOrgForm from '~/app/[org]/_components/CreateOrgForm';

export default async function Home() {
  const allOrgs = await getOrganizations();
  return (
    <main className="flex flex-col items-center p-24">
      <div className="text-2xl">Studio MVP</div>
      <CreateOrgForm />
      <div>All Organizations</div>
      <div className="flex flex-col">
        {allOrgs.map((org) => (
          <a key={org.id} href={`/${org.slug}`}>
            {org.name}
          </a>
        ))}
      </div>
    </main>
  );
}
