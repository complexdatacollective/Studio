import type { Meta, StoryObj } from '@storybook/react';
import TooltipHint from './TooltipHint';

const meta: Meta<typeof TooltipHint> = {
  title: 'UI/TooltipHint',
  component: TooltipHint,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    hint: { control: 'text', defaultValue: 'This is a tooltip hint!' },
  },
  args: {
    hint: 'This is a tooltip hint!',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Hover me!',
    hint: 'This is a tooltip hint!',
  },
};
