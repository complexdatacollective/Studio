import { z } from 'zod';

const SortTypes = z.enum(['string', 'number', 'boolean', 'date', 'hierarchy']);

const BaseSortOptionSchema = z.object({
  property: z.string(),
  direction: z.enum(['asc', 'desc']),
});

const SortOptionSchema = z
  .discriminatedUnion('type', [
    z.object({
      type: SortTypes.extract(['string', 'number', 'boolean', 'date']),
    }),
    z.object({
      type: SortTypes.extract(['hierarchy']),
      hierarchy: z.array(z.union([z.string(), z.number(), z.boolean()])),
    }),
  ])
  .and(BaseSortOptionSchema);

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
