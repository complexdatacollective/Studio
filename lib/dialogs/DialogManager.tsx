'use client';

import { AnimatePresence } from 'framer-motion';
import Dialog from '~/components/ui/Dialog';
import { type Dialog as DialogType } from './dialog-schemas';
import { useDialogStore } from './dialog-store-provider';

const DialogManager = () => {
  const { closeDialog, dialogs } = useDialogStore((state) => state);

  const handleOpenChange = (dialog: DialogType) => {
    if (dialog.type === 'Confirm' && dialog.onCancel) {
      dialog.onCancel();
      closeDialog(dialog.id);
      return;
    }
    const result = dialog?.onConfirm?.();
    // close the dialog if it's not a prompt dialog or the prompt dialog returns a truthy value
    if (dialog?.type !== 'Prompt' || result) {
      closeDialog(dialog.id);
    }
  };

  const confirmDialog = (dialog: DialogType) => {
    const result = dialog?.onConfirm?.();
    // close the dialog if it's not a prompt dialog or the prompt dialog returns a truthy value
    if (dialog?.type !== 'Prompt' || result) {
      closeDialog(dialog.id);
    }
  };

  const cancelDialog = (dialog: DialogType) => {
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
          cancelDialog={cancelDialog}
          confirmDialog={confirmDialog}
        />
      ))}
    </AnimatePresence>
  );
};

export default DialogManager;
