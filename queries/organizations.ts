import { db } from '~/drizzle/db';

import 'server-only';
import { eq } from 'drizzle-orm';

import {
  type Organization,
  type PublicOrganization,
  organizations,
} from '~/drizzle/schema';
import { safeUnstableCache } from '~/utils/safeCacheTags';

/*
Right now, this is only used in other actions and the organization is not returned to the user.
If it were, we would need to remove the id from the response (to use the public_id instead)
Need to think about a better way to handle and check for this.
*/

export const getOrgBySlug = (slug: string) =>
  safeUnstableCache<Organization>(
    async () => {
      return await db.query.organizations.findFirst({
        where: eq(organizations.slug, slug),
      });
    },
    [`getOrgBySlug-${slug}`],
    {
      tags: [`getOrgBySlug-${slug}`, 'getOrgBySlug'],
    },
  )();

export const getOrganizations = () =>
  safeUnstableCache<PublicOrganization[]>(
    async () => {
      return await db.query.organizations.findMany({
        columns: {
          id: false,
        },
      });
    },
    ['getOrganizations'],
    {
      tags: ['getOrganizations'],
    },
  )();
