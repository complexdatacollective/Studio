import type { Meta, StoryObj } from '@storybook/react';
import TooltipHint from './TooltipHint';
import { Button } from './Button';
import { Info } from 'lucide-react';

const meta: Meta<typeof TooltipHint> = {
  title: 'UI/TooltipHint',
  component: TooltipHint,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    hint: { control: 'text', defaultValue: 'This is a tooltip hint!' },
  },
  args: {
    hint: 'This is a tooltip hint!',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Button>Hover me</Button>,
    hint: 'This is a tooltip hint.',
  },
};

export const WithAdditionalContent: Story = {
  args: {
    children: <Button>Hover me</Button>,
    hint: (
      <div className="flex">
        <p>This is a tooltip hint with additional content.</p>
        <kbd className="pointer-events-none ml-4 inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100">
          <span className="text-sm">⌘</span>Z
        </kbd>
      </div>
    ),
  },
};
