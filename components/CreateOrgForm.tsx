import { createOrganization } from '~/actions/organizations';

export default function CreateOrgForm() {
  return (
    <form
      action={createOrganization}
      className="flex flex-col border border-black"
    >
      <label htmlFor="orgName">Organization Name</label>
      <input
        className="text-slate-600"
        type="text"
        id="orgName"
        name="orgName"
      />
      <button className="my-2 border border-red-400" type="submit">
        Create Org
      </button>
    </form>
  );
}
