'use client';

import { AnimatePresence, type Variants } from 'framer-motion';
import Dialog from '~/components/ui/Dialog';
import { useDialogStore } from './dialog-store-provider';
import { motion } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5, // Stagger the animation of children
    },
  },
};

const DialogManager = () => {
  const { closeDialog, dialogs } = useDialogStore();

  const handleOpenChange = async (dialogId: string) => {
    const dialog = dialogs.find((dialog) => dialog.id === dialogId)!;
    if (dialog?.type === 'Confirm' && dialog.onCancel) {
      dialog.onCancel();
      closeDialog(dialog.id);
      return;
    }
    await handleConfirmDialog(dialog.id);
  };

  const handleConfirmDialog = async (dialogId: string) => {
    const dialog = dialogs.find((dialog) => dialog.id === dialogId)!;
    const result = await dialog?.onConfirm?.();
    // close the dialog if it's not a prompt dialog or
    // the prompt dialog onConfirm resolves to a truthy value
    if (dialog?.type !== 'Prompt' || result) {
      closeDialog(dialog.id);
    }
  };

  const handleCancelDialog = (dialogId: string) => {
    const dialog = dialogs.find((dialog) => dialog.id === dialogId)!;
    if (dialog?.type === 'Confirm') {
      dialog.onCancel?.();
    }
    closeDialog(dialog.id);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {dialogs.map((dialog, index) => (
          <Dialog
            key={dialog.id}
            dialog={dialog}
            dialogOrder={index}
            handleOpenChange={handleOpenChange}
            handleCancelDialog={handleCancelDialog}
            handleConfirmDialog={handleConfirmDialog}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default DialogManager;
