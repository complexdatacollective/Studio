import { z } from 'zod';
import { type ReactNode } from 'react';

export const DialogVariants = {
  Info: 'Info',
  Confirm: 'Confirm',
  Warning: 'Warning',
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
  ErrorDialogSchema,
]);

export type Dialog = z.infer<typeof DialogSchema>;

// Omit the 'id' field from each individual dialog schema
const InfoDialogWithoutIdSchema = InfoDialogSchema.omit({ id: true });
const ConfirmDialogWithoutIdSchema = ConfirmDialogSchema.omit({ id: true });
const WarningDialogWithoutIdSchema = WarningDialogSchema.omit({ id: true });
const ErrorDialogWithoutIdSchema = ErrorDialogSchema.omit({ id: true });

// Create a discriminated union of dialogs without the 'id' field
const DialogWithoutIdSchema = z.discriminatedUnion('type', [
  InfoDialogWithoutIdSchema,
  ConfirmDialogWithoutIdSchema,
  WarningDialogWithoutIdSchema,
  ErrorDialogWithoutIdSchema,
]);

// Infer the type of DialogWithoutIdSchema
export type DialogWithoutId = z.infer<typeof DialogWithoutIdSchema>;
