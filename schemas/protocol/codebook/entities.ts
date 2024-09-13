import { z } from 'zod';
import { VariableDefinitionSchema } from './variables';
import * as lucide from 'lucide-react';

const lucideIcons = Object.keys(lucide) as (keyof typeof lucide)[];

export const NodeColors = [
  'seq-node-1',
  'seq-node-2',
  'seq-node-3',
  'seq-node-4',
  'seq-node-5',
  'seq-node-6',
  'seq-node-7',
  'seq-node-8',
] as const;

export const NodeIcons = [
  'add-a-person',
  'add-a-place',
  ...lucideIcons,
] as const;

export const EdgeColors = [
  'seq-edge-1',
  'seq-edge-2',
  'seq-edge-3',
  'seq-edge-4',
  'seq-edge-5',
  'seq-edge-6',
  'seq-edge-7',
  'seq-edge-8',
  'seq-edge-9',
  'seq-edge-10',
] as const;

export const EntityTypeSchema = z.object({
  variables: z.record(z.string(), VariableDefinitionSchema).optional(),
});

export type TEntityType = z.infer<typeof EntityTypeSchema>;

export const NodeTypeSchema = EntityTypeSchema.extend({
  color: z.enum(NodeColors),
  icon: z.enum(NodeIcons),
});

export type TNodeType = z.infer<typeof NodeTypeSchema>;

export const EdgeConnectionSchema = z.object({
  from: z.string(), // source node types
  to: z.string(), // target node types
});

export const EdgeTypeSchema = EntityTypeSchema.extend({
  color: z.enum(EdgeColors),
  directed: z.boolean(),
  connections: EdgeConnectionSchema,
});

export type TEdgeType = z.infer<typeof EdgeTypeSchema>;
