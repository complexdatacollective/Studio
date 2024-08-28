import { useMemo } from 'react';
import { useDialogStore } from './Provider';

export type Dialog = {
  id: string;
};

export const useDialogs = () => {
  const { dialogs, openDialog, closeDialog } = useDialogStore();
  const showOverlay = dialogs.length > 0;

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
