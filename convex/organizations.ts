import { MutationCtx, QueryCtx, mutation, query } from './_generated/server';
import { ConvexError, v } from 'convex/values';
import {
  getManyVia,
  getManyFrom,
  getAll,
} from 'convex-helpers/server/relationships';

export const create = mutation({
  args: {
    name: v.string(),
    creatorId: v.id('users'),
  },
  handler: async (ctx, args) => {
    // create the organization
    const organizationId = await ctx.db.insert('organizations', {
      name: args.name,
      slug: args.name.toLowerCase().replace(/\s/g, '-'),
    });

    // create the organizationUser
    // role is 'Administrator' by default for the creator
    await ctx.db.insert('organizationUsers', {
      organizationId,
      userId: args.creatorId,
      role: 'Administrator',
    });
  },
});

// gets all organizations a user is in
export const getAllUserOrgs = query({
  args: {
    userId: v.id('users'),
  },
  handler: async (ctx, args) => {
    const organizations = await getManyVia(
      ctx.db,
      'organizationUsers', // table
      'organizationId', // toField
      'byUserId', // index
      args.userId, // value
      'userId' // fromField - optional if index is named after field. In this case, it is not.
    );

    return organizations;
  },
});

// get UserOrganization by organization slug and userId
export const getUserOrganization = query({
  args: {
    organizationSlug: v.string(),
    userId: v.id('users'),
  },
  handler: async (ctx, args) => {
    const organization = await getOrgBySlug(ctx, args.organizationSlug);

    const userOrganization = await ctx.db
      .query('organizationUsers')
      .withIndex('byUserId')
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .filter((q) => q.eq(q.field('organizationId'), organization._id))
      .unique();

    return userOrganization;
  },
});

export const getMembers = query({
  args: {
    organizationSlug: v.string(),
  },
  handler: async (ctx, args) => {
    const organization = await getOrgBySlug(ctx, args.organizationSlug);

    // using this pattern instead of getManyVia because we want to return the role
    // otherwise we would have to do another query for the organizationUser to get role
    const organizationUsers = await getManyFrom(
      ctx.db,
      'organizationUsers',
      'byOrganizationId',
      organization._id,
      'organizationId'
    );
    const userIds = organizationUsers.map((ou) => ou.userId);
    const users = await getAll(ctx.db, userIds);

    if (!users) {
      return [];
    }

    // add role to each user
    const members = users.map((user) => {
      if (!user) {
        return null;
      }
      const organizationUser = organizationUsers.find(
        (ou) => ou.userId === user._id
      );

      if (!organizationUser) {
        throw new ConvexError('Organization user not found');
      }

      return {
        ...user,
        role: organizationUser.role,
      };
    });

    return members;
  },
});

export const getOrgWithProjects = query({
  args: {
    organizationSlug: v.string(),
  },
  handler: async (ctx, args) => {
    const organization = await getOrgBySlug(ctx, args.organizationSlug);

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

export const addMember = mutation({
  args: {
    email: v.string(),
    organizationSlug: v.string(),
  },
  handler: async (ctx, args) => {
    const organization = await ctx.db
      .query('organizations')
      .filter((q) => q.eq(q.field('slug'), args.organizationSlug))
      .unique();

    if (!organization) {
      throw new ConvexError('Organization not found');
    }

    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('email'), args.email))
      .unique();

    if (!user) {
      throw new ConvexError('User not found');
    }

    await ctx.db.insert('organizationUsers', {
      organizationId: organization._id,
      userId: user._id,
      role: 'Member',
    });
  },
});

// Helper Functions

async function getOrgBySlug(ctx: QueryCtx | MutationCtx, slug: string) {
  // get org id by slug
  const organization = await ctx.db
    .query('organizations')
    .filter((q) => q.eq(q.field('slug'), slug))
    .unique();

  if (!organization) {
    throw new ConvexError('Organization not found');
  }
  return organization;
}
