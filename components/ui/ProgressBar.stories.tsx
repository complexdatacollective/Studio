// ProgressBar.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ProgressBar from './ProgressBar';

// Define meta information for the component
const meta: Meta<typeof ProgressBar> = {
  title: 'UI/ProgressBar',
  component: ProgressBar,
  argTypes: {
    value: {
      control: 'range',
      min: 0,
      max: 100,
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="h-64 w-64">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Primary: Story = {
  args: {
    value: 50,
    label: 'Progress bar',
  },
};
