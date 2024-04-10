import { Doc } from '../convex/_generated/dataModel';

export type UserWithRole = Doc<'users'> & { role: string };
