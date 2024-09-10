import { z } from 'zod';
import { EdgeTypeSchema, EntityTypeSchema, NodeTypeSchema } from './entities';

const WaveEntitySchema = z.record(z.string(), NodeTypeSchema);

export const CodebookSchema = z.object({
  nodes: z
    .record(z.string(), z.union([NodeTypeSchema, WaveEntitySchema]))
    .optional(),
  edges: z
    .record(z.string(), z.union([EdgeTypeSchema, WaveEntitySchema]))
    .optional(),
  ego: z.union([EntityTypeSchema, WaveEntitySchema]).optional(),
});

export type TCodebook = z.infer<typeof CodebookSchema>;

export const example: TCodebook = {
  nodes: {
    person: {
      '1': {
        variables: {
          name: { type: 'text' },
          age: { type: 'number' },
        },
        color: 'seq-node-1',
        icon: 'add-a-person',
      },
      '2': {
        variables: {
          name: { type: 'text' },
          age: { type: 'number' },
          school: { type: 'text' }, // new var in wave 2
        },
        color: 'seq-node-1',
        icon: 'add-a-person',
      },
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
