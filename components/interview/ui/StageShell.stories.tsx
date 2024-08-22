import type { Meta, StoryObj } from '@storybook/react';
import StageShell from './StageShell';
import Navigation from './Navigation';
import type { Stage } from '@prisma/client';

const stageOptions: Stage[] = [
  {
    id: 1,
    publicId: 'stage1',
    name: 'NameGenerator',
    type: 'NameGenerator',
    protocolRevisionId: 1,
  },
];

const meta: Meta<typeof StageShell> = {
  title: 'Interview/StageShell',
  component: StageShell,
  parameters: {
    nextjs: {
      appDirectory: 'true',
    },
    layout: 'fullscreen',
    forceTheme: 'interview',
  },
  argTypes: {
    stage: {
      control: 'select',
      options: stageOptions.map((stage) => stage.name),
      mapping: stageOptions.reduce(
        (acc, stage) => {
          acc[stage.name] = stage;
          return acc;
        },
        {} as Record<string, Stage>,
      ),
      description: 'The stage to display.',
    },
  },
  args: {
    stage: stageOptions[0],
  },
  render: (args) => {
    return (
      <div className="bg-navy-taupe text-white flex h-screen">
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
