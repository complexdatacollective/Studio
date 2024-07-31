import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { DialogVariants } from '~/lib/dialogs/dialog-schemas';
import Paragraph from '../typography/Paragraph';
import Dialog, {
  DialogClose,
  DialogContent,
  dialogElements,
  DialogError,
  DialogFooter,
  DialogIcon,
} from './Dialog';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Dialogs/Dialog',
  component: Dialog,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    type: {
      control: { type: 'select' },
      options: Object.values(DialogVariants),
    },
    title: { control: 'text' },
    content: { control: 'text' },
    error: {
      name: 'error',
      type: { name: 'object' },
      description: 'The error object',
      control: {
        type: 'object',
      },
      defaultValue: {
        name: 'error',
        message: 'An error occurred',
        stack: 'Error stack',
      },
      table: {
        type: {
          summary: 'object',
          detail: `{ name: string, message: string, stack: string }`,
        },
        defaultValue: {
          summary: 'error',
          detail: `{ name: 'Error name', message: 'Error message', stack: 'Error stack' }`,
        },
      },
      if: { arg: 'type', eq: 'Error' },
    },
    handleOpenChange: { action: 'handleOpenChange' },
    handleConfirmDialog: { action: 'handleConfirmDialog' },
    handleCancelDialog: { action: 'handleCancelDialog' },
  },
  // Define default args
  args: {
    type: 'Info',
    title: 'Important Information',
    content: (
      <div>
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
      </div>
    ),
    confirmLabel: 'OK',
    // Error dialog args will be used if the type is 'Error'
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
    cancelLabel: 'Cancel',
    handleOpenChange: fn(),
    handleConfirmDialog: fn(),
    handleCancelDialog: fn(),
  },
} as Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof Dialog>;

export const DialogComponent: Story = {
  render: ({
    handleCancelDialog,
    handleConfirmDialog,
    handleOpenChange,
    ...dialog
  }) => {
    const { title, content, footer, close } = dialogElements({
      type: dialog.type,
    });

    return (
      <div className="relative min-h-[26rem] w-[32rem] p-3">
        <DialogPrimitive.Root open modal={false}>
          <DialogContent delay={0} className={content()}>
            <DialogPrimitive.Title className={title()}>
              <DialogIcon variant={dialog.type} />
              {dialog.title}
            </DialogPrimitive.Title>
            <section>
              {dialog.content}
              {dialog.type === 'Error' && <DialogError {...dialog.error} />}
            </section>
            <DialogFooter
              className={footer()}
              dialog={dialog}
              handleCancelDialog={handleCancelDialog}
              handleConfirmDialog={handleConfirmDialog}
            />
            {dialog.type !== 'Prompt' && <DialogClose className={close()} />}
          </DialogContent>
        </DialogPrimitive.Root>
      </div>
    );
  },
};
