import { z } from 'zod';

export const FilterOperators = z.enum([
  'EXISTS', // No attribute or value
  'NOT_EXISTS', // No attribute or value
  'EXACTLY',
  'NOT',
  'GREATER_THAN',
  'GREATER_THAN_OR_EQUAL',
  'LESS_THAN',
  'LESS_THAN_OR_EQUAL',
  'INCLUDES',
  'EXCLUDES',
  'OPTIONS_GREATER_THAN',
  'OPTIONS_LESS_THAN',
  'OPTIONS_EQUALS',
  'OPTIONS_NOT_EQUALS',
  'COUNT', // count of nodes or edges
]);

export type FilterOperator = z.infer<typeof FilterOperators>;

const BaseFilterRuleSchema = z
  .discriminatedUnion('type', [
    z.object({
      type: z.literal('ego'),
    }),
    z.object({
      type: z.enum(['node', 'edge']),
      entityId: z.string(),
    }),
  ])
  .and(
    z.object({
      id: z.string(),
    }),
  );

const FilterRuleSchema = z
  .discriminatedUnion('operator', [
    z.object({
      operator: FilterOperators.extract(['EXISTS', 'NOT_EXISTS']),
    }),
    z.object({
      operator: FilterOperators.exclude(['EXISTS', 'NOT_EXISTS', 'COUNT']),
      entityVariable: z.string(),
      value: z.union([z.boolean(), z.number(), z.string()]),
    }),
    z.object({
      operator: z.literal('COUNT'),
      entityId: z.string(),
      count: z.number(),
    }),
  ])
  .and(BaseFilterRuleSchema);

export type FilterRule = z.infer<typeof FilterRuleSchema>;

export const FilterDefinitionSchema = z.object({
  join: z.enum(['AND', 'OR']),
  rules: z.array(FilterRuleSchema),
});

export type FilterDefinition = {
  join: 'AND' | 'OR';
  rules: (FilterRule | FilterDefinition)[];
};

export const SkipDefinitionSchema = z.object({
  action: z.enum(['SKIP', 'SHOW']),
  filter: FilterDefinitionSchema,
  targetStage: z.string().optional(), // specific stage to skip to
});

export type SkipDefinition = z.infer<typeof SkipDefinitionSchema>;
