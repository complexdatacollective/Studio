import { z } from 'zod';
import { StageTypeSchema } from './stages';
import { SubjectSchema } from '../shared/subject';
import { PromptsSchema } from '../shared/prompts';

const BaseNameGeneratorSchema = z.object({
  type: StageTypeSchema.extract(['NameGenerator']),
  subject: SubjectSchema,
  prompts: PromptsSchema,
});

const NameGeneratorFormSchema = z.object({
  mode: z.literal('form'),
  form: z.string(),
});

const NameGeneratorQuickAddSchema = z.object({
  mode: z.literal('quickAdd'),
  quickAddVariable: z.string(),
});

export const NameGeneratorSchema = BaseNameGeneratorSchema.merge(
  NameGeneratorFormSchema,
).and(NameGeneratorQuickAddSchema);

export type TNameGenerator = z.infer<typeof NameGeneratorSchema>;
