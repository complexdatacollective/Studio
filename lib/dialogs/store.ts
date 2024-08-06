import { create } from 'zustand';

import { type Dialog } from './dialog-schemas';

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
  addDialog: (dialog) => {
    return set((state) => ({
      dialogs: [...state.dialogs, dialog],
    }));
  },
  removeDialog: (dialogId) =>
    set((state) => ({
      dialogs: state.dialogs.filter((dialog) => dialog.id !== dialogId),
    })),
}));
