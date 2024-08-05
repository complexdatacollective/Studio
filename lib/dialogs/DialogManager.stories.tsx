import { type Meta, type StoryObj } from '@storybook/react';
import DialogManager from './DialogManager';

const meta = {
  title: 'Dialogs/DialogManager',
  component: DialogManager,
  argTypes: {
    dialogs: {
      control: {
        type: 'object',
      },
    },
  },
} as Meta<typeof DialogManager>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DialogManagerComponent: Story = {
  args: {
    dialogs: [
      {
        id: '1',
      },
      {
        id: '2',
      },
    ],
  },
};
