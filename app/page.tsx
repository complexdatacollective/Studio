import { redirect } from "next/navigation";
import { signout } from "~/actions/auth";
import { getOrganizations } from "~/actions/organizations";
import CreateOrgForm from "~/components/CreateOrgForm";
import { validateRequest } from "~/utils/auth";
import SignOutBtn from "./_components/SignOutBtn";

export default async function Home() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/signin");
  }

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
