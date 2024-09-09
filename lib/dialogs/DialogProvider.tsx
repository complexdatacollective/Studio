import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  type RefObject,
} from 'react';
import { generatePublicId } from '../generatePublicId';
import { flushSync } from 'react-dom';
import { Dialog } from './Dialog';
import { Button } from '~/components/ui/Button';
import Form from '~/components/ui/form/Form';

type BaseDialogProps = {
  id?: string;
  title: string;
  accent?: 'default' | 'danger' | 'success' | 'warning' | 'info';
  description?: string;
  children?: React.ReactNode;
};

type ConfirmDialogProps = BaseDialogProps & {
  hideCancel?: boolean;
  confirmText?: string;
  cancelText?: string;
};

type CustomDialogProps<T> = BaseDialogProps & {
  renderContent: (resolve: (value: T | null) => void) => React.ReactNode;
};

type OpenDialog<T> = ConfirmDialogProps & CustomDialogProps<T>;

type DialogState<T> = OpenDialog<T> & {
  id: string;
  resolveCallback: (value: T | null) => void;
  ref: RefObject<HTMLDialogElement>;
};

type DialogContextType = {
  closeDialog: (id: string, value: unknown) => Promise<void>;
  openDialog: (dialogProps: ConfirmDialogProps) => Promise<boolean | null>;
  openCustomDialog: <T>(dialogProps: CustomDialogProps<T>) => Promise<T | null>;
};

const DialogContext = createContext<DialogContextType | null>(null);

const DialogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dialogs, setDialogs] = useState<DialogState<unknown>[]>([]);

  const INTERNAL_openDialog = useCallback(
    async <T,>(dialogProps: OpenDialog<T>): Promise<T | null> => {
      const dialogRef = React.createRef<HTMLDialogElement>();

      return new Promise((resolveCallback) => {
        flushSync(() =>
          setDialogs((prevDialogs) => [
            ...prevDialogs,
            {
              ...dialogProps,
              id: dialogProps.id ?? generatePublicId(),
              resolveCallback,
              ref: dialogRef,
            } as DialogState<unknown>,
          ]),
        );

        if (dialogRef.current) {
          dialogRef.current.showModal();
        }
      });
    },
    [setDialogs],
  );

  const closeDialog = useCallback(
    async (id: string, value: unknown) => {
      const dialog = dialogs.find((dialog) => dialog.id === id);

      if (!dialog) {
        throw new Error(`Dialog with ID ${id} does not exist`);
      }

      if (dialog.ref.current) {
        dialog.ref.current.close();
        dialog.resolveCallback(value);
      }

      await new Promise((resolve) => setTimeout(resolve, 500));

      setDialogs((prevDialogs) =>
        prevDialogs.filter((dialog) => dialog.id !== id),
      );
    },
    [dialogs, setDialogs],
  );

  const openDialog = useCallback(
    (dialogProps: ConfirmDialogProps) =>
      INTERNAL_openDialog<boolean>({
        ...dialogProps,
        renderContent: (resolve) => (
          <Form.Footer
            primaryAction={
              <Button color="primary" onClick={() => resolve(true)}>
                {dialogProps.confirmText ?? 'Confirm'}
              </Button>
            }
            secondaryAction={
              !dialogProps.hideCancel && (
                <Button onClick={() => resolve(false)}>
                  {dialogProps.cancelText ?? 'Cancel'}
                </Button>
              )
            }
          />
        ),
      }),
    [INTERNAL_openDialog],
  );

  const openCustomDialog = useCallback(
    <T,>(dialogProps: CustomDialogProps<T>) =>
      INTERNAL_openDialog<T>(dialogProps),
    [INTERNAL_openDialog],
  );

  const contextValue: DialogContextType = {
    closeDialog,
    openDialog,
    openCustomDialog,
  };

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
      {dialogs.map(
        ({
          id,
          ref,
          title,
          description,
          accent,
          renderContent,
          children: dialogChildren,
        }) => (
          <Dialog
            key={id}
            ref={ref}
            title={title}
            description={description}
            closeDialog={() => closeDialog(id, null)}
            accent={accent}
          >
            {dialogChildren}
            {renderContent((value) => closeDialog(id, value))}
          </Dialog>
        ),
      )}
    </DialogContext.Provider>
  );
};

export const useDialog = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }

  return context;
};

export default DialogProvider;
