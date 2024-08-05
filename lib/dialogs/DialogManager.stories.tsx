import { type Meta, type StoryObj } from '@storybook/react';
import { Button } from '~/components/ui/Button';
import DialogManager from './DialogManager';
import { type Dialog, useDialogStore } from './store';

const meta = {
  title: 'Dialogs/DialogManager',
  component: DialogManager,
} satisfies Meta<typeof DialogManager>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DialogManagerComponent: Story = {
  render: () => {
    const { addDialog, removeDialog, dialogs } = useDialogStore();

    const MockDialog = ({
      id,
      title,
      content,
      cancelLabel,
      confirmLabel,
    }: Dialog) => (
      <div>
        id: {id}
        title: {title}
        content: {content}
        cancelLabel: {cancelLabel}
        confirmLabel: {confirmLabel}
      </div>
    );

    return (
      <>
        <Button
          onClick={() =>
            void addDialog({
              title: 'Dialog title',
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
          onClick={() => void removeDialog(dialogs[dialogs.length - 1]!.id)}
        >
          Remove Last Dialog
        </Button>
        <DialogManager DialogComponent={MockDialog} />
      </>
    );
  },
};
