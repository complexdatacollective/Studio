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
    const { addDialog, removeDialog, dialogs } = useDialogStore();

    return (
      <>
        {/* Button is not part of the DialogManager component,
            just putting there to showcase what the component renders
         */}
        <Button onClick={() => void addDialog({})}>Add Dialogs</Button>
        <Button
          onClick={() => void removeDialog(dialogs[dialogs.length - 1]!.id)}
        >
          Remove Last Dialog
        </Button>
        <DialogManager />
      </>
    );
  },
};
