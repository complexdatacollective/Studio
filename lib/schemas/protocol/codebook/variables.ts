import { z } from 'zod';

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

const hasOptions = z.enum(['ordinal', 'categorical']);
const hasParameters = z.enum(['datetime', 'scalar']);

const BaseVariableDefinitionSchema = z.object({
  name: z.string(),
});

const NormalVariableDefinitionSchema = BaseVariableDefinitionSchema.extend({
  type: VariableTypes.exclude(hasOptions.options).exclude(
    hasParameters.options,
  ),
});

export const CategoricalVariableSchema = BaseVariableDefinitionSchema.extend({
  type: hasOptions,
  options: z.array(CategoricalOptionSchema),
});

export const ParametersVariableSchema = BaseVariableDefinitionSchema.extend({
  type: hasParameters,
  parameters: z.object({
    // Todo: revise this.
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
