'use server';

import { withRoleAuth } from '~/lib/auth/createAuthedAction';

async function action() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    data: 'hello!',
    error: null,
  };
}

export const roleAuthedAction = withRoleAuth(action, 'ADMIN', 'studyId');
