import { nanoid } from 'nanoid';
import { createStore } from 'zustand/vanilla';
import { type Dialog, type DialogWithoutId } from './dialog-schemas';

type DialogState = {
  dialogs: Dialog[];
};

type DialogActions = {
  openDialog: (dialog: DialogWithoutId) => void;
  closeDialog: (dialogId: string) => void;
};

export type DialogStore = DialogState & DialogActions;

const defaultInitState: DialogState = {
  dialogs: [],
};

export const createDialogStore = (initState: DialogState = defaultInitState) =>
  createStore<DialogStore>((set) => ({
    ...initState,
    openDialog: (dialog) => {
      const id = nanoid();
      return set((state) => ({
        dialogs: [...state.dialogs, { id, ...dialog }],
      }));
    },
    closeDialog: (dialogId) =>
      set((state) => ({
        dialogs: state.dialogs.filter((dialog) => dialog.id !== dialogId),
      })),
  }));
