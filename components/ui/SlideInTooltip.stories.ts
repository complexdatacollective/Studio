import type { Meta, StoryObj } from '@storybook/react';
import SlideInTooltip from './SlideInTooltip';

const meta: Meta<typeof SlideInTooltip> = {
  title: 'UI/SlideInTooltip',
  component: SlideInTooltip,
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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hint: 'This is a longer hint. It is intended for stage-level instructions.',
  },
};
