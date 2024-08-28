import type { Meta, StoryObj } from '@storybook/react';
import NameGenerator from './NameGenerator';

const meta: Meta<typeof NameGenerator> = {
  title: 'Interview/Interfaces/NameGenerator',
  component: NameGenerator,
  parameters: {
    nextjs: {
      appDirectory: 'true',
    },
    layout: 'fullscreen',
    forceTheme: 'interview',
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
