'use client';

import React, {
  createContext,
  use,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Surface from '~/components/layout/Surface';
import { cn } from '../utils';
import CloseButton from '~/components/ui/CloseButton';
import Paragraph from '~/components/typography/Paragraph';
import Heading from '~/components/typography/Heading';
import Form from '~/components/ui/form/Form';
import { Button } from '~/components/ui/Button';
import { SubmitButton } from '~/components/ui/form/SubmitButton';
import { generatePublicId } from '../generatePublicId';
import { flushSync } from 'react-dom';

type Dialog = {
  id: string;
  title: string;
  description?: string;
  ref: React.RefObject<HTMLDialogElement>;
  closeDialog: (value: unknown) => void;
  content?: (resolve: (value: unknown) => unknown) => React.ReactNode;
};

type DialogProps = Dialog & React.HTMLAttributes<HTMLDialogElement>;

export const ControlledDialog = ({ open, ...rest }: DialogProps) => {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [open]);

  return <Dialog {...rest} ref={ref} />;
};

export const Dialog = ({
  id,
  content,
  title,
  description,
  ref,
  closeDialog,
  ...rest
}: DialogProps) => {
  return (
    <Surface
      as="dialog"
      level={0}
      ref={ref}
      onClose={() => closeDialog(null)}
      className={cn(
        'bg-surface-0 text-surface-0-foreground max-w-4xl rounded p-6',
        'allow-discrete -translate-y-6 opacity-0 transition-all duration-300 ease-out',
        'open:from:-translate-y-6 open:from:backdrop:bg-overlay/0 open:translate-y-0 open:opacity-100 open:backdrop:bg-overlay/70',
        'backdrop:bg-overlay/0 backdrop:backdrop-blur-xs backdrop:transition-all backdrop:duration-300 backdrop:ease-out',
        // Accent
        // 'border-b-4 border-accent [--primary:var(--accent)]',
      )}
      aria-labelledby={`${id}-title`}
      aria-describedby={description ? `${id}-description` : undefined}
      {...rest}
    >
      <Heading variant="h2" id={`${id}-title`}>
        {title}
      </Heading>
      {description && (
        <Paragraph id={`${id}-description`}>{description}</Paragraph>
      )}
      {content && content(closeDialog)}
      <CloseButton onClick={() => closeDialog(null)} />
    </Surface>
  );
};

type TDialogContext = {
  openDialog: (props: {
    id?: string;
    title: string;
    description: string;
    content?: (resolve: (value: unknown) => unknown) => React.ReactNode;
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
      id,
      title,
      description,
      content,
    }: {
      id?: string;
      title: string;
      description: string;
      content?: (resolve: (value: unknown) => unknown) => React.ReactNode;
    }) => {
      // TODO: check for ID collision

      const dialogId = id ?? generatePublicId();
      const dialogRef = React.createRef<HTMLDialogElement>();

      console.log('Opening dialog', dialogId);

      return new Promise(async (resolve) => {
        flushSync(() =>
          setDialogs((prevDialogs) => [
            ...prevDialogs,
            {
              id: dialogId,
              title,
              description,
              content,
              resolve,
              ref: dialogRef,
            },
          ]),
        );

        if (dialogRef.current) {
          dialogRef.current.showModal();
        }
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
      {dialogs.map(({ id, title, description, content, ref }) => (
        <Dialog
          id={id}
          key={id}
          ref={ref}
          title={title}
          description={description}
          closeDialog={(value) => closeDialog(id, value)}
          content={content}
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
