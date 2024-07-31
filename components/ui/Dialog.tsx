'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { motion, type Variants } from 'framer-motion';
import {
  BookmarkCheck,
  ChevronDown,
  Info,
  OctagonAlert,
  TriangleAlert,
  X,
  Loader2,
} from 'lucide-react';
import { tv } from 'tailwind-variants';
import {
  DialogVariants,
  type Dialog as DialogType,
  type DialogVariant,
} from '~/lib/dialogs/dialog-schemas';
import { Button } from './Button';
import Heading, { headingVariants } from '../typography/Heading';
import { paragraphVariants } from '../typography/Paragraph';
import { cn } from '~/lib/utils';
import { FC, useState } from 'react';


export const dialogVariants = tv({
  slots: {
    overlaySlot: 'fixed inset-0 z-50 bg-rich-black/50',
    contentSlot:
      'fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50 grid w-full max-w-sm sm:max-w-lg gap-2 border bg-background p-5 shadow-lg rounded-md sm:rounded-lg',
    closeButtonSlot:
      'focus:ring-ring absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none',
    titleSlot: cn('flex items-center gap-1.5', headingVariants({ variant: 'h2' })),
    footerSlot: 'flex flex-col-reverse sm:flex-row sm:justify-end gap-2',
  },
  variants: {
    type: {
      [DialogVariants.Error]: {
        // can be used to override the default styles based on Dialog type
      },
      [DialogVariants.Confirm]: {
        // can be used to override the default styles based on Dialog type
      },
      [DialogVariants.Info]: {
        // can be used to override the default styles based on Dialog type
      },
    },
  },
});


const DialogOverlay = motion(DialogPrimitive.Overlay);
const DialogContent = motion(DialogPrimitive.Content);

// Dialog Close Button
export const DialogClose = ({ className }: { className: string }) => (
  <DialogPrimitive.Close className={className}>
    <X className="h-4 w-4" />
    <span className="sr-only">Close</span>
  </DialogPrimitive.Close>
);


export type DialogProps = {
  portalContainer?: HTMLElement;
} & DialogType;

// Main Dialog Component
const Dialog = ({
  type,
  title,
  id,
  content,
  portalContainer,
  onConfirm,
  onCancel,
}: DialogProps) => {
  const { titleSlot, overlaySlot, contentSlot, footerSlot, closeButtonSlot } = dialogVariants({type});

  const handleOpenChange = async (isOpen: boolean, dialogId: string) => {
    if (!isOpen) {
      await onCancel?.(id);
      return;
    }

    await onConfirm?.(id);
  }

  return (
    <DialogPrimitive.Root open onOpenChange={(isOpen) => handleOpenChange(isOpen, id)}>
      <DialogPrimitive.Portal forceMount container={portalContainer}>
        <DialogOverlay className={overlaySlot()}>
          <DialogContent
            className={contentSlot()}
          >
            { title && (
              <DialogPrimitive.Title className={titleSlot()}>
                {title}
              </DialogPrimitive.Title>
            )}
            <DialogPrimitive.Description>
              {content}
            </DialogPrimitive.Description>
            <div className={footerSlot()}>
              <Button>Close</Button>
            </div>
            <DialogClose className={closeButtonSlot()} />
          </DialogContent>
        </DialogOverlay>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Dialog;

// Dialog Footer Section
export const DialogFooter = ({
  dialog,
  className,
  handleConfirmDialog,
  handleCancelDialog,
}: {
  dialog: DialogType;
  className: string;
  handleConfirmDialog: (dialogId: string) => Promise<void> | void;
  handleCancelDialog: (dialogId: string) => void;
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className={className}>
      {dialog.type === 'Confirm' && (
        <Button
          variant="destructive"
          onClick={() => handleCancelDialog(dialog.id)}
        >
          {dialog.cancelLabel ?? 'Cancel'}
        </Button>
      )}
      <Button
        variant={dialog.type === 'Error' ? 'destructive' : 'default'}
        onClick={async () => {
          setLoading(true);
          await handleConfirmDialog(dialog.id);
          setLoading(false);
        }}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 animate-spin" />
            <span>Submitting...</span>
          </>
        ) : (
          (dialog.confirmLabel ?? 'OK')
        )}
      </Button>
    </div>
  );
};
