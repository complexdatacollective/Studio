import { z } from 'zod';

export const EntitySchema = z.object({
  id: z.string().readonly(),
  attributes: z.record(z.string(), z.unknown()),
});

export type TEntity = z.infer<typeof EntitySchema>;

export const NodeSchema = EntitySchema.extend({
  type: z.string(),
  meta: z
    .object({
      createdOn: z.string().optional(),
      nominatedOn: z.array(z.string()).optional(),
    })
    .optional(),
});

export type TNode = z.infer<typeof NodeSchema>;

export const EdgeSchema = EntitySchema.extend({
  type: z.string(),
  source: z.string(),
  target: z.string(),
});

export type TEdge = z.infer<typeof EdgeSchema>;

export const NetworkSchema = z.object({
  nodes: z.array(NodeSchema),
  edges: z.array(EdgeSchema),
  ego: EntitySchema,
});

export type TNetwork = z.infer<typeof NetworkSchema>;
