import { z } from 'zod';
import { createServerActionProcedure } from 'zsa';
import { requireApiAuth } from '~/lib/auth';
import { Role } from '@prisma/client';
import { getStudyUser } from '~/server/queries/studies';

export const authedAction = createServerActionProcedure().handler(async () => {
  try {
    const session = await requireApiAuth();

    return session;
  } catch {
    throw new Error('User not authenticated. Access denied.');
  }
});

export const authedActionWithRolesSchema = z.object({
  publicStudyId: z.string(),
  roles: z.array(z.nativeEnum(Role)),
});

export const authedActionWithRoles = createServerActionProcedure(authedAction)
  .input(authedActionWithRolesSchema)
  .handler(async ({ input, ctx }) => {
    try {
      const studyUser = await getStudyUser(ctx.userId, input.publicStudyId);

      if (!studyUser) {
        throw new Error('Role-based access denied');
      }

      if (!input.roles.includes(studyUser.role)) {
        throw new Error('Role-based access denied');
      }

      return studyUser;
    } catch {
      throw new Error('Role-based access denied');
    }
  });
