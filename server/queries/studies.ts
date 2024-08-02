import 'server-only';
import { db } from '~/lib/db';
import createAction from '~/lib/createAction';
import { z } from 'zod';

export const getUserStudies = createAction()
  .input(
    z.object({
      age: z.number(),
    }),
  )
  .requireAuthContext()
  .cache({
    tags: ({ context, input }) => [
      'study:getByUser',
      `study:getByUser-${context.user.id}`,
    ],
  })
  .handler(async ({ context, input }) => {
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
