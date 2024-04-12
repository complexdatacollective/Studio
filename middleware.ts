import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/login'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
