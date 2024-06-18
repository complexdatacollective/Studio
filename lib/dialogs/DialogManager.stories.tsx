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
    content: { control: 'text', if: { arg: 'type', neq: 'Error' } },
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
      name: 'Error name',
      message: 'Error message',
      stack: 'Error stack',
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

export const ErrorDialog: Story = {
  args: {
    type: 'Error',
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
