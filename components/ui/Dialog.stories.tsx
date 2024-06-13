import { Meta, StoryObj } from '@storybook/react';
import { Dialog, DialogContent, DialogFooter, DialogOverlay } from './Dialog';
import { Button } from './Button';
import { useState } from 'react';
import { fn } from '@storybook/test';

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
    open: { control: 'boolean' },
    defaultOpen: { control: 'boolean' },
    onOpenChange: { action: 'openChange' },
  },
  args: {
    open: false,
    defaultOpen: false,
    onOpenChange: fn(),
  },
} as Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InfoDialog: Story = {
  args: { open: false },
  render: ({ open, defaultOpen }) => {
    const [show, setShow] = useState(open);

    return (
      <>
        <Button onClick={() => setShow(!show)}>Toggle info dialog</Button>
        <Dialog defaultOpen={defaultOpen} open={show} onOpenChange={setShow}>
          <DialogOverlay />
          <DialogContent variant="Info">
            <h2>Info Dialog Title</h2>
            <p>Info Dialog Content...</p>
            <DialogFooter>
              <Button onClick={() => setShow(false)} variant="outline">
                Cancel
              </Button>
              <Button onClick={() => setShow(false)}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  },
};

export const ErrorDialog: Story = {
  args: { open: false },
  render: ({ open, defaultOpen }) => {
    const [show, setShow] = useState(open);

    return (
      <>
        <Button variant="destructive" onClick={() => setShow(!show)}>
          Toggle error dialog
        </Button>
        <Dialog defaultOpen={defaultOpen} open={show} onOpenChange={setShow}>
          <DialogOverlay />
          <DialogContent variant="Error">
            <h2>Error Dialog Title</h2>
            <p>Error Dialog Content...</p>
            <DialogFooter>
              <Button onClick={() => setShow(false)} variant="outline">
                Cancel
              </Button>
              <Button onClick={() => setShow(false)}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  },
};

export const WarningDialog: Story = {
  args: { open: false },
  render: ({ open, defaultOpen }) => {
    const [show, setShow] = useState(open);

    return (
      <>
        <Button variant="accent" onClick={() => setShow(!show)}>
          Toggle warning dialog
        </Button>
        <Dialog defaultOpen={defaultOpen} open={show} onOpenChange={setShow}>
          <DialogOverlay />
          <DialogContent variant="Warning">
            <h2>Warning Dialog Title</h2>
            <p>Warning Dialog Content...</p>
            <DialogFooter>
              <Button onClick={() => setShow(false)} variant="outline">
                Cancel
              </Button>
              <Button onClick={() => setShow(false)}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  },
};
