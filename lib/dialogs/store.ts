import { type ReactNode } from 'react';
import { createStore } from 'zustand/vanilla';

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
