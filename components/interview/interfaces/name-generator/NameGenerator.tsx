/**
 * Building blocks for NameGenerator interface
 */

import NodeList from '~/components/interview/NodeList';
import Prompts from '~/components/interview/Prompts/Prompts';
import { type InterviewStage } from '~/components/interview/ui/InterviewShell';
import { interfaceWrapperClasses } from '~/components/interview/ui/SimpleShell';
import devProtocol from '~/lib/db/sample-data/dev-protocol';
import { cn } from '~/lib/utils';
import { type NameGeneratorInterface } from '~/schemas/protocol/interfaces/name-generator';
import NodePanels from './NodePanels';
import QuickNodeForm from './QuickNodeForm';

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

export default function NameGenerator(_props: InterviewStage) {
  const config = devProtocol.stages[0] as NameGeneratorInterface;
  const stageNodeType = devProtocol.codebook.nodes!.person!;
  return (
    <>
      <div className={cn(interfaceWrapperClasses, 'flex grow flex-col gap-4')}>
        <Prompts prompts={config.prompts} />
        <div className="relative flex h-full min-h-0 flex-1 items-start justify-center gap-4">
          {config.panels && <NodePanels panels={config.panels} />}
          <div className="flex-basis-auto flex h-full flex-shrink flex-grow">
            <NodeList items={demoNodes} />
          </div>
        </div>
        <QuickNodeForm nodeType={stageNodeType} />
      </div>
    </>
  );
}

// For tomorrow: should the steps be keyed by locale, or should title and content etc be localised records?

export const defaultWizard = {
  en: [
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
