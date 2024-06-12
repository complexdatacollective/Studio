import 'server-only';
import { db } from '~/lib/db';
import { createCachedFunction } from '~/lib/cache';

/*
Right now, this is only used in other actions and the organization is not returned to the user.
If it were, we would need to remove the id from the response (to use the public_id instead)
Need to think about a better way to handle and check for this.
*/

export const getStudyBySlug = (slug: string) =>
  createCachedFunction(async () => {
    return await db.study.findFirst({
      where: {
        slug,
      },
    });
  }, [`getOrgBySlug-${slug}`, 'getOrgBySlug'])();

export const getStudies = () =>
  createCachedFunction(async () => {
    return await db.study.findMany();
  }, ['getOrganizations'])();
