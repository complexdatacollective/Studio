import { type Meta, type StoryObj } from '@storybook/react';
import { useRef } from 'react';
import { Button } from '~/components/ui/Button';
import DialogManager from './DialogManager';
import { useDialogStore } from './store';

const meta = {
  title: 'Dialogs/DialogManager',
  component: DialogManager,
  args: { portalRef: { current: document.createElement('div') } },
} satisfies Meta<typeof DialogManager>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DialogManagerComponent: Story = {
  render: () => {
    const { addDialog, removeDialog, dialogs } = useDialogStore();
    const portalRef = useRef<HTMLDivElement>(null);

    return (
      <>
        <Button onClick={() => void addDialog({})}>Add Dialogs</Button>
        <Button
          onClick={() => void removeDialog(dialogs[dialogs.length - 1]!.id)}
        >
          Remove Last Dialog
        </Button>
        <div
          style={{
            border: '2px solid red',
            height: '40rem',
            position: 'relative',
          }}
          ref={portalRef}
        />
        <DialogManager isModal={false} portalRef={portalRef} />
      </>
    );
  },
};
