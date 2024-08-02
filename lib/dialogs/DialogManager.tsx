'use client';
import Dialog from '~/components/ui/Dialog';
import { useDialogStore } from './store';

const DialogManager = () => {
  const { dialogs } = useDialogStore();

  return (
    <>
      {dialogs.map((dialog) => (
        <Dialog key={dialog.id}>{dialog.id}</Dialog>
      ))}
    </>
  );
};

export default DialogManager;
