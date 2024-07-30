import { type StageTypes } from '@prisma/client';
import type { Step } from 'onborda';

export function getSteps(stageType: StageTypes) {
  switch (stageType) {
    case 'NameGenerator':
      return nameGeneratorSteps;
    case 'Information':
      return informationSteps;
    default:
      return [];
  }
}

const nameGeneratorSteps: Step[] = [
  {
    icon: <></>, // required, so use an empty fragment if you don't want an icon
    title: 'Name Generator',
    content: (
      <>
        This is a name generator. It is used to nominate people in your network
      </>
    ),
    selector: '#nameGenerator-1',
    side: 'bottom',
    showControls: true,
    pointerPadding: -1,
    pointerRadius: 24,
  },
  {
    icon: <></>,
    title: 'Add a person.',
    content: <>Click this button to add a person to your network.</>,
    selector: '#nameGenerator-2',
    side: 'top',
    showControls: true,
    pointerPadding: -1,
    pointerRadius: 24,
  },
];

const informationSteps: Step[] = [
  {
    icon: <></>, // required, so use an empty fragment if you don't want an icon
    title: 'Information Interface',
    content: <>This is an information interface. Read the information below.</>,
    selector: '#nameGenerator-1',
    side: 'bottom',
    showControls: true,
    pointerPadding: -1,
    pointerRadius: 24,
  },
];
