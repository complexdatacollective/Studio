import { z } from 'zod';
import { LocalisedStringSchema } from '~/schemas/shared';
import { FormSchema } from '../shared/form';
import { FilterSchema } from '../shared/logic';
import { PromptSchema } from '../shared/prompt';
import { SubjectSchema } from '../shared/subject';
import { StageTypeSchema } from './stages';

const PreviousVisitSchema = z.object({
  type: z.literal('previousVisit'),
  visit: z.number(),
});

const URLSchema = z.object({
  type: z.literal('URL'),
  url: z.string().url(),
});

const FileSchema = z.object({
  type: z.literal('dataFile'),
  file: z.string(),
});

const CurrentNetworkSchema = z.object({
  type: z.literal('currentNetwork'),
});

const PanelSchema = z.object({
  id: z.string(),
  title: LocalisedStringSchema,
  source: z.discriminatedUnion('type', [
    PreviousVisitSchema,
    URLSchema,
    FileSchema,
    CurrentNetworkSchema,
  ]),
  filter: FilterSchema.optional(),
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
  form: FormSchema,
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
