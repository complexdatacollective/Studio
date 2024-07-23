'use server';

import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { getServerSession } from '~/lib/auth';
import {
  ActionResponse,
  checkUserRoles,
  withRoleAuth,
} from '~/lib/auth/createAuthedAction';
import { db } from '~/lib/db';
import { getStudyUser } from '~/server/queries/studies';

async function action() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    data: 'hello!',
    error: null,
  };
}

export const roleAuthedAction = withRoleAuth(action, 'ADMIN', 'studyId');

export async function TestAction(
  data: FormData,
  params: Params,
): ActionResponse {
  console.log('params', params);
  console.log('data', data);

  const study = await db.study.findFirst({
    where: {
      slug: params.study,
    },
  });

  if (!study) {
    return {
      data: null,
      error: 'Study not found',
    };
  }

  await checkUserRoles({
    requireRole: 'ADMIN',
    publicStudyId: study.publicId,
  });

  // Todo - response data must be localised
  return {
    data: `Hello from the server! Your study context is: ${params.study}. You submitted: ${data.get('name')}`,
    error: null,
  };
}
