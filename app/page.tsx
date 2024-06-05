import { getOrganizations } from "~/actions/organizations";
import CreateOrgForm from "~/components/CreateOrgForm";
import { requirePageAuth } from "~/utils/auth";
import SignOutBtn from "./_components/SignOutBtn";

export default async function Home() {
  await requirePageAuth();

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

      <SignOutBtn />
    </main>
  );
}
