import { ConvexError, v } from 'convex/values';
import { queryWithAuth, mutationWithAuth } from './withAuth';

import { Id } from './_generated/dataModel';

export const get = queryWithAuth({
  args: {},
  handler: async (ctx) => {
    return ctx.session?.user;
  },
});

export const signIn = mutationWithAuth({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { email, password }) => {
    const key = await ctx.auth.useKey('password', email, password);
    const session = await ctx.auth.createSession({
      userId: key.userId,
      attributes: {
        // These will be filled out by Convex
        _id: '' as Id<'sessions'>,
        _creationTime: 0,
      },
    });
    return session.sessionId;
  },
});

export const signUp = mutationWithAuth({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { email, password }) => {
    const user = await ctx.auth.createUser({
      key: {
        password: password,
        providerId: 'password',
        providerUserId: email,
      },
      attributes: {
        email,
        // These will be filled out by Convex
        _id: '' as Id<'users'>,
        _creationTime: 0,
      },
    });
    const session = await ctx.auth.createSession({
      userId: user.userId,
      attributes: {
        // These will be filled out by Convex
        _id: '' as Id<'sessions'>,
        _creationTime: 0,
      },
    });
    return session.sessionId;
  },
});

export const addOrganizationToUser = mutationWithAuth({
  args: {
    userId: v.id('users'),
    organizationId: v.id('organizations'),
    role: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);

    if (!user) {
      throw new ConvexError('User not found');
    }

    const existingOrgs = user.organizationIds || [];

    await ctx.db.patch(user._id, {
      organizationIds: [
        ...existingOrgs,
        { id: args.organizationId, role: args.role },
      ],
    });
  },
});
