import { z } from 'zod';

export const Entity = z.object({
  _id: z.string().readonly(),
  _attributes: z.record(z.string(), z.any()),
});

export type TEntity = z.infer<typeof Entity>;

export const Node = Entity.extend({
  _type: z.string(),
  _meta: z.object({
    createdOn: z.string().optional(),
    nominatedOn: z.array(z.string()).optional(),
  }),
});

export type TNode = z.infer<typeof Node>;

export const Edge = Entity.extend({
  _type: z.string(),
  _source: z.string(),
  _target: z.string(),
});

export type TEdge = z.infer<typeof Edge>;

export const Network = z.object({
  nodes: z.array(Node),
  edges: z.array(Edge),
  ego: Entity,
});

export type TNetwork = z.infer<typeof Network>;
