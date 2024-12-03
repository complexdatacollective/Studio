import type { Meta, StoryObj } from '@storybook/react';
import BlockEditor from './BlockEditor';

const meta: Meta<React.ComponentType> = {
  title: 'Systems/BlockEditor',
  component: BlockEditor,
  parameters: {
    nextjs: {
      appDirectory: 'true',
    },
    layout: 'fullscreen',
  },
  decorators: [
    (Story, _context) => {
      return (
        <div className="h-screen">
          <Story />
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
