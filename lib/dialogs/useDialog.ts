import { nanoid } from 'nanoid';
import { useDialogStore } from './dialog-store-provider';
import { type DialogWithoutId } from './dialog-schemas';

const useDialog = () => {
  const { openDialog, closeDialog, dialogs } = useDialogStore((state) => state);

  const showDialog = (dialog: DialogWithoutId) => {
    const id = nanoid();
    openDialog({ id, ...dialog });
    return id;
  };

  const confirmDialog = (id: string) => {
    const dialog = dialogs.find((d) => d.id === id);
    const result = dialog?.onConfirm?.();

    // close the dialog if it's not a prompt dialog or the prompt dialog returns a truthy value
    if (dialog?.type !== 'Prompt' || result) {
      closeDialog(id);
    }
  };

  const cancelDialog = (id: string) => {
    const dialog = dialogs.find((d) => d.id === id);
    if (dialog?.type === 'Confirm' || dialog?.type === 'Warning') {
      dialog.onCancel?.();
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
