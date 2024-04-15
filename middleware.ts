import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import { fetchQuery } from 'convex/nextjs';
import { NextResponse } from 'next/server';
import { api } from './convex/_generated/api';

export default authMiddleware({
  publicRoutes: ['/login'],
  afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // no user id and is public route, so no need to check further
    if (!auth.userId) {
      return;
    }

    // Org based authorization
    // if request slug is not the same as the user's org slug, redirect to root
    const pathParts = req.nextUrl.pathname.split('/');
    if (pathParts[1] && pathParts[1] !== auth.orgSlug) {
      // we have an org slug
      // can do other checks with orgRole here, if needed.
      const home = new URL('/', req.url);
      return NextResponse.redirect(home);
    }
    // Project based authorization
    if (pathParts[2]) {
      // we have a project slug
      // check if the user has access to the project
      // if not, redirect to root

      const hasAccessToProject = fetchQuery(api.users.hasAccessToProject, {
        projectSlug: pathParts[2],
        userId: auth.userId,
      });
      if (!hasAccessToProject) {
        const home = new URL('/', req.url);
        return NextResponse.redirect(home);
      }
    }
  },
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
