import { nanoid } from 'nanoid';
import { useDialogStore } from './store';
import { type DialogWithoutId } from './dialog-schemas';

const useDialog = () => {
  const { openDialog, closeDialog, dialogs } = useDialogStore();

  const showDialog = (dialog: DialogWithoutId) => {
    const id = nanoid();
    openDialog({ id, ...dialog });
    return id;
  };

  const confirmDialog = async (dialogId: string) => {
    const dialog = dialogs.find((dialog) => dialog.id === dialogId)!;
    const result = await dialog?.onConfirm?.();
    // close the dialog if it's not a prompt dialog or
    // the prompt dialog onConfirm resolves to a truthy value
    if (dialog?.type !== 'Prompt' || result) {
      closeDialog(dialog.id);
    }
  };

  const cancelDialog = (dialogId: string) => {
    const dialog = dialogs.find((dialog) => dialog.id === dialogId)!;
    if (dialog?.type === 'Confirm') {
      dialog.onCancel?.();
    }
    closeDialog(dialog.id);
  };

  return {
    showDialog,
    confirmDialog,
    cancelDialog,
    dialogs,
    closeDialog,
  };
};

export default useDialog;
