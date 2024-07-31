'use client';

import { AnimatePresence } from 'framer-motion';
import Dialog from '~/components/ui/Dialog';
import useDialog from './useDialog';

const DialogManager = () => {
  const { dialogs, cancelDialog, confirmDialog, closeDialog } = useDialog();

  const handleOpenChange = async (dialogId: string) => {
    const dialog = dialogs.find((dialog) => dialog.id === dialogId)!;
    if (dialog?.type === 'Confirm' && dialog.onCancel) {
      dialog.onCancel();
      closeDialog(dialog.id);
      return;
    }
    await confirmDialog(dialog.id);
  };

  return (
    <AnimatePresence>
      {dialogs.map((dialog, index) => (
        <Dialog
          key={dialog.id}
          dialogOrder={index}
          handleOpenChange={handleOpenChange}
          handleCancelDialog={cancelDialog}
          handleConfirmDialog={confirmDialog}
          {...dialog}
        />
      ))}
    </AnimatePresence>
  );
};

export default DialogManager;
