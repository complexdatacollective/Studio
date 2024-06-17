'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import * as React from 'react';
import { cn } from '~/lib/utils';
import { motion } from 'framer-motion';

const Dialog = (props: DialogPrimitive.DialogProps) => {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPortal>
        <DialogOverlay>{props.children}</DialogOverlay>
      </DialogPortal>
    </DialogPrimitive.Root>
  );
};

const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-rich-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    dialogOrder: number;
    disableClose?: boolean;
  }
>(({ className, children, dialogOrder, disableClose, ...props }, ref) => (
  <DialogPrimitive.Content
    ref={ref}
    className={cn(
      'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg',
      className,
    )}
    {...props}
    asChild
  >
    <motion.div
      initial={{
        opacity: 0,
        translateY: '-60%',
        translateX: '-50%',
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        translateY: '-50%',
        translateX: '-50%',
        scale: 1,
        transition: { delay: dialogOrder * 0.25 },
      }}
      exit={{
        opacity: 0,
        translateY: '-70%',
        translateX: '-50%',
        scale: 0.7,
      }}
    >
      {children}
      {!disableClose && (
        <DialogPrimitive.Close className="focus:ring-ring absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </motion.div>
  </DialogPrimitive.Content>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle };
