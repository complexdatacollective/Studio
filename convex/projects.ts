import { MutationCtx, QueryCtx, mutation, query } from './_generated/server';
import { ConvexError, v } from 'convex/values';
import { getManyVia } from 'convex-helpers/server/relationships';

// for now, we are only allowing org admins to create projects
export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    organizationId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null || !identity.email) {
      throw new Error('Unauthenticated call to mutation');
    }

    const hasAccess = await hasAccessToOrganization(ctx, args.organizationId);
    if (!hasAccess) {
      throw new ConvexError('User does not have access to this organization.');
    }

    // create the project
    const projectId = await ctx.db.insert('projects', {
      name: args.name,
      slug: args.name.toLowerCase().replace(/\s/g, '-'),
      description: args.description,
      organizationId: args.organizationId,
    });

    // create the projectUser
    // role is 'admin' by default for the creator
    await ctx.db.insert('projectUsers', {
      projectId: projectId,
      userId: hasAccess.user._id,
      role: 'admin',
    });
  },
});

export const getMembers = query({
  args: {
    projectSlug: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null || !identity.email) {
      throw new Error('Unauthenticated call to mutation');
    }

    // get project id by slug
    const project = await ctx.db
      .query('projects')
      .filter((q) => q.eq(q.field('slug'), args.projectSlug))
      .unique();

    if (!project) {
      throw new Error('Project not found');
    }

    const hasAccess = await hasAccessToOrganization(
      ctx,
      project.organizationId
    );
    if (!hasAccess) {
      throw new ConvexError('User does not have access to this organization.');
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

export const getProject = query({
  args: {
    projectSlug: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null || !identity.email) {
      throw new Error('Unauthenticated call to mutation');
    }

    const project = await getProjectBySlug(ctx, args.projectSlug);

    if (!project) {
      throw new Error('Project not found');
    }

    const hasAccess = await hasAccessToOrganization(
      ctx,
      project.organizationId
    );
    if (!hasAccess) {
      throw new ConvexError('User does not have access to this organization.');
    }

    return project;
  },
});

export const getOrganizationProjects = query({
  args: {
    organizationId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null || !identity.email) {
      throw new Error('Unauthenticated call to mutation');
    }

    const hasAccess = await hasAccessToOrganization(ctx, args.organizationId);
    if (!hasAccess) {
      throw new ConvexError('User does not have access to this organization.');
    }

    const projects = await ctx.db
      .query('projects')
      .withIndex('byOrganizationId')
      .filter((q) => q.eq(q.field('organizationId'), args.organizationId))
      .collect();

    return projects;
  },
});

// Helper Functions

export async function getProjectBySlug(
  ctx: QueryCtx | MutationCtx,
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
export async function hasAccessToOrganization(
  ctx: QueryCtx | MutationCtx,
  organizationId: string
) {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    return null;
  }

  const user = await ctx.db
    .query('users')
    .withIndex('by_token', (q) =>
      q.eq('tokenIdentifier', identity.tokenIdentifier)
    )
    .first();

  if (!user) {
    return null;
  }

  const hasAccess =
    user.organizationIds.some(
      (item) => item.organizationId === organizationId
    ) || user.tokenIdentifier.includes(organizationId);

  if (!hasAccess) {
    return null;
  }

  return { user };
}

export async function roleOnProject(
  ctx: QueryCtx | MutationCtx,
  projectId: string,
  userId: string
) {
  const projectUser = await ctx.db
    .query('projectUsers')
    .withIndex('byUserId')
    .filter((q) => q.eq('userId', userId))
    .filter((q) => q.eq('projectId', projectId))
    .unique();

  if (!projectUser) {
    return null;
  }

  return projectUser.role;
}
