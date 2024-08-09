import type { Meta, StoryObj } from '@storybook/react';
import NameGenerator from '~/components/interview/interfaces/NameGenerator';
import Navigation from '~/app/[locale]/(interview)/interview/_components/Navigation';

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
        <div className="flex h-screen bg-navy-taupe text-white">
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
