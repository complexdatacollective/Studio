import { z } from 'zod';

export const EntitySchema = z.object({
  _id: z.string().readonly(),
  _attributes: z.record(z.string(), z.any()),
});

export type TEntity = z.infer<typeof EntitySchema>;

export const NodeSchema = EntitySchema.extend({
  _type: z.string(),
  _meta: z.object({
    createdOn: z.string().optional(),
    nominatedOn: z.array(z.string()).optional(),
  }),
});

export type TNode = z.infer<typeof NodeSchema>;

export const EdgeSchema = EntitySchema.extend({
  _type: z.string(),
  _source: z.string(),
  _target: z.string(),
});

export type TEdge = z.infer<typeof EdgeSchema>;

export const NetworkSchema = z.object({
  nodes: z.array(NodeSchema),
  edges: z.array(EdgeSchema),
  ego: EntitySchema,
});

export type TNetwork = z.infer<typeof NetworkSchema>;
