import { defineSchema, defineTable } from 'convex/server';
import { Validator, v } from 'convex/values';
import { roleValidator } from './helpers';

export default defineSchema({
  ...authTables({
    user: {
      email: v.string(),
    },
    session: {},
  }),
  organizations: defineTable({
    name: v.string(),
    slug: v.string(),
  }),
  organizationUsers: defineTable({
    organizationId: v.id('organizations'),
    userId: v.id('users'),
    role: roleValidator,
  })
    .index('byOrganizationId', ['organizationId']) // Get users in an organization
    .index('byUserId', ['userId']), // Get organizations a user is in

  projects: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    organizationId: v.id('organizations'),
  }),

  projectUsers: defineTable({
    projectId: v.id('projects'),
    userId: v.id('users'),
    role: roleValidator,
  })
    .index('byProjectId', ['projectId']) // Get users in a project
    .index('byUserId', ['userId']), // Get projects a user is in
});

function authTables<
  UserFields extends Record<string, Validator<any, any, any>>,
  SchemaFields extends Record<string, Validator<any, any, any>>
>({ user, session }: { user: UserFields; session: SchemaFields }) {
  return {
    users: defineTable({
      ...user,
      id: v.string(),
    }).index('byId', ['id']),
    sessions: defineTable({
      ...session,
      id: v.string(),
      user_id: v.string(),
      active_expires: v.float64(),
      idle_expires: v.float64(),
    })
      // `as any` because TypeScript can't infer the table fields correctly
      .index('byId', ['id' as any])
      .index('byUserId', ['user_id' as any]),
    auth_keys: defineTable({
      id: v.string(),
      hashed_password: v.union(v.string(), v.null()),
      user_id: v.string(),
    })
      .index('byId', ['id'])
      .index('byUserId', ['user_id']),
  };
}
