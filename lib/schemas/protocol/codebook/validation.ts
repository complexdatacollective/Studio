import { z } from 'zod';

export const VariableValidationSchema = z.object({
  required: z.boolean().optional(),
  minValue: z.number().optional(),
  maxValue: z.number().optional(),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
  pattern: z.string().optional(),
  unique: z.boolean().optional(),
  sameAs: z.string().optional(),
  differentFrom: z.string().optional(),
  greaterThanVariable: z.string().optional(),
  lessThanVariable: z.string().optional(),
});

export type TVariableValidation = z.infer<typeof VariableValidationSchema>;
