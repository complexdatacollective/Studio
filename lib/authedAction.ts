import { z } from 'zod';
import { createServerActionProcedure } from 'zsa';
import { requireApiAuth } from '~/lib/auth';
import { Role } from '@prisma/client';
import { getStudyUser } from '~/server/queries/studies';

/*
 * zsa procedure used to check if the user is authenticated. No role-based authorization.
 * Returns the session object if the user is authenticated.
 * session will be available in the ctx of the wrapped action.
 */
export const authedAction = createServerActionProcedure().handler(async () => {
  try {
    const session = await requireApiAuth();

    return session;
  } catch {
    throw new Error('User not authenticated. Access denied.');
  }
});

/*
 * Base schema for authedActionWithRoles
 * Can be extended with additional form data in the action definition.
 */

export const authedActionWithRolesSchema = z.object({
  publicStudyId: z.string(),
  roles: z.array(z.nativeEnum(Role)),
});

/*
 * zsa procedure used to wrap other actions in role-based authorization.
 * It returns the studyUser object if the user has the required role.
 * studyUser will be available in the ctx of the wrapped action.
 */

export const authedActionWithRoles = createServerActionProcedure(authedAction)
  .input(authedActionWithRolesSchema)
  .handler(async ({ input, ctx }) => {
    try {
      const studyUser = await getStudyUser(ctx.userId, input.publicStudyId);

      if (!studyUser) {
        throw new Error(
          `Role-based access denied: User with ${ctx.userId} not found in study ${input.publicStudyId}`,
        );
      }

      if (!input.roles.includes(studyUser.role)) {
        throw new Error(
          `Role-based access denied: User with ${ctx.userId} does not have the required role`,
        );
      }

      return studyUser;
    } catch {
      throw new Error('Role-based access denied: Error checking user roles');
    }
  });
