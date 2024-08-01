import 'server-only';
import { db } from '~/lib/db';
import createAction, { type TContext } from '~/lib/createAction';
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

export const testActionWithParameter = createAction()
  .input(
    z.object({
      name: z.string(),
      age: z.number().optional(),
    }),
  )
  .handler(async ({ input, context }) => {
    return input.name;
  });

export const getUserStudies = createAction()
  .requireAuthContext()
  .cache({
    tags: ({ context }) => [
      'study:getByUser',
      `study:getByUser-${context.user.id}`,
    ],
  })
  .handler(async ({ context }: { context: TContext }) => {
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
  });

export const getStudyData = async (studySlug: string) => {
  const study = await db.study.findFirst({
    where: {
      slug: studySlug,
    },
  });

  return study;
};
