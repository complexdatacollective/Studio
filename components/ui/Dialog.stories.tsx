import { Meta, StoryObj } from '@storybook/react';
import { Dialog, DialogContent, DialogFooter, DialogOverlay } from './Dialog';
import { Button } from './Button';
import { useState } from 'react';
import { fn } from '@storybook/test';
import useDialog from '~/lib/dialog-manager/useDialog';
import { generatePublicId } from '~/lib/generatePublicId';
import DialogManager from '~/lib/dialog-manager/DialogManager';

const meta = {
  title: 'Dialogs/Dialog',
  component: Dialog,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: ['Info', 'Warning', 'Error'],
      control: { type: 'select' },
    },
    title: { control: 'text' },
    content: { control: 'text' },
    confirmLabel: { control: 'text' },
    cancelLabel: { control: 'text' },
    onConfirm: { control: false },
    onCancel: { control: false },
  },
  args: {
    type: 'Info',
    title: 'Info',
    content: 'This is an info dialog',
    confirmLabel: 'OK',
    cancelLabel: 'Cancel',
    onConfirm: fn(() => {}),
    onCancel: fn(() => {}),
  },
  decorators: [
    (Story) => (
      <>
        <DialogManager />
        <Story />
      </>
    ),
  ],
} as Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InfoDialog: Story = {
  render: (props) => {
    const { children, ...rest } = props;

    const { showDialog } = useDialog();

    const createDialog = () => {
      showDialog(rest);
    };

    return (
      <>
        <Button onClick={() => createDialog()}>Show Dialog</Button>
      </>
    );
  },
};
