import type { Meta, StoryObj } from '@storybook/react';
import NameGenerator from './NameGenerator';

const meta: Meta<typeof NameGenerator> = {
  title: 'Interfaces/NameGenerator',
  component: NameGenerator,
  parameters: {
    nextjs: {
      appDirectory: 'true',
    },
    layout: 'fullscreen',
  },
  decorators: [
    (Story, _context) => {
      return (
        <div className="h-screen bg-navy-taupe text-white">
          <Story />
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
