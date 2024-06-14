import { Meta, StoryObj } from '@storybook/react';
import { Button } from '~/components/ui/Button';
import { fn } from '@storybook/test';
import DialogManager from './DialogManager';
import useDialog from './useDialog';
import { DialogStoreProvider } from './dialog-store-provider';
import { Dialog, DialogVariants } from './dialog-schemas';

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
      options: Object.values(DialogVariants),
      control: { type: 'select' },
    },
    title: { control: 'text' },
    content: { control: 'text' },
    confirmLabel: { control: 'text' },
    cancelLabel: { control: 'text' },
    onConfirm: { control: false },
    onCancel: { control: false },
  },
  args: {
    type: 'Info',
    title: 'Dialog title',
    content: 'This is the dialog content.',
    confirmLabel: 'OK',
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
type Story = StoryObj<typeof meta>;

export const InfoDialog: Story = {
  args: {
    type: DialogVariants.Info,
  },

  render: (props) => {
    const { showDialog } = useDialog();

    const createDialog = () => {
      showDialog(props);
    };

    return (
      <>
        <Button onClick={() => createDialog()}>Show Dialog</Button>
      </>
    );
  },
};
