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
]);

export type Operator = z.infer<typeof Operators>;

const BaseRuleSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('ego'),
  }),
  z.object({
    type: z.enum(['node', 'edge']),
    entity: z.string(),
  }),
]);

const RuleSchema = z
  .discriminatedUnion('operator', [
    z.object({
      operator: Operators.extract(['EXISTS', 'NOT_EXISTS']),
    }),
    z.object({
      operator: Operators.exclude(['EXISTS', 'NOT_EXISTS']),
      variable: z.string(),
      value: z.union([z.boolean(), z.number(), z.string()]),
    }),
  ])
  .and(BaseRuleSchema);

export type Rule = z.infer<typeof RuleSchema>;

export const FilterSchema = z.object({
  join: z.enum(['AND', 'OR']).default('AND').optional(),
  rules: z.array(RuleSchema),
});

export type Filter = z.infer<typeof FilterSchema>;

export const SkipDefinitionSchema = z.object({
  action: z.enum(['SKIP', 'SHOW']),
  filter: FilterSchema,
});

export type SkipDefinition = z.infer<typeof SkipDefinitionSchema>;

// Create an additional schema with a 'target' property to allow "skip to" functionality
export const SkipDefinitionWithTargetSchema = SkipDefinitionSchema.extend({
  targetStage: z.string().optional(),
});

export type SkipDefinitionWithTarget = z.infer<
  typeof SkipDefinitionWithTargetSchema
>;
