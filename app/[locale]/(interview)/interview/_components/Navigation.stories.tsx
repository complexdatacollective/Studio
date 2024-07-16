import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Navigation from './Navigation';
import { NextIntlClientProvider } from 'next-intl';

const meta: Meta<typeof Navigation> = {
  title: 'Interview/Navigation',
  component: Navigation,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: 'true',
    },
  },
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
    pulseNext: { control: 'boolean', defaultValue: false },
    progress: { control: 'number', defaultValue: 0 },
  },
  args: {
    pulseNext: false,
    progress: 0,
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = ({
  pulseNext,
  progress,
}: {
  pulseNext: boolean;
  progress: number;
}) => <Navigation pulseNext={pulseNext} progress={progress} />;
