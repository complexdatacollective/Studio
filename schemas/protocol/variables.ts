import { z } from 'zod';
import { LocalisedStringSchema } from '~/schemas/shared';
import { VariableValidationSchema } from './validation';

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
  // New ones
  'point', // geo map point: { lat: number, lon: number }
  'polygon', // geo map polygon: { points: { lat: number, lon: number }[] }
  'image', // Take a photo with camera or upload an image
  'audio', // Record audio or upload an audio file
  'phone', // Phone number
  'email', // Email address
]);

// Express possible values based on each variable type
export const VariableTypeSchemas = {
  boolean: z.boolean(),
  text: z.string(),
  number: z.number(),
  datetime: z.string().datetime(),
  ordinal: z.union([z.string(), z.number(), z.boolean()]),
  categorical: z.union([z.string(), z.number(), z.boolean()]),
  scalar: z.number().min(0).max(1),
  layout: z.object({
    screenSize: z.tuple([z.number(), z.number()]).optional(),
    x: z.number().min(0).max(1),
    y: z.number().min(0).max(1),
  }),
  point: z.object({
    lat: z.number(),
    lon: z.number(),
  }),
  polygon: z.object({
    points: z.array(
      z.object({
        lat: z.number(),
        lon: z.number(),
      }),
    ),
  }),
  image: z.string(),
  audio: z.string(),
  phone: z.string(),
  email: z.string().email(),
};

export type TVariableType = z.infer<typeof VariableTypes>;

const BaseVariableDefinitionSchema = z.object({
  label: LocalisedStringSchema,
  validation: VariableValidationSchema.optional(),
  control: z.string().optional(), // todo: make this a union of valid control types
});

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
