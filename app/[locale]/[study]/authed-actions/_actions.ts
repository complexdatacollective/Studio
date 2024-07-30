'use server';

import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import {
  ActionResponse,
  checkUserRoles,
  withRoleAuth,
} from '~/lib/auth/createAuthedAction';
import { db } from '~/lib/db';

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
