import type { Meta, StoryObj } from '@storybook/react';
import NameGenerator from '~/components/interview/interfaces/name-generator/NameGenerator';
import SimpleShell from '../interview/ui/SimpleShell';

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
        <SimpleShell progress={50} isReadyForNextStage={false}>
          <Story />
        </SimpleShell>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};