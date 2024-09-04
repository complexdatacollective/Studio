import type { StoryContext, StoryObj } from '@storybook/react';
import { useDialogs } from './useDialogs';
import { Button } from '~/components/ui/Button';
import { useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '../utils';
import Heading from '~/components/typography/Heading';
import Paragraph from '~/components/typography/Paragraph';
import CloseButton from '~/components/ui/CloseButton';
import { MotionSurface } from '~/components/layout/Surface';
import Form from '~/components/ui/form/Form';
import { Input } from '~/components/ui/form/Input';
import { SubmitButton } from '~/components/ui/form/SubmitButton';
import { useDialog } from './DialogRenderer';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Systems/Dialogs/Dialog',
  decorators: [
    (_Story: React.ComponentType, _context: StoryContext) => {
      const { openDialog } = useDialog();

      const handleOpenDialog = async () => {
        const result = await openDialog({
          title: 'Are you sure?',
          description: 'This action cannot be undone.',
          children: (
            <>
              <Paragraph>Are you sure you want to proceed?</Paragraph>
              <Button onClick={handleOpenAnotherDialog}>
                Open Another Dialog
              </Button>
            </>
          ),
        });
        if (result) {
          console.log('Confirmed');
        } else {
          console.log('Cancelled');
        }
      };

      const handleOpenAnotherDialog = async () => {
        const result = await openDialog({
          title: 'Another Confirmation',
          description: 'Do you want to continue with this action?',
          children: <Paragraph>This is a separate dialog.</Paragraph>,
        });
        if (result) {
          console.log('Another dialog confirmed');
        } else {
          console.log('Another dialog cancelled');
        }
      };

      return (
        <div className="flex h-screen flex-col gap-4">
          <Button onClick={handleOpenDialog}>Open Dialog</Button>
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {};
