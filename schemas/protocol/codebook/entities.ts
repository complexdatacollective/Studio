import { z } from 'zod';
import { VariableDefinitionSchema } from './variables';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

export type NodeIcon = keyof typeof dynamicIconImports;

export const NodeIcons = Object.keys(dynamicIconImports) as NodeIcon[];

export const NodeColors = [
  'node-1',
  'node-2',
  'node-3',
  'node-4',
  'node-5',
  'node-6',
  'node-7',
  'node-8',
] as const;

export type NodeColor = (typeof NodeColors)[number];

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

export type EdgeColor = (typeof EdgeColors)[number];

export const EntityTypeSchema = z.object({
  variables: z.record(z.string(), VariableDefinitionSchema).optional(),
});

export type TEntityType = z.infer<typeof EntityTypeSchema>;

export const NodeTypeSchema = EntityTypeSchema.extend({
  color: z.enum(NodeColors),
  icon: z.enum([NodeIcons[0]!, ...NodeIcons.slice(0)]),
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
