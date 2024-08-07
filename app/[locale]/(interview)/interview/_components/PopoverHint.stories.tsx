import type { Meta, StoryObj } from '@storybook/react';
import PopoverHint from './PopoverHint';
import Heading from '~/components/typography/Heading';
import Paragraph from '~/components/typography/Paragraph';

const meta: Meta<typeof PopoverHint> = {
  title: 'Interview/PopoverHint',
  component: PopoverHint,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    popoverContent: {
      control: 'text',
      defaultValue:
        'This is a longer hint. It is intended for stage-level instructions.',
    },
  },
  args: {
    popoverContent:
      'This is a longer hint. It is intended for stage-level instructions.',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    popoverContent:
      'This is a hint without a title. It is intended for general instructions.',
  },
};

export const WithTitle: Story = {
  args: {
    popoverContent: (
      <>
        <Heading variant="label">Stage Instructions</Heading>
        <Paragraph>
          This is a longer hint with a title. It is intended for stage-level
          instructions. It may have multiple sentences.
        </Paragraph>
      </>
    ),
  },
};
