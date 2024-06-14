import { z } from 'zod';
import { type ReactNode } from 'react';

// add more variants here as needed
export enum DialogVariants {
  Warning = 'Warning', // we may use confirm dialog for warnings?
  Info = 'Info',
  Confirm = 'Confirm',
  Error = 'Error',
}

export type DialogVariant = keyof typeof DialogVariants;

export const DialogSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(DialogVariants),
  title: z.string(),
  content: z.union([z.string(), z.custom<ReactNode>()]),
  error: z.instanceof(Error).optional(),
  confirmLabel: z.string().optional(),
  cancelLabel: z.string().optional(),
  onConfirm: z.function().returns(z.undefined()).optional(),
  onCancel: z.function().returns(z.undefined()).optional(),
});

export type Dialog = z.infer<typeof DialogSchema>;

export const InfoDialogSchema = DialogSchema.omit({
  cancelLabel: true,
  onCancel: true,
  error: true,
}).extend({
  type: z.literal(DialogVariants.Info),
  confirmLabel: z.string(),
  onConfirm: z.function().returns(z.undefined()),
});

export type InfoDialog = z.infer<typeof InfoDialogSchema>;

export const ConfirmDialogSchema = DialogSchema.omit({
  error: true,
}).extend({
  type: z.literal(DialogVariants.Confirm),
  confirmLabel: z.string(),
  cancelLabel: z.string(),
  onConfirm: z.function().returns(z.undefined()),
  onCancel: z.function().returns(z.undefined()),
});

export type ConfirmDialog = z.infer<typeof ConfirmDialogSchema>;

export const ErrorDialogSchema = DialogSchema.omit({
  cancelLabel: true,
  onCancel: true,
}).extend({
  type: z.literal(DialogVariants.Error),
  confirmLabel: z.string(),
  onConfirm: z.function().returns(z.undefined()),
  error: z.instanceof(Error),
});

export type ErrorDialog = z.infer<typeof ErrorDialogSchema>;
