import type { Meta, StoryObj } from '@storybook/react';
import PopoverHint from '~/app/[locale]/(interview)/interview/_components/PopoverHint';
import { NextIntlClientProvider } from 'next-intl';
// import { getMessages } from 'next-intl/server';

const meta: Meta<typeof PopoverHint> = {
  title: 'UI/PopoverHint',
  component: PopoverHint,
  decorators: [
    (Story, context) => {
      return (
        <NextIntlClientProvider locale="en">
          <Story />
        </NextIntlClientProvider>
      );
    },
  ],
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
