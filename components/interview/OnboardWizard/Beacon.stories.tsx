import type { Meta, StoryObj } from '@storybook/react';
import Beacon from './Beacon';
import { OnboardWizardProvider } from './OnboardWizardContext';

const meta: Meta<typeof Beacon> = {
  title: 'OnboardWizard/Beacon',
  component: Beacon,
  decorators: [
    (Story, _context) => {
      return (
        <OnboardWizardProvider>
          <Story />
        </OnboardWizardProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
