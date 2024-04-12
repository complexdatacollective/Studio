import { ConvexError, v } from 'convex/values';
import { MutationCtx, QueryCtx, internalMutation } from './_generated/server';

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

export async function getUser(
  ctx: QueryCtx | MutationCtx,
  tokenIdentifier: string
) {
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
