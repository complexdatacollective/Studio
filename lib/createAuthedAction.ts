'use server';

import { requireApiAuth } from './auth';
import type { Role } from '@prisma/client';

// function to wrap a mutation action with authentication
// includes role/permission info

export async function createAuthedAction<T>(action: T, requiredRoles?: Role[]) {
  const studyUser = await requireApiAuth();
  const { role } = studyUser;

  if (requiredRoles && !requiredRoles.includes(role)) {
    throw new Error('Unauthorized');
  }

  return action;
}
