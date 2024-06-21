'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import {
  BookmarkCheck,
  ChevronDown,
  Info,
  OctagonAlert,
  TriangleAlert,
  X,
} from 'lucide-react';
import * as React from 'react';
import { tv } from 'tailwind-variants';
import {
  DialogVariants,
  type Dialog as DialogType,
  type DialogVariant,
} from '~/lib/dialogs/dialog-schemas';
import { Button } from './Button';
import Heading, { headingVariants } from '../typography/Heading';
import { paragraphVariants } from '../typography/Paragraph';

// following this docs to implement this
// https://www.tailwind-variants.org/docs/slots#slots-with-variants
const dialogElements = tv({
  slots: {
    overlay: 'fixed inset-0 z-50 bg-rich-black/50',
    content:
      'fixed left-[50%] top-[50%] z-50 grid w-full max-w-sm sm:max-w-lg gap-2 border bg-background p-5 shadow-lg rounded-md sm:rounded-lg',
    close:
      'focus:ring-ring absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none',
    title: `flex items-center gap-1.5 ${headingVariants({ variant: 'h2' })}`,
    footer: 'flex flex-col-reverse sm:flex-row sm:justify-end gap-2',
  },
  variants: {
    type: {
      [DialogVariants.Error]: {
        // can be used to override the default styles based on Dialog type
      },
      [DialogVariants.Prompt]: {
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

// Main Dialog Component
const Dialog = ({
  dialog,
  handleOpenChange,
  handleCancelDialog,
  handleConfirmDialog,
  dialogOrder,
}: {
  dialog: DialogType;
  dialogOrder: number;
  handleOpenChange: (dialogId: string) => void;
  handleConfirmDialog: (dialogId: string) => void;
  handleCancelDialog: (dialogId: string) => void;
}) => {
  const { title, overlay, content, footer, close } = dialogElements({
    type: dialog.type,
  });

  return (
    <DialogPrimitive.Root open onOpenChange={() => handleOpenChange(dialog.id)}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={overlay()}>
          <DialogContent className={content()} dialogOrder={dialogOrder}>
            <DialogPrimitive.Title className={title()}>
              <DialogIcon variant={dialog.type} />
              {dialog.title}
            </DialogPrimitive.Title>
            <main>
              {dialog.content}
              {dialog.type === 'Error' && <DialogError {...dialog.error} />}
            </main>
            <DialogFooter
              className={footer()}
              dialog={dialog}
              handleCancelDialog={handleCancelDialog}
              handleConfirmDialog={handleConfirmDialog}
            />
            {dialog.type === 'Prompt' && <DialogClose className={close()} />}
          </DialogContent>
        </DialogPrimitive.Overlay>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
export default Dialog;

// Dialog Content Section
type DialogContentProps = {
  dialogOrder: number;
} & React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ children, dialogOrder, ...props }, ref) => {
  const variants = React.useMemo(
    () => ({
      visible: {
        opacity: 1,
        translateY: '-50%',
        translateX: '-50%',
        scale: 1,
        transition: { delay: dialogOrder * 0.25 },
      },
      hidden: {
        opacity: 0,
        translateY: '-50%',
        translateX: '-50%',
        scale: 0.8,
      },
    }),
    [dialogOrder],
  );

  return (
    <DialogPrimitive.Content ref={ref} {...props} asChild>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variants}
      >
        {children}
      </motion.div>
    </DialogPrimitive.Content>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

// Dialog Close Button
const DialogClose = ({ className }: { className: string }) => (
  <DialogPrimitive.Close className={className}>
    <X className="h-4 w-4" />
    <span className="sr-only">Close</span>
  </DialogPrimitive.Close>
);

// Dialog Footer Section
const DialogFooter = ({
  dialog,
  className,
  handleConfirmDialog,
  handleCancelDialog,
}: {
  dialog: DialogType;
  className: string;
  handleConfirmDialog: (dialogId: string) => void;
  handleCancelDialog: (dialogId: string) => void;
}) => {
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
        onClick={() => handleConfirmDialog(dialog.id)}
      >
        {dialog.confirmLabel ?? 'OK'}
      </Button>
    </div>
  );
};

// Dialog Error Section
const DialogError = ({ name, message, stack }: Error) => (
  <div className="grid gap-4 py-4">
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <Heading variant="h4">Name:</Heading>
        <span className="text-destructive">{name}</span>
      </div>
      <div className="flex items-center justify-between">
        <Heading variant="h4">Message:</Heading>
        <span className="text-destructive">{message}</span>
      </div>
    </div>
    <details className="group">
      <summary className="flex cursor-pointer select-none list-none items-center justify-between">
        <Heading variant="h4">Stack Trace</Heading>
        <span className="transition-transform duration-300 group-open:rotate-180">
          <ChevronDown className="h-4 w-4 text-destructive" />
        </span>
      </summary>
      <pre className={paragraphVariants({ variant: 'inlineCode' })}>
        {stack}
      </pre>
    </details>
  </div>
);

// Show different icons based on the dialog variant
const DialogIcon: React.FC<{ variant: DialogVariant }> = ({ variant }) => {
  switch (variant) {
    case 'Error':
      return <OctagonAlert className="h-5 w-5 text-destructive" />;
    case 'Info':
      return <Info className="h-5 w-5" />;
    case 'Confirm':
      return <BookmarkCheck className="h-5 w-5 text-mustard-dark" />;
    case 'Prompt':
      return <TriangleAlert className="h-5 w-5 text-mustard" />;
  }
};
