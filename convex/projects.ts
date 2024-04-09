import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    organizationId: v.id('organizations'),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('projects', {
      name: args.name,
      slug: args.name.toLowerCase().replace(/\s/g, '-'),
      description: args.description,
      organizationId: args.organizationId,
    });
  },
});

export const getAll = query({
  args: {
    organizationId: v.id('organizations'),
  },
  handler: async (ctx, args) => {
    const projects = await ctx.db
      .query('projects')
      .filter((q) => q.eq(q.field('organizationId'), args.organizationId))
      .collect();

    return projects;
  },
});

export const getBySlug = query({
  args: {
    projectSlug: v.string(),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db
      .query('projects')
      .filter((q) => q.eq(q.field('slug'), args.projectSlug))
      .unique();

    if (!project) {
      throw new Error('Project not found');
    }

    return project;
  },
});
