import 'server-only';
import { db } from '~/lib/db';
import { getServerSession } from '~/lib/auth';
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

export const getUserStudies = createCachedFunction(async () => {
  const { session, user } = await getServerSession();

  if (!session || !user) {
    throw new Error('Unauthorized');
  }

  const userStudies = await db.study.findMany({
    where: {
      users: {
        some: {
          userId: user.id,
        },
      },
    },
  });

  return userStudies;
}, ['studies:get']);

export const getStudyData = async (studySlug: string) => {
  const study = await db.study.findFirst({
    where: {
      slug: studySlug,
    },
  });

  return study;
};
