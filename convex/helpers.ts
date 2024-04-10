import { Infer, v } from 'convex/values';
import { Doc } from './_generated/dataModel';

export const roleValidator = v.union(
  v.literal('Administrator'),
  v.literal('Member')
);

export type Role = Infer<typeof roleValidator>;

export type UserWithRole = Doc<'users'> & { role: Role };
