import { MutationCtx, QueryCtx, mutation, query } from './_generated/server';
import { ConvexError, v } from 'convex/values';
import { getManyVia } from 'convex-helpers/server/relationships';

// for now, we are only allowing org admins to create projects
export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    organizationId: v.id('organizations'),
    creatorId: v.id('users'),
  },
  handler: async (ctx, args) => {
    // check if user is an admin of the organization
    const role = await roleOnOrganization(
      ctx,
      args.organizationId,
      args.creatorId
    );

    if (!role || role !== 'Administrator') {
      throw new ConvexError(
        'User does not have permission to create projects.'
      );
    }
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

export const getProjectBySlug = query({
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

// get UserOrganization by organization slug and userId
export const getUserProject = query({
  args: {
    projectSlug: v.string(),
    userId: v.id('users'),
  },
  handler: async (ctx, args) => {
    const project = await getProjectBySlug(ctx, {
      projectSlug: args.projectSlug,
    });

    const userProject = await ctx.db
      .query('projectUsers')
      .withIndex('byUserId')
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .filter((q) => q.eq(q.field('projectId'), project._id))
      .unique();

    return userProject;
  },
});

// Helper Functions
async function roleOnOrganization(
  ctx: QueryCtx | MutationCtx,
  organizationId: string,
  userId: string
) {
  const organizationUser = await ctx.db
    .query('organizationUsers')
    .withIndex('byUserId')
    .filter((q) => q.eq(q.field('userId'), userId))
    .filter((q) => q.eq(q.field('organizationId'), organizationId))
    .unique();

  if (!organizationUser) {
    throw new ConvexError('User not in organization');
  }

  return organizationUser.role;
}
