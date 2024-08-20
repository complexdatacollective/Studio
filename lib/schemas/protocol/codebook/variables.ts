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

const VariablesWithOptions = z.enum(['ordinal', 'categorical']);
const VariablesWithParameters = z.enum(['datetime', 'scalar']);

const BaseVariableDefinitionSchema = z.object({
  name: VariableNameSchema,
});

const NormalVariableDefinitionSchema = BaseVariableDefinitionSchema.extend({
  type: VariableTypes.exclude(VariablesWithOptions.options).exclude(
    VariablesWithParameters.options,
  ),
});

export const CategoricalVariableSchema = BaseVariableDefinitionSchema.extend({
  type: VariablesWithOptions,
  options: z.array(CategoricalOptionSchema),
});

export const ParametersVariableSchema = BaseVariableDefinitionSchema.extend({
  type: VariablesWithParameters,
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
