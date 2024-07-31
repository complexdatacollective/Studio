import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { type Dialog, type DialogWithoutId } from './dialog-schemas';

type DialogState = {
  dialogs: Dialog[];
};

type DialogActions = {
  openDialog: (dialog: DialogWithoutId) => void;
  closeDialog: (dialogId: string) => void;
};

type DialogStore = DialogState & DialogActions;

export const useDialogStore = create<DialogStore>((set) => ({
  dialogs: [],
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
