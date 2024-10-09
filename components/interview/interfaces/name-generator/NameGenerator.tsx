/**
 * Building blocks for NameGenerator interface
 */

import Prompts from '~/components/interview/Prompts/Prompts';
import NodePanels from './NodePanels';
import NodeList from '~/components/interview/NodeList';
import QuickNodeForm from './QuickNodeForm';
import { cn } from '~/lib/utils';
import { interfaceWrapperClasses } from '../../ui/SimpleShell';
import { withOnboardingWizard } from '~/components/onboard-wizard/withOnboardingWizard';
import { type InterviewStage } from '../../ui/InterviewShell';
import { useTranslations } from 'next-intl';
import { type Panel } from '~/schemas/protocol/interfaces/name-generator';
import { type NodeType } from '~/schemas/protocol/codebook/entities';
import devProtocol from '~/lib/db/sample-data/dev-protocol';

const demoNodes = [
  {
    id: '5',
    type: 'Person',
    attributes: { label: 'Matt' },
  },
  {
    id: '6',
    type: 'Person',
    attributes: { label: 'Taylor' },
  },
  {
    id: '7',
    type: 'Person',
    attributes: { label: 'Maggie' },
  },
  {
    id: '8',
    type: 'Person',
    attributes: { label: 'Emma' },
  },
];

function NameGenerator(_props: InterviewStage) {
  const config = devProtocol.stages[0];
  const stageNodeType = devProtocol.codebook.nodes.person;
  return (
    <>
      <div className={cn(interfaceWrapperClasses, 'flex grow flex-col gap-4')}>
        <Prompts prompts={config.prompts} currentPromptId="1" />
        <div className="relative flex h-full min-h-0 flex-1 items-start justify-center gap-4">
          <NodePanels panels={config.panels} id="data-wizard-task-step-2" />
          <div className="flex-basis-auto flex h-full flex-shrink flex-grow">
            <NodeList items={demoNodes} />
          </div>
        </div>
        <QuickNodeForm nodeType={stageNodeType} />
      </div>
    </>
  );
}

export default withOnboardingWizard(NameGenerator, (_props) => {
  // TODO: get the stage id from the props
  const stageId = '1';

  let t = useTranslations(`Protocol.Stages.${stageId}.Wizard`);

  // hacky way to check if the translation exists. This tells us if there are stage-level translations for the wizard
  if (t('Name').includes(`Protocol.Stages.${stageId}.Wizard.Name`)) {
    // use the default stage type wizard steps. will either be user-supplied or our defaults
    t = useTranslations('Interview.Wizards.NameGenerator');
  }

  return {
    id: 'name-generator',
    name: t('Name'),
    priority: 'Task',
    description: [
      {
        type: 'paragraph',
        children: [
          {
            text: t('Description'),
          },
        ],
      },
    ],
    steps: [
      {
        title: t('Steps.Welcome.Title'),
        content: [
          {
            type: 'paragraph',
            children: [
              {
                text: t('Steps.Welcome.Text'),
              },
            ],
          },
          {
            type: 'image',
            props: {
              src: 'https://documentation.networkcanvas.com/assets/img/interface-documentation/name-generators/ng-quick.png',
              alt: 'Name Generator Interface',
            },
            children: [],
          },
        ],
      },
      {
        targetElementId: 'data-wizard-prompts',
        title: t('Steps.Prompts.Title'),
        content: [
          {
            type: 'paragraph',
            children: [
              {
                text: t('Steps.Prompts.Text'),
              },
            ],
          },
        ],
      },
      {
        targetElementId: 'data-wizard-task-step-2',
        title: t('Steps.SidePanels.Title'),
        content: [
          {
            type: 'paragraph',
            children: [
              {
                text: t('Steps.SidePanels.Text'),
              },
            ],
          },
        ],
      },
      {
        targetElementId: 'data-wizard-task-step-3',
        title: t('Steps.AddPerson.Title'),
        content: [
          {
            type: 'paragraph',
            children: [
              {
                text: t('Steps.AddPerson.Text'),
              },
            ],
          },
        ],
      },
    ],
  };
});
