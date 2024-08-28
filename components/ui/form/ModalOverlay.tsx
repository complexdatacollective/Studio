import * as DialogPrimitive from '@radix-ui/react-dialog';
import PopoverBackdrop from '../PopoverBackdrop';
import type { PropsWithChildren } from 'react';
import { AnimatePresence } from 'framer-motion';

/**
 * Provides an animated backdrop for modal content to render inside of.
 */
export default function ModalOverlay(
  props: PropsWithChildren<DialogPrimitive.DialogProps>,
) {
  const { children, ...rest } = props;
  return (
    <DialogPrimitive.Root {...rest}>
      <AnimatePresence>
        {props.open && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild>
              <PopoverBackdrop>{children}</PopoverBackdrop>
            </DialogPrimitive.Overlay>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
