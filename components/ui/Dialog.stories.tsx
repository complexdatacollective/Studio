import type { Meta, StoryObj } from '@storybook/react';
import Dialog from './Dialog';
import { fn } from '@storybook/test';
import Paragraph from '../typography/Paragraph';
import { Button } from './Button';
import { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Input } from './form/Input';
import { Dialog as DialogType } from '~/lib/dialogs/dialog-schemas';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Dialogs/Dialog',
  component: Dialog,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    dialog: {
      name: 'dialog',
      type: { name: 'other', value: 'Dialog' },
      description: 'The dialog object',
      control: {
        type: 'object',
      },
      defaultValue: {
        id: '133-535-32423-5677',
        type: 'Confirm',
        title: 'Confirm action',
        content: 'Are you sure that you want to continue with this action?',
        confirmLabel: 'Yes',
        cancelLabel: 'Cancel',
      },
      table: {
        type: {
          summary: 'object',
          detail: `{ id: string, type: 'DialogVariant', title: 'string', content: 'ReactNode', error?: 'Error', confirmLabel: 'string', cancelLabel: 'string', error?: 'Error', onConfirm?: 'function', onCancel?: 'function' }`,
        },
        defaultValue: {
          summary: 'dialog',
          detail: `{ id: string, type: 'Confirm', title: 'Confirm action', content: 'Are you sure that you want to continue with this action?', confirmLabel: 'Yes', cancelLabel: 'Cancel', onConfirm: ()=>undefined, onCancel: ()=>undefined }`,
        },
      },
    },
  },
  args: {
    dialogOrder: 0,
    dialog: {
      id: '133-535-32423-5678',
      type: 'Error',
      title: 'Oops, something went wrong',
      content: 'We encountered an unexpected error. Please try again later.',
      confirmLabel: 'OK',
      error: {
        name: 'TypeError',
        message: 'Cannot read property `length` of undefined',
        stack: `TypeError: Cannot read property length of undefined at
        Object.handleClick (/app/components/Button.js:21:30) at
        HTMLUnknownElement.callCallback (react-dom.development.js:4164:14) at
        Object.invokeGuardedCallbackDev (react-dom.development.js:4213:16) at
        invokeGuardedCallback (react-dom.development.js:4277:31) at
        invokeGuardedCallbackAndCatchFirstError
        (react-dom.development.js:4291:25) at executeDispatch
        (react-dom.development.js:9041:3) at processDispatchQueueItemsInOrder
        (react-dom.development.js:9073:7) at processDispatchQueue
        (react-dom.development.js:9086:7) at dispatchEventsForPlugins
        (react-dom.development.js:9097:7) at react-dom.development.js:9306:7`,
      },
    },
    handleOpenChange: fn(),
    handleConfirmDialog: fn(),
    handleCancelDialog: fn(),
  },
} as Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ConfirmDialog: Story = {
  args: {
    dialog: {
      id: '133-535-32423-5677',
      type: 'Confirm',
      title: 'Confirm action',
      content: (
        <Paragraph>
          Are you sure that you want to continue with this action?
        </Paragraph>
      ),
      confirmLabel: 'Yes',
      cancelLabel: 'Cancel',
    },
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="accent" onClick={() => setOpen(true)}>
          Show dialog
        </Button>

        <AnimatePresence>
          {open && (
            <Dialog
              {...{
                ...args,
                handleOpenChange: () => setOpen(!open),
                handleConfirmDialog: () => setOpen(!open),
                handleCancelDialog: () => setOpen(!open),
              }}
            />
          )}
        </AnimatePresence>
      </>
    );
  },
};

export const InfoDialog: Story = {
  args: {
    dialog: {
      id: '133-535-32423-5679',
      type: 'Info',
      title: 'Important Information',
      content: (
        <div>
          <Paragraph>
            Our product is designed to provide a seamless user experience and
            help you achieve your goals more efficiently. We have carefully
            crafted every aspect of the application to ensure maximum
            effectiveness and ease of use.
          </Paragraph>
          <Paragraph>
            By using our product, you agree to our terms of service and privacy
            policy. If you have any questions or concerns, please don't hesitate
            to reach out to our support team.
          </Paragraph>
        </div>
      ),
      confirmLabel: 'Got it',
    },
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Show dialog</Button>

        <AnimatePresence>
          {open && (
            <Dialog
              {...{
                ...args,
                handleOpenChange: () => setOpen(!open),
                handleConfirmDialog: () => setOpen(!open),
              }}
            />
          )}
        </AnimatePresence>
      </>
    );
  },
};

export const ErrorDialog: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Show dialog
        </Button>

        <AnimatePresence>
          {open && (
            <Dialog
              {...{
                ...args,
                handleOpenChange: () => setOpen(!open),
                handleConfirmDialog: () => setOpen(!open),
              }}
            />
          )}
        </AnimatePresence>
      </>
    );
  },
};

export const PromptDialog: Story = {
  args: {
    dialog: {
      id: '133-535-32423-5680',
      type: 'Prompt',
      title: 'Enter Your Name',
      confirmLabel: 'Submit',
      onConfirm: () => true,
    },
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const onConfirm = async () => {
      // check if the form is valid
      if (formRef.current?.checkValidity()) {
        // do something with the form data
        await new Promise((resolve) => setTimeout(resolve, 3000));
        return true;
      }
      return false;
    };

    return (
      <>
        <Button variant="accent" onClick={() => setOpen(true)}>
          Show dialog
        </Button>

        <AnimatePresence>
          {open && (
            <Dialog
              {...{
                ...args,
                dialog: {
                  ...args.dialog,
                  content: (
                    <form ref={formRef}>
                      <Paragraph>
                        Please provide your name so we can personalize your
                        experience.
                      </Paragraph>
                      <Input
                        label="Name"
                        required
                        name="input"
                        type="text"
                        placeholder="Enter your name..."
                      />
                    </form>
                  ),
                },
                handleOpenChange: async () => {
                  const result = await onConfirm();
                  setOpen(!result);
                },
                handleConfirmDialog: async () => {
                  const result = await onConfirm();
                  setOpen(!result);
                },
              }}
            />
          )}
        </AnimatePresence>
      </>
    );
  },
};

export const StackingDialogs: Story = {
  render: (args) => {
    const [dialogs, setDialogs] = useState<DialogType[]>([]);

    const addDialogs = () => {
      setDialogs([
        ...dialogs,
        { ...args.dialog, id: Date.now().toString() },
        {
          id: (Date.now() + 10).toString(),
          type: 'Info',
          title: 'Important Information',
          content: (
            <div>
              <Paragraph>
                Our product is designed to provide a seamless user experience
                and help you achieve your goals more efficiently. We have
                carefully crafted every aspect of the application to ensure
                maximum effectiveness and ease of use.
              </Paragraph>
              <Paragraph>
                By using our product, you agree to our terms of service and
                privacy policy. If you have any questions or concerns, please
                don't hesitate to reach out to our support team.
              </Paragraph>
            </div>
          ),
          confirmLabel: 'Got it',
        },
      ]);
    };

    return (
      <>
        <Button variant="secondary" onClick={() => addDialogs()}>
          Show dialog
        </Button>

        <AnimatePresence>
          {dialogs.map((dialog, index) => (
            <Dialog
              key={dialog.id}
              {...{
                dialog,
                handleOpenChange: () => {
                  setDialogs([...dialogs.filter((d) => d.id !== dialog.id)]);
                },
                handleConfirmDialog: () => {
                  setDialogs([...dialogs.filter((d) => d.id !== dialog.id)]);
                },
                handleCancelDialog: () => {
                  setDialogs([...dialogs.filter((d) => d.id !== dialog.id)]);
                },
                dialogOrder: index,
              }}
            />
          ))}
        </AnimatePresence>
      </>
    );
  },
};
