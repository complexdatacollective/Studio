import 'server-only';
import { db } from '~/lib/db';
import { createCachedFunction } from '~/lib/cache';

export const getStudies = () =>
  createCachedFunction(async () => {
    return await db.study.findMany();
  }, ['getOrganizations'])();

export const getStudyBySlug = (slug: string) =>
  createCachedFunction(async () => {
    return await db.study.findFirst({
      where: {
        slug,
      },
    });
  }, [`getStudyBySlug-${slug}`])();

export const getStudyUser = (userId: string, publicStudyId: string) =>
  createCachedFunction(async () => {
    return await db.studyUser.findFirst({
      where: {
        userId,
        study: {
          publicId: publicStudyId,
        },
      },
    });
  }, [`getStudyUser-${userId}-${publicStudyId}`])();
