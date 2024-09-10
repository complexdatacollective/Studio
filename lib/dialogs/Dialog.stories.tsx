import type { Meta, StoryObj } from '@storybook/react';
import { Dialog, type DialogProps } from './Dialog';
import { fn } from '@storybook/test';
import Form from '~/components/ui/form/Form';
import { Button } from '~/components/ui/Button';

const meta: Meta<typeof Dialog> = {
  title: 'Systems/Dialogs/Dialog',
  component: Dialog,
  args: {
    closeDialog: fn(),
  },
  argTypes: {
    accent: {
      control: {
        type: 'select',
        options: ['default', 'danger', 'success', 'warning', 'info'],
      },
    },
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="flex h-72 items-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

const DialogTemplate = (args: DialogProps) => (
  <Dialog {...args} open ref={undefined}>
    <p>This is the content inside the dialog.</p>
    <Form.Footer
      primaryAction={
        <Button color="primary" onClick={args.closeDialog}>
          Continue
        </Button>
      }
      secondaryAction={<Button onClick={args.closeDialog}>Cancel</Button>}
    />
  </Dialog>
);

export const Default: Story = {
  args: {
    title: 'Default Dialog',
    description: 'This is a default dialog description',
  },
  render: (args) => <DialogTemplate {...args} />,
};

export const Success: Story = {
  args: {
    title: 'Success Dialog',
    description: 'This dialog indicates success.',
    accent: 'success',
  },
  render: (args) => <DialogTemplate {...args} />,
};

export const Danger: Story = {
  args: {
    title: 'Danger Dialog',
    description: 'This dialog indicates danger.',
    accent: 'danger',
  },
  render: (args) => <DialogTemplate {...args} />,
};

export const Warning: Story = {
  args: {
    title: 'Warning Dialog',
    description: 'This dialog indicates a warning.',
    accent: 'warning',
  },
  render: (args) => <DialogTemplate {...args} />,
};

export const Info: Story = {
  args: {
    title: 'Info Dialog',
    description: 'This dialog provides some information.',
    accent: 'info',
  },
  render: (args) => <DialogTemplate {...args} />,
};
