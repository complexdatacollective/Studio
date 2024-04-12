import { httpRouter } from 'convex/server';

import { internal } from './_generated/api';
import { httpAction } from './_generated/server';

/*
Convex http gives you a way to define HTTP routes in your Convex app using this file.
This is useful for creating webhooks, API endpoints, and other HTTP-based services.

This file sets up webhooks for Clerk events.
This allows us to save Clerk user and organization data to our Convex database.
*/

const http = httpRouter();

http.route({
  path: '/clerk',
  method: 'POST',
  handler: httpAction(async (ctx, request) => {
    const payloadString = await request.text();
    const headerPayload = request.headers;

    try {
      const result = await ctx.runAction(internal.clerk.fulfill, {
        payload: payloadString,
        headers: {
          // clerk uses svix headers for webhook verification
          'svix-id': headerPayload.get('svix-id')!,
          'svix-timestamp': headerPayload.get('svix-timestamp')!,
          'svix-signature': headerPayload.get('svix-signature')!,
        },
      });

      switch (result.type) {
        case 'user.created':
          await ctx.runMutation(internal.users.createUser, {
            tokenIdentifier: `https://${process.env.CLERK_HOSTNAME}|${result.data.id}`,
          });
          break;
        case 'organizationMembership.created':
          await ctx.runMutation(internal.users.addOrgIdToUser, {
            tokenIdentifier: `https://${process.env.CLERK_HOSTNAME}|${result.data.public_user_data.user_id}`,
            orgId: result.data.organization.id,
            role: result.data.role === 'org:admin' ? 'admin' : 'member',
          });
          break;
        case 'organizationMembership.updated':
          console.log(result.data.role);
          await ctx.runMutation(internal.users.updateRoleInOrgForUser, {
            tokenIdentifier: `https://${process.env.CLERK_HOSTNAME}|${result.data.public_user_data.user_id}`,
            orgId: result.data.organization.id,
            role: result.data.role === 'org:admin' ? 'admin' : 'member',
          });
          break;
      }

      return new Response(null, {
        status: 200,
      });
    } catch (err) {
      return new Response('Webhook Error', {
        status: 400,
      });
    }
  }),
});

export default http;
