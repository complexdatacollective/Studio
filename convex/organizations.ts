import { mutation, query } from './_generated/server';
import { v } from 'convex/values';
import {
  getAll,
  getOneFrom,
  getManyFrom,
  getManyVia,
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

export const getUserOrgs = query({
  args: {
    userId: v.id('users'),
  },
  handler: async (ctx, args) => {
    // these steps could be replaced with using getManyVia
    const organizationUsers = await ctx.db
      .query('organizationUsers')
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .collect();

    const organizationIds = organizationUsers.map((ou) => ou.organizationId);
    const organizations = await getAll(ctx.db, organizationIds);
    return organizations;
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
