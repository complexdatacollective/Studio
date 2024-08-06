import type { Meta, StoryObj } from '@storybook/react';
import StageShell from './StageShell';
import Navigation from './Navigation';
import type { Stage } from '@prisma/client';

const stageOptions: Record<string, Stage> = {
  NameGenerator: {
    id: 1,
    publicId: 'stage1',
    name: 'Name Generator',
    type: 'NameGenerator',
    protocolRevisionId: 1,
  },
};

const meta: Meta<typeof StageShell> = {
  title: 'Interview/StageShell',
  component: StageShell,
  parameters: {
    nextjs: {
      appDirectory: 'true',
    },
    layout: 'fullscreen',
  },
  argTypes: {
    stage: {
      control: 'select',
      options: Object.keys(stageOptions),
      description: 'The stage to display.',
    },
  },
  args: {
    stage: stageOptions.NameGenerator,
  },
  render: (args) => {
    return (
      <div className="flex h-screen bg-navy-taupe text-white">
        <Navigation pulseNext={false} progress={50} />
        <div className="flex-1 overflow-hidden overflow-y-auto">
          <StageShell stage={args.stage} />
        </div>
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
