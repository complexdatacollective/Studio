import type { Meta, StoryObj } from '@storybook/react';
import OnboardWizardPopover from './OnboardWizardPopover';
import { OnboardWizardProvider } from './OnboardWizardContext';

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
      return (
        <OnboardWizardProvider>
          <Story />
        </OnboardWizardProvider>
      );
    },
  ],
  argTypes: {
    stepContent: {
      control: 'text',
      defaultValue:
        'This is a name generator interface. This interface allows you to nominate people. First, read the prompt and think about the people who meet the criteria.',
    },
    elementPosition: {
      control: 'object',
      defaultValue: {
        top: 80,
        left: 160,
        width: 816,
        height: 108,
      },
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
