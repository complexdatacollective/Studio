'use server';

import { createAuthedAction } from '~/lib/createAuthedAction';

const insecureAction = async () => {
  await new Promise((resolve) => setTimeout(resolve, 100)); // simulate db call
  return { data: 'Authed action ran', error: null };
};

export const myAuthedAction = createAuthedAction({
  requireSession: true,
  action: insecureAction,
});

export const myRolesBasedAuthedAction = createAuthedAction({
  requireSession: true,
  requireRoles: ['ADMIN'],
  publicStudyId: 'nc',
  action: insecureAction,
});
