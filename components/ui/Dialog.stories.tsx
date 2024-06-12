import { Meta, StoryObj } from '@storybook/react';
import { Dialog, DialogContent, DialogFooter, DialogOverlay } from './Dialog';
import { Button } from './Button';

const meta = {
  title: 'UI/Dialog',
  component: Dialog,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
  },
  args: {
    open: false,
  },
} as Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InfoDialog: Story = {
  args: { open: true },
  render: ({ open }) => (
    <Dialog open={open}>
      <DialogOverlay />
      <DialogContent variant="Info">
        <h2>Info Dialog Title</h2>
        <p>Info Dialog Content...</p>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WarningDialog: Story = {
  args: { open: true },
  render: ({ open }) => (
    <Dialog open={open}>
      <DialogOverlay />
      <DialogContent variant="Warning">
        <h2>Warning Dialog Title</h2>
        <p>Warning Dialog Content...</p>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const ErrorDialog: Story = {
  args: { open: true },
  render: ({ open }) => (
    <Dialog open={open}>
      <DialogOverlay />
      <DialogContent variant="Error">
        <h2>Error Dialog Title</h2>
        <p>Error Dialog Content...</p>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
