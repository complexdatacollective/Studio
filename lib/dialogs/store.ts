import { createStore } from 'zustand/vanilla';
import { type Dialog } from './dialog-schemas';

type DialogState = {
  dialogs: Dialog[];
};

type DialogActions = {
  openDialog: (dialog: Dialog) => void;
  closeDialog: (dialogId: string) => void;
};

export type DialogStore = DialogState & DialogActions;

const defaultInitState: DialogState = {
  dialogs: [],
};

export const createDialogStore = (initState: DialogState = defaultInitState) =>
  createStore<DialogStore>((set) => ({
    ...initState,
    openDialog: (dialog) =>
      set((state) => ({ dialogs: [...state.dialogs, dialog] })),
    closeDialog: (dialogId) =>
      set((state) => ({
        dialogs: state.dialogs.filter((dialog) => dialog.id !== dialogId),
      })),
  }));
