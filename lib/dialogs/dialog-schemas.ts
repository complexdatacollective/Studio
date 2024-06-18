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
  content: z.union([z.string(), z.custom<ReactNode>()]),
  confirmLabel: z.string().optional(),
  onConfirm: z.function().returns(z.undefined()).optional(),
});

const InfoDialogSchema = SharedDialogProperties.extend({
  type: z.literal(DialogVariants.Info),
});

type InfoDialog = z.infer<typeof InfoDialogSchema>;

const ConfirmDialogSchema = SharedDialogProperties.extend({
  type: z.literal(DialogVariants.Confirm),
  cancelLabel: z.string().optional(),
  onCancel: z.function().returns(z.undefined()).optional(),
});

type ConfirmDialog = z.infer<typeof ConfirmDialogSchema>;

const PromptDialogSchema = SharedDialogProperties.extend({
  type: z.literal(DialogVariants.Prompt),
  formId: z.string(),
  /**
   * This function is called when the prompt dialog choice is confirmed.
   * It should return a `true` value, indicating the prompt form submission has been successful.
   * @example
   * ```typescript
   * onConfirm: () => {
        // get the form based on the formId
        const form = document.getElementById(
          'prompt-example',
        ) as HTMLFormElement;

        // check if the form is valid
        if (form.checkValidity()) {
          // if the form is valid, get the form data
          const formData = new FormData(form);
          const firstName = formData.get('firstName');
          // do something with the form data
          console.log('Prompt dialog confirmed with:', firstName);
          // then return true to close the dialog
          return !!firstName;
        }
        return false;
      }
   * ```
   */
  onConfirm: z.function().returns(z.boolean()),
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
