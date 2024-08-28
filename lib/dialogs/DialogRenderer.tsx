'use client';

import { type ForwardedRef, forwardRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { AnimatePresence } from 'framer-motion';
import PopoverBackdrop from '~/components/ui/PopoverBackdrop';
import CloseButton from '~/components/ui/CloseButton';
import { motion } from 'framer-motion';
import { cn } from '../utils';
import { useDialogs } from './useDialogs';
import Heading from '~/components/typography/Heading';

export function DialogRoot({
  children,
  ...props
}: DialogPrimitive.DialogProps) {
  return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>;
}

export const DialogTrigger = DialogPrimitive.Trigger;

const dialogVariants = {
  closed: { opacity: 0, y: '100px' },
  open: { opacity: 1, y: 0 },
};

const DialogCloseButton = () => (
  <DialogPrimitive.Close asChild>
    <CloseButton />
  </DialogPrimitive.Close>
);

const DialogContent = forwardRef(
  (
    {
      children,
      ...props
    }: {
      title: string;
      description: string;
    } & DialogPrimitive.DialogContentProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
  ) => {
    const { title, description, ...rest } = props;
    return (
      <DialogPrimitive.Content forceMount ref={forwardedRef} asChild {...rest}>
        <motion.div
          variants={dialogVariants}
          className={cn(
            'md:w-90% mx-4 max-w-4xl md:mx-auto',
            'px-6 py-10',
            'z-50 max-h-[85vh] rounded bg-card text-card-foreground shadow-xl focus:outline-none',
          )}
        >
          <DialogPrimitive.Title asChild>
            <Heading variant="h2">{title}</Heading>
          </DialogPrimitive.Title>
          <DialogPrimitive.Description>
            {description}
          </DialogPrimitive.Description>
          {children}
          <DialogCloseButton />
        </motion.div>
      </DialogPrimitive.Content>
    );
  },
);

DialogContent.displayName = 'DialogContent';

export function DialogRenderer() {
  const { showOverlay, closeDialog, activeDialog } = useDialogs();
  return (
    <DialogRoot open={showOverlay} onOpenChange={closeDialog}>
      <AnimatePresence>
        {showOverlay && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild>
              <PopoverBackdrop>
                {activeDialog && (
                  <DialogContent
                    key={activeDialog.id}
                    title={activeDialog.title}
                    description={activeDialog.description}
                  >
                    {activeDialog.content}
                  </DialogContent>
                )}
              </PopoverBackdrop>
            </DialogPrimitive.Overlay>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogRoot>
  );
}
