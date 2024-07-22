/* eslint-disable no-console */
import type { Role } from '@prisma/client';
import { getServerSession } from '~/lib/auth';
import { getStudyUser } from '~/server/queries/studies';
import {
  NoSessionError,
  UserNotFoundError,
  UserRoleError,
  PublicStudyIdRequiredError,
} from './customErrors';
import { ensureError } from '../utils';

export type ActionResponse =
  | {
      data: null;
      error: string;
    }
  | {
      data: unknown;
      error: null;
    };

const checkUserRoles = async ({
  requireRole,
  publicStudyId,
  session,
}: {
  requireRole: Role;
  publicStudyId: string;
  session: { userId: string };
}) => {
  const studyUser = await getStudyUser(session.userId, publicStudyId);
  console.log('studyUser', studyUser);

  if (!studyUser) {
    console.log('UserNotFoundError');
    throw UserNotFoundError;
  }

  if (!requireRole || !studyUser.role) {
    throw UserRoleError;
  }
};

export const createAuthedAction = <T>(action: () => Promise<T>) => {
  return async function () {
    const session = await getServerSession();
    if (!session.session) {
      return NoSessionError;
    }

    return action();
  };
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
