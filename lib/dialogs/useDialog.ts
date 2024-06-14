import { nanoid } from 'nanoid';
import { useDialogStore } from './dialog-store-provider';
import { type Dialog } from './dialog-schemas';

const useDialog = () => {
  const { openDialog, closeDialog, dialogs } = useDialogStore((state) => state);

  const showDialog = ({
    type,
    content,
    title,
    cancelLabel,
    confirmLabel,
    onConfirm,
    onCancel,
  }: Omit<Dialog, 'id'>) => {
    const id = nanoid();
    openDialog({
      id,
      type,
      title,
      content,
      cancelLabel,
      confirmLabel,
      onConfirm,
      onCancel,
    });

    return id;
  };

  const confirmDialog = (id: string) => {
    const dialog = dialogs.find((d) => d.id === id);
    if (dialog?.onConfirm) {
      dialog.onConfirm();
    }
    closeDialog(id);
  };

  const cancelDialog = (id: string) => {
    const dialog = dialogs.find((d) => d.id === id);
    if (dialog?.onCancel) {
      dialog.onCancel();
    }
    closeDialog(id);
  };

  return {
    showDialog,
    confirmDialog,
    cancelDialog,
    dialogs,
  };
};

export default useDialog;
