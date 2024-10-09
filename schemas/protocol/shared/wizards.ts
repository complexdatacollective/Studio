import { z } from 'zod';
import { JSONRichTextSchema } from '~/schemas/shared';

export const Priorities = {
  ShowFirst: Infinity,
  UI: 100,
  Navigation: 50,
  Task: 10,
  ShowLast: -Infinity,
} as const;

const BaseStepSchema = z.object({
  title: z.string(),
  content: JSONRichTextSchema,
});

const StepWithTargetSchema = BaseStepSchema.extend({
  targetElementId: z.string(),
});

export const StepSchema = BaseStepSchema.or(StepWithTargetSchema);
export type Step = z.infer<typeof StepSchema>;

export const WizardSchema = z.object({
  id: z.string(),
  steps: z.array(StepSchema),
  priority: z.enum(['ShowFirst', 'UI', 'Navigation', 'Task', 'ShowLast']),
});

export type Wizard = z.infer<typeof WizardSchema>;
