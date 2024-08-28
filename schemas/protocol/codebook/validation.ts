import { z } from 'zod';

export const VariableValidationSchema = z
  .object({
    required: z.boolean(),
    minValue: z.number(),
    maxValue: z.number(),
    minLength: z.number(),
    maxLength: z.number(),
    pattern: z.string(),
    unique: z.boolean(),
    sameAs: z.string(),
    differentFrom: z.string(),
    greaterThanVariable: z.string(),
    lessThanVariable: z.string(),
  })
  .partial();

export type TVariableValidation = z.infer<typeof VariableValidationSchema>;
