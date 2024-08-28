import { z } from 'zod';
import { EdgeTypeSchema, EntityTypeSchema, NodeTypeSchema } from './entities';

export const CodebookSchema = z.object({
  nodes: z.record(z.string(), NodeTypeSchema).optional(),
  edges: z.record(z.string(), EdgeTypeSchema).optional(),
  ego: EntityTypeSchema.optional(),
});

export type TCodebook = z.infer<typeof CodebookSchema>;

export const example: TCodebook = {
  nodes: {
    person: {
      variables: {
        name: {
          type: 'text',
        },
        age: {
          type: 'number',
        },
      },
      color: 'seq-node-1',
      icon: 'add-a-person',
    },
    place: {
      variables: {
        name: { type: 'text' },
        population: { type: 'number' },
      },
      color: 'seq-node-2',
      icon: 'add-a-place',
    },
  },
  edges: {
    knows: {
      color: 'seq-edge-1',
      directed: false,
    },
    livesIn: {
      color: 'seq-edge-2',
      directed: true,
    },
  },
  ego: {
    variables: {
      name: { type: 'text' },
    },
  },
};
