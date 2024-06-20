'use server';

import { getStudyUser } from '~/server/queries/studies';
import { requireApiAuth } from './auth';
import type { Role } from '@prisma/client';

type AuthedActionParams<T> = {
  action: T;
  publicStudyId?: string;
  requiredRoles?: Role[];
};

// function to wrap a mutation action with role-based authentication
export async function createAuthedAction<T>({
  action,
  publicStudyId,
  requiredRoles,
}: AuthedActionParams<T>): Promise<T> {
  const session = await requireApiAuth();

  // no publicStudyId means no study-specific roles
  if (!publicStudyId || !requiredRoles) return action;

  // from here, we need study-specific roles for authorization
  const studyUser = await getStudyUser(session.userId, publicStudyId);

  if (!studyUser) {
    throw new Error('Unauthorized');
  }

  const { role } = studyUser;

  if (!requiredRoles.includes(role)) {
    throw new Error('Unauthorized');
  }

  return action;
}
