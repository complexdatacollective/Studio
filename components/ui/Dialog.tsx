import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import type { Dialog as DialogType } from '~/lib/dialogs/dialog-schemas';
import { Button } from './Button';
import Heading from '~/components/typography/Heading';

const Dialog = (dialog: DialogType) => {
  const handleOpenChange = async (isOpen: boolean, dialogId: string) => {
    if (!isOpen) {
      await dialog.onCancel?.(dialogId);
      return;
    }

    await dialog.onConfirm?.(dialogId);
  };

  return (
    <DialogPrimitive.Root
      open
      onOpenChange={(isOpen) => handleOpenChange(isOpen, dialog.id)}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-rich-black/50" />
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-sm translate-x-[-50%] translate-y-[-50%] gap-2 rounded-md border bg-background p-5 shadow-lg sm:max-w-lg sm:rounded-lg">
          <DialogPrimitive.Title asChild>
            <Heading variant="h3">{dialog.title}</Heading>
          </DialogPrimitive.Title>

          {/* using DialogPrimitive.Description to render `content` because it's required by radix
           and using asChild to pass the content because it's a react node
          */}
          <DialogPrimitive.Description asChild>
            <div>{dialog.content}</div>
          </DialogPrimitive.Description>

          <DialogFooter dialog={dialog} />
          <DialogClose />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

// Dialog Close Button
const DialogClose = () => (
  <DialogPrimitive.Close className="focus:ring-ring absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
    <X className="h-4 w-4" />
    <span className="sr-only">Close</span>
  </DialogPrimitive.Close>
);

// Dialog Footer section
const DialogFooter = ({ dialog }: { dialog: DialogType }) => (
  <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
    {dialog.type === 'Confirm' && (
      <Button variant="secondary" onClick={dialog.onCancel}>
        {dialog.cancelLabel ?? 'Cancel'}
      </Button>
    )}
    <Button onClick={dialog.onConfirm}>
      {dialog.confirmLabel ?? 'Confirm'}
    </Button>
  </div>
);

export default Dialog;
