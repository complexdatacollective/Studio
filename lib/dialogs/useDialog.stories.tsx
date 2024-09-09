/* eslint-disable no-console */
import type { StoryObj } from '@storybook/react';
import { Button } from '~/components/ui/Button';
import { useDialog } from './DialogProvider';
import Form from '~/components/ui/form/Form';
import { fn } from '@storybook/test';

const meta = {
  title: 'Systems/Dialogs/useDialog',
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
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  render: () => {
    const { openDialog, openCustomDialog } = useDialog();

    const confirmDialog = async () => {
      // Return type should be boolean | null
      const result = await openDialog({
        id: 'confirm-dialog',
        title: 'Are you sure?',
        description: 'This action cannot be undone.',
      });

      console.log('got result', result);
    };

    const customDialog = async () => {
      // Return type should be inferred as string | null
      const result = await openCustomDialog<string>({
        id: 'custom-dialog',
        title: 'Custom Dialog',
        description: 'This is a custom dialog',
        // 'resolve' should be inferred as (value: string | null) => void
        renderContent: (resolve) => {
          const handleConfirm = async () => {
            const confirmed = await openDialog({
              title: 'Are you really sure?',
              accent: 'danger',
              description: 'This action cannot be undone.',
            });

            if (confirmed) {
              resolve('confirmed');
            }
          };

          return (
            <Form.Footer
              primaryAction={
                <Button onClick={handleConfirm}>Do a dangerous thing</Button>
              }
              secondaryAction={
                <Button onClick={() => resolve(null)}>Cancel</Button>
              }
            />
          );
        },
      });

      console.log('got result', result);
    };

    return (
      <div className="flex h-[100vh] items-center justify-center [background-image:linear-gradient(90deg,oklch(var(--surface-1))_20%,transparent_10%)] [background-size:25px]">
        <Button onClick={confirmDialog}>Confirm Dialog</Button>
        <Button onClick={customDialog}>Custom Dialog</Button>
      </div>
    );
  },
};
