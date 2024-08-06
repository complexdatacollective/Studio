import { z } from 'zod';
import { type ReactNode } from 'react';

export const DialogVariants = {
  Info: 'Info',
  Confirm: 'Confirm',
  Error: 'Error',
} as const;

export type DialogVariant =
  (typeof DialogVariants)[keyof typeof DialogVariants];

const SharedDialogProperties = z.object({
  id: z.string(),
  title: z.string().optional(),
  content: z.custom<ReactNode>(),
  confirmLabel: z.string().optional(),
  onConfirm: z.function().optional(),
  onCancel: z.function().optional(),
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

// Error dialogs have an 'error' field that is an instance of the Error class
const ErrorDialogSchema = SharedDialogProperties.extend({
  type: z.literal(DialogVariants.Error),
  error: z.instanceof(Error),
});

type ErrorDialog = z.infer<typeof ErrorDialogSchema>;

// Create a discriminated union of all dialog schemas
const DialogSchema = z.discriminatedUnion('type', [
  InfoDialogSchema,
  ConfirmDialogSchema,
  ErrorDialogSchema,
]);

export type Dialog = z.infer<typeof DialogSchema>;

// Omitting the `id` field from discriminatedUnion with Omit<Dialog, 'id'>
// omits the `id`, but changes the structure of the union to be a plain object
// so we have to do it manually for each dialog type
export type DialogWithoutId =
  | Omit<InfoDialog, 'id'>
  | Omit<ConfirmDialog, 'id'>
  | Omit<ErrorDialog, 'id'>;
