import type { Meta, StoryObj } from '@storybook/react';
import Dialog from './Dialog';

const meta = {
  title: 'Dialogs/Dialog',
  component: Dialog,
} as Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof Dialog>;

export const DialogComponent: Story = {};
