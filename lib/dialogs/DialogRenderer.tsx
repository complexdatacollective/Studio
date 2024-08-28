'use client';

import {
  ForwardedRef,
  forwardRef,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { AnimatePresence, Variants } from 'framer-motion';
import PopoverBackdrop, {
  backdropClasses,
} from '~/components/ui/PopoverBackdrop';
import CloseButton from '~/components/ui/CloseButton';
import { MotionDialogContent, MotionDialogOverlay } from './Dialog';
import { motion } from 'framer-motion';
import { cn } from '../utils';
import SpotlightOverlay from '~/components/Spotlight';

export function DialogRoot({
  children,
  isOpen,
  setOpen,
  ...props
}: DialogPrimitive.DialogProps) {
  return (
    // <DialogOpenContext.Provider value={isOpen}>
    <DialogPrimitive.Root onOpenChange={setOpen} open={isOpen} {...props}>
      {children}
    </DialogPrimitive.Root>
    // </DialogOpenContext.Provider>
  );
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
    { children, ...props }: DialogPrimitive.DialogContentProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
  ) => {
    // const isOpen = useContext(DialogOpenContext);

    return (
      <DialogPrimitive.Content forceMount ref={forwardedRef} asChild {...props}>
        <motion.div
          variants={dialogVariants}
          initial={dialogVariants.closed}
          animate={dialogVariants.open}
          exit={dialogVariants.closed}
          className={cn(
            'md:w-90% mx-4 max-w-4xl md:mx-auto',
            'px-6 py-10',
            'z-50 max-h-[85vh] rounded bg-card text-card-foreground shadow-xl focus:outline-none',
          )}
        >
          {children}
          <DialogCloseButton />
        </motion.div>
      </DialogPrimitive.Content>
    );
  },
);

DialogContent.displayName = 'DialogContent';

const useDialogs = () => {
  const id = useRef(0);
  const [dialogs, setDialogs] = useState([{ id: 0 }, { id: 1 }, { id: 2 }]);
  const [showOverlay, setShowOverlay] = useState(dialogs.length > 0);

  const openDialog = () => {
    setDialogs((dialogs) => {
      const newDialogs = [
        ...dialogs,
        {
          id: id.current++,
        },
      ];

      // Update showOverlay only if transitioning from 0 to positive
      if (dialogs.length === 0 && newDialogs.length > 0) {
        setShowOverlay(true);
      }

      return newDialogs;
    });
  };

  const closeDialog = () => {
    setDialogs((prev) => {
      const newDialogs = prev.slice(1);

      // Update showOverlay only if transitioning from positive to 0
      if (prev.length > 0 && newDialogs.length === 0) {
        setShowOverlay(false);
      }

      return newDialogs;
    });
  };

  const activeDialog = useMemo(() => {
    if (dialogs.length === 0) {
      return null;
    }

    return dialogs[0];
  }, [dialogs]);

  return {
    showOverlay,
    dialogs,
    openDialog,
    closeDialog,
    activeDialog,
  };
};

export function DialogRenderer() {
  const { showOverlay, openDialog, closeDialog, activeDialog } = useDialogs();

  useEffect(() => {
    console.log('showOverlay changed', showOverlay);
  }, [showOverlay]);

  return (
    <>
      <button onClick={() => openDialog()}>Add Dialog</button>
      <DialogRoot
        open={showOverlay}
        onOpenChange={(state) => {
          console.log('set open', state);
          closeDialog();
        }}
      >
        <AnimatePresence>
          {showOverlay && (
            <DialogPrimitive.Portal forceMount>
              <DialogPrimitive.Overlay asChild>
                <PopoverBackdrop>
                  <AnimatePresence mode="wait">
                    {activeDialog && (
                      <DialogContent key={activeDialog.id}>
                        Dialog is open ! {activeDialog?.id}
                      </DialogContent>
                    )}
                  </AnimatePresence>
                </PopoverBackdrop>
              </DialogPrimitive.Overlay>
            </DialogPrimitive.Portal>
          )}
        </AnimatePresence>
      </DialogRoot>
    </>
  );
}
