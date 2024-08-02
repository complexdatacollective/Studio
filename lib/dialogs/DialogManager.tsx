'use client';
import { useDialogStore } from './store';

const DialogManager = () => {
  const { dialogs } = useDialogStore();

  return (
    <>
      {dialogs.map((dialog) => (
        <div key={dialog.id}>{dialog.id}</div>
      ))}
    </>
  );
};

export default DialogManager;
