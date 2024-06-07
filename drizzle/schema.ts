import {
  date,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const organizations = pgTable('organizations', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
});

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  organizationId: serial('organization_id').references(() => organizations.id, {
    onDelete: 'cascade',
  }),
});

export const protocols = pgTable('protocols', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  lastModified: date('last_modified').notNull(),
  projectId: serial('project_id').references(() => projects.id, {
    onDelete: 'cascade',
  }),
});

export type Project = typeof projects.$inferSelect;

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type UserType = typeof user.$inferSelect;
