import { db } from '~/drizzle/db';

import 'server-only';
import { eq } from 'drizzle-orm';

import { organizations } from '~/drizzle/schema';
import { unstable_cache } from 'next/cache';

/*
Right now, this is only used in other actions and the organization is not returned to the user.
If it were, we would need to remove the id from the response (to use the public_id instead)
Need to think about a better way to handle and check for this.
*/

export const getOrgBySlug = (slug: string) =>
  unstable_cache(
    async (slug: string) => {
      return await db.query.organizations.findFirst({
        where: eq(organizations.slug, slug),
      });
    },
    [`getOrgBySlug-${slug}`],
    {
      tags: [`getOrgBySlug-${slug}`, 'getOrgBySlug'],
    },
  )(slug);

export const getOrganizations = () =>
  unstable_cache(
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
