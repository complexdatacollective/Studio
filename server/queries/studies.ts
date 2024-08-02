import 'server-only';
import { db } from '~/lib/db';
import createAction from '~/lib/createAction';

export const getUserStudies = createAction()
  .requireAuthContext()
  .cache({
    tags: ({ context }) => [
      'study:getByUser',
      `study:getByUser-${context.user.id}`,
    ],
  })
  .handler(async ({ context }) => {
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
