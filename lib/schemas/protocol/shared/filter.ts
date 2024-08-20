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
]);

export type FilterOperator = z.infer<typeof FilterOperators>;

const BaseFilterRuleSchema = z
  .discriminatedUnion('type', [
    z.object({
      type: z.literal('ego'),
    }),
    z.object({
      type: z.union([z.literal('node'), z.literal('edge')]),
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
      operator: FilterOperators.exclude(['EXISTS', 'NOT_EXISTS']),
      entityVariable: z.string(),
      value: z.union([z.boolean(), z.number(), z.string()]),
    }),
  ])
  .and(BaseFilterRuleSchema);

export type FilterRule = z.infer<typeof FilterRuleSchema>;

export const FilterDefinitionSchema = z.object({
  join: z.enum(['AND', 'OR']),
  rules: z.array(FilterRuleSchema),
});

export type FilterDefinition = z.infer<typeof FilterDefinitionSchema>;

export const SkipDefinitionSchema = z.object({
  action: z.enum(['SKIP', 'SHOW']),
  filter: FilterDefinitionSchema,
});

export type SkipDefinition = z.infer<typeof SkipDefinitionSchema>;
