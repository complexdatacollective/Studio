import { z } from 'zod';

const SortOptionSchema = z.object({
  property: z.string(),
  direction: z.enum(['asc', 'desc']),
});

export type SortOption = z.infer<typeof SortOptionSchema>;

const SortOptionsSchema = z.object({
  sortOrder: z.array(SortOptionSchema),
  sortableProperties: z.array(
    z.object({
      label: z.string(),
      variable: z.string(),
    }),
  ),
});

export type SortOptions = z.infer<typeof SortOptionsSchema>;
