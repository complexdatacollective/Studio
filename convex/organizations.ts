import { mutation, query } from './_generated/server';
import { ConvexError, v } from 'convex/values';
import { getManyVia } from 'convex-helpers/server/relationships';

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

export const getUserOrgs = query({
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

export const getMembers = query({
  args: {
    organizationSlug: v.string(),
  },
  handler: async (ctx, args) => {
    // get org id by slug
    const organization = await ctx.db
      .query('organizations')
      .filter((q) => q.eq(q.field('slug'), args.organizationSlug))
      .unique();

    if (!organization) {
      throw new ConvexError('Organization not found');
    }

    const members = await getManyVia(
      ctx.db,
      'organizationUsers',
      'userId',
      'byOrganizationId',
      organization._id,
      'organizationId'
    );

    return members;
  },
});

export const getOrgWithProjects = query({
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
