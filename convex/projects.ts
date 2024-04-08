import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const create = mutation({
  args: {
    name: v.string(),
    organization: v.id('organizations'),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('projects', {
      name: args.name,
      organization: args.organization,
    });
  },
});

export const get = query({
  args: {
    organizationId: v.id('organizations'),
  },
  handler: async (ctx, args) => {
    const projects = await ctx.db
      .query('projects')
      .filter((q) => q.eq(q.field('organization'), args.organizationId))
      .collect();

    return projects;
  },
});
