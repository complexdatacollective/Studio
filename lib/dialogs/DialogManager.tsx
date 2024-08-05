'use client';
import Dialog from '~/components/ui/Dialog';
import { useDialogStore, type Dialog as DialogType } from './store';

const DialogManager = ({ dialogs }: { dialogs?: DialogType[] }) => {
  const { dialogs: storeDialogs } = useDialogStore();

  const dialogsToRender = dialogs ?? storeDialogs;

  return (
    <>
      {dialogsToRender.map((dialog) => (
        <Dialog key={dialog.id}>{dialog.id}</Dialog>
      ))}
    </>
  );
};

export default DialogManager;
