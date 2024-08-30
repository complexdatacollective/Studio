import { type ReactNode } from 'react';
import { createStore } from 'zustand';

export type Dialog = {
  id: string;
  title: string;
  description: string;
  content: ReactNode;
};

export type DialogState = {
  dialogs: Dialog[];
};

export type DialogActions = {
  openDialog: (dialog: Dialog) => void;
  closeDialog: () => void;
};

export type DialogStore = DialogState & DialogActions;

export const createDialogStore = () => {
  return createStore<DialogStore>((set, _get) => ({
    dialogs: [],
    openDialog: (dialog: Dialog) => {
      set((state) => ({
        dialogs: [...state.dialogs, dialog],
      }));
    },
    closeDialog: () => {
      set((state) => ({
        dialogs: state.dialogs.slice(1),
      }));
    },
  }));
};

export type DialogStoreApi = ReturnType<typeof createDialogStore>;

export const useDialogs = () => {
  return createDialogStore();
};
