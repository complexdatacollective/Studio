import { createOrganization } from "~/actions/organizations";

export default function CreateOrgForm() {
  return (
    <form
      action={createOrganization}
      className="flex flex-col border border-black"
    >
      <label htmlFor="orgName">Organization Name</label>
      <input type="text" id="orgName" name="orgName" />
      <button type="submit">Create Org</button>
    </form>
  );
}
