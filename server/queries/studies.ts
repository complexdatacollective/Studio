import 'server-only';
import { db } from '~/lib/db';
import createAction from '~/lib/createAction';
import { createCachedFunction } from '~/lib/cache';

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

const INTERNAL_cachedGetUserStudies = (_input, context) =>
  createCachedFunction(
    async (_input, context) => {
      const { userId } = context.user;

      const userStudies = await db.study.findMany({
        where: {
          users: {
            some: {
              userId: userId,
            },
          },
        },
      });

      return userStudies;
    },
    ['studies:getByUser', `studies:getByUser-${context.userId}`],
  )(_input, context);

export const getUserStudies = createAction()
  .requireAuth()
  .handler(INTERNAL_cachedGetUserStudies);

export const getStudyData = async (studySlug: string) => {
  const study = await db.study.findFirst({
    where: {
      slug: studySlug,
    },
  });

  return study;
};
