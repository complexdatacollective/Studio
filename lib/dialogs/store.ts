import { create } from 'zustand';
import { type Dialog } from './dialog-schemas';

type DialogState = {
  dialogs: Dialog[];
};

type DialogActions = {
  openDialog: (dialog: Dialog) => void;
  closeDialog: (dialogId: string) => void;
};

type DialogStore = DialogState & DialogActions;

export const useDialogStore = create<DialogStore>((set) => ({
  dialogs: [],
  openDialog: (dialog) =>
    set((state) => ({
      dialogs: [...state.dialogs, dialog],
    })),
  closeDialog: (dialogId) =>
    set((state) => ({
      dialogs: state.dialogs.filter((dialog) => dialog.id !== dialogId),
    })),
}));
