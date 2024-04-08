import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const create = mutation({
  args: {
    name: v.string(),
    administrator: v.id('users'),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('organizations', {
      name: args.name,
      administrator: args.administrator,
    });
  },
});

export const get = query({
  args: {
    userId: v.id('users'),
  },
  handler: async (ctx, args) => {
    const organizations = await ctx.db
      .query('organizations')
      .filter((q) => q.eq(q.field('administrator'), args.userId))
      .collect();

    return organizations;
  },
});
