import { createOrganization } from '~/server/actions/organizations';
import { Button } from '~/components/ui/Button';

export default function CreateOrgForm() {
  return (
    <form
      action={createOrganization}
      className="flex max-w-lg flex-col space-y-2 rounded-lg border border-slate-400 p-4"
    >
      <h2 className="text-lg font-semibold">Create Organization</h2>
      <label htmlFor="orgName" className="text-sm">
        Organization Name
      </label>
      <input
        className="rounded-md border border-slate-200 p-2 text-slate-600"
        type="text"
        id="orgName"
        name="orgName"
        placeholder="Northwestern"
      />
      <Button type="submit">Create Org</Button>
    </form>
  );
}
