import { type StageTypes } from '@prisma/client';

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

const nameGeneratorSteps = [
  {
    title: 'Name Generator',
    content:
      'This is a name generator. It is used to nominate people in your network',
    target: '#nameGenerator-1',
  },
  {
    title: 'Add a person.',
    content: 'Click this button to add a person to your network.',
    target: '#nameGenerator-2',
  },
];

const informationSteps = [
  {
    title: 'Information Interface',
    content: 'This is an information interface. Read the information below.',
    target: '#information-1',
  },
];
