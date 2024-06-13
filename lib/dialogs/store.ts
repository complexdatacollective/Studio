import { type ReactNode } from 'react';
import { create } from 'zustand';

// add more variants here as needed
enum DialogVariants {
  Error = 'Error',
  Warning = 'Warning',
  Info = 'Info',
}

export type DialogVariant = keyof typeof DialogVariants;

export type Dialog = {
  id: string;
  type: DialogVariant;
  title: string;
  content: string | ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

type DialogState = {
  dialogs: Dialog[];
  openDialog: (dialog: Dialog) => void;
  closeDialog: (dialogId: string) => void;
};

const useDialogStore = create<DialogState>((set) => ({
  dialogs: [],
  openDialog: (dialog) =>
    set((state) => ({ dialogs: [...state.dialogs, dialog] })),
  closeDialog: (dialogId) =>
    set((state) => ({
      dialogs: state.dialogs.filter((dialog) => dialog.id !== dialogId),
    })),
}));

export default useDialogStore;
