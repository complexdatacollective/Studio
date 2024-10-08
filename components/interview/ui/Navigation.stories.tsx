import type { Meta, StoryObj } from '@storybook/react';
import Navigation from './Navigation';
import { FALLBACK_LOCALE } from '~/lib/localisation/config';

const meta: Meta<typeof Navigation> = {
  title: 'Interview/Navigation',
  component: Navigation,
  parameters: {
    nextjs: {
      appDirectory: 'true',
    },
    layout: 'fullscreen',
    forceTheme: 'interview',
  },
  decorators: [
    (Story, _context) => {
      return (
        <div className="h-screen">
          <Story />
        </div>
      );
    },
  ],
  argTypes: {
    pulseNext: {
      control: 'boolean',
      defaultValue: false,
      description:
        'Whether the next button should pulse. Used to indicate that the current task is complete.',
    },
    progress: {
      control: 'range',
      defaultValue: 50,
      description:
        'Whole integer between 0-100 representing progress through the interview.',
    },
  },
  args: {
    pulseNext: false,
    progress: 50,
    availableLocales: [FALLBACK_LOCALE],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
