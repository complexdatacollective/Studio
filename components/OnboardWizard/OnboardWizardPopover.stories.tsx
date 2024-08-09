import type { Meta, StoryObj } from '@storybook/react';
import OnboardWizardPopover from './OnboardWizardPopover';

const meta: Meta<typeof OnboardWizardPopover> = {
  title: 'OnboardWizard/Popover',
  component: OnboardWizardPopover,
  parameters: {
    nextjs: {
      appDirectory: 'true',
    },
    layout: 'fullscreen',
  },
  decorators: [
    (Story, _context) => {
      return <Story />;
    },
  ],
  argTypes: {
    stepContent: {
      control: 'text',
      defaultValue:
        'This is a name generator interface. This interface allows you to nominate people. First, read the prompt and think about the people who meet the criteria.',
    },
    totalSteps: {
      control: 'number',
      defaultValue: 3,
    },
  },
  args: {
    stepContent:
      'This is a name generator interface. This interface allows you to nominate people. First, read the prompt and think about the people who meet the criteria.',
    elementPosition: {
      top: 80,
      left: 160,
      width: 816,
      height: 108,
    },
    totalSteps: 3,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
