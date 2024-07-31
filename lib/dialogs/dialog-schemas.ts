import { z } from 'zod';
import { type ReactNode } from 'react';

export const DialogVariants = {
  Info: 'Info',
  Confirm: 'Confirm',
  Prompt: 'Prompt',
  Error: 'Error',
} as const;

export type DialogVariant =
  (typeof DialogVariants)[keyof typeof DialogVariants];

const SharedDialogProperties = z.object({
  id: z.string(),
  title: z.string(),
  content: z.custom<ReactNode>(),
  confirmLabel: z.string().optional(),
  onConfirm: z.function().optional(),
});

const InfoDialogSchema = SharedDialogProperties.extend({
  type: z.literal(DialogVariants.Info),
});

type InfoDialog = z.infer<typeof InfoDialogSchema>;

const ConfirmDialogSchema = SharedDialogProperties.extend({
  type: z.literal(DialogVariants.Confirm),
  cancelLabel: z.string().optional(),
  onConfirm: z.function(),
  onCancel: z.function(),
});

type ConfirmDialog = z.infer<typeof ConfirmDialogSchema>;

const PromptDialogSchema = SharedDialogProperties.extend({
  type: z.literal(DialogVariants.Prompt),
  /**
   * This function is called when the prompt dialog choice is confirmed.
   * It should return a `true` value, indicating the prompt form submission has been successful
   * in order to close the dialog.
   */
  onConfirm: z
    .function()
    .returns(z.union([z.boolean(), z.promise(z.boolean())])),
});

type PromptDialog = z.infer<typeof PromptDialogSchema>;

// Error dialogs have an 'error' field instead of 'content'
const ErrorDialogSchema = SharedDialogProperties.extend({
  type: z.literal(DialogVariants.Error),
  error: z.instanceof(Error),
});

type ErrorDialog = z.infer<typeof ErrorDialogSchema>;

// Create a discriminated union of all dialog schemas
const DialogSchema = z.discriminatedUnion('type', [
  InfoDialogSchema,
  ConfirmDialogSchema,
  PromptDialogSchema,
  ErrorDialogSchema,
]);
// use it as props in the Dialog component
export type Dialog = z.infer<typeof DialogSchema>;

export type DialogWithoutId =
  | Omit<InfoDialog, 'id'>
  | Omit<ConfirmDialog, 'id'>
  | Omit<ErrorDialog, 'id'>
  | Omit<PromptDialog, 'id'>;
