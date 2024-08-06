import { generatePublicId } from '~/lib/generatePublicId';
import { type DialogWithoutId } from './dialog-schemas';
import { useDialogStore } from './store';

const useDialog = () => {
  const {
    addDialog: openDialog,
    removeDialog: closeDialog,
    dialogs,
  } = useDialogStore();

  const showDialog = (dialog: DialogWithoutId) => {
    const id = generatePublicId();
    openDialog({ id, ...dialog });
    return id;
  };

  const confirmDialog = (dialogId: string) => {
    const dialog = dialogs.find((d) => d.id === dialogId);
    if (dialog?.onConfirm) {
      dialog.onConfirm();
    }
    closeDialog(dialogId);
  };

  const cancelDialog = (dialogId: string) => {
    const dialog = dialogs.find((d) => d.id === dialogId);
    if (dialog?.onCancel) {
      dialog.onCancel();
    }
    closeDialog(dialogId);
  };

  // const createDialog = async (dialog: DialogWithoutId) => {
  //   const id = showDialog(dialog);
  //   return new Promise<boolean>((resolve) => {
  //     const handleConfirm = () => {
  //       resolve(true);
  //     };
  //     const handleCancel = () => {
  //       resolve(false);
  //     };
  //     openDialog({
  //       id,
  //       ...dialog,
  //       onConfirm: handleConfirm,
  //       onCancel: handleCancel,
  //     });
  //   });
  // };

  return {
    // createDialog,
    showDialog,
    confirmDialog,
    cancelDialog,
    dialogs,
    closeDialog,
  };
};

export default useDialog;
