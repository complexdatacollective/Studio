'use node';

import type { WebhookEvent } from '@clerk/clerk-sdk-node';
import { v } from 'convex/values';
import { Webhook } from 'svix';

import { internalAction } from './_generated/server';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || ``;

// Actions call third party services
// internal prefix on Action, Query, and Mutation makes it only callable from within another Convex function
export const fulfill = internalAction({
  args: { headers: v.any(), payload: v.string() },
  handler: async (ctx, args) => {
    const wh = new Webhook(webhookSecret);
    const payload = wh.verify(args.payload, args.headers) as WebhookEvent;
    return payload;
  },
});
