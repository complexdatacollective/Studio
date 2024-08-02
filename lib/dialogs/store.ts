import { create } from 'zustand';

type Dialog = {
  id: string;
};

type DialogState = {
  dialogs: Dialog[];
};

type DialogActions = {
  addDialog: (dialog: Dialog) => void;
  removeDialog: (dialogId: string) => void;
};

type DialogStore = DialogState & DialogActions;

export const useDialogStore = create<DialogStore>((set) => ({
  dialogs: [],
  addDialog: (dialog) =>
    set((state) => ({
      dialogs: [...state.dialogs, dialog],
    })),
  removeDialog: (dialogId) =>
    set((state) => ({
      dialogs: state.dialogs.filter((dialog) => dialog.id !== dialogId),
    })),
}));
