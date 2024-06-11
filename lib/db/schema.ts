import {
  bigserial,
  boolean,
  date,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { generatePublicId } from '~/lib/generatePublicId';

export const organizations = pgTable('organizations', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  public_id: text('public_id').default(generatePublicId()),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
});

export const projects = pgTable('projects', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  public_id: text('public_id').default(generatePublicId()),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  organizationId: bigserial('organization_id', { mode: 'number' }).references(
    () => organizations.id,
    {
      onDelete: 'cascade',
    },
  ),
  allowAnonymousRecruitment: boolean('allow_anonymous_recruitment')
    .notNull()
    .default(false),
});

export const protocols = pgTable('protocols', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  public_id: text('public_id').default(generatePublicId()),
  description: text('description'),
  lastModified: date('last_modified').notNull(),
  projectId: bigserial('project_id', { mode: 'number' }).references(
    () => projects.id,
    {
      onDelete: 'cascade',
    },
  ),
});

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
});

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});

export type UserType = typeof user.$inferSelect;

export type Project = typeof projects.$inferSelect;
export type PublicProject = Omit<Project, 'id'>;

export type Organization = typeof organizations.$inferSelect;
export type PublicOrganization = Omit<Organization, 'id'>;
