import { defineSchema, defineTable } from 'convex/server';
import { Infer, v } from 'convex/values';

export const roleValidator = v.union(v.literal('admin'), v.literal('member'));

export type Role = Infer<typeof roleValidator>;

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    organizationIds: v.array(
      v.object({
        organizationId: v.string(),
        role: roleValidator,
      })
    ),
  }).index('by_token', ['tokenIdentifier']),
  projects: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    organizationId: v.string(),
  }).index('byOrganizationId', ['organizationId']),
  projectUsers: defineTable({
    projectId: v.id('projects'),
    userId: v.id('users'),
    role: roleValidator,
  })
    .index('byProjectId', ['projectId']) // Get users in a project
    .index('byUserId', ['userId']), // Get projects a user is in
});
