import { redirect } from 'next/navigation';
import { fetchQuery } from 'convex/nextjs';
import { api } from '~/convex/_generated/api';

export async function pageAuthorization({
  paramsOrganizationSlug,
  paramsProjectSlug,
}: {
  paramsOrganizationSlug?: string;
  paramsProjectSlug?: string;
}) {
  if (!paramsOrganizationSlug || !paramsProjectSlug) {
    const user = await fetchQuery(api.users.getCurrentUser, {});

    console.log(user);
    if (!user) {
      //   redirect('/login');
    }
  }

  if (paramsOrganizationSlug && !paramsProjectSlug) {
    console.log('checking');
    const hasAccessToOrganization = await fetchQuery(
      api.users.hasAccessToOrganization,
      { organizationId: paramsOrganizationSlug }
    );

    if (!hasAccessToOrganization) {
      console.log('redirecting');
      //   redirect('/');
    }
  }

  if (paramsProjectSlug) {
    console.log('checking');
    const hasAccessToProject = await fetchQuery(api.users.hasAccessToProject, {
      projectSlug: paramsProjectSlug,
    });

    console.log('hasAccessToProject', hasAccessToProject);

    if (!hasAccessToProject) {
      redirect('/');
    }
  }
}
