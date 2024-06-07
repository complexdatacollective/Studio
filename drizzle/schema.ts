import {
  date,
  integer,
  json,
  pgTable,
  serial,
  text,
} from 'drizzle-orm/pg-core';

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
  hash: text('hash').notNull().unique(),
  name: text('name').notNull(),
  schemaVersion: integer('schema_version').notNull(),
  description: text('description'),
  importedAt: date('imported_at').notNull().defaultNow(),
  lastModified: date('last_modified').notNull(),
  stages: json('stages').notNull(),
  codebook: json('codebook').notNull(),
  projectId: serial('project_id').references(() => projects.id, {
    onDelete: 'cascade',
  }),
});

export const protocolsAssets = pgTable('protocols_assets', {
  protocolId: serial('protocol_id').references(() => protocols.id, {
    onDelete: 'cascade',
  }),
  assetId: serial('asset_id').references(() => assets.assetId, {
    onDelete: 'cascade',
  }),
});

export const assets = pgTable('assets', {
  key: text('key').primaryKey(),
  assetId: serial('asset_id').notNull().unique(),
  name: text('name').notNull(),
  type: text('type').notNull(),
  url: text('url').notNull(),
  size: integer('size').notNull(),
});

export const interviews = pgTable('interviews', {
  id: serial('id').primaryKey(),
  startTime: date('start_time').notNull().defaultNow(),
  finishTime: date('finish_time'),
  exportTime: date('export_time'),
  lastUpdated: date('last_updated').notNull().defaultNow(),
  network: json('network').notNull(),
  participantId: serial('participant_id').references(() => participants.id, {
    onDelete: 'cascade',
  }),
  protocolId: serial('protocol_id').references(() => protocols.id, {
    onDelete: 'cascade',
  }),
  currentStep: integer('current_step').notNull().default(0),
  stageMetadata: json('stage_metadata'),
});

export const participants = pgTable('participants', {
  id: serial('id').primaryKey(),
  identifier: text('identifier').notNull().unique(),
  label: text('label'),
});
