'use client';
import { type RefObject } from 'react';
import Dialog from '~/components/ui/Dialog';
import { useDialogStore } from './store';

const DialogManager = ({
  portalRef,
}: {
  portalRef: RefObject<HTMLDivElement>;
}) => {
  const { dialogs } = useDialogStore();

  return (
    <>
      {dialogs.map((dialog) => (
        <Dialog portalContainer={portalRef.current} key={dialog.id}>
          {dialog.id}
        </Dialog>
      ))}
    </>
  );
};

export default DialogManager;
