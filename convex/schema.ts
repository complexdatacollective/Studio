import { defineSchema, defineTable } from 'convex/server';
import { authTables } from '@convex-dev/convex-lucia-auth';
import { v } from 'convex/values';

export default defineSchema({
  ...authTables({
    user: {
      email: v.string(),
    },
    session: {},
  }),
  organizations: defineTable({
    name: v.string(),
    administrator: v.id('users'),
  }),
  projects: defineTable({
    name: v.string(),
    organization: v.id('organizations'),
  }),
});
