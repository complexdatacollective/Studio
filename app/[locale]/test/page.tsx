import { getOrganizations } from '~/server/queries/organizations';

import ResponsiveForm from './_components/ResponsiveForm';

export default async function Page() {
  const orgs = await getOrganizations();

  return (
    <div>
      <h1 className="text-4xl">Responsive UX Test Page</h1>
      <ResponsiveForm orgs={orgs} />
    </div>
  );
}
