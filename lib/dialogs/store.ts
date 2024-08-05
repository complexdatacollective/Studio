import { generatePublicId } from '~/lib/generatePublicId';
import { create } from 'zustand';

export type Dialog = {
  id: string;
  title: string;
  content: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

type DialogState = {
  dialogs: Dialog[];
};

type DialogActions = {
  addDialog: (dialog: Omit<Dialog, 'id'>) => void;
  removeDialog: (dialogId: string) => void;
};

type DialogStore = DialogState & DialogActions;

export const useDialogStore = create<DialogStore>((set) => ({
  dialogs: [],
  addDialog: (dialog) => {
    const id = generatePublicId();

    return set((state) => ({
      dialogs: [...state.dialogs, { id, ...dialog }],
    }));
  },
  removeDialog: (dialogId) =>
    set((state) => ({
      dialogs: state.dialogs.filter((dialog) => dialog.id !== dialogId),
    })),
}));
