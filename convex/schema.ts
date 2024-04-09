import { defineSchema, defineTable } from 'convex/server';
import { Validator, v } from 'convex/values';

export default defineSchema({
  ...authTables({
    user: {
      email: v.string(),
      organizationIds: v.optional(
        v.array(
          v.object({
            id: v.id('organizations'),
            role: v.string(),
          })
        )
      ),
    },
    session: {},
  }),
  organizations: defineTable({
    name: v.string(),
    slug: v.string(),
    administratorId: v.id('users'),
  }),
  projects: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    organizationId: v.id('organizations'),
  }),
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
