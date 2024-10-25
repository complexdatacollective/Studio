import { z } from 'zod';

export const Operators = z.enum([
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

export type Operator = z.infer<typeof Operators>;

const BaseRuleSchema = z
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

const RuleSchema = z
  .discriminatedUnion('operator', [
    z.object({
      operator: Operators.extract(['EXISTS', 'NOT_EXISTS']),
    }),
    z.object({
      operator: Operators.exclude(['EXISTS', 'NOT_EXISTS', 'COUNT']),
      entityVariable: z.string(),
      value: z.union([z.boolean(), z.number(), z.string()]),
    }),
    z.object({
      operator: z.literal('COUNT'),
      entityId: z.string(),
      count: z.number(),
    }),
  ])
  .and(BaseRuleSchema);

export type FilterRule = z.infer<typeof RuleSchema>;

export const ConditionDefinitionSchema = z.object({
  join: z.enum(['AND', 'OR']),
  rules: z.array(RuleSchema),
});

export type ConditionDefinition = {
  join: 'AND' | 'OR';
  rules: (FilterRule | ConditionDefinition)[];
};

export const SkipDefinitionSchema = z.object({
  action: z.enum(['SKIP', 'SHOW']),
  filter: ConditionDefinitionSchema,
});

export type SkipDefinition = z.infer<typeof SkipDefinitionSchema>;

// Create an additional schema with a 'target' property to allow "skip to" functionality
export const SkipDefinitionWithTargetSchema = SkipDefinitionSchema.extend({
  targetStage: z.string().optional(),
});

export type SkipDefinitionWithTarget = z.infer<
  typeof SkipDefinitionWithTargetSchema
>;
