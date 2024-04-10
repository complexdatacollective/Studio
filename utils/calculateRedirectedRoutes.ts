import { User } from 'lucia';
import { Route } from 'next';
import { Doc } from '~/convex/_generated/dataModel';

export const calculateRedirect = ({
  user,
  userOrganization,
  userProject,
  path,
  params,
}: {
  user: User | null | undefined;
  userOrganization?: Doc<'organizationUsers'>;
  userProject?: Doc<'projectUsers'>;
  path: Route;
  params: Record<string, string>;
}) => {
  // If for some reason we weren't given a path, bail out.
  if (!path) {
    throw new Error('No path provided to calculateRedirect!');
  }

  const isLandingPage = path === '/';

  // Check if the user is logged in
  if (user === null) {
    console.log('User is not logged in');
    // if the user is not logged in and we're on the landing page, stay there
    if (isLandingPage) {
      return;
    }
    // if the user is not logged in and we're not on the landing page, redirect to the landing page
    // this can be replaced with a sign in page with a callback url in the future
    return '/';
  }

  // // Check if the user is in the organization
  // if (params.organization) {
  //   if (!userOrganization) {
  //     console.log('No user organization');
  //     return '/';
  //   }

  //   // check user permissions for organization.
  // }

  // // Check if the user is in the project
  // if (params.project) {
  //   if (!userProject) {
  //     console.log('No user project');
  //     return '/';
  //   }
  // }

  return null;
};
