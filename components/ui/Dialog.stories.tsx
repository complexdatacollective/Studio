import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { DialogVariants } from '~/lib/dialogs/dialog-schemas';
import Paragraph from '../typography/Paragraph';
import Dialog from './Dialog';


const meta = {
  title: 'Dialogs/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    type: {
      control: { type: 'select' },
      options: Object.values(DialogVariants),
    },
    title: { control: 'text' },
    content: { control: 'text' },
  },
  // Define default args
  args: {
    type: 'Info',
    title: 'Important Information',
    content: (
      <>
        <Paragraph>
          Our product is designed to provide a seamless user experience and help
          you achieve your goals more efficiently. We have carefully crafted
          every aspect of the application to ensure maximum effectiveness and
          ease of use.
        </Paragraph>
        <Paragraph>
          By using our product, you agree to our terms of service and privacy
          policy. If you have any questions or concerns, please don't hesitate
          to reach out to our support team.
        </Paragraph>
      </>
    ),
    confirmLabel: 'OK',
    cancelLabel: 'Cancel',
  },
} as Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof Dialog>;

export const DialogComponent: Story = {
  render: (props) => {
    return (
      <Dialog {...props} />
    );
  }
};
