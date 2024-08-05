'use client';
import Dialog from '~/components/ui/Dialog';
import { useDialogStore } from './store';
import type { Dialog as DialogType } from './store';

type DialogManagerProps = {
  DialogComponent?: React.ComponentType<DialogType>;
};

const DialogManager = ({ DialogComponent = Dialog }: DialogManagerProps) => {
  const { dialogs } = useDialogStore();

  return (
    <>
      {dialogs.map((dialog) => (
        <DialogComponent key={dialog.id} {...dialog} />
      ))}
    </>
  );
};

export default DialogManager;
