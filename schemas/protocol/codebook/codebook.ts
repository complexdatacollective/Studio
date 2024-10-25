import { z } from 'zod';
import { EdgeTypeSchema, EntityTypeSchema, NodeTypeSchema } from './entities';

export const CodebookSchema = z.object({
  nodes: z.record(z.string(), NodeTypeSchema).optional(),
  edges: z.record(z.string(), EdgeTypeSchema).optional(),
  ego: EntityTypeSchema.optional(),
});

export type Codebook = z.infer<typeof CodebookSchema>;

export const example: Codebook = {
  nodes: {
    person: {
      variables: {
        name: { type: 'text' },
        age: { type: 'number' },
      },
      color: 'node-1',
      icon: 'user-round',
    },
    place: {
      variables: {
        name: { type: 'text' },
        population: { type: 'number' },
      },
      color: 'node-2',
      icon: 'building',
    },
  },
  edges: {
    knows: {
      color: 'seq-edge-1',
      directed: false,
      connections: {
        from: 'person',
        to: 'person',
      },
    },
    livesIn: {
      color: 'seq-edge-2',
      directed: true,
      connections: {
        from: 'person',
        to: 'place',
      },
    },
  },
  ego: {
    variables: {
      name: { type: 'text' },
    },
  },
};
