import { z } from 'zod';
import { LocalisedStringSchema } from '~/schemas/shared';
import { SkipDefinitionSchema } from './filter';

const FieldSchema = z.object({
  condition: SkipDefinitionSchema.optional(), // TODO: skip/show isn't a good 'fit' for this. Is there a generic 'condition' type?
  variable: z.string(),
  label: LocalisedStringSchema,
});

export type Field = z.infer<typeof FieldSchema>;

/**
 * - Should we rework the concept of 'variables'? Write once, read many? Tied
 *   to context? For example, variable defined with its input control and
 *   validation in the form itself?
 * - Needs to support conditional fields
 */
const FormSchema = z.object({
  fields: z.array(FieldSchema.or(z.array(FieldSchema))),
});

export type Form = z.infer<typeof FormSchema>;
