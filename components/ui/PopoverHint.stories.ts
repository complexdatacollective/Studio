import type { Meta, StoryObj } from '@storybook/react';
import PopoverHint from './PopoverHint';

const meta: Meta<typeof PopoverHint> = {
  title: 'UI/PopoverHint',
  component: PopoverHint,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    hint: {
      control: 'text',
      defaultValue:
        'This is a longer hint. It is intended for stage-level instructions.',
    },
  },
  args: {
    hint: 'This is a longer hint. It is intended for stage-level instructions.',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hint: 'This is a hint without a title. It is intended for general instructions.',
  },
};

export const WithTitle: Story = {
  args: {
    hint: 'This is a longer hint with a title. It is intended for stage-level instructions. It may have multiple sentences.',
    title: 'Ordinal Bin',
  },
};
