import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from '~/components/ui/Button';
import { Dialog, DialogVariants } from './dialog-schemas';
import { DialogStoreProvider } from './dialog-store-provider';
import DialogManager from './DialogManager';
import { useDialogStore } from './dialog-store-provider';

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
  },
  render: (props: Dialog) => {
    const { openDialog } = useDialogStore((state) => state);
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
  },
  render: (props: Dialog) => {
    const { openDialog } = useDialogStore((state) => state);
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
  args: {
    type: 'Prompt',
    title: 'Prompt Dialog',
    content: (
      <form id="prompt-form" onSubmit={(e) => e.preventDefault()}>
        <input required name="input" type="text" placeholder="required input" />
      </form>
    ),
    confirmLabel: 'Submit',
    formId: 'prompt-form',
    onConfirm: () => {
      // get the form based on the formId
      const form = document.getElementById('prompt-form') as HTMLFormElement;

      // check if the form is valid
      if (form.checkValidity()) {
        return true;
      }
      return false;
    },
  },
  render: (props: Dialog) => {
    const { openDialog } = useDialogStore((state) => state);
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

export const ErrorDialog: Story = {
  args: {
    type: 'Error',
    title: 'Oops, something went wrong',
    content: 'We encountered an unexpected error. Please try again later.',
  },
  render: (props: Dialog) => {
    const { openDialog } = useDialogStore((state) => state);
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
    const { openDialog } = useDialogStore((state) => state);
    const createDialog = () => {
      openDialog(props);
      openDialog({
        type: 'Info',
        title: 'Info Dialog',
        content: 'This is an info dialog.',
        confirmLabel: 'Yes',
        onConfirm: () => {
          console.log('Info dialog confirmed');
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
