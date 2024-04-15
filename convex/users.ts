import { ConvexError, v } from 'convex/values';
import {
  MutationCtx,
  QueryCtx,
  internalMutation,
  internalQuery,
  query,
} from './_generated/server';

import { roleValidator } from './schema';

/**
 * Insert or update the user in a Convex table then return the document's ID.
 *
 * The `UserIdentity.tokenIdentifier` string is a stable and unique value we use
 * to look up identities.
 *
 * Keep in mind that `UserIdentity` has a number of optional fields, the
 * presence of which depends on the identity provider chosen. It's up to the
 * application developer to determine which ones are available and to decide
 * which of those need to be persisted. For Clerk the fields are determined
 * by the JWT token's Claims config.
 */
export const createUser = internalMutation({
  args: { tokenIdentifier: v.string() },
  async handler(ctx, args) {
    await ctx.db.insert('users', {
      tokenIdentifier: args.tokenIdentifier,
      organizationIds: [],
    });
  },
});

async function getUser(ctx: QueryCtx | MutationCtx, tokenIdentifier: string) {
  const user = await ctx.db
    .query('users')
    .withIndex('by_token', (q) => q.eq('tokenIdentifier', tokenIdentifier))
    .first();

  if (!user) {
    throw new ConvexError('No user');
  }

  return user;
}

export const addOrganizationIdToUser = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    organizationId: v.string(),
    role: roleValidator,
  },
  async handler(ctx, args) {
    const user = await getUser(ctx, args.tokenIdentifier);

    await ctx.db.patch(user._id, {
      organizationIds: [
        ...user.organizationIds,
        { organizationId: args.organizationId, role: args.role },
      ],
    });
  },
});

export const updateRoleInOrganizationForUser = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    organizationId: v.string(),
    role: roleValidator,
  },
  async handler(ctx, args) {
    const user = await getUser(ctx, args.tokenIdentifier);

    const organization = user.organizationIds.find(
      (org) => org.organizationId === args.organizationId
    );

    if (!organization) {
      throw new ConvexError('No organization found');
    }

    organization.role = args.role;

    await ctx.db.patch(user._id, {
      organizationIds: user.organizationIds,
    });
  },
});

export const getCurrentUser = query({
  args: {},
  async handler(ctx) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return null;
    }

    const user = await getUser(ctx, identity.tokenIdentifier);

    if (!user) {
      return null;
    }

    return user;
  },
});

export const hasAccessToProject = query({
  args: { projectSlug: v.string(), userId: v.string() },
  async handler(ctx, args) {
    const project = await ctx.db
      .query('projects')
      .filter((q) => q.eq(q.field('slug'), args.projectSlug))
      .unique();

    if (!project) {
      return false;
    }

    const projectUser = await ctx.db
      .query('projectUsers')
      .filter((q) => q.eq(q.field('projectId'), project._id))
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .unique();

    return projectUser ? true : false;
  },
});
