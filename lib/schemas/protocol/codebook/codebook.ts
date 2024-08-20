import { z } from 'zod';
import { EdgeTypeSchema, EntityTypeSchema, NodeTypeSchema } from './entities';

export const CodebookSchema = z.object({
  node: z.map(z.string(), NodeTypeSchema),
  edge: z.map(z.string(), EdgeTypeSchema),
  ego: EntityTypeSchema,
});

export type TCodebook = z.infer<typeof CodebookSchema>;
