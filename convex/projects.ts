import { MutationCtx, QueryCtx, mutation, query } from './_generated/server';
import { ConvexError, v } from 'convex/values';
import { getManyVia } from 'convex-helpers/server/relationships';
import { mutationWithAuth, queryWithAuth } from './withAuth';
import type { WithAuthCtx } from './withAuth';

// for now, we are only allowing org admins to create projects
export const create = mutationWithAuth({
  args: {
    name: v.string(),
    description: v.string(),
    organizationId: v.id('organizations'),
  },
  handler: async (ctx, args) => {
    if (!ctx.session) {
      throw new ConvexError('Session not found');
    }
    // check if user is an admin of the organization
    const role = await roleOnOrganization(
      ctx,
      args.organizationId,
      ctx.session.user._id
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
      userId: ctx.session.user._id,
      role: 'Administrator',
    });
  },
});

export const getMembers = queryWithAuth({
  args: {
    projectSlug: v.string(),
  },
  handler: async (ctx, args) => {
    if (!ctx.session) {
      throw new ConvexError('Session not found');
    }
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
      'projectUsers', // table
      'userId', // toField
      'byProjectId', // index
      project._id, // value
      'projectId' // fromField - optional if index is named after field. In this case, it is not.
    );

    return members;
  },
});

// get ProjectUser by project slug
export const getUserProject = queryWithAuth({
  args: {
    projectSlug: v.string(),
  },
  handler: async (ctx, args) => {
    const session = ctx.session;
    if (!session) {
      throw new ConvexError('Session not found');
    }
    const project = await getProjectBySlug(ctx, args.projectSlug);

    const userProject = await ctx.db
      .query('projectUsers')
      .withIndex('byUserId')
      .filter((q) => q.eq(q.field('userId'), session.user._id))
      .filter((q) => q.eq(q.field('projectId'), project._id))
      .unique();

    return userProject;
  },
});

export const getProject = queryWithAuth({
  args: {
    projectSlug: v.string(),
  },
  handler: async (ctx, args) => {
    return getProjectBySlug(ctx, args.projectSlug);
  },
});

// Helper Functions
async function roleOnOrganization(
  ctx: QueryCtx | MutationCtx | WithAuthCtx,
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

async function getProjectBySlug(
  ctx: QueryCtx | MutationCtx | WithAuthCtx,
  slug: string
) {
  const project = await ctx.db
    .query('projects')
    .filter((q) => q.eq(q.field('slug'), slug))
    .unique();

  if (!project) {
    throw new Error('Project not found');
  }

  return project;
}
