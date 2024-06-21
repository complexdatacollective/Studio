'use client';

import { AnimatePresence } from 'framer-motion';
import Dialog from '~/components/ui/Dialog';
import { useDialogStore } from './dialog-store-provider';

const DialogManager = () => {
  const { closeDialog, dialogs } = useDialogStore((state) => state);

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
    <AnimatePresence>
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
    </AnimatePresence>
  );
};

export default DialogManager;
