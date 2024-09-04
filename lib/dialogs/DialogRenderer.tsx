'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { MotionSurface } from '~/components/layout/Surface';
import { cn } from '../utils';
import CloseButton from '~/components/ui/CloseButton';
import Paragraph from '~/components/typography/Paragraph';
import Heading from '~/components/typography/Heading';
import Form from '~/components/ui/form/Form';
import { Button } from '~/components/ui/Button';
import { SubmitButton } from '~/components/ui/form/SubmitButton';

const Dialog = ({ id, children, title, description, ref }) => {
  const { closeDialog } = useDialog();

  return (
    <MotionSurface
      as="dialog"
      level={0}
      ref={ref}
      // onClose={() => closeDialog(id, null)}
      className={cn(
        'bg-surface-0 text-surface-0-foreground rounded p-6',
        'allow-discrete -translate-y-6 opacity-0 transition-all duration-500 ease-out',
        'open:from:-translate-y-6 open:from:backdrop:bg-overlay/0 open:translate-y-0 open:opacity-100 open:backdrop:bg-overlay/70',
        'backdrop:bg-overlay/0 backdrop:transition-all backdrop:duration-500 backdrop:ease-out',
      )}
    >
      <CloseButton onClick={() => closeDialog(id, false)} />
      <div>
        <Heading variant="h2">{title}</Heading>
        <Paragraph>{description}</Paragraph>
      </div>
      <Form
        onSubmit={(e) => {
          console.log('onSubmit');
          const formData = new FormData(e.target);
          e.preventDefault();
          // closeDialog(id, formData);
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
    </MotionSurface>
  );
};

// Create a context to manage multiple dialogs
const DialogContext = createContext(null);

const DialogProvider = ({ children }) => {
  const [dialogs, setDialogs] = useState([]);

  const openDialog = useCallback(({ title, description, children }) => {
    const id = Math.random().toString(36).substr(2, 9);
    const dialogRef = React.createRef();
    console.log('openDialog', id);

    return new Promise((resolve) => {
      setDialogs((prevDialogs) => [
        ...prevDialogs,
        { id, title, description, children, resolve, ref: dialogRef },
      ]);

      // Delay `showModal` call until after the dialog has been added to state and rendered
      setTimeout(() => {
        if (dialogRef.current) {
          dialogRef.current.showModal();
        }
      }, 0);
    });
  }, []);

  const closeDialog = useCallback((id, value) => {
    console.log('closeDialog', id, value);
    setDialogs((prevDialogs) => {
      const dialog = prevDialogs.find((dialog) => dialog.id === id);
      if (dialog && dialog.ref.current) {
        dialog.ref.current.close();
        if (dialog.resolve) {
          dialog.resolve(value);
        }
      }
      return prevDialogs.filter((dialog) => dialog.id !== id);
    });
  }, []);

  console.log('dialogs', dialogs);

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
