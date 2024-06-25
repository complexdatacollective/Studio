import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { AnimatePresence } from 'framer-motion';
import Paragraph from '~/components/typography/Paragraph';
import { Button } from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';
import { DialogStoreProvider, useDialogStore } from './dialog-store-provider';
import DialogManager from './DialogManager';

const meta = {
  title: 'Dialogs/DialogManager',
  component: DialogManager,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    handleOpenChange: { action: 'handleOpenChange' },
    handleConfirmDialog: { action: 'handleConfirmDialog' },
    handleCancelDialog: { action: 'handleCancelDialog' },
  },
  args: {
    handleOpenChange: fn(),
    handleConfirmDialog: fn(),
    handleCancelDialog: fn(),
  },
  decorators: [
    (Story) => (
      <DialogStoreProvider>
        <Story />
      </DialogStoreProvider>
    ),
  ],
} satisfies Meta<typeof DialogManager>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DialogManagerComponent: Story = {
  render: () => {
    const { closeDialog, dialogs, openDialog } = useDialogStore();
    const createDialog = () => {
      openDialog({
        type: 'Info',
        title: 'Important Information',
        content: (
          <div>
            <Paragraph>
              Our product is designed to provide a seamless user experience and
              help you achieve your goals more efficiently. We have carefully
              crafted every aspect of the application to ensure maximum
              effectiveness and ease of use.
            </Paragraph>
            <Paragraph>
              By using our product, you agree to our terms of service and
              privacy policy. If you have any questions or concerns, please
              don't hesitate to reach out to our support team.
            </Paragraph>
          </div>
        ),
        confirmLabel: 'Got it',
      });
    };
    return (
      <>
        {/* Button is not part of the DialogManager component,
            just putting there to showcase what the component renders
         */}
        <Button onClick={createDialog}>Show Dialog</Button>

        <AnimatePresence>
          {dialogs.map((dialog, index) => (
            <Dialog
              key={dialog.id}
              dialogOrder={index}
              handleOpenChange={() => {
                console.log('handleOpenChange action');
                closeDialog(dialog.id);
              }}
              handleCancelDialog={() => {
                console.log('handleCancelDialog action');
                closeDialog(dialog.id);
              }}
              handleConfirmDialog={() => {
                console.log('handleConfirmDialog action');
                closeDialog(dialog.id);
              }}
              {...dialog}
            />
          ))}
        </AnimatePresence>
      </>
    );
  },
};
