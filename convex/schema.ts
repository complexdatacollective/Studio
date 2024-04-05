import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    email: v.string(),
    organizationId: v.optional(v.id('organizations')),
  }),
  organizations: defineTable({
    name: v.string(),
    administrator: v.id('users'),
  }),
});
