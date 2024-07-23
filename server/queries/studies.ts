import 'server-only';
import { db } from '~/lib/db';
import { createCachedFunction } from '~/lib/cache';
import { getServerSession } from '~/lib/auth';

export const getStudies = () =>
  createCachedFunction(async () => {
    return await db.study.findMany();
  }, ['studies:get'])();

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

export const getUserStudies = async () => {
  const { session } = await getServerSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const userStudies = await db.study.findMany({
    where: {
      users: {
        some: {
          userId: session.userId,
        },
      },
    },
  });

  return userStudies;
};

export const getStudyData = async (studySlug: string) => {
  const study = await db.study.findFirst({
    where: {
      slug: studySlug,
    },
  });

  return study;
};
