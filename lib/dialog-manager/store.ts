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
  dialogs: [
    {
      id: '1234-1234-1',
      type: 'Confirm',
      title: 'Something to confirm',
      message: 'More detail about confirmation',
      confirmLabel: 'Yes please!',
      onConfirm: () => {
        // eslint-disable-next-line no-console
        console.log('dialog confirmed');
      },
      onCancel: () => {
        // eslint-disable-next-line no-console
        console.log('dialog cancelled');
      },
    },
  ],
  openDialog: (dialog) =>
    set((state) => ({ dialogs: [...state.dialogs, dialog] })),
  closeDialog: (dialogId) =>
    set((state) => ({
      dialogs: state.dialogs.filter((dialog) => dialog.id !== dialogId),
    })),
}));

export default useDialogStore;
