import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from '~/components/ui/Button';
import { Dialog, DialogVariants } from './dialog-schemas';
import { DialogStoreProvider } from './dialog-store-provider';
import DialogManager from './DialogManager';
import { useDialogStore } from './dialog-store-provider';
import { Input } from '~/components/ui/form/Input';
import Paragraph from '~/components/typography/Paragraph';
import { useRef } from 'react';

// Todo: Strip out everything from DialogManager Story except the core functionality
// just render DialogManager functionalities here

/* 
 This story is a composition of the DialogManager component and the useDialog hook.
*/

const meta = {
  title: 'Dialogs/Dialog',
  component: DialogManager,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: Object.values(DialogVariants),
    },
    title: { control: 'text' },
    content: { control: 'text' },
    error: {
      name: 'error',
      type: { name: 'object' },
      description: 'The error object',
      control: {
        type: 'object',
      },
      defaultValue: {
        name: 'error',
        message: 'An error occurred',
        stack: 'Error stack',
      },
      table: {
        type: {
          summary: 'object',
          detail: `{ name: string, message: string, stack: string }`,
        },
        defaultValue: {
          summary: 'error',
          detail: `{ name: 'Error name', message: 'Error message', stack: 'Error stack' }`,
        },
      },
      if: { arg: 'type', eq: 'Error' },
    },
    confirmLabel: { control: 'text' },
    cancelLabel: { control: 'text', if: { arg: 'type', neq: 'Error' } },
    onConfirm: { control: false },
    onCancel: { control: false, if: { arg: 'type', neq: 'Error' } },
  },
  args: {
    type: 'Info',
    title: 'Dialog title',
    content: 'This is the dialog content.',
    confirmLabel: 'OK',
    // Error dialog args will be used if the type is 'Error'
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
    cancelLabel: 'Cancel',
    onConfirm: fn(() => {}),
    onCancel: fn(() => {}),
  },
  decorators: [
    (Story) => (
      <DialogStoreProvider>
        <DialogManager />
        <Story />
      </DialogStoreProvider>
    ),
  ],
} as Meta<Dialog>;

export default meta;
type Story = StoryObj<Dialog>;

export const InfoDialog: Story = {
  args: {
    type: 'Info',
    title: 'Important Information',
    content: (
      <div>
        <Paragraph>
          Our product is designed to provide a seamless user experience and help
          you achieve your goals more efficiently. We have carefully crafted
          every aspect of the application to ensure maximum effectiveness and
          ease of use.
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
  render: (props: Dialog) => {
    const { openDialog } = useDialogStore();
    const createDialog = () => {
      openDialog(props);
    };
    return (
      <>
        <Button onClick={() => createDialog()}>Show Dialog</Button>
      </>
    );
  },
};

export const ConfirmDialog: Story = {
  args: {
    type: 'Confirm',
    title: 'Confirm Action',
    content:
      'Are you sure you want to proceed with this action? This cannot be undone.',
  },
  render: (props: Dialog) => {
    const { openDialog } = useDialogStore();
    const createDialog = () => {
      openDialog(props);
    };
    return (
      <>
        <Button variant="accent" onClick={() => createDialog()}>
          Show Dialog
        </Button>
      </>
    );
  },
};

export const PromptDialog: Story = {
  render: (props: Dialog) => {
    const formRef = useRef<HTMLFormElement>(null);

    const { openDialog } = useDialogStore();
    const createDialog = () => {
      openDialog({
        type: 'Prompt',
        title: 'Enter Your Name',
        content: (
          <form ref={formRef}>
            <Paragraph>
              Please provide your name so we can personalize your experience.
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
        confirmLabel: 'Submit',
        onConfirm: async () => {
          // check if the form is valid
          if (formRef.current?.checkValidity()) {
            // do something with the form data
            await new Promise((resolve) => setTimeout(resolve, 3000));
            return true;
          }
          return false;
        },
      });
    };
    return (
      <>
        <Button variant="accent" onClick={() => createDialog()}>
          Show Dialog
        </Button>
      </>
    );
  },
};

export const ErrorDialog: Story = {
  args: {
    type: 'Error',
    title: 'Oops, something went wrong',
    content: 'We encountered an unexpected error. Please try again later.',
  },
  render: (props: Dialog) => {
    const { openDialog } = useDialogStore();
    const createDialog = () => {
      openDialog(props);
    };
    return (
      <>
        <Button variant="destructive" onClick={() => createDialog()}>
          Show Dialog
        </Button>
      </>
    );
  },
};

export const StackingDialogs: Story = {
  args: {
    type: 'Error',
  },
  render: (props: Dialog) => {
    const { openDialog } = useDialogStore();
    const createDialog = () => {
      openDialog({
        type: 'Error',
        title: 'Oops, something went wrong',
        content: 'We encountered an unexpected error. Please try again later.',
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
      });
      openDialog({
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
              By using our product, you agree to our terms of service and
              privacy policy. If you have any questions or concerns, please
              don't hesitate to reach out to our support team.
            </Paragraph>
          </div>
        ),
        confirmLabel: 'Got it',
        onConfirm: () => {
          console.log('Info dialog confirmed');
        },
      });

      openDialog({
        type: 'Confirm',
        title: 'Confirm Action',
        content: 'Are you sure you want to proceed with this action?',
        confirmLabel: 'Yes',
        onConfirm: () => {
          console.log('Confirm dialog confirmed');
        },
      });
    };
    return (
      <>
        <Button variant="destructive" onClick={() => createDialog()}>
          Show Dialog
        </Button>
      </>
    );
  },
};
