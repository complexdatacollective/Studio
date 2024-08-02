import { type Meta, type StoryObj } from '@storybook/react';
import { Button } from '~/components/ui/Button';
import DialogManager from './DialogManager';
import { useDialogStore } from './store';

const meta = {
  title: 'Dialogs/DialogManager',
  component: DialogManager,
  args: {},
} satisfies Meta<typeof DialogManager>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DialogManagerComponent: Story = {
  render: () => {
    const { addDialog } = useDialogStore();

    return (
      <>
        <Button onClick={() => void addDialog({})}>Add Dialogs</Button>
        <DialogManager />
      </>
    );
  },
};
