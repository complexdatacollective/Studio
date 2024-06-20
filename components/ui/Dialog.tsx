'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import {
  BookmarkCheck,
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

// following this docs to implement this
// https://www.tailwind-variants.org/docs/slots#slots-with-variants
export const dialogElements = tv({
  slots: {
    overlay: 'fixed inset-0 z-50 bg-rich-black/50',
    content:
      'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg',
    close:
      'focus:ring-ring absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground',
    title:
      'flex items-center gap-2 text-lg font-semibold leading-none tracking-tight',
    description: 'text-2xl leading-7 tracking-tight uppercase',
    footer: 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
  },
  variants: {
    type: {
      [DialogVariants.Error]: {
        title: 'text-destructive',
        description: 'text-destructive',
      },
      [DialogVariants.Prompt]: {
        title: 'text-cerulean-blue',
        description: 'text-cerulean-blue',
      },
      [DialogVariants.Confirm]: {
        title: 'text-mustard',
        description: 'text-mustard',
      },
      [DialogVariants.Info]: {
        title: 'text-paradise-pink',
        description: 'text-paradise-pink',
      },
    },
  },
});

// todo: style for each dialog based on Type (look at Button component)

// Main Dialog Component
type DialogProps = {
  dialog: DialogType;
  dialogOrder: number;
  handleOpenChange: (dialog: DialogType) => void;
  confirmDialog: (dialog: DialogType) => void;
  cancelDialog: (dialog: DialogType) => void;
};

const Dialog = (props: DialogProps) => {
  const { dialog, handleOpenChange, cancelDialog, confirmDialog, dialogOrder } =
    props;

  const { title, description, overlay, content, footer, close } =
    dialogElements({
      type: dialog.type,
    });

  return (
    <DialogPrimitive.Root open onOpenChange={() => handleOpenChange(dialog)}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={overlay()}>
          <DialogContent className={content()} dialogOrder={dialogOrder}>
            <DialogPrimitive.Title className={title()}>
              <DialogIcon variant={dialog.type} />
              <h2>{dialog.title}</h2>
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className={description()}>
              {dialog.content}
              <br />
              {dialog.type === 'Error' && <DialogError {...dialog.error} />}
            </DialogPrimitive.Description>
            <DialogFooter
              className={footer()}
              dialog={dialog}
              cancelDialog={cancelDialog}
              confirmDialog={confirmDialog}
            />
            <DialogClose
              className={close()}
              disableClose={dialog.type === 'Prompt'}
            />
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
        translateY: '-60%',
        translateX: '-50%',
        scale: 0.8,
      },
    }),
    [dialogOrder],
  );

  return (
    <DialogPrimitive.Content ref={ref} {...props} asChild>
      <motion.div
        initial={'hidden'}
        animate={'visible'}
        exit={'hidden'}
        variants={variants}
      >
        {children}
      </motion.div>
    </DialogPrimitive.Content>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

// Dialog Close Button
const DialogClose = ({
  disableClose,
  className,
}: {
  disableClose: boolean;
  className: string;
}) =>
  !disableClose && (
    <DialogPrimitive.Close className={className}>
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </DialogPrimitive.Close>
  );

// Dialog Footer Section
type DialogFooterProps = {
  dialog: DialogType;
  className: string;
  confirmDialog: (dialog: DialogType) => void;
  cancelDialog: (dialog: DialogType) => void;
};

const DialogFooter = ({
  dialog,
  className,
  cancelDialog,
  confirmDialog,
}: DialogFooterProps) => {
  return (
    <div className={className}>
      {dialog.type === 'Confirm' && (
        <Button variant="outline" onClick={() => cancelDialog(dialog)}>
          {dialog.cancelLabel ?? 'Cancel'}
        </Button>
      )}
      {dialog.type === 'Prompt' ? (
        <Button
          type="submit"
          form={dialog.formId}
          onClick={() => confirmDialog(dialog)}
        >
          {dialog.confirmLabel ?? 'OK'}
        </Button>
      ) : (
        <Button onClick={() => confirmDialog(dialog)}>
          {dialog.confirmLabel ?? 'OK'}
        </Button>
      )}
    </div>
  );
};

// Dialog Error Section
const DialogError = ({ name, message, stack }: Error) => (
  <div>
    {name}
    <br />
    {message}
    <br />
    {stack}
  </div>
);

// Show different icons based on the dialog variant
const DialogIcon: React.FC<{ variant: DialogVariant }> = ({ variant }) => {
  switch (variant) {
    case 'Error':
      return <OctagonAlert className="h-6 w-6 text-destructive" />;
    case 'Info':
      return <Info className="h-6 w-6 text-cerulean-blue" />;
    case 'Confirm':
      return <BookmarkCheck className="h-6 w-6 text-cerulean-blue" />;
    case 'Prompt':
      return <TriangleAlert className="h-6 w-6 text-cerulean-blue" />;
    default:
      throw new Error(`Unknown dialog variant`);
  }
};
