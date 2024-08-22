import type { Meta, StoryObj } from '@storybook/react';
import NameGenerator from '~/components/interview/interfaces/name-generator/NameGenerator';
import Navigation from '~/components/interview/ui/Navigation';

const meta: Meta<typeof NameGenerator> = {
  title: 'OnboardWizard/NameGenerator',
  component: NameGenerator,
  parameters: {
    nextjs: {
      appDirectory: 'true',
    },
    layout: 'fullscreen',
  },
  decorators: [
    (Story, _context) => {
      return (
        <div className="bg-navy-taupe text-white flex h-screen">
          <Navigation pulseNext={false} progress={50} />

          <div className="flex-1 overflow-hidden overflow-y-auto">
            <div className="space-y-4 p-8">
              <Story />
            </div>
          </div>
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
