import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';
import { Button } from './Button';

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
  argTypes: {
    tooltip: { control: 'text', defaultValue: 'This is a tooltip.' },
  },
  args: {
    tooltip: 'This is a tooltip.',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Button>Hover me</Button>,
    tooltip: 'This is a tooltip.',
  },
};
