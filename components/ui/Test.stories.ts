import type { Meta, StoryObj } from '@storybook/react';
import Test from './Test';

const meta = {
  title: 'UI/Test',
  component: Test,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Test>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
