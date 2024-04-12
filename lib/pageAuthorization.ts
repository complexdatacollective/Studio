import { redirect } from 'next/navigation';
import { fetchQuery } from 'convex/nextjs';
import { api } from '~/convex/_generated/api';
import { auth, currentUser } from '@clerk/nextjs';

export async function pageAuthorization({
  paramsOrganizationSlug,
  paramsProjectSlug,
}: {
  paramsOrganizationSlug?: string;
  paramsProjectSlug?: string;
}) {
  const { orgSlug, userId, orgRole } = auth();

  if (!userId) {
    redirect('/login');
  }

  if (paramsOrganizationSlug && !paramsProjectSlug) {
    const hasAccessToOrganization = paramsOrganizationSlug === orgSlug;
    console.log('hasAccessToOrganization', hasAccessToOrganization);

    // can do other checks with orgRole here, if needed.
    console.log('orgRole', orgRole);
    if (!hasAccessToOrganization) {
      redirect('/');
    }
  }

  if (paramsProjectSlug) {
    console.log('checking');
    const hasAccessToProject = await fetchQuery(api.users.hasAccessToProject, {
      projectSlug: paramsProjectSlug,
      userId,
    });

    console.log('hasAccessToProject', hasAccessToProject);

    if (!hasAccessToProject) {
      redirect('/');
    }
  }
}
