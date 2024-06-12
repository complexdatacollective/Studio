import { nanoid } from 'nanoid';
import useDialogStore, { type Dialog } from './store';

const useDialog = () => {
  const { openDialog, closeDialog, dialogs } = useDialogStore();

  const showDialog = ({
    type,
    message,
    title,
    onConfirm,
    onCancel,
  }: Dialog) => {
    const id = nanoid();
    openDialog({ id, type, title, message, onConfirm, onCancel });

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
