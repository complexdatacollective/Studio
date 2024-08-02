import type { Meta, StoryObj } from '@storybook/react';
import Dialog from './Dialog';

const meta = {
  title: 'Dialogs/Dialog',
  component: Dialog,
  argTypes: {
    children: { control: 'text', defaultValue: 'Dialog content' },
  },
  args: {
    children: 'Dialog content',
  },
} as Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof Dialog>;

export const DialogComponent: Story = {};
