import React, { createContext, useCallback, useContext, useState } from 'react';
import { generatePublicId } from '../generatePublicId';
import { flushSync } from 'react-dom';
import { Dialog, RenderDialogContent } from './Dialog';

type OpenDialog<T> = {
  id?: string;
  title: string;
  description: string;
  renderContent?: RenderDialogContent<unknown>;
};

type TDialogContext = {
  openDialog: (dialog: OpenDialog<unknown>) => Promise<unknown>;
  closeDialog: (id: string, value: unknown) => Promise<void>;
};

const DialogContext = createContext<TDialogContext | null>(null);

type DialogInState = {
  id: string;
  title: string;
  description: string;
  renderContent?: RenderDialogContent<unknown>;
  resolveCallback: (value: unknown) => void;
  ref: React.RefObject<HTMLDialogElement>;
};

const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [dialogs, setDialogs] = useState<DialogInState[]>([]);

  const openDialog = useCallback((dialogProps: OpenDialog<unknown>) => {
    const { id, title, description, renderContent } = dialogProps;

    // check for ID collision, if ID is provided
    if (id && dialogs.some((dialog) => dialog.id === id)) {
      throw new Error(`Dialog with ID ${id} already exists`);
    }

    const dialogId = id ?? generatePublicId();
    const dialogRef = React.createRef<HTMLDialogElement>();

    return new Promise((resolve) => {
      // flushSync is used to ensure that the dialog is added to the DOM before
      // being shown. This is necessary because the dialog is shown immediately
      // after being added, and we need to ensure that the dialog is in the DOM
      flushSync(() =>
        setDialogs((prevDialogs) => [
          ...prevDialogs,
          {
            id: dialogId,
            title,
            description,
            renderContent,
            resolveCallback: resolve,
            ref: dialogRef,
          },
        ]),
      );

      if (dialogRef.current) {
        dialogRef.current.showModal();
      }
    });
  }, []);

  const closeDialog = useCallback(
    async (id: DialogInState['id'], value: unknown) => {
      const dialog = dialogs.find((dialog) => dialog.id === id);

      if (!dialog) {
        throw new Error(`Dialog with ID ${id} does not exist`);
      }

      if (dialog.ref.current) {
        dialog.ref.current.close();
        dialog.resolveCallback(value);
      }

      // We need to wait for the out animation to finish before removing the dialog
      await new Promise((resolve) => setTimeout(resolve, 500));

      setDialogs((prevDialogs) => {
        return prevDialogs.filter((dialog) => dialog.id !== id);
      });
    },
    [dialogs],
  );

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      {dialogs.map(({ id, title, description, renderContent, ref }) => (
        <Dialog
          id={id}
          key={id}
          ref={ref}
          title={title}
          description={description}
          closeDialog={(value) => closeDialog(id, value)}
          renderContent={renderContent}
        />
      ))}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }

  return context;
};

export default DialogProvider;
