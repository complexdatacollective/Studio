import { mutation, query } from './_generated/server';
import { v } from 'convex/values';
import { getManyVia } from 'convex-helpers/server/relationships';

export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    organizationId: v.id('organizations'),
    creatorId: v.id('users'),
  },
  handler: async (ctx, args) => {
    // create the project
    const projectId = await ctx.db.insert('projects', {
      name: args.name,
      slug: args.name.toLowerCase().replace(/\s/g, '-'),
      description: args.description,
      organizationId: args.organizationId,
    });

    // create the projectUser
    // role is 'Administrator' by default for the creator
    await ctx.db.insert('projectUsers', {
      projectId: projectId,
      userId: args.creatorId,
      role: 'Administrator',
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

export const getMembers = query({
  args: {
    projectSlug: v.string(),
  },
  handler: async (ctx, args) => {
    // get project id by slug
    const project = await ctx.db
      .query('projects')
      .filter((q) => q.eq(q.field('slug'), args.projectSlug))
      .unique();

    if (!project) {
      throw new Error('Project not found');
    }

    const members = await getManyVia(
      ctx.db,
      'projectUsers', // able
      'userId', // toField
      'byProjectId', // index
      project._id, // value
      'projectId' // fromField - optional if index is named after field. In this case, it is not.
    );

    return members;
  },
});
