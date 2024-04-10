'use client';

import { useQuery } from 'convex/react';
import type { Route } from 'next';
import { usePathname, useParams, redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '~/convex/_generated/api';
import { useQueryWithAuth } from '~/hooks/useAuth';
import { calculateRedirect } from '~/utils/calculateRedirectedRoutes';

/**
 *
 * This wrapper component determines if we need to redirect based on if the
 * user is logged in, and if they are authorized to view the page.
 *
 * This is determined by roles on the organization and project.
 *
 * This approach is copied over from Fresco:
 * Initially implemented within the root layout, but this caused maximum update
 * depth exceeded errors for unknown reasons.
 *
 * Logic for redirection is in utils/calculateRedirectedRoutes.ts
 */

export default function RedirectWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname() as Route;
  const params = useParams() as Record<string, string>;
  const [userLoading, setUserLoading] = useState(true);

  const user = useQueryWithAuth(api.users.get, {});

  useEffect(() => {
    setUserLoading(user === undefined);
  }, [user]);

  if (userLoading) {
    return <div>Loading...</div>;
  } else {
    const shouldRedirect = calculateRedirect({
      user,
      path,
      params,
    });

    if (shouldRedirect) {
      return redirect(shouldRedirect);
    }

    return children;
  }
}
