import { mutation, query } from './_generated/server';
import { ConvexError, v } from 'convex/values';

export const create = mutation({
  args: {
    name: v.string(),
    administratorId: v.id('users'),
  },
  handler: async (ctx, args) => {
    const organizationId = await ctx.db.insert('organizations', {
      name: args.name,
      slug: args.name.toLowerCase().replace(/\s/g, '-'),
      administratorId: args.administratorId,
    });

    // add the organization to the user as administrator

    const user = await ctx.db.get(args.administratorId);

    if (!user) {
      throw new ConvexError('User not found');
    }

    const existingOrgs = user.organizationIds || [];

    await ctx.db.patch(user._id, {
      organizationIds: [
        ...existingOrgs,
        { id: organizationId, role: 'Administrator' },
      ],
    });
  },
});

export const getAll = query({
  args: {
    userId: v.id('users'),
  },
  handler: async (ctx, args) => {
    const organizations = await ctx.db
      .query('organizations')
      .filter((q) => q.eq(q.field('administratorId'), args.userId))
      .collect();

    return organizations;
  },
});

export const get = query({
  args: {
    organizationSlug: v.string(),
  },
  handler: async (ctx, args) => {
    const organization = await ctx.db
      .query('organizations')
      .filter((q) => q.eq(q.field('slug'), args.organizationSlug))
      .unique();

    if (!organization) {
      throw new Error('Organization not found');
    }

    const projects = await ctx.db
      .query('projects')
      .filter((q) => q.eq(q.field('organizationId'), organization._id))
      .collect();

    if (!projects) {
      return {
        organization,
        projects: [],
      };
    }

    return {
      organization,
      projects,
    };
  },
});
