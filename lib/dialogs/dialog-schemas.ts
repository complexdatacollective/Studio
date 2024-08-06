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

const ConfirmDialogSchema = SharedDialogProperties.extend({
  type: z.literal(DialogVariants.Confirm),
  cancelLabel: z.string().optional(),
  onConfirm: z.function(),
  onCancel: z.function(),
});

// Error dialogs have an 'error' field that is an instance of the Error class
const ErrorDialogSchema = SharedDialogProperties.extend({
  type: z.literal(DialogVariants.Error),
  error: z.instanceof(Error),
});

// Create a discriminated union of all dialog schemas
const DialogSchema = z.discriminatedUnion('type', [
  InfoDialogSchema,
  ConfirmDialogSchema,
  ErrorDialogSchema,
]);

export type Dialog = z.infer<typeof DialogSchema>;

export type DialogWithoutId = Omit<Dialog, 'id'>;
