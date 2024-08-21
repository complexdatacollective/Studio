import { z } from 'zod';

export const VariableNameSchema = z.string().regex(/^[a-zA-Z0-9._:-]+$/);

export const CategoricalOptionSchema = z.object({
  label: z.string(),
  value: z.union([z.string(), z.number(), z.boolean()]),
});

const VariableTypes = z.enum([
  'boolean',
  'text',
  'number',
  'datetime',
  'ordinal',
  'categorical',
  'scalar',
  'layout',
]);

const BaseVariableDefinitionSchema = z.object({});

const NormalVariableDefinitionSchema = BaseVariableDefinitionSchema.extend({
  type: VariableTypes.exclude(['ordinal', 'categorical', 'datetime', 'scalar']),
});

export const CategoricalVariableSchema = BaseVariableDefinitionSchema.extend({
  type: VariableTypes.extract(['ordinal', 'categorical']),
  options: z.array(CategoricalOptionSchema),
});

export const ParametersVariableSchema = BaseVariableDefinitionSchema.extend({
  type: VariableTypes.extract(['datetime', 'scalar']),
  parameters: z.object({
    // Todo: revise this to be contingent on the type
    type: z.string(),
    min: z.string(),
    minLabel: z.string(),
    maxLabel: z.string(),
    before: z.number(),
  }),
});

export const VariableDefinitionSchema = z.discriminatedUnion('type', [
  NormalVariableDefinitionSchema,
  CategoricalVariableSchema,
  ParametersVariableSchema,
]);

export type TVariableDefinition = z.infer<typeof VariableDefinitionSchema>;
