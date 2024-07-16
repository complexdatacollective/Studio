/* eslint-disable no-console */
import type { Role } from '@prisma/client';
import { requireApiAuth } from '~/lib/auth';
import { getStudyUser } from '~/server/queries/studies';
import {
  NoSessionError,
  UserNotFoundError,
  UserRoleError,
  PublicStudyIdRequiredError,
} from './customErrors';

const checkUserRoles = async ({
  requireRoles,
  publicStudyId,
  session,
}: {
  requireRoles: Role[];
  publicStudyId: string;
  session: { userId: string };
}) => {
  const studyUser = await getStudyUser(session.userId, publicStudyId);
  console.log('studyUser', studyUser);

  if (!studyUser) {
    console.log('UserNotFoundError');
    throw UserNotFoundError;
  }

  if (!requireRoles.includes(studyUser.role)) {
    throw UserRoleError;
  }
};

export const createAuthedAction = <T>({
  requireSession,
  requireRoles,
  publicStudyId,
  action,
}: {
  requireSession: boolean;
  requireRoles?: Role[];
  publicStudyId?: string;
  action: () => Promise<T>;
}) => {
  return async function () {
    const session = await requireApiAuth();
    if (requireSession) {
      if (!session) {
        return NoSessionError;
      }
    }

    if (requireRoles) {
      if (!publicStudyId) {
        return PublicStudyIdRequiredError;
      }
      try {
        await checkUserRoles({ requireRoles, publicStudyId, session });
      } catch (error) {
        return { data: null, error: error };
      }
    }

    return action();
  };
};
