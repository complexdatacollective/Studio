'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';
import Surface from '~/components/layout/Surface';
import { cn } from '../utils';
import CloseButton from '~/components/ui/CloseButton';
import Paragraph from '~/components/typography/Paragraph';
import Heading from '~/components/typography/Heading';
import Form from '~/components/ui/form/Form';
import { Button } from '~/components/ui/Button';
import { SubmitButton } from '~/components/ui/form/SubmitButton';
import { generatePublicId } from '../generatePublicId';

type Dialog = {
  id: string;
  title: string;
  description: string;
  ref: React.RefObject<HTMLDialogElement>;
  children?: React.ReactNode;
};

type DialogProps = Dialog & React.HTMLAttributes<HTMLDialogElement>;

const Dialog = ({
  id,
  children,
  title,
  description,
  ref,
  ...rest
}: DialogProps) => {
  const { closeDialog } = useDialog();

  return (
    <Surface
      as="dialog"
      level={0}
      ref={ref}
      onClose={() => closeDialog(id, null)}
      className={cn(
        'bg-surface-0 text-surface-0-foreground rounded p-6',
        'allow-discrete -translate-y-6 opacity-0 transition-all duration-300 ease-out',
        'open:from:-translate-y-6 open:from:backdrop:bg-overlay/0 open:translate-y-0 open:opacity-100 open:backdrop:bg-overlay/70',
        'backdrop:bg-overlay/0 backdrop:backdrop-blur-xs backdrop:transition-all backdrop:duration-300 backdrop:ease-out',
        // Accent
        'border-b-4 border-accent [--primary:var(--accent)]',
      )}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-description`}
      {...rest}
    >
      <CloseButton onClick={() => closeDialog(id, false)} />
      <Heading variant="h2" id={`${id}-title`}>
        {title}
      </Heading>
      <Paragraph id={`${id}-description`}>{description}</Paragraph>
      <Form
        onSubmit={(e) => {
          const formData = new FormData(e.target);
          e.preventDefault();
          void closeDialog(id, formData);
        }}
      >
        {children}
        <Form.Footer
          primaryAction={<SubmitButton>Submit</SubmitButton>}
          secondaryAction={
            <Button onClick={() => closeDialog(id, false)}>Cancel</Button>
          }
        />
      </Form>
    </Surface>
  );
};

type TDialogContext = {
  openDialog: (props: {
    title: string;
    description: string;
    children?: React.ReactNode;
  }) => Promise<unknown>;
  closeDialog: (id: string, value: unknown) => Promise<void>;
};

// Create a context to manage multiple dialogs
const DialogContext = createContext<TDialogContext | null>(null);

// Adds resolve callback to Dialog type
type DialogInState = Dialog & {
  resolve: (value: unknown) => void;
};

const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [dialogs, setDialogs] = useState<DialogInState[]>([]);

  const openDialog = useCallback(
    ({
      title,
      description,
      children,
    }: {
      title: string;
      description: string;
      children?: React.ReactNode;
    }) => {
      const id = generatePublicId();
      const dialogRef = React.createRef<HTMLDialogElement>();

      return new Promise((resolve) => {
        setDialogs((prevDialogs) => [
          ...prevDialogs,
          { id, title, description, children, resolve, ref: dialogRef },
        ]);

        // Delay `showModal` call until after the dialog has been added to state and rendered
        // TODO: This is a hack. Can we do it a better way?
        setTimeout(() => {
          if (dialogRef.current) {
            dialogRef.current.showModal();
          }
        }, 0);
      });
    },
    [],
  );

  const closeDialog = useCallback(
    async (id: DialogInState['id'], value: unknown) => {
      const dialog = dialogs.find((dialog) => dialog.id === id);

      if (dialog && dialog.ref.current) {
        dialog.ref.current.close();
        if (dialog.resolve) {
          dialog.resolve(value);
        }
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
      {dialogs.map(({ id, title, description, children, ref }) => (
        <Dialog
          id={id}
          key={id}
          ref={ref}
          title={title}
          description={description}
        >
          {children}
        </Dialog>
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
