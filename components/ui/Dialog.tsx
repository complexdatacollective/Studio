import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import type { Dialog as DialogType } from '~/lib/dialogs/store';
import { Button } from './Button';

const Dialog = ({
  title,
  content,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
}: DialogType) => {
  const handleOpenChange = () => {
    // handle open change
  };

  return (
    <DialogPrimitive.Root open onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-rich-black/50" />
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-sm translate-x-[-50%] translate-y-[-50%] gap-2 rounded-md border bg-background p-5 shadow-lg sm:max-w-lg sm:rounded-lg">
          <DialogPrimitive.Title className="text-lg font-semibold text-white">
            {title}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="text-white">
            {content}
          </DialogPrimitive.Description>

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="secondary" onClick={onCancel}>
              {cancelLabel ?? 'Cancel'}
            </Button>
            <Button onClick={onConfirm}>{confirmLabel ?? 'Confirm'}</Button>
          </div>

          <DialogPrimitive.Close className="focus:ring-ring absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Dialog;
