import { z } from 'zod';
import { StageTypeSchema } from './stages';
import { SubjectSchema } from '../shared/subject';
import { PromptsSchema } from '../shared/prompt';

const BaseNameGeneratorSchema = z.object({
  type: StageTypeSchema.extract(['NameGenerator']),
  subject: SubjectSchema,
  prompts: PromptsSchema,
});

const NameGeneratorFormSchema = BaseNameGeneratorSchema.extend({
  mode: z.literal('form'),
  form: z.string(),
});

const NameGeneratorQuickAddSchema = BaseNameGeneratorSchema.extend({
  mode: z.literal('quickAdd'),
  quickAddVariable: z.string(),
});

export const NameGeneratorSchema = NameGeneratorQuickAddSchema.or(
  NameGeneratorFormSchema,
);

export type TNameGenerator = z.infer<typeof NameGeneratorSchema>;
