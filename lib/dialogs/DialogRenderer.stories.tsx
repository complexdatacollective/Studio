import type { StoryObj } from '@storybook/react';
import { useDialogs } from './useDialogs';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Systems/Dialogs/DialogRenderer',
  decorators: [
    (Story, _context) => {
      const { openDialog } = useDialogs();

      const handleOpenDialog = () => {
        openDialog({
          id: '1',
          title: 'Dialog Title',
          description: 'Dialog Description',
          content: 'Dialog Content',
        });
      };

      return (
        <div className="h-screen">
          <button onClick={handleOpenDialog}>Add Dialog</button>
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {};
