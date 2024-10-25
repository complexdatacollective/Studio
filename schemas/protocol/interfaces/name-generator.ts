import { z } from 'zod';
import { StageTypeSchema } from './stages';
import { SubjectSchema } from '../shared/subject';
import { PromptSchema } from '../shared/prompt';
import { LocalisedStringSchema } from '~/schemas/shared';

const PanelSchema = z.object({
  id: z.string(),
  title: LocalisedStringSchema,
  source: z.enum(['currentNetwork', 'previousVisit', 'dataFile', 'URL']),
});

export type Panel = z.infer<typeof PanelSchema>;

const BaseSchema = z.object({
  type: StageTypeSchema.extract(['NameGenerator']),
  subject: SubjectSchema,
  prompts: z.array(PromptSchema),
  panels: z.array(PanelSchema).optional(),
  panelWidth: z.enum(['1/5', '1/3', '1/2', '2/3', '3/4', '4/5']).optional(),
});

const WithFormSchema = BaseSchema.extend({
  mode: z.literal('form'),
  form: z.string(),
});

const WithQuickAddSchema = BaseSchema.extend({
  mode: z.literal('quickAdd'),
  quickAddVariable: z.string(),
});

export const NameGeneratorInterfaceSchema =
  WithQuickAddSchema.or(WithFormSchema);

export type NameGeneratorInterface = z.infer<
  typeof NameGeneratorInterfaceSchema
>;
