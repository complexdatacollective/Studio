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
      openDialog({
        type: 'Error',
        title: 'Oops, something went wrong',
        content: 'We encountered an unexpected error. Please try again later.',
        error: {
          name: 'TypeError',
          message: 'Cannot read property `length` of undefined',
          stack: `TypeError: Cannot read property length of undefined at
            Object.handleClick (/app/components/Button.js:21:30) at
            HTMLUnknownElement.callCallback (react-dom.development.js:4164:14) at
            Object.invokeGuardedCallbackDev (react-dom.development.js:4213:16) at
            invokeGuardedCallback (react-dom.development.js:4277:31) at
            invokeGuardedCallbackAndCatchFirstError
            (react-dom.development.js:4291:25) at executeDispatch
            (react-dom.development.js:9041:3) at processDispatchQueueItemsInOrder
            (react-dom.development.js:9073:7) at processDispatchQueue
            (react-dom.development.js:9086:7) at dispatchEventsForPlugins
            (react-dom.development.js:9097:7) at react-dom.development.js:9306:7`,
        },
        confirmLabel: 'OK',
      });
    };
    return (
      <>
        {/* Button is not part of the DialogManager component,
            just putting there to showcase what the component renders
         */}
        <Button onClick={createDialog}>Show Dialogs</Button>

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
