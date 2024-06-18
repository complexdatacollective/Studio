import { z } from 'zod';
import { type ReactNode } from 'react';

export const DialogVariants = {
  Info: 'Info',
  Confirm: 'Confirm',
  Warning: 'Warning',
  Prompt: 'Prompt',
  Error: 'Error',
} as const;

const SharedDialogProperties = z.object({
  id: z.string(),
  title: z.string(),
  confirmLabel: z.string().optional(),
  onConfirm: z.function().returns(z.undefined()),
});

const DialogWithContent = SharedDialogProperties.extend({
  content: z.union([z.string(), z.custom<ReactNode>()]),
});

const InfoDialogSchema = DialogWithContent.extend({
  type: z.literal(DialogVariants.Info),
});

export type InfoDialog = z.infer<typeof InfoDialogSchema>;

const ConfirmDialogSchema = DialogWithContent.extend({
  type: z.literal(DialogVariants.Confirm),
  cancelLabel: z.string().optional(),
  onCancel: z.function().returns(z.undefined()).optional(),
});

export type ConfirmDialog = z.infer<typeof ConfirmDialogSchema>;

const WarningDialogSchema = DialogWithContent.extend({
  type: z.literal(DialogVariants.Warning),
  cancelLabel: z.string().optional(),
  onCancel: z.function().returns(z.undefined()).optional(),
});

export type WarningDialog = z.infer<typeof WarningDialogSchema>;

const PromptDialogSchema = DialogWithContent.extend({
  type: z.literal(DialogVariants.Prompt),
  formId: z.string(),
  onConfirm: z.function().returns(z.boolean()),
});

export type PromptDialog = z.infer<typeof PromptDialogSchema>;

// Error dialogs have an 'error' field instead of 'content'
const ErrorDialogSchema = SharedDialogProperties.extend({
  type: z.literal(DialogVariants.Error),
  onConfirm: z.function().returns(z.undefined()),
  error: z.instanceof(Error),
});

export type ErrorDialog = z.infer<typeof ErrorDialogSchema>;

// Create a discriminated union of all dialog schemas
const DialogSchema = z.discriminatedUnion('type', [
  InfoDialogSchema,
  ConfirmDialogSchema,
  WarningDialogSchema,
  PromptDialogSchema,
  ErrorDialogSchema,
]);
// use it as props in the Dialog component
export type Dialog = z.infer<typeof DialogSchema>;

export type DialogWithoutId =
  | Omit<InfoDialog, 'id'>
  | Omit<ConfirmDialog, 'id'>
  | Omit<WarningDialog, 'id'>
  | Omit<ErrorDialog, 'id'>
  | Omit<PromptDialog, 'id'>;
