import type { Meta, StoryObj } from '@storybook/react';
import type { Stage } from '@prisma/client';
import SimpleShell from './SimpleShell';
import NameGenerator from '../interfaces/name-generator/NameGenerator';
import InterviewLocaleProvider, {
  type Locale,
} from '~/lib/localisation/interview/Provider';

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
  userLanguageHeader: string;
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
    userLanguageHeader: {
      control: 'select',
      options: ['en', 'fr', 'es'],
      description: 'The user language header to simulate.',
    },
  },
  args: {
    stage: stageOptions[0],
    userLanguageHeader: 'en',
  },
  render: ({ stage, userLanguageHeader }) => {
    const getStageComponent = (stage: Stage) => {
      switch (stage.type) {
        case 'NameGenerator':
          return <NameGenerator />;
        default:
          return null;
      }
    };

    const protocolLanguages: Locale[] = [
      ['en', 'English'],
      ['fr', 'French'],
    ];

    return (
      <InterviewLocaleProvider
        initialLocale={null}
        userLanguageHeader={userLanguageHeader}
        protocolLanguages={protocolLanguages}
      >
        <SimpleShell isReadyForNextStage={false} progress={50}>
          {getStageComponent(stage)}
        </SimpleShell>
      </InterviewLocaleProvider>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
