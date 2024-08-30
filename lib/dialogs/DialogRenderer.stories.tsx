import type { StoryObj } from '@storybook/react';
import { useDialogs } from './useDialogs';
import { Button } from '~/components/ui/Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Systems/Dialogs/DialogRenderer',
  decorators: [
    (_Story, _context) => {
      const { openDialog } = useDialogs();

      const handleOpenDialog = () => {
        openDialog({
          id: '1',
          title: 'Dialog Title',
          description: 'Dialog Description',
          content: 'Dialog Content',
        });
      };

      const handle2 = () => {
        openDialog({
          id: '2',
          title: 'Dialog Title',
          description: 'Dialog Description',
          content: (
            <>
              Dialog Content
              <Button onClick={handleOpenDialog}>Add Dialog</Button>
            </>
          ),
        });
      };

      return (
        <div className="flex h-screen flex-col gap-4">
          <Button onClick={handleOpenDialog}>Add Dialog</Button>
          <Button onClick={handle2}>
            Add Dialog that spawns another dialog
          </Button>
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {};
