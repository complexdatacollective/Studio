import { z } from 'zod';
import { VariableDefinitionSchema } from './variables';

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

// Todo: extend to include all lucide icons
export const NodeIcons = ['add-a-person', 'add-a-place'] as const;

export const EdgeColors = [
  'seq-edge-1',
  'seq-edge-2',
  'seq-edge-3',
  'seq-edge-4',
  'seq-edge-5',
  'seq-edge-6',
  'seq-edge-7',
  'seq-edge-8',
] as const;

export const EntityTypeSchema = z.object({
  name: z.string(),
  variables: z.map(z.string(), VariableDefinitionSchema),
});

export type TEntityType = z.infer<typeof EntityTypeSchema>;

export const NodeTypeSchema = EntityTypeSchema.extend({
  color: z.enum(NodeColors),
  icon: z.enum(NodeIcons),
});

export type TNodeType = z.infer<typeof NodeTypeSchema>;

export const EdgeTypeSchema = EntityTypeSchema.extend({
  color: z.enum(EdgeColors),
});

export type TEdgeType = z.infer<typeof EdgeTypeSchema>;

export const CodebookSchema = z.object({
  node: z.map(z.string(), NodeTypeSchema),
  edge: z.map(z.string(), EdgeTypeSchema),
  ego: EntityTypeSchema,
});

export type TCodebook = z.infer<typeof CodebookSchema>;
