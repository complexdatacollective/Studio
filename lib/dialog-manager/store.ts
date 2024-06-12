import { create } from 'zustand';

export type Dialog = {
  id: string;
  type: 'Confirm' | 'Notice'; // add more types here
  title: string;
  message: string;
  confirmLabel?: string;
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
