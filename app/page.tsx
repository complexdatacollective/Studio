import { getOrganizations } from "~/actions/organizations";
import CreateOrgForm from "~/components/CreateOrgForm";

export default async function Home() {
  const allOrgs = await getOrganizations();
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="text-2xl">Studio MVP</div>
      <CreateOrgForm />
      <div>All Organizations</div>
      <div>
        {allOrgs.map((org) => (
          <div key={org.id}>{org.name}</div>
        ))}
      </div>
    </main>
  );
}
