import type { Meta, StoryObj } from '@storybook/react';
import type { Stage } from '@prisma/client';
import SimpleShell from './SimpleShell';
import NameGenerator from '../interfaces/name-generator/NameGenerator';

const stageOptions: Stage[] = [
  {
    id: 1,
    publicId: 'stage1',
    name: 'NameGenerator',
    type: 'NameGenerator',
    protocolRevisionId: 1,
  },
];

type StoryArgs = {
  stage: Stage;
};

const meta: Meta<StoryArgs> = {
  title: 'Interview/StageShell',
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
  render: ({ stage }) => {
    const getStageComponent = (stage: Stage) => {
      switch (stage.type) {
        case 'NameGenerator':
          return <NameGenerator />;
        default:
          return null;
      }
    };

    return (
      <SimpleShell
        isReadyForNextStage={false}
        progress={50}
        availableLocales={['en']}
      >
        {getStageComponent(stage)}
      </SimpleShell>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
