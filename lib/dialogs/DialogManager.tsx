'use client';
import { type RefObject } from 'react';
import Dialog from '~/components/ui/Dialog';
import { useDialogStore } from './store';

const DialogManager = ({
  isModal,
  portalRef,
}: {
  isModal?: boolean;
  portalRef?: RefObject<HTMLDivElement> | null;
}) => {
  const { dialogs } = useDialogStore();

  return (
    <>
      {dialogs.map((dialog) => (
        <Dialog
          isModal={isModal}
          portalContainer={portalRef?.current}
          key={dialog.id}
        >
          {dialog.id}
        </Dialog>
      ))}
    </>
  );
};

export default DialogManager;
