import type { StoryObj } from '@storybook/react';
import { Button } from '~/components/ui/Button';
import { useDialog } from './DialogProvider';

const meta = {
  title: 'Systems/Dialogs/Dialog',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  render: () => {
    const { openDialog } = useDialog();

    const confirmDialog = async () => {
      // Result should be boolean
      const result = await openDialog({
        title: 'Are you sure?',
        description: 'This action cannot be undone.',
        type: 'choice',
        color: 'destructive',
        confirmText: 'Delete',
        cancelText: 'Cancel',
      });

      console.log({ result });
    };

    return (
      <div className="flex h-[100vh] items-center justify-center [background-image:linear-gradient(90deg,oklch(var(--surface-1))_20%,transparent_10%)] [background-size:25px]">
        <Button onClick={confirmDialog}>Confirm Dialog</Button>
      </div>
    );
  },
};
