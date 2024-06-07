import { getOrganizations } from '~/actions/organizations';
import CreateOrgForm from '~/app/[org]/_components/CreateOrgForm';

export default async function Home() {
  const allOrgs = await getOrganizations();
  return (
    <main className="flex flex-col p-12">
      <div className="pb-4 text-4xl">Studio MVP</div>
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
