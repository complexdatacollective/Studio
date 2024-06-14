'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X, OctagonAlert, Info, TriangleAlert } from 'lucide-react';
import * as React from 'react';
import { type DialogVariant } from '~/lib/dialogs/dialog-schemas';
import { cn } from '~/lib/utils';

// Show different icons based on the dialog variant
const DialogIcon: React.FC<{ variant: DialogVariant }> = ({ variant }) => {
  switch (variant) {
    case 'Error':
      return <OctagonAlert size={24} className="text-destructive" />;
    case 'Warning':
      return <TriangleAlert size={24} className="text-mustard" />;
    case 'Info':
      return <Info size={24} className="text-cerulean-blue" />;
    default:
      throw new Error(`Unknown dialog variant`);
  }
};

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

type DialogContentProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> & {
  variant: DialogVariant;
};

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, variant, ...props }, ref) => (
  <DialogPrimitive.Content
    ref={ref}
    className={cn(
      'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
      className,
    )}
    {...props}
  >
    <DialogIcon variant={variant} />
    {children}
    <DialogPrimitive.Close className="focus:ring-ring absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </DialogPrimitive.Close>
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

export { Dialog, DialogContent, DialogFooter };
