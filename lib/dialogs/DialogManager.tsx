'use client';
import Dialog from '~/components/ui/Dialog';
import { useDialogStore } from './store';
import type { PropsWithChildren, ReactNode } from 'react';

type DialogManagerProps = {
  DialogComponent?: React.ComponentType<
    PropsWithChildren<{
      children: ReactNode;
    }>
  >;
};

const DialogManager = ({ DialogComponent = Dialog }: DialogManagerProps) => {
  const { dialogs } = useDialogStore();

  return (
    <>
      {dialogs.map((dialog) => (
        <DialogComponent key={dialog.id}>{dialog.id}</DialogComponent>
      ))}
    </>
  );
};

export default DialogManager;
