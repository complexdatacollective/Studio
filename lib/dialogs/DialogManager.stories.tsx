import { type Meta, type StoryObj } from '@storybook/react';
import { Button } from '~/components/ui/Button';
import DialogManager from './DialogManager';
import { type Dialog } from './dialog-schemas';
import useDialog from './useDialog';

const meta = {
  title: 'Dialogs/DialogManager',
  component: DialogManager,
} satisfies Meta<typeof DialogManager>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DialogManagerComponent: Story = {
  render: () => {
    const { showDialog, closeDialog, dialogs } = useDialog();

    const MockDialog = ({ id, title, type, content, confirmLabel }: Dialog) => (
      <div>
        id: {id}
        title: {title}
        type: {type}
        content: {content}
        confirmLabel: {confirmLabel}
      </div>
    );

    return (
      <>
        <Button
          onClick={() =>
            void showDialog({
              title: 'Dialog title',
              type: 'Confirm',
              content: 'Dialog content',
              confirmLabel: 'Confirm',
              cancelLabel: 'Cancel',
              onConfirm: () => undefined,
              onCancel: () => undefined,
            })
          }
        >
          Add Dialogs
        </Button>
        <Button
          onClick={() => void closeDialog(dialogs[dialogs.length - 1]!.id)}
        >
          Remove Last Dialog
        </Button>
        <DialogManager DialogComponent={MockDialog} />
      </>
    );
  },
};
