import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const createOrganization = mutation({
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
