'use client';

import { useQueryWithAuth } from '~/hooks/useAuth';
import OrganizationDashboard from './_components/OrganizationDashboard';
import { api } from '~/convex/_generated/api';
import { useParams, useRouter } from 'next/navigation';

export default function OrganizationPage() {
  const params = useParams();
  const router = useRouter();

  if (!params.organization || typeof params.organization !== 'string') {
    return null;
  }
  // call authHelper with required roles
  const isAuthorized = useQueryWithAuth(api.auth.isAuthorizedForOrganization, {
    organizationSlug: params.organization,
  });

  if (isAuthorized === undefined) {
    return <div>Loading...</div>;
  }

  if (isAuthorized === false) {
    router.push('/login');
    return null;
  }

  return <OrganizationDashboard />;
}
