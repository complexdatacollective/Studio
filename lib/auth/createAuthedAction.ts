/* eslint-disable no-console */
import type { Role } from '@prisma/client';
import { getServerSession } from '~/lib/auth';
import { getStudyUser } from '~/server/queries/studies';
import { UserNotFoundError, UserRoleError } from './customErrors';
import { ensureError } from '../utils';

type ActionWithError = {
  data: null;
  error: string;
};

type ActionWithData = {
  data: unknown;
  error: null;
};

export type ActionPayload = ActionWithError | ActionWithData;

export type ActionResponse = Promise<ActionPayload>;

export const checkUserRoles = async ({
  requireRole,
  publicStudyId,
}: {
  requireRole: Role;
  publicStudyId: string;
}) => {
  const { session } = await getServerSession();
  const studyUser = await getStudyUser(session!.userId, publicStudyId);
  console.log('studyUser', studyUser);

  if (!studyUser) {
    console.log('UserNotFoundError');
    throw UserNotFoundError;
  }

  if (!requireRole || !studyUser.role) {
    throw UserRoleError;
  }
};

export const withRoleAuth = <T>(
  action: () => Promise<T>,
  requireRole: Role,
  publicStudyId: string,
) => {
  return async function () {
    const session = await getServerSession();
    if (!session.session) {
      return {
        data: null,
        error: 'Not authenticated',
      };
    }

    if (requireRole) {
      if (!publicStudyId) {
        return {
          data: null,
          error: 'Study not found',
        };
      }

      try {
        await checkUserRoles({
          requireRole,
          publicStudyId,
          session: session.session,
        });
      } catch (e) {
        const error = ensureError(e);
        return { data: null, error: error.message };
      }
    }

    return action();
  };
};
