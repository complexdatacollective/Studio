import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { z } from 'zod';

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
  'edge-1',
  'edge-2',
  'edge-3',
  'edge-4',
  'edge-5',
  'edge-6',
  'edge-7',
  'edge-8',
  'edge-9',
  'edge-10',
] as const;

export type EdgeColor = (typeof EdgeColors)[number];

export const NodeTypeSchema = z.object({
  type: z.literal('node'),
  color: z.enum(NodeColors),
  icon: z.enum([NodeIcons[0]!, ...NodeIcons.slice(0)]),
});

export type NodeType = z.infer<typeof NodeTypeSchema>;

export const EdgeTypeSchema = z.object({
  type: z.literal('edge'),
  color: z.enum(EdgeColors),
  directed: z.boolean().default(false),
});

export type EdgeType = z.infer<typeof EdgeTypeSchema>;

export const EntityTypeSchema = z
  .discriminatedUnion('type', [NodeTypeSchema, EdgeTypeSchema])
  .and(z.object({ label: z.string() }));
