import 'server-only';
import { db } from '~/lib/db';
import createAction, { TContext } from '~/lib/createAction';
import { createCachedFunction } from '~/lib/cache';
import { requireServerSession } from '~/lib/auth';
import { z } from 'zod';

export const getStudyUser = async (userId: string, publicStudyId: string) => {
  const studyUser = await db.studyUser.findFirst({
    where: {
      userId,
      study: {
        publicId: publicStudyId,
      },
    },
  });
  return studyUser;
};

const INTERNAL_getUserStudies = async ({ context }: { context: TContext }) => {
  const userStudies = await db.study.findMany({
    where: {
      users: {
        some: {
          userId: context.user.id,
        },
      },
    },
  });

  return userStudies;
};

const INTERNAL_cachedGetUserStudies = (args: { context: TContext }) =>
  createCachedFunction(INTERNAL_getUserStudies, [
    'studies:getByUser',
    `studies:getByUser-${args.context.session.userId}`,
  ])(args);

export const testActionWithParameter = createAction()
  .input(
    z.object({
      name: z.string(),
    }),
  )
  .handler(async ({ input, context }) => {
    return input.name;
  });

export const getUserStudies = createAction()
  .requireAuthContext()
  .handler(({ context, input }) => INTERNAL_cachedGetUserStudies({ context }));

export const vanillaGetUserStudies = async () => {
  const session = await requireServerSession();

  if (!session) {
    throw new Error('No session found');
  }

  return INTERNAL_cachedGetUserStudies({
    context: session,
  });
};

export const getStudyData = async (studySlug: string) => {
  const study = await db.study.findFirst({
    where: {
      slug: studySlug,
    },
  });

  return study;
};
